const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, "tasks.json");

function readTasks(){
    try{
        const raw = fs.readFileSync(DATA_FILE, "utf-8");
        return JSON.parse(raw);
    } catch(error){
        return [];
    }
}

function writeTasks(tasks, res){
    fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), (err) => {
        if(err){
            res.writeHead(500);
            res.end("Error in writing to file");
            return;
        }
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(tasks));
    })
}

const server = http.createServer((req, res) => {
    if(req.url === '/' || req.url === '/index.html'){
        fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
            if(!err){
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(data);
            }
            else{
                res.writeHead(500);
                res.end("Error in loading index.html");
            }
        })
    }
    else if(req.url === '/style.css'){
        fs.readFile(path.join(__dirname, "public", "style.css"), (err, data) => {
            if(!err){
                res.writeHead(200, {"Content-Type": "text/css"});
                res.end(data);
            }
            else{
                res.writeHead(500);
                res.end("Error in loading style.css");
            }
        })
    }
    else if(req.url === '/script.js'){
        fs.readFile(path.join(__dirname, "public", "script.js"), (err, data) => {
            if(!err){
                res.writeHead(200, {"Content-Type": "text/javascript"});
                res.end(data);
            }
            else{
                res.writeHead(500);
                res.end("Error in loading script.js");
            }
        })
    }
    else if(req.url === '/api/tasks' && req.method === "GET"){
        const tasks = readTasks();
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(tasks));
    }
    else if(req.url === '/api/tasks' && req.method === "POST"){
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try{
                const task = JSON.parse(body);
                const tasks = readTasks();
                tasks.push(task);
                writeTasks(tasks, res);
            } catch(error){
                res.writeHead(500);
                res.end("Error in POST");
            }
        })
    }
    else if(req.url === '/api/tasks' && req.method === "PUT"){
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try{
                const updated = JSON.parse(body);
                const tasks = readTasks();
                const newtasks = tasks.map((task) => (task.id === updated.id ? updated : task));
                writeTasks(newtasks, res);
            } catch(error){
                res.writeHead(500);
                res.end("Error in POST");
            }
        })
    }
    else if(req.url === '/api/tasks' && req.method === "DELETE"){
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try{
                const payload = JSON.parse(body);
                const tasks = readTasks();
                const newtasks = tasks.filter((task) => (task.id !== payload.id));
                writeTasks(newtasks, res);
            } catch(error){
                res.writeHead(500);
                res.end("Error in POST");
            }
        })
    }
    else{
        res.writeHead(404);
        res.end("Not found");
    }
});


server.listen(PORT, () => {
    console.log(`Server successfully running on http://localhost:${PORT}`);
})




