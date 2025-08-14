const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return alert("Please enter a task!");

    const li = createTaskElement(taskText);
    taskList.appendChild(li);

    saveTask(taskText);
    taskInput.value = "";
}

function createTaskElement(text) {
    const li = document.createElement("li");
    li.textContent = text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.addEventListener("click", () => {
        li.remove();
        removeTask(text);
    });

    li.appendChild(delBtn);
    return li;
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });
}
