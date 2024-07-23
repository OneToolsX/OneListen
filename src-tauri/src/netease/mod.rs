mod crypto;
mod macros;
mod music_api;
mod request;

use serde::{Deserialize, Serialize};

#[derive(Debug)]
#[derive(Serialize)]
pub struct FormatParams {
    url: String,
    headers: Vec<(String, String)>,
    body: String,
    method: String,
}

#[derive(Debug)]
#[derive(Deserialize)]
pub struct Options<'a> {
    method: &'a str,
    url: &'a str,
    params: Vec<(&'a str, &'a str)>,
    cookie: &'a str,
}