/* Vegas Haul Co. — small progressive enhancements. No dependencies. */
(function () {
  'use strict';

  // Current year in the footer
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Dismiss the preview notice
  var flag = document.getElementById('previewFlag');
  if (flag) {
    var x = flag.querySelector('[data-dismiss]');
    if (x) x.addEventListener('click', function () { flag.classList.add('hide'); });
  }

  // Reveal sections as they scroll in
  var targets = document.querySelectorAll('.sec-head, .svc, .about-copy, .about-media, .contact-info, .form-card');
  if ('IntersectionObserver' in window && targets.length) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('inview'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  }

  /* Contact form.
     DEMO MODE: no endpoint is wired yet. Once the client picks an inbox we
     point ENDPOINT at the form handler (Web3Forms / Netlify Forms) and this
     posts for real — the markup and validation below do not change. */
  var ENDPOINT = null;

  var form = document.getElementById('quoteForm');
  var note = document.getElementById('formNote');
  if (!form || !note) return;

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    var name = form.elements.name.value.trim();
    var phone = form.elements.phone.value.trim();
    if (!name || !phone) {
      note.textContent = 'Please add your name and a phone number so we can call you back.';
      note.classList.remove('ok');
      return;
    }

    if (!ENDPOINT) {
      note.textContent = 'Thanks ' + name + ' — in the live version this lands in your inbox within seconds. (Demo mode: nothing was sent.)';
      note.classList.add('ok');
      return;
    }

    var btn = form.querySelector('button[type=submit]');
    btn.disabled = true;
    note.textContent = 'Sending…';
    note.classList.remove('ok');

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      form.reset();
      note.textContent = 'Got it — we’ll call you back shortly.';
      note.classList.add('ok');
    }).catch(function () {
      note.textContent = 'Something went wrong. Please call us at (702) 000-0000.';
      note.classList.remove('ok');
    }).then(function () {
      btn.disabled = false;
    });
  });
})();
