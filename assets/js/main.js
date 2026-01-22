/* =========================================================
   External libraries must still be loaded via CDN in HTML:
   - Bootstrap bundle
   - AOS
========================================================= */

/* =========================
   Copy UPI ID
========================= */
document.addEventListener('DOMContentLoaded', function () {
  const copyBtn = document.getElementById("copyUpiBtn");

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      const upiId = "rajashekar130890@okhdfcbank";

      navigator.clipboard.writeText(upiId).then(() => {
        this.innerHTML = '<i class="bi bi-check2-circle"></i> Copied!';
        this.classList.remove("btn-primary");
        this.classList.add("btn-success");

        setTimeout(() => {
          this.innerHTML = '<i class="bi bi-clipboard-check"></i> Copy UPI ID';
          this.classList.remove("btn-success");
          this.classList.add("btn-primary");
        }, 1800);
      });
    });
  }
});

/* =========================
   Mobile Social Toggle
========================= */
(function () {
  const toggler = document.querySelector('.social-toggler');
  const social = document.getElementById('topSocialCollapse');

  if (!toggler || !social) return;

  function hideMobileSocial() {
    social.classList.remove('show-mobile');
  }

  function showMobileSocial() {
    social.classList.add('show-mobile');
  }

  toggler.addEventListener('click', function () {
    const expanded = social.classList.contains('show-mobile');
    expanded ? hideMobileSocial() : showMobileSocial();
    toggler.setAttribute('aria-expanded', String(!expanded));
  });

  document.addEventListener('click', function (e) {
    if (!toggler.contains(e.target) && !social.contains(e.target)) {
      hideMobileSocial();
      toggler.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* =========================
   AOS Init + Copyright
========================= */
document.addEventListener('DOMContentLoaded', function () {
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80
    });
  }

  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

/* =========================
   Enrollment – Google Form
========================= */
(function () {
  const GOOGLE_FORM_ACTION_URL =
    'https://docs.google.com/forms/d/1Hq5s5nrmX183almUVDXbcL3BryyD_ns_0DBIt43xHI8/formResponse';

  const hiddenInputNames = {
    name: 'entry.305043635',
    email: 'entry.30963158',
    phone: 'entry.1779613681',
    course: 'entry.1975199676',
    message: 'entry.1857958191'
  };

  const enrollForm = document.getElementById('enrollForm');
  if (!enrollForm) return;

  const googleFieldsContainer = document.getElementById('googleFormFieldsContainer');
  const enrollAlert = document.getElementById('enrollAlert');
  const submitBtn = document.getElementById('submitEnrollBtn');

  enrollForm.action = GOOGLE_FORM_ACTION_URL;

  function createHiddenInputs() {
    googleFieldsContainer.innerHTML = '';
    Object.keys(hiddenInputNames).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = hiddenInputNames[key];
      input.id = 'gf_' + key;
      googleFieldsContainer.appendChild(input);
    });
  }
  createHiddenInputs();

  enrollForm.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();

    enrollAlert.classList.add('d-none');
    enrollAlert.classList.remove('alert-success', 'alert-danger');

    if (!enrollForm.checkValidity()) {
      enrollForm.classList.add('was-validated');
      return;
    }

    const values = {
      name: document.getElementById('studentName').value.trim(),
      email: document.getElementById('studentEmail').value.trim(),
      phone: document.getElementById('studentPhone').value.trim(),
      course: document.getElementById('studentCourse').value,
      message: document.getElementById('studentMessage').value.trim()
    };

    Object.keys(values).forEach(key => {
      const hidden = document.getElementById('gf_' + key);
      if (hidden) hidden.value = values[key];
    });

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Submitting...';

    enrollForm.submit();

    setTimeout(() => {
      enrollAlert.classList.remove('d-none');
      enrollAlert.classList.add('alert-success');
      enrollAlert.innerHTML =
        'Thank you! Your enrollment request has been submitted. We will contact you soon.';

      enrollForm.reset();
      enrollForm.classList.remove('was-validated');
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Submit Enrollment';

      setTimeout(() => {
        const modalEl = document.getElementById('enrollModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }, 900);
    }, 900);
  });
})();

/* =========================
   AOS Fallback
========================= */
(function () {
  if (window.AOS) return;

  const elems = document.querySelectorAll('[data-aos]');
  elems.forEach(el => el.classList.add('aos-fallback'));

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elems.forEach(e => obs.observe(e));
  } else {
    elems.forEach(e => e.classList.add('in-view'));
  }
})();

/* =========================
   Copy / Paste Deterrent
========================= */
(function () {
  const isMac = navigator.platform.toUpperCase().includes('MAC');
  const modKey = isMac ? 'metaKey' : 'ctrlKey';

  const style = document.createElement('style');
  style.id = 'no-select-style';
  style.innerHTML = `
    body *:not(input):not(textarea):not([contenteditable="true"]) {
      user-select: none !important;
      cursor: default;
    }
    input, textarea, [contenteditable="true"] {
      user-select: text !important;
    }
  `;
  document.head.appendChild(style);

  function isEditableTarget(el) {
    return el &&
      (el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.isContentEditable ||
        el.closest('[data-allow-copy]'));
  }

  document.addEventListener('contextmenu', e => {
    if (!isEditableTarget(e.target)) e.preventDefault();
  });

  document.addEventListener('keydown', e => {
    if (isEditableTarget(e.target)) return;

    if (e[modKey]) {
      const blocked = ['c', 'x', 'v', 'a', 'u', 's'];
      if (blocked.includes(e.key.toLowerCase())) e.preventDefault();
      if (e.shiftKey && e.key.toLowerCase() === 'i') e.preventDefault();
    }
    if (e.key === 'F12') e.preventDefault();
  }, true);
})();

