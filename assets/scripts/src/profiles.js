const AIRTABLE_KEY = 'keywcoHiGZUHcYyaO'
const profiles = document.getElementById('profiles')

if (profiles) {
  fetch(`https://api.airtable.com/v0/appJv6x50plgdZjnP/Nannies?api_key=${AIRTABLE_KEY}&maxRecords=3&view=Current%20available%20nannies`)
    .then(resp => resp.json())
    .then(response => {
      const profilesMarkup = response.records.map(nanny => (
        `
          <div class="col-4 sm-col-14 sm-mb-4">
            <div class="overflow-hidden mb-3 sm-flex">
              <div class="col col-5">
                <div class="col-12 circle bg-cover bg-center" style="background-image: url(${nanny.fields['Profile photo'][nanny.fields['Profile photo'].length - 1].thumbnails.large.url})"></div>
              </div>
              <div class="col col-9 f3 sm-f2 sm-my-auto">
                <div class="bold mt-1">${nanny.fields['Name'].split(' ')[0]}</div>
                <div class="feature">${nanny.fields['Location']}</div>
                <div>Available ${nanny.fields['Available to start']}</div>
              </div>
            </div>
            <div class="f3 sm-f2">${nanny.fields['Blurb']}</div>
          </div>
        `  
      )).join('')
      profiles.innerHTML = `
      <div class="py-5 sm-py-4 mx-auto col-12 lg-col-10 flex sm-block justify-between">
        ${profilesMarkup}
      </div>
      `
    })
}
