// Contact form: validate in the browser, then POST to the Flask backend.
const form = document.getElementById('contact-form'), status = document.getElementById('form-status');
const API = 'http://127.0.0.1:5000/api/contact';
const rules = {
  name: v => v.trim().length >= 2 || 'Enter your name (2 characters or more).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address.',
  subject: v => v.trim().length >= 3 || 'Enter a subject (3 characters or more).',
  message: v => v.trim().length >= 10 || 'Write a message of at least 10 characters.'
};
const validate = () => {
  let ok = true;
  for (const f in rules) {
    const r = rules[f](form[f].value);
    form.querySelector(`[data-for="${f}"]`).textContent = r === true ? '' : r;
    form[f].setAttribute('aria-invalid', r !== true);
    if (r !== true) ok = false;
  }
  return ok;
};
form.addEventListener('submit', async e => {
  e.preventDefault(); status.textContent = '';
  if (!validate()) return;
  try {
    const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))) });
    if (!res.ok) throw new Error((await res.json()).error || 'Request failed');
    status.textContent = 'Message sent. Thank you!'; form.reset();
  } catch (err) {
    status.textContent = 'Could not send. Start the Flask server (see README). ' + err.message;
  }
});
