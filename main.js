form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const btn  = form.querySelector('button[type="submit"]');
  const span = btn.querySelector('span');
  const original = span.textContent;

  // Validação
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim()) {
      valid = false;
      field.style.borderColor = '#c0392b';
      field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
    }
  });
  if (!valid) { shakeForm(form); return; }

  btn.disabled = true;
  span.textContent = 'Sending…';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      span.textContent = '✓ Request Sent!';
      btn.style.background = '#27ae60';
      btn.style.borderColor = '#27ae60';
      form.reset();
      setTimeout(() => {
        span.textContent = original;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 4000);
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    span.textContent = 'Error — try again';
    btn.style.background = '#c0392b';
    setTimeout(() => {
      span.textContent = original;
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  }
});