pub mod netease;

use serde::{Deserialize, Serialize};

#[derive(Debug)]
#[derive(Serialize)]
pub struct FormatParams {
    pub url: String,
    pub headers: Vec<(String, String)>,
    pub body: String,
    pub method: String,
}

#[derive(Debug)]
#[derive(Deserialize)]
pub struct Options<'a> {
    pub method: &'a str,
    pub url: &'a str,
    pub params: Vec<(&'a str, &'a str)>,
    pub cookie: &'a str,
}