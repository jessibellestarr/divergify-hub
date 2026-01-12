const yearEl = document.getElementById('y');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const tinToggle = document.getElementById('tin');
const notifyForm = document.getElementById('notify-form');
const tinOffline = document.getElementById('tin-offline');

if (tinToggle && notifyForm && tinOffline) {
  const syncState = () => {
    const on = tinToggle.checked;
    notifyForm.classList.toggle('hidden', on);
    tinOffline.classList.toggle('hidden', !on);
  };
  tinToggle.addEventListener('change', syncState);
  syncState();
}
