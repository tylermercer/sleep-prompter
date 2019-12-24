import "webextension-polyfill";

const version = browser.runtime.getManifest().version;

console.log(version);