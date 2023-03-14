pub mod nupkg;
pub mod nuspec;

use anyhow::Context;
use roxmltree::{Document, Node};
use serde::Serialize;
use std::io::{BufRead, BufReader, Cursor};
use zip::ZipArchive;

#[derive(Serialize)]
pub struct PackageMetadata {
  id: Option<String>,
  version: Option<String>,
  groups: Vec<DependencyGroup>,
}

#[derive(Serialize)]
pub struct DependencyGroup {
  target_framework: String,
  dependencies: Vec<Dependency>,
}

#[derive(Serialize)]
pub struct Dependency {
  id: String,
  version: String,
}

pub fn get_metadata(bytes: &[u8]) -> anyhow::Result<PackageMetadata> {
  let archive = Cursor::new(bytes);
  let mut archive = ZipArchive::new(archive).context("Failed to extract NuGet package")?;

  for i in 0..archive.len() {
    let file = archive.by_index(i);
    let file = file.context("Failed to extract NuGet package entry")?;
    let file_name = file.name();
    // todo: major assumption here that the first nuspec file is the one we want
    if file_name.ends_with(".nuspec") {
      let file = BufReader::new(file);

      return parse_metadata_from_reader(file);
    }
  }

  anyhow::bail!("Failed to find nuspec file in NuGet package");
}

fn parse_metadata_from_reader<R: BufRead>(mut reader: R) -> anyhow::Result<PackageMetadata> {
  let mut xml = String::new();

  reader
    .read_to_string(&mut xml)
    .context("Failed to read nuspec file")?;

  parse_metadata(&xml)
}

fn parse_metadata(xml: &str) -> anyhow::Result<PackageMetadata> {
  let xml = Document::parse(xml).context("Failed to parse nuspec file")?;
  let meta = xml
    .descendants()
    .find(|e| e.has_tag_name("metadata"))
    .context("Failed to find metadata tag")?;

  let id = meta.descendants().find(|e| e.has_tag_name("id"));
  let id = id.and_then(|e| e.text()).map(str::to_string);

  let version = meta.descendants().find(|e| e.has_tag_name("version"));
  let version = version.and_then(|e| e.text()).map(str::to_string);

  let groups = parse_dependency_groups(meta)?;

  Ok(PackageMetadata {
    id,
    version,
    groups,
  })
}

fn parse_dependency_groups(meta: Node) -> anyhow::Result<Vec<DependencyGroup>> {
  let groups = meta.descendants().find(|e| e.has_tag_name("dependencies"));
  let groups = match groups {
    Some(groups) => groups,
    None => return Ok(Vec::new()),
  };

  groups
    .descendants()
    .filter(|e| e.has_tag_name("group"))
    .map(parse_dependency_group)
    .collect::<anyhow::Result<Vec<_>>>()
}

fn parse_dependency_group(group: Node) -> anyhow::Result<DependencyGroup> {
  let target_framework = group
    .attribute("targetFramework")
    .context("Failed to find targetFramework attribute")?;

  Ok(DependencyGroup {
    target_framework: target_framework.to_string(),
    dependencies: parse_dependencies(group)?,
  })
}

fn parse_dependencies(group: Node) -> anyhow::Result<Vec<Dependency>> {
  group
    .descendants()
    .filter(|e| e.has_tag_name("dependency"))
    .map(parse_dependency)
    .collect::<anyhow::Result<Vec<_>>>()
}

fn parse_dependency(dep: Node) -> anyhow::Result<Dependency> {
  let id = dep
    .attribute("id")
    .context("Failed to find id attribute")?
    .to_string();

  let version = dep
    .attribute("version")
    .context("Failed to find version attribute")?
    .to_string();

  Ok(Dependency { id, version })
}
