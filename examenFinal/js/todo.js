var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

const todos = document.querySelectorAll("input[type=checkbox]");
const todoList = $('#todo-list');

function loadTodos() {
  $.ajax({
    url: 'http://localhost:3000/todos',
    url: 'https://damp-retreat-34379.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      data.forEach(datum => addTodo(datum));
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()

$(todos).click = function (todo) {
  console.log(todo);
  debugger;
}

const input = document.querySelector("input[name=newitem]");
const ENTER = 13;

input.addEventListener('keypress', function (event) {
  if (event.charCode === ENTER) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'http://localhost:3000/todos',
      url: 'https://damp-retreat-34379.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        //after being added in the back end, add it to the todo list html
        addTodo(data)
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
})

function addTodo({_id, description, completed }) {
  const newLi = $(
    `<li>
      <input type="checkbox" name="todo" value="${_id}">
      <span>${description}</span>
    </li>`
  );

  newLi.prop('checked', completed);

  todoList.append(newLi);
}




$('#log-out').on('click', function(){

  $.ajax({
    url: 'https://damp-retreat-34379.herokuapp.com/logout',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    // data: json_to_send,
    success: function(data){
      // borrar token en localstorage o cookie
      localStorage.setItem('token', '')
      window.location = './index.html'
    },
    error: function(error_msg) {
      window.location = './index.html'
    }
  })
})
