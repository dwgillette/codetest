const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;

app.use(bodyParser.json());

//test
app.get('/express_backend', (req, res) => {
  res.send({ express:"The express backend is connected to React. Woo!" });
});

//build mode
app.get('*', (req, res) => {
  res.send('root route');
});

//start server
app.listen(PORT, (req, res) => {
  console.log(`server listening on port: ${PORT}`);
});