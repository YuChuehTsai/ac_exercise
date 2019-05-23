//S4 A8 Q1
let players = [
  { name: '櫻木花道', pts: 0, reb: 0, ast: 0, stl: 0, blk: 2 },
  { name: '流川楓', pts: 30, reb: 6, ast: 3, stl: 3, blk: 0 },
  { name: '赤木剛憲', pts: 16, reb: 10, ast: 0, stl: 0, blk: 5 },
  { name: '宮城良田', pts: 6, reb: 0, ast: 7, stl: 6, blk: 0 },
  { name: '三井壽', pts: 21, reb: 4, ast: 3, stl: 0, blk: 0 }
]

const dataPanel = document.querySelector('#data-panel')


function displayPlayerList(players) {
  // put data and icons to the panel
  function addRow(obj) {
    const row = document.createElement('tr')
    dataPanel.appendChild(row)
    for (let prop in obj) {
      if (prop === 'name') {
        row.innerHTML += `<td>${obj[prop]}</td>`
      }
      else {
        row.innerHTML += `
        <td>
        <span>${obj[prop]}</span>
        <span class="plus fa fa-plus-circle"></span>
        <span class="minus fa fa-minus-circle"></span>
        </td>
        `
      }

    }
    return row
  }
  for (i = 0; i < players.length; i++) {
    addRow(players[i])
  }
}
displayPlayerList(players)

//addEventListener
dataPanel.addEventListener('click', plus)
function plus(event) {
  if (event.target.classList.contains('plus')) {
    let score = Number(event.target.previousElementSibling.innerHTML)
    score += 1
    event.target.previousElementSibling.innerHTML = score
  }
  else if (event.target.classList.contains('minus')) {
    let score = Number(event.target.previousElementSibling.previousElementSibling.innerHTML)
    if (score !== 0) {
      score -= 1
      event.target.previousElementSibling.previousElementSibling.innerHTML = score
    }
  }
}