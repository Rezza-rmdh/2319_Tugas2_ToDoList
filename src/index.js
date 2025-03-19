let todos = [];
let index = 0;

const submitButton = document.getElementById("submitTodo");

submitButton.addEventListener("click", () => {
  const inputan = document.getElementById("inputTodo");
  const containerTodos = document.getElementById("containerTodos");

  todos.push(inputan.value);

  containerTodos.innerHTML += `
    <div class="todo">
      <h3>${index + 1}</h3>
      <div class="">
        <p id="todo-${index}">${inputan.value}</p>
      </div>
      <button onclick="editTodo(${index})">Edit</button>
      <button onclick="deleteTodo(${index})">Delete</button>
    </div>
    <div>
      
    </div>
    `;

  index += 1;

  inputan.value = "";
});

function editTodo(i) {
  const newTodo = prompt("Edit your todo: ", todos[i]);
  if (newTodo != null && newTodo != "") {
    todos[i] = newTodo;
    document.getElementById(`todo-${i}`).textContent = newTodo;
  }
}

function deleteTodo(i) {
  todos.splice(i, 1);
  document.getElementById(`todo-${i}`).remove();
  index = index - 1;

  const containerTodos = document.getElementById("containerTodos");

  containerTodos.innerHTML = "";
  todos.forEach((todo, index) => {
    containerTodos.innerHTML += `
      <div class="todo">
        <h3>${index + 1}</h3>
        <p id="todo-${index}">${todo}</p>
      </div>
      <div>
        <button onclick="editTodo(${index})">Edit</button>
        <button onclick="deleteTodo(${index})">Delete</button>      
      </div>
      `;
  });
}