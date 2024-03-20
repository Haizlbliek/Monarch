const status = document.getElementById('status');

const saveOptions = () => {
  const theme = document.getElementById('theme').value;

  chrome.storage.sync.set(
    {theme},
    () => {
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    }
  );
};

const restoreOptions = () => {
  chrome.storage.sync.get(
    { theme: "cosmos" },
    (items) => {
      document.getElementById('theme').value = items.theme;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);