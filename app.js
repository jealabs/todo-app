const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const todoButtonAdd = document.getElementById("todo-button-add");

const all = document.getElementById("all");
const active = document.getElementById("active");
const completed = document.getElementById("completed");

let todos = [];
let currentAll = "All";

// RENDER FUNCTION

function render() {
  todoList.innerHTML = "";

  const filtered = todos.filter((todo) => {
    if (currentAll === "All") return true;
    if (currentAll === "Active") return todo.completed === false;
    if (currentAll === "Completed") return todo.completed === true;
  });

  filtered.forEach((todo) => {
    let li = document.createElement("li");
    li.textContent = todo.text;
    todoList.appendChild(li);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    li.appendChild(checkbox);
    if (todo.completed === true) {
      li.style.textDecoration = "line-through";
    } else {
      li.style.textDecoration = "none";
    }

    checkbox.addEventListener("change", () => {
      todo.completed = !todo.completed;
      render();
      localStorage.setItem("todos", JSON.stringify(todos));
    });

    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    li.appendChild(delBtn);

    delBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      render();
      localStorage.setItem("todos", JSON.stringify(todos));
    });
  });
}

// FILTER TODOS

all.addEventListener("click", (e) => {
  e.preventDefault();
  currentAll = "All";
  render();
});
active.addEventListener("click", (e) => {
  e.preventDefault();
  currentAll = "Active";
  render();
});
completed.addEventListener("click", (e) => {
  e.preventDefault();
  currentAll = "Completed";
  render();
});

// ADD BUTTON TODOS

todoButtonAdd.addEventListener("click", (e) => {
  e.preventDefault();

  todos.push({
    id: Date.now(),
    text: todoInput.value,
    completed: false,
  });

  todoInput.value = "";
  render();
  localStorage.setItem("todos", JSON.stringify(todos));
});

// LOAD TODOS FROM LOCALSTORAGE

const saved = localStorage.getItem("todos");
if (saved) {
  todos = JSON.parse(saved);
  render();
}
