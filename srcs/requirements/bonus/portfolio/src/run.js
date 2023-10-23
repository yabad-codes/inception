// const http = require('http')
// const fs = require('fs')

// const server = http.createServer((req, res) => {
// 	res.writeHead(200, { 'content-type': 'text/html' })
// 	fs.createReadStream('index.html').pipe(res)
// })

// server.listen(1337)

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Parse the URL of the incoming request
  const url = req.url;

  if (url === '/' || url === '/index.html') {
    // Serve the 'index.html' file
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream('index.html').pipe(res);
  } else if (url === '/style.css') {
    // Serve the 'style.css' file
    res.writeHead(200, { 'Content-Type': 'text/css' });
    fs.createReadStream('style.css').pipe(res);
  } else {
    // Handle other requests or 404 errors
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(process.env.PORT || 1337);
