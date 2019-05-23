// init
let list = document.querySelector('#my-todo')
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']

// add 'Todo' title
let ulTodo = document.querySelector('#my-todo')
ulTodo.innerHTML += `
  <h5>Todo</h5>   
`
// add 'Done'
let ulDone = document.createElement('ul')
ulDone.setAttribute('id', "my-done")
ulDone.setAttribute('class', "list-unstyled")
ulDone.innerHTML = `
  <h5>Done</h5>
`
ulTodo.parentNode.appendChild(ulDone)

// add todos
for (let todo of todos) {
  addItem(todo)
}

function addItem(text) {
  let newItem = document.createElement('li')
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  list.appendChild(newItem)
}

// set button listener and set listener input text to #newTodo
const addBtn = document.querySelector('#addBtn')
addBtn.addEventListener('click', function () {
  let inputValue = document.querySelector('#newTodo').value
  if (inputValue !== '') {
    addItem(inputValue)
  }

})

// set press key 'Enter' witch can input text to #newTodo
const input = document.querySelector('#newTodo')
input.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    let inputValue = document.querySelector('#newTodo').value
    if (inputValue !== '') {
      addItem(inputValue)
    }
  }
})

// Delete
let deleteListener = document.querySelector('body')
deleteListener.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete')) {
    let li = event.target.parentElement
    li.remove()
  }
})

// Check
const myDone = document.querySelector('#my-done')
list.addEventListener('click', function (event) {
  if (event.target.tagName === 'LABEL') {
    event.target.classList.toggle('checked')
    let li = event.target.parentElement
    li.remove()
    myDone.appendChild(li)
  }
})



