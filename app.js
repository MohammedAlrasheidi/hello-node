const express = require('express');
const app = express();

console.log('Node server is running!');

app.get('/', (req, res) => {
  res.send('Hello from Express on your local machine!');
});

app.listen(3000);
