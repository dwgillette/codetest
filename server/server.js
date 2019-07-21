const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 5000;

const PresetCard = require('./presetCards.model');
const UserCard = require('./userCards.model');

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://user:opendrives@cluster0-rrsmt.mongodb.net/fact_stack', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
})

app.get('/card_bank', (req, res) => {
  let param = req.query.name;
  PresetCard.find({name: param}, (err, cards) => {
      if (err) {
          console.log(err);
      } else {
          res.json(cards);
      }
  });
});

app.get('/active_user', (req, res) => {
  UserCard.find((err, cards) => {
      if (err) {
          console.log(err);
      } else {
          res.json(cards);
      }
  });
});

app.post('/active_user', (req, res) => {
  let card = new UserCard(req.body);
  card.save()
      .then(res => {
          console.log("card added successfully" + res)
      })
      .catch(err => {
          console.log("adding new card failed" + err);
      });
});

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