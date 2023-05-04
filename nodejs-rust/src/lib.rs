#![deny(clippy::all)]
use reqwest::header::{AUTHORIZATION, CONTENT_TYPE};

#[macro_use]
extern crate napi_derive;

#[napi]
pub fn sum(a: i32, b: i32) -> i32 {
  a + b
}

#[napi]
pub async fn call_secret_api(key: String, org: String) -> String {
  let client = reqwest::Client::new();
  let resp = client
    .get(format!("https://api.github.com/orgs/{}/repos", org))
    .header(CONTENT_TYPE, "application/json")
    .header(AUTHORIZATION, format!("Bearer {}", key))
    .header("User-Agent", "nodejs-rust")
    .send()
    .await
    .unwrap()
    .text()
    .await
    .unwrap();
  resp
}
