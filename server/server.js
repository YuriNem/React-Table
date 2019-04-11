const http = require('http');
const util = require('util');
const fs = require('fs');

const readFilePromise = util.promisify(fs.readFile);

http.createServer(async (req, res) => {
  if (req.url === '/') {
    const html = await readFilePromise('./public/index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else if (req.url.match(/.js$/)) {
    const js = await readFilePromise('./dist/main.js');
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(js);
  } else if (req.url === '/smalldata') {
    const smallData = await readFilePromise('./server/smallData.json');
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.end(smallData);
  } else if (req.url === '/bigdata') {
    const bigData = await readFilePromise('./server/bigData.json');
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.end(bigData);
  }
}).listen(process.env.PORT || 3000, () => console.log('Server is working'));
