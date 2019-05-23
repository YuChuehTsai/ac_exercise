const form = document.forms[0]
const nameField = document.getElementById('name')
const photoField = document.getElementById('photo')
const introduceField = document.getElementById('introduce')
const theme = document.getElementById('choose-theme')
const passOrNot = document.getElementById('passOrNot')
const nameCard = document.getElementById('name-card')
const light = document.getElementById('light theme')
const dark = document.getElementById('dark theme')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  let name = nameField.value
  let introduce = introduceField.value
  let img = photoField.value
  let nameCard = document.getElementById('name-card')
  if (name.length > 0 && introduce.length > 0 && introduce.length < 200 && (light.checked || dark.checked)) {
    nameCard.innerHTML = `
      <h5>${name}</h5>
      <p class="rounded float-left pr-3">${introduce}</p>
      `
    //img
    if (img === '') {
      nameCard.innerHTML += `
        <img src="http://transparency.greatheartsacademies.org/wp-content/uploads/sites/38/2018/10/default-placeholder.png" class="rounded float-right pr-3" width="200px" height:"200px" >
    `
    } else {
      nameCard.innerHTML += `
      <img src="${img}" class="rounded float-right pr-3" width="200px" height:"200px" >
      `
    }

    // show Pass after summit
    passOrNot.innerHTML = `
      <p class="text-success">Pass</P>
    `
    chooseTheme()


  } else {
    // feedback
    if (name.length === 0) {
      let namefeedbackDiv = nameField.nextElementSibling
      namefeedbackDiv.innerHTML = 'Please enter your name!'
      namefeedbackDiv.classList.add('text-danger')
    }
    if (introduce.length === 0) {
      let introducefeedbackDiv = introduceField.nextElementSibling
      introducefeedbackDiv.innerHTML = 'Please choose the theme!'
      introducefeedbackDiv.classList.add('text-danger')
    }
    if (!light.checked && !dark.checked) {
      theme.lastElementChild.innerHTML = 'Please choose the theme!'
      theme.lastElementChild.classList.add('text-danger')
    }

    // show No pass after summit
    passOrNot.innerHTML = `
      <p class="text-danger">No pass</P>
    `
  }
})


introduceField.addEventListener('input', function (event) {
  let count = event.target.value.length
  let feedbackDiv = introduceField.nextElementSibling
  if (count > 0) {
    feedbackDiv.innerHTML = `Remain ${200 - count} words.`
    feedbackDiv.classList.add('text-success')
    feedbackDiv.classList.replace('text-danger', 'text-success')
  }
  if (count > 200) {
    feedbackDiv.innerHTML = `Over 200 words.`
    feedbackDiv.classList.add('text-danger')
  }
})


function chooseTheme() {
  if (light.checked === true) {
    nameCard.classList.remove('bg-light', 'text-dark', 'bg-dark', 'text-white')
    nameCard.classList.add('bg-light', 'text-dark')
  }

  if (dark.checked === true) {
    nameCard.classList.remove('bg-light', 'text-dark', 'bg-dark', 'text-white')
    nameCard.classList.add('bg-dark', 'text-white')
  }
}
