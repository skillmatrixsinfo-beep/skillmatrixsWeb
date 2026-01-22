async function loadPartial(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const res = await fetch(file);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error(`Failed to load ${file}`, err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadPartial('site-header', '/partials/header.html');
  loadPartial('site-footer', '/partials/footer.html');
  loadPartial('site-enrollment', '/partials/enroollment.html');
});
