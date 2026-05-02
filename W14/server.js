const http = require("http");
const fs = require("fs");

const PORT = 3000;

const path = require('path');

const server = http.createServer((req, res) => {

    if(req.url === '/' || req.url === '/index.html'){
        fs.readFile('./public/index.html', (err, data) => {
            res.writeHead(200, {"Content-Type":"text/html"});
            res.end(data);
        })
    }
    else if(req.url === '/style.css'){
        fs.readFile('./public/style.css', (err, data) => {
            res.writeHead(200, {"Content-Type":"text/css"});
            res.end(data);
        })
    }
    else if(req.url === '/script.js'){
        fs.readFile('./public/script.js', (err, data) => {
            res.writeHead(200, {"Content-Type":"text/javascript"});
            res.end(data);
        })
    }
    else if(req.url === '/bootstrap.min.css'){
        fs.readFile('./public/bootstrap.min.css', (err, data) => {
            res.writeHead(200, {"Content-Type":"text/css"});
            res.end(data);
        })
    }
    else if(req.url === '/bootstrap.bundle.min.js'){
        fs.readFile('./public/bootstrap.bundle.min.js', (err, data) => {
            res.writeHead(200, {"Content-Type":"text/javascript"});
            res.end(data);
        })
    }
    else if(req.url === '/api/users'){
        fs.readFile('users.json', (err, data) => {
            if(err){
                res.writeHead(500);
                res.end('Error in reading data from users.json');
            }
            else{
                res.writeHead(200, {"Content-Type":"application/json"});
                res.end(data);
            }
        })
    }
    else{
        res.writeHead(404);
        res.end('Not found');
    }
    

});


server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})