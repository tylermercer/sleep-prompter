function saveOptions(e: Event) {
  let bedtime = (document.getElementById("bedtime") as any || {}).value;
  let leadUp = (document.getElementById("lead-up") as any || {}).value;
  browser.storage.sync.set({
    bedtime, leadUp
  });
  e.preventDefault();
}

function restoreOptions() {
  var bedtimeItem = browser.storage.sync.get('bedtime');
  bedtimeItem.then((res) => {
    document.getElementById("bedtime")?.setAttribute("value", (res.bedtime || "11:59") as string);
  });
  var leadUpItem = browser.storage.sync.get('leadUp');
  leadUpItem.then((res) => {
    document.getElementById("lead-up")?.setAttribute("value", (res.leadUp || "0") as string);
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById("save-btn")?.addEventListener("click", saveOptions);
