const setupMenu = () => {
  const toggle = document.querySelector('[data-toggle]')
  const menu = document.querySelector('[data-menu]')
  const toggleMenu = () => {
    menu.classList.toggle('sm-hide')
  }
  toggle.addEventListener('click', toggleMenu)
}

const setupForm = () => {
  const form = document.querySelector('[data-nanny-form]')
  if (form) {
    const fields = form.querySelectorAll('[data-field]')
    form.onsubmit = evt => {
      evt.preventDefault()
      screenResults(fields)
    }
  }
}

const screenResults = fields => {
  let dateOfBirth
  let satisfyCriteria = true
  fields.forEach(field => {
    const { value } = field
    if(field.value === '' || field.value === 'Select one') {
      satisfyCriteria = false
    }
    switch(field.dataset.field) {
      case 'date-of-birth':
        dateOfBirth = value
        const ageDiff = Date.now() - new Date(value).getTime()
        const age = Math.abs(new Date(ageDiff).getUTCFullYear() - 1970)
        if (age < 22) satisfyCriteria = false
        break
      case 'visa-status':
        if (value !== 'permanent') satisfyCriteria = false
        break
      case 'wwcc':
        if (value === 'will-not-get-wwcc') satisfyCriteria = false
        break
      case 'first-aid':
        if (value === 'will-not-get-first-aid') satisfyCriteria = false
        break
      case 'commited':
        if (value === 'no') satisfyCriteria = false
        break
    }
  })
  if (satisfyCriteria) {
    window.location.assign(`https://airtable.com/shreBpX2w5XcDiImt?prefill_Date%20of%20Birth=${dateOfBirth}`)
  } else {
    window.location.assign('/sorry')
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupMenu()
  setupForm()
})
