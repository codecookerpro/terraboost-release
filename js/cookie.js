window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cookie-modal-handle')?.click();
  document.getElementById('btn-accept-all')?.addEventListener('click', () => {
    const settings = document.querySelectorAll('#modal-cookie-setting .form-check-input');
    Array.from(settings).forEach(toggler => {
      toggler.checked = true;
    });
  });
});

