const express = require('express');
const app = express();

console.log('I'm on a Node server, yo');

// Serve static files from the current directory
app.use(express.static('./'));

app.get('/', function (req, res) {
  res.send('Hello Node from Ex on local dev box');
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

