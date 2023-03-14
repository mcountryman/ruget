pub mod nuspec;

use self::nuspec::Nuspec;
use anyhow::Context;
use serde::Serialize;
use std::io::{BufReader, Cursor, Read, Seek};
use zip::ZipArchive;

pub struct Nupkg<R>(ZipArchive<R>);

impl<'a> Nupkg<Cursor<&'a [u8]>> {
  pub fn from_bytes(bytes: &'a [u8]) -> anyhow::Result<Self> {
    Self::new(Cursor::new(bytes))
  }
}

impl<R: Read + Seek> Nupkg<R> {
  pub fn new(archive: R) -> anyhow::Result<Self> {
    ZipArchive::new(archive)
      .context("Failed to extract NuGet package")
      .map(Self)
  }

  pub fn get_entry_bytes(&mut self, name: &str) -> anyhow::Result<Vec<u8>> {
    let entry = self
      .0
      .by_name(name)
      .with_context(|| format!("Failed to find entry with name `{name}`"))?;

    let mut bytes = Vec::new();
    let mut entry = BufReader::new(entry);

    entry
      .read_to_end(&mut bytes)
      .with_context(|| format!("Failed to read entry with name `{name}`"))?;

    Ok(bytes)
  }

  pub fn nuspec(&mut self) -> anyhow::Result<Nuspec> {
    Nuspec::from_archive(&mut self.0)
  }

  pub fn entries(&mut self) -> Vec<NupkgEntry> {
    let mut entries = Vec::with_capacity(self.0.len());

    for i in 0..self.0.len() {
      let entry = match self.0.by_index(i) {
        Ok(entry) => entry,
        Err(_) => continue,
      };

      let size = entry.size();
      let name = entry.name().to_string();

      entries.push(NupkgEntry { size, name });
    }

    entries
  }
}

#[derive(Serialize)]
pub struct NupkgEntry {
  size: u64,
  name: String,
}
