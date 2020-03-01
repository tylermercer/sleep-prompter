import "webextension-polyfill";

const version = browser.runtime.getManifest().version;

console.log("Focus Tools Logging", version);