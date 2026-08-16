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
    todoList.classList = 'flex flex-col gap-4'

    let li = document.createElement("li");
    todoList.appendChild(li);
    li.classList = 'flex border rounded-lg p-4 items-center gap-4'
    
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.classList = 'w-4 h-4'
    li.appendChild(checkbox);

    let p = document.createElement('p')
    p.textContent = todo.text
    li.appendChild(p)

    checkbox.addEventListener("change", () => {
      todo.completed = !todo.completed;
      render();
      localStorage.setItem("todos", JSON.stringify(todos));
    });

    if (todo.completed === true) {
      p.classList = 'line-through text-gray-600'
    } else {
      p.classList = 'no-underline'
    }

    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    li.appendChild(delBtn);
    delBtn.classList = 'ml-auto hover:text-red-700 cursor-pointer'

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
