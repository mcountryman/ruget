pub mod nuget;

use nuget::{nuspec::Nuspec, Nupkg, NupkgEntry};
use serde::Serialize;
use std::panic;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn set_hook() {
  panic::set_hook(Box::new(console_error_panic_hook::hook));
}

#[derive(Serialize)]
struct Metadata {
  nuspec: Nuspec,
  entries: Vec<NupkgEntry>,
}

#[wasm_bindgen]
pub fn get_metadata(bytes: &[u8]) -> Result<JsValue, JsValue> {
  let mut nupkg = Nupkg::from_bytes(bytes).unwrap();
  let nuspec = nupkg.nuspec().unwrap();
  let entries = nupkg.entries();

  Ok(serde_wasm_bindgen::to_value(&Metadata { nuspec, entries }).unwrap())
}

#[wasm_bindgen]
pub fn get_entry(bytes: &[u8], name: &str) -> Result<Vec<u8>, JsValue> {
  let mut nupkg = Nupkg::from_bytes(bytes).unwrap();

  Ok(nupkg.get_entry_bytes(name).unwrap())
}

#[wasm_bindgen]
pub fn get_analysis(bytes: &[u8], target_framework: &str) -> Result<JsValue, JsValue> {
  todo!()
}
