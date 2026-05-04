const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === "/" || req.url === "/index.html") {
        fs.readFile("./public/index.html", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error loading index.html");
                return;
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    } else if (req.url === "/style.css") {
        fs.readFile("./public/style.css", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error loading style.css");
                return;
            }
            res.writeHead(200, { "Content-Type": "text/css" });
            res.end(data);
        });
    } else if (req.url === "/script.js") {
        fs.readFile("./public/script.js", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error loading script.js");
                return;
            }
            res.writeHead(200, { "Content-Type": "text/javascript" });
            res.end(data);
        });
    } else if (req.url === "/api/weather") {
        fs.readFile("./weather.json", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error reading weather.json");
                return;
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end("Not found");
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
