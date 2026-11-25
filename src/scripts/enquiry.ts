// Enquiry form: accessible validation and Formspree submission without leaving the page.
// Without JavaScript the form still posts to Formspree normally.

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const form = document.querySelector<HTMLFormElement>('[data-enquiry]');

if (form) {
  form.noValidate = true;

  const endpoint = form.dataset.endpoint ?? '';
  const email = form.dataset.email ?? '';
  const status = form.querySelector<HTMLElement>('.form-status')!;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const buttonLabel = button.innerHTML;
  const success = document.querySelector<HTMLElement>('[data-enquiry-success]');
  const fields = Array.from(form.querySelectorAll<Field>('[required]'));

  const messageFor = (field: Field): string => {
    const value = field.value.trim();
    if (field.name === 'name' && !value) return 'Please tell me your name.';
    if (field.name === 'email') {
      if (!value) return 'Please enter your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please check your email address. It doesn’t look quite right.';
    }
    if (field.name === 'stage' && !value) return 'Please choose your child’s school year or stage.';
    return '';
  };

  const describedBy = (field: Field, errorId: string, showError: boolean) => {
    const ids = (field.getAttribute('aria-describedby') ?? '').split(/\s+/).filter((id) => id && id !== errorId);
    if (showError) ids.unshift(errorId);
    if (ids.length) field.setAttribute('aria-describedby', ids.join(' '));
    else field.removeAttribute('aria-describedby');
  };

  const validate = (field: Field): boolean => {
    const message = messageFor(field);
    const error = form.querySelector<HTMLElement>(`#${field.id}-error`);
    if (error) {
      error.textContent = message;
      error.hidden = !message;
      describedBy(field, error.id, Boolean(message));
    }
    field.setAttribute('aria-invalid', String(Boolean(message)));
    if (!message) field.removeAttribute('aria-invalid');
    return !message;
  };

  const setStatus = (message: string) => {
    status.textContent = message;
    status.hidden = !message;
    status.dataset.tone = 'error';
  };

  for (const field of fields) {
    field.addEventListener('blur', () => {
      if (field.value.trim()) validate(field);
    });
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validate(field);
    });
    field.addEventListener('change', () => {
      if (field.getAttribute('aria-invalid') === 'true') validate(field);
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus('');

    const invalid = fields.filter((field) => !validate(field));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    if (!endpoint) {
      setStatus(`This form isn’t connected yet. Please email ${email} instead.`);
      return;
    }

    button.disabled = true;
    button.textContent = 'Sending…';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        form.hidden = true;
        if (success) {
          success.hidden = false;
          success.focus();
        }
        return;
      }

      const data = (await response.json().catch(() => null)) as { errors?: { message: string }[] } | null;
      const detail = data?.errors?.map((e) => e.message.replace(/\.$/, '')).join('; ');
      setStatus(
        `Sorry, your message couldn’t be sent${detail ? ` (${detail})` : ''}. Please try again, or email ${email}.`,
      );
    } catch {
      setStatus(`Sorry, something went wrong. Please check your connection and try again, or email ${email}.`);
    } finally {
      button.disabled = false;
      button.innerHTML = buttonLabel;
    }
  });
}
