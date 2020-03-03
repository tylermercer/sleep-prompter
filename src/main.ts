import "webextension-polyfill";

import images from './images';
import filters from './filters';

const PROPORTION_FILTERED = 0.3;

var target: number, leadUp: number, likelihood: number;

const getFilters = (offset: number) => {
  return Math.random() > (1 - PROPORTION_FILTERED) ? filters[offset % filters.length] : "";
};

const update = () => {
  const elements = document.getElementsByTagName("img");

  const imageOffset: number = Math.round(Math.random() * images.length);
  const filterOffset: number = Math.round(Math.random() * images.length);

  for (let i = 0; i < elements.length; i++) {
    let el = elements[i];
    if (el.hasAttribute("yawning")) continue;
    if (Math.random() < likelihood) {
      el.src = images[(imageOffset + i) % images.length];
      el.style.objectFit = "cover";
      el.style.filter = getFilters(filterOffset + i);
    }
    el.setAttribute("yawning", "true");
  }
};

const registerObserver = () => {
  const observer = new MutationObserver((_, __) => update());

  observer.observe(document.getRootNode(), {
    childList: true,
    subtree: true,
  });
};

const restoreOptions = async () => {
  return Promise.all([
    browser.storage.sync.get('bedtime'),
    browser.storage.sync.get('leadUp')
  ]).then(([bedtimeItem, leadUpItem]) => {
    let [hours, minutes] = (bedtimeItem.bedtime as string).split(":").map(v => parseInt(v));
    target = hours * 60 + minutes;
    leadUp = parseInt(leadUpItem.leadUp as string);
  });
};

const computeLikelihood = () => {
  let time = new Date();
  let currentHours = time.getHours();
  let current = time.getMinutes() + currentHours * 60;
  //TODO: handle when current passes target
  likelihood = Math.max(1 - (target - current) / leadUp, 0);
};

restoreOptions()
  .then(() => computeLikelihood())
  .then(() => {
    if (likelihood > 0) {
      registerObserver();
      update();
    }
  });
