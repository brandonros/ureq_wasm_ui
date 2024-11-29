use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen::JsValue;

#[wasm_bindgen(start)]
pub fn start() -> Result<(), JsValue> {
    console_log::init_with_level(log::Level::Debug).expect("error initializing log");
    std::panic::set_hook(Box::new(console_error_panic_hook::hook));
    Ok(())
}

#[wasm_bindgen(js_name = "ureqTest")]
pub fn ureq_test() -> Result<String, JsValue> {
    match ureq::get("http://google.com").call() {
        Ok(mut response) => {
            let body = response.body_mut().read_to_string()
                .map_err(|e| JsValue::from_str(&e.to_string()))?;
            Ok(body)
        },
        Err(e) => {
            log::error!("Request failed with error: {:?}", e);
            Err(JsValue::from_str(&format!("Request failed: {:#?}", e)))
        }
    }
}
