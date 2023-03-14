use anyhow::Context;
use roxmltree::{Document, Node};
use serde::Serialize;
use std::io::{BufReader, Read, Seek};
use zip::ZipArchive;

#[derive(Serialize)]
pub struct Nuspec {
  /// The unique package identifier.
  pub id: String,
  /// The version of the package, following the major.minor.patch pattern.
  pub version: String,
  /// A description of the package for UI display.
  pub description: String,
  /// A comma-separated list of packages authors, matching the profile names on nuget.org.
  pub authors: String,
  /// A URL for the package's home page, often shown in UI displays as well as nuget.org.
  pub project_url: Option<String>,
  /// An SPDX license expression or path to a license file within the package.
  pub license: Option<String>,
  /// A URL for a 128x128 image with transparency background to use as the icon for the package in UI display.
  pub icon_url: Option<String>,
  /// It is a path to an image file within the package, often shown in UIs like nuget.org as the package icon.
  pub icon: Option<String>,
  /// The path to the package's readme file.
  pub readme: Option<String>,
  /// A human-friendly title of the package which may be used in some UI displays.
  pub title: Option<String>,
}

impl Nuspec {
  /// Creates a [Nuspec] from the given [ZipArchive].
  pub fn from_archive<R: Read + Seek>(zip: &mut ZipArchive<R>) -> anyhow::Result<Self> {
    for i in 0..zip.len() {
      let file = zip.by_index(i);
      let file = file.context("Failed to extract NuGet package entry")?;
      let file_name = file.name();
      if file_name.ends_with(".nuspec") {
        let mut contents = String::with_capacity(file.size() as _);
        let mut file = BufReader::new(file);

        file.read_to_string(&mut contents)?;

        return Self::parse(&contents);
      }
    }

    anyhow::bail!("Failed to find nuspec file in NuGet package");
  }

  /// Parse the `xxx.nuspec` file contents.
  fn parse(nuspec: &str) -> anyhow::Result<Self> {
    let xml = Document::parse(nuspec).context("Failed to parse nuspec file")?;
    let meta = xml
      .descendants()
      .find(|n| n.has_tag_name("metadata"))
      .context("Failed to find metadata node")?;

    Ok(Self {
      id: get_el_text(meta, "id").context("Missing `id` node")?,
      version: get_el_text(meta, "version").context("Missing `version` node")?,
      description: get_el_text(meta, "description").context("Missing `description` node")?,
      authors: get_el_text(meta, "authors").context("Missing `authors` node")?,
      project_url: get_el_text(meta, "projectUrl"),
      license: get_el_text(meta, "license"),
      icon_url: get_el_text(meta, "iconUrl"),
      icon: get_el_text(meta, "icon"),
      readme: get_el_text(meta, "readme"),
      title: get_el_text(meta, "title"),
    })
  }
}

fn get_el_text(node: Node, name: &str) -> Option<String> {
  node
    .children()
    .find(|n| n.has_tag_name(name))
    .and_then(|n| n.text())
    .map(|t| t.to_string())
}
