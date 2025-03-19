let todos = [];
let index = 0;

const submitButton = document.getElementById("submitTodo");

document.getElementById("inputTodo").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

submitButton.addEventListener("click", () => {
  addTodo();
});

function addTodo() {
  const inputan = document.getElementById("inputTodo");
  const containerTodos = document.getElementById("containerTodos");

  if (inputan.value.trim() === "") {
    alert("Todo tidak boleh kosong!"); // Validasi untuk mencegah todo kosong
    return;
  }

  todos.push(inputan.value);

  containerTodos.innerHTML += `
    <div class="todo">
      <h3>${index + 1}</h3>
      <div id="output" class="output">
        <p id="todo-${index}" class="todoText">${inputan.value}</p>
      </div>
      <button onclick="editTodo(${index})">Edit</button>
      <button onclick="deleteTodo(${index})">Delete</button>
    </div>
    `;

  index += 1;

  inputan.value = ""; // Kosongkan input setelah submit
}


document.getElementById("containerTodos").addEventListener("dblclick", (event) => {
  if (event.target.classList.contains("todoText")) {
    const todoIndex = parseInt(event.target.id.split("-")[1], 10);
    editTodo(todoIndex);
  }
});

function editTodo(i) {
  const taskElement = document.getElementById(`todo-${i}`);
  
  if (taskElement) {
    const currentValue = todos[i];
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentValue;
    input.classList.add("edit-input");
    
    // Ganti elemen <p> dengan elemen input
    taskElement.replaceWith(input);

    input.addEventListener("blur", () => {
      const updatedValue = input.value.trim();

      if (updatedValue !== "") {
        todos[i] = updatedValue;

        // Buat ulang elemen <p>
        const updatedTaskElement = document.createElement("p");
        updatedTaskElement.id = `todo-${i}`;
        updatedTaskElement.classList.add("todoText");
        updatedTaskElement.textContent = updatedValue;
        
        // Ganti kembali <input> dengan elemen <p>
        input.replaceWith(updatedTaskElement);
      } else {
        // Jika kosong, kembalikan ke elemen awal
        input.replaceWith(taskElement);
      }
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        input.blur(); // Simpan perubahan saat tombol Enter ditekan
      }
    });

    input.focus(); // Otomatis fokus ke input
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
        <div class="output">
          <p id="todo-${index}">${todo}</p>
        </div>
        <button onclick="editTodo(${index})">Edit</button>
        <button onclick="deleteTodo(${index})">Delete</button> 
      </div>
      `;
  });
}