import "webextension-polyfill";

import images from './images';

const update = () => {
  const elements = document.getElementsByTagName("img");

  const startOffset: number = Math.round(Math.random() * images.length);

  console.log("Offset: " + startOffset);

  const likelihood = 0.5;

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].hasAttribute("yawning") || Math.random() > likelihood) continue;
    elements[i].src = images[(startOffset + i) % images.length];
    elements[i].setAttribute("style", "object-fit: cover;");
    elements[i].setAttribute("yawning", "true");
  }
};

const observer = new MutationObserver((mutationsList, observer) => {
  update();
});

observer.observe(document.getRootNode(), {
  childList: true,
  subtree: true,
});

update();

console.log("Foobar");
