const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const statusText = document.getElementById("status");

function setStatus(message) {
    statusText.textContent = message;
}

function renderTasks(tasks) {
    taskList.innerHTML = "";

    if (!tasks.length) {
        const empty = document.createElement("li");
        empty.className = "empty";
        empty.textContent = "No tasks yet.";
        taskList.appendChild(empty);
        return;
    }

    tasks.forEach((task) => {
        const item = document.createElement("li");
        item.className = "task";

        const label = document.createElement("span");
        label.textContent = task.text;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "btn";
        editBtn.addEventListener("click", () => updateTask(task.id, task.text));

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "btn danger";
        delBtn.addEventListener("click", () => deleteTask(task.id));

        item.appendChild(label);
        item.appendChild(editBtn);
        item.appendChild(delBtn);
        taskList.appendChild(item);
    });
}

function loadTasks() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/tasks", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status !== 200) {
            setStatus("Could not load tasks.");
            return;
        }
        try {
            const tasks = JSON.parse(xhr.responseText);
            renderTasks(tasks);
            setStatus("");
        } catch (error) {
            setStatus("Could not load tasks.");
        }
    };
    xhr.onerror = function () {
        setStatus("Could not load tasks.");
    };
    xhr.send();
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) {
        setStatus("Please enter a task.");
        return;
    }

    const task = { id: Date.now().toString(), text };
    taskInput.value = "";

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/tasks", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status !== 200) {
            setStatus("Could not add task.");
            return;
        }
        loadTasks();
    };
    xhr.onerror = function () {
        setStatus("Could not add task.");
    };
    xhr.send(JSON.stringify(task));
}

function updateTask(id, oldText) {
    const text = prompt("Update task:", oldText);
    if (text === null) {
        return;
    }

    const trimmed = text.trim();
    if (!trimmed) {
        setStatus("Task cannot be empty.");
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/tasks", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status !== 200) {
            setStatus("Could not update task.");
            return;
        }
        loadTasks();
    };
    xhr.onerror = function () {
        setStatus("Could not update task.");
    };
    xhr.send(JSON.stringify({ id, text: trimmed }));
}

function deleteTask(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/tasks", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status !== 200) {
            setStatus("Could not delete task.");
            return;
        }
        loadTasks();
    };
    xhr.onerror = function () {
        setStatus("Could not delete task.");
    };
    xhr.send(JSON.stringify({ id }));
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

loadTasks();
