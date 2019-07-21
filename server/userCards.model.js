const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cardSchema = new Schema({
  name: String,
  desc: String,
  fact: String,
  picture: String
}, {collection: "active_user"});

let UserCard = mongoose.model('UserCard', cardSchema);

module.exports = UserCard;