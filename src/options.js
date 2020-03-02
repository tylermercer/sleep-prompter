function saveOptions(e) {
  browser.storage.sync.set({
    likelihood: document.getElementById("likelihood").value
  });
  e.preventDefault();
}

function restoreOptions() {
  var gettingItem = browser.storage.sync.get('likelihood');
  gettingItem.then((res) => {
    document.getElementById("likelihood").value = res.likelihood || 0;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById("save-btn").addEventListener("click", saveOptions);
