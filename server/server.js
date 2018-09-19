const http = require('http');
const util = require('util');
const fs = require('fs');

const readFileSync = util.promisify(fs.readFile);

http.createServer((req, res) => {
  if (req.url === '/') {
    readFileSync('./public/index.html').then((html) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    });
  } else if (req.url.match(/.js$/)) {
    readFileSync('./dist/main.js').then((js) => {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.end(js);
    });
  }
}).listen(process.env.PORT || 3000, () => console.log('Server is working'));
