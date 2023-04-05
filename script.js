const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll("button[id^='filter-']");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks(filter = "all") {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        if (filter === "all" || (filter === "done" && task.done) || (filter === "undone" && !task.done)) {
            const li = document.createElement("li");
            li.style.textDecoration = task.done ? "line-through" : "none";
            li.style.backgroundColor = task.done ? "#a1d99b" : "";
            li.textContent = task.text;

            li.addEventListener("click", () => {
                task.done = !task.done;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                displayTasks(filter);
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Usuń";
            deleteButton.addEventListener("click", (e) => {
                e.stopPropagation();
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                displayTasks(filter);
            });

            li.appendChild(deleteButton);
            taskList.appendChild(li);
        }
    });
}

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = { text: taskInput.value, done: false };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    displayTasks();
});

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.id.split("-")[1];
        displayTasks(filter);
    });
});

displayTasks();