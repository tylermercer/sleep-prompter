import "webextension-polyfill";

import images from './images';
import filters from './filters';

const getFilters = (offset: number) => {
  return Math.random() > 0.7 ? "filter: " + filters[offset % filters.length] + ";" : "";
};

const update = () => {
  const elements = document.getElementsByTagName("img");

  const imageOffset: number = Math.round(Math.random() * images.length);
  const filterOffset: number = Math.round(Math.random() * images.length);

  console.log("Offset: " + imageOffset);

  const likelihood = 1; //TODO: compute likelihood based on time of day

  for (let i = 0; i < elements.length; i++) {
    let el = elements[i];
    if (el.hasAttribute("yawning")) continue;
    if (Math.random() < likelihood) {
      el.src = images[(imageOffset + i) % images.length];
      el.setAttribute("style", "object-fit: cover;" + getFilters(filterOffset + i));
    }
    el.setAttribute("yawning", "true");
  }
};

const observer = new MutationObserver((_, __) => update());

observer.observe(document.getRootNode(), {
  childList: true,
  subtree: true,
});

update();

console.log("Foobar");
