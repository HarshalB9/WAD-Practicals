const inputtask = document.getElementById('inputtask');
const addbtn = document.getElementById('addbtn');
const tasklist = document.getElementById('tasklist');
const statustext = document.getElementById('status');

function renderTasks(tasks){
    tasklist.innerHTML = "";

    if(!tasks){
        const empty = document.createElement('li');
        empty.textContent = "No tasks found";
        tasklist.appendChild(empty);
        return;
    }

    tasks.forEach((task) => {
        const item = document.createElement('li');

        const label = document.createElement('span');
        label.textContent = task.text;

        const editbtn = document.createElement('button');
        editbtn.textContent = "Update";
        editbtn.addEventListener("click", () => updateTask(task.id, task.text));

        const deletebtn = document.createElement('button');
        deletebtn.textContent = "Delete";
        deletebtn.addEventListener("click", () => deleteTask(task.id));

        item.appendChild(label);
        item.appendChild(editbtn);
        item.appendChild(deletebtn);

        tasklist.appendChild(item);
    });
}


function loadTasks(){
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "/api/tasks", true);

    xhr.onreadystatechange = function () {
        if(xhr.readyState !== 4){
            return;
        }

        if(xhr.status !== 200){
            statustext.textContent = "Failed to load tasks.";
            return;
        }

        try{
            const tasks = JSON.parse(xhr.responseText);
            renderTasks(tasks);
            statustext.textContent = "Tasks fetched successfully";
        } catch(error){
            statustext.textContent = "Error in fetching data loadTasks";   
        }
    };

    xhr.onerror = function (){
        statustext.textContent = "Error in fetching data loadTasks 2";  
    };

    xhr.send();
}


function addTask(){
    const inputtext = inputtask.value.trim();

    if(!inputtext){
        statustext.textContent = "Please enter valid task";
        return;
    }

    const task = {id: Date.now().toString(), text: inputtext};

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "/api/tasks", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if(xhr.readyState !== 4){
            return;
        }

        if(xhr.status !== 200){
            statustext.textContent = "Failed to add task.";
            return;
        }

        loadTasks();
    };

    xhr.onerror = function (){
        statustext.textContent = "Error in fetching data addTask 2";  
    };

    xhr.send(JSON.stringify(task));
}

function updateTask(id, oldtext){

    const newtext = prompt("Update task: ", oldtext);

    if(newtext === null){
        return;
    }

    const trimmed = newtext.trim();

    const xhr = new XMLHttpRequest();

    xhr.open("PUT", "/api/tasks", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if(xhr.readyState !== 4){
            return;
        }

        if(xhr.status !== 200){
            statustext.textContent = "Failed to update task.";
            return;
        }

        loadTasks();
    };

    xhr.onerror = function (){
        statustext.textContent = "Error in fetching data updateTask2";  
    };

    xhr.send(JSON.stringify({id, text:trimmed}));
};

function deleteTask(id){
    const xhr = new XMLHttpRequest();

    xhr.open("DELETE", "/api/tasks", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if(xhr.readyState !== 4){
            return;
        }

        if(xhr.status !== 200){
            statustext.textContent = "Failed to delete task.";
            return;
        }

        loadTasks();
    };

    xhr.onerror = function (){
        statustext.textContent = "Error in fetching data deleteTask 2";  
    };

    xhr.send(JSON.stringify({id}));
};

addbtn.addEventListener("click", addTask);

loadTasks();

