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
    /*
    /\.(jpg|jpeg|png|gif)$/:

    / /: The forward slashes mark the start and end of the Regular Expression.

    \.: This matches a literal dot. In regex, a plain . means "any character," so we use the backslash \ to "escape" it, telling the code we actually mean a period.

    (jpg|jpeg|png|gif): This is a capture group. The pipe | acts like an OR operator. It says "match jpg OR jpeg OR png OR gif."

    $: This is an "anchor." It ensures the match happens at the end of the string. This prevents a request like /api/jpg-info from being mistaken for an actual image file.
     */
    else if(req.url.match(/\.(jpg|jpeg|png|gif)$/)){
        /*
        path.join(...): This is a built-in Node.js method that glues pieces of a path together. It is much safer than manual string concatenation (like folder + '/' + file) because it handles slashes correctly regardless of whether you are on Windows (using \) or Linux/Mac (using /).

        __dirname: This is a global variable in Node.js that gives you the absolute path to the folder where your server.js file is currently sitting.

        Example: C:/Users/Harshal/Project/

        'public': This tells Node to look inside your "public" folder.

        req.url: This is the filename the browser asked for (e.g., /img1.jpg).

        The Result:
        If __dirname is C:/Project and the request is /img1.jpg, path.join creates:
        C:/Project/public/img1.jpg
        */
        const imagePath = path.join(__dirname, 'public', req.url);

        const mimeType = {
            ".jpg":"image/jpeg",
            ".jpeg":"image/jpeg",
            ".png":"image/png"
        }

        fs.readFile(imagePath, (err, data) => {
            if (!err) {
                const ext = path.extname(imagePath);

                res.writeHead(200, {"Content-Type": mimeType[ext]});
                res.end(data);
            } else {
                res.writeHead(404);
                res.end("Image not found");
            }
        });
    }
    else{
        res.writeHead(404);
        res.end('Not found');
    }
    

});


server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})