import "webextension-polyfill";

import images from './images';

const version = browser.runtime.getManifest().version;

console.log("Sleep Prompter foo", version, images);
