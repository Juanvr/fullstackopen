const express = require('express');
const app = express();


app.get('/api/persons', function (req, res) {
  res.send('Hello World!');
});


const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);