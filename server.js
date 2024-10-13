const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT||3000;

const server = http.createServer((req, res)=>{
    // res.end("hello world!");

    // res.write("hello world!");
    // res.end();

    const filePath = path.join(__dirname, req.url === '/'?"index.html":req.url);
    const extName = String(path.extname(filePath)).toLowerCase();

    console.log(filePath);

    const mimeTypes = {
        ".html":"text/html",
        ".css":"text/css",
        ".js":"text/javascript",
        ".png":"text/png",
    }

    const contentType = mimeTypes[extName] || 'application/octet-stream';

    fs.readFile(filePath, (error, content)=>{
        if(error){
            if(error.code === "ENOENT"){
                res.writeHeader(404, {"content-type":"text/html"});
                res.end("404: File not found.");
            }else{
                res.writeHeader(500, {"content-type":"text/html"});
                res.end("500: Internal Server Error.");
            }
        }else{
            res.writeHeader(200, {"content-type":contentType});
            res.end(content, "utf-8");
        }
    });

});

server.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})