//globals
const todoList = document.getElementById("todo-list");
let todos = [];
let users = [];

// attach events

document.addEventListener("DOMContentLoaded", initApp);

//basic logic
function getUserName(userId) {
  const user = users.find((u) => u.id === userId);
  return user.name;
}

function printTodo({ id, userId, title, completed }) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.id = id;
  li.innerHTML = `<span>${title} by <b>${getUserName(userId)}</b></span>`;
  //add checkbox
  const status = document.createElement("input");
  status.type = "checkbox"; //type
  status.checked = completed;
  //add button close
  const close = document.createElement("span");
  close.innerHTML = "&times";
  close.className = "close";

  li.prepend(status);
  li.append(close);
  todoList.prepend(li);
}

//event logic
function initApp() {
  Promise.all([getAllTodos(), getAllUsers()]).then((values) => {
    [todos, users] = values;
    // send to markup
    todos.forEach((todo) => printTodo(todo));
  });
}

//async logic

async function getAllTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();

  return data;
}

async function getAllUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  return data;
}
