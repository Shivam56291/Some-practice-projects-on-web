// DOM elements
const inputBox = document.getElementById("inputBox");
const listContainer = document.getElementById("listContainer");

// Add Task Function
function addTask() {
    const taskText = inputBox.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        text: taskText,
        completed: false,
    };

    // Add task to the list and save it
    createTaskElement(task);
    saveData();
    inputBox.value = ""; // Clear input field
}

// Create Task List Item
function createTaskElement(task) {
    const li = document.createElement("li");

    // Task Text
    li.textContent = task.text;

    // Add 'checked' class if completed
    if (task.completed) {
        li.classList.add("checked");
    }

    // Delete Button (span)
    const deleteSpan = document.createElement("span");
    deleteSpan.textContent = "×";
    deleteSpan.onclick = function () {
        li.remove();
        saveData();
    };

    li.appendChild(deleteSpan);
    li.onclick = function () {
        task.completed = !task.completed;
        li.classList.toggle("checked");
        saveData();
    };

    listContainer.appendChild(li);
}

// Save tasks to localStorage
function saveData() {
    const tasks = [];
    const taskElements = listContainer.getElementsByTagName("li");

    for (let i = 0; i < taskElements.length; i++) {
        const taskText = taskElements[i].textContent.replace("×", "").trim();
        const task = {
            text: taskText,
            completed: taskElements[i].classList.contains("checked"),
        };
        tasks.push(task);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Show tasks from localStorage
function showTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => createTaskElement(task));
}

// Initialize
showTasks();
