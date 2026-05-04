const http = require("http");
const fs = require("fs");
const path = require("path");
// const { data } = require("jquery");

const PORT = 3000;
const DATA_FILE = path.join(__dirname, "tasks.json");

function readTasks() {
    try {
        const raw = fs.readFileSync(DATA_FILE, "utf8");
        return JSON.parse(raw);
    } catch (error) {
        return [];
    }
}

//revise this function
function writeTasks(tasks, res) {
    fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), (err) => {
        if (err) {
            res.writeHead(500);
            res.end("Error saving tasks");
            return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(tasks));
    });
}

function serveFile(filePath, contentType, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end("Error loading file");
            return;
        }
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    if (req.url === "/" || req.url === "/index.html") {
        serveFile(path.join(__dirname, "public", "index.html"), "text/html", res);
        return;
    }

    if (req.url === "/style.css") {
        serveFile(path.join(__dirname, "public", "style.css"), "text/css", res);
        return;
    }

    if (req.url === "/script.js") {
        serveFile(path.join(__dirname, "public", "script.js"), "text/javascript", res);
        return;
    }

    if (req.url === "/api/tasks" && req.method === "GET") {
        const tasks = readTasks();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(tasks));
        return;
    }

    // if(req.url === "/api/tasks" && req.method === "GET"){
    //     fs.readFile(path.join(__dirname, "tasks.json"), "utf-8", (err, data) => {
    //         if(!err){
    //             res.writeHead(200, {"Content-Type":"application/json"});
    //             res.end(data);
    //         }
    //         else{
    //             res.writeHead(500);
    //             res.end("Error in reading tasks.json");
    //         }
    //     })
    // }

    if (req.url === "/api/tasks" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                const task = JSON.parse(body);
                const tasks = readTasks();
                tasks.push(task);
                writeTasks(tasks, res);
            } catch (error) {
                res.writeHead(400);
                res.end("Invalid task data");
            }
        });
        return;
    }

    if (req.url === "/api/tasks" && req.method === "PUT") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                const updated = JSON.parse(body);
                const tasks = readTasks();
                const next = tasks.map((task) => (task.id === updated.id ? updated : task));
                writeTasks(next, res);
            } catch (error) {
                res.writeHead(400);
                res.end("Invalid task data");
            }
        });
        return;
    }

    if (req.url === "/api/tasks" && req.method === "DELETE") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                const payload = JSON.parse(body);
                const tasks = readTasks();
                const next = tasks.filter((task) => task.id !== payload.id);
                writeTasks(next, res);
            } catch (error) {
                res.writeHead(400);
                res.end("Invalid task data");
            }
        });
        return;
    }

    res.writeHead(404);
    res.end("Not found");
});

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
