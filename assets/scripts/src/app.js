import profiles from './profiles';

const setupMenu = () => {
  const toggle = document.querySelector('[data-toggle]');
  const menu = document.querySelector('[data-menu]');
  const toggleMenu = () => {
    menu.classList.toggle('sm-hide');
  };
  toggle.addEventListener('click', toggleMenu);
};

const setupForm = () => {
  const form = document.querySelector('[data-nanny-form]');
  if (form) {
    const fields = form.querySelectorAll('[data-field]');
    Array.from(fields).map(field => {
      field.addEventListener('change', () => {
        renderErrorText('');
      });
    });
    form.onsubmit = evt => {
      evt.preventDefault();
      if (fieldsValid(fields)) {
        screenResults(fields);
      } else {
        renderErrorText('Please answer all the questions');
      }
    };
  }
};

const fieldsValid = fields => {
  return Array.from(fields).reduce((valid, field) => {
    return field.value === 'Select one' ? false : valid;
  }, true);
};

const renderErrorText = text => {
  const errorContainer = document.querySelector('[data-error]');
  errorContainer.innerText = text;
};

const screenResults = fields => {
  let satisfyCriteria = true;
  fields.forEach(field => {
    const { value } = field;
    if (field.value === '' || field.value === 'Select one') {
      satisfyCriteria = false;
    }
    switch (field.dataset.field) {
      case 'experience':
        if (value === 'no-experience') satisfyCriteria = false;
        break;
      case 'visa-status':
        if (value !== 'permanent') satisfyCriteria = false;
        break;
      case 'wwcc':
        if (value === 'will-not-get-wwcc') satisfyCriteria = false;
        break;
      case 'first-aid':
        if (value === 'will-not-get-first-aid') satisfyCriteria = false;
        break;
      case 'commited':
        if (value === 'no') satisfyCriteria = false;
        break;
    }
  });
  if (satisfyCriteria) {
    window.location.assign(`https://airtable.com/shreBpX2w5XcDiImt`);
  } else {
    window.location.assign('/sorry');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  setupMenu();
  setupForm();
});
