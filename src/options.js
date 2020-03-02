function saveOptions(e) {
  browser.storage.sync.set({
    bedtime: document.getElementById("bedtime").value,
    leadUp: document.getElementById("lead-up").value,
  });
  e.preventDefault();
}

function restoreOptions() {
  var bedtimeItem = browser.storage.sync.get('bedtime');
  bedtimeItem.then((res) => {
    document.getElementById("bedtime").value = res.bedtime || 0;
  });
  var leadUpItem = browser.storage.sync.get('leadUp');
  leadUpItem.then((res) => {
    document.getElementById("lead-up").value = res.leadUp || 0;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById("save-btn").addEventListener("click", saveOptions);
