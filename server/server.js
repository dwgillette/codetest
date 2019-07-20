const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 5000;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://user:opendrives@cluster0-rrsmt.mongodb.net/fact_stack', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
})

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