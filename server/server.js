const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

const PresetCard = require('./presetCards.model');
const UserCard = require('./userCards.model');

mongoose.connect('mongodb+srv://user:opendrives@cluster0-rrsmt.mongodb.net/fact_stack', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
})

mongoose.set('useFindAndModify', false);

app.get('/card_bank', (req, res) => {
  let param = req.query.name;
  PresetCard.findOne({name: param}, (err, cards) => {
      if (err) {
          res.send(err);
      } else {
          res.json(cards);
      }
  });
});

app.get('/active_user', (req, res) => {
  UserCard.find((err, cards) => {
      if (err) {
          res.send(err);
      } else {
          res.json(cards);
      }
  });
});

app.get('/active_user/find_one', (req, res) => {
  let name = req.query.name;
  UserCard.findOne({name: name}, (err, cards) => {
      if (err) {
          res.send(err);
      } else {
          res.json(cards);
      }
  });
});

app.post('/active_user', (req, res) => {
  let card = new UserCard(req.body);
  card.save()
      .then(res => {
          console.log("card added successfully: " + res.name)
      })
      .catch(err => {
          console.log("adding new card failed" + err);
      });
  res.end("OK");
});

app.delete('/active_user', (req, res) => {
  let param = req.query.id;
  UserCard.findOneAndDelete({_id: param}, (err, res) => {
    if (err) {
      res.send(err);
    } else {
      console.log("card deleted successfully: " + res.name);
    }
  })
  res.end("OK");
});

app.delete('/active_user/new_session', (req, res) => {
  UserCard.deleteMany(req.body, (err) => {
    if (err) return handleError(err);
  })
  res.end("OK");
});

//test
app.get('/express_backend', (req, res) => {
  res.send({ express:"Crisis Collector" });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

//start server
app.listen(PORT, (req, res) => {
  console.log(`server listening on port: ${PORT}`);
});