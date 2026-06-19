let taskCount = 0;

function addTask() {

    let taskText = document.getElementById("taskInput").value;

    if (taskText == "") return;

    taskCount++;

    let newTask = document.createElement("div");

    newTask.className = "task";
    newTask.id = "item" + taskCount;
    newTask.draggable = true;
    newTask.ondragstart = drag;

    newTask.innerHTML =
    `<p>${taskText}</p>
     <button onclick="editTask(this)">Update</button>
     <button onclick="deleteTask(this)">Remove</button>`;

    document.getElementById("todo").appendChild(newTask);

    document.getElementById("taskInput").value = "";

    saveData();
}

function editTask(button) {

    let paragraph = button.parentElement.querySelector("p");

    let updatedText = prompt("Update Task", paragraph.innerText);

    if (updatedText) {
        paragraph.innerText = updatedText;
        saveData();
    }
}

function deleteTask(button) {

    button.parentElement.remove();

    saveData();
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {

    event.preventDefault();

    let taskId = event.dataTransfer.getData("text");

    let selectedTask = document.getElementById(taskId);

    event.currentTarget.appendChild(selectedTask);

    saveData();
}

function saveData() {

    localStorage.setItem(
        "taskBoardData",
        document.querySelector(".board").innerHTML
    );
}

function loadData() {

    let storedData = localStorage.getItem("taskBoardData");

    if (storedData) {

        document.querySelector(".board").innerHTML = storedData;

        let allTasks = document.querySelectorAll(".task");

        allTasks.forEach(element => {
            element.draggable = true;
            element.ondragstart = drag;
        });
    }
}

loadData();