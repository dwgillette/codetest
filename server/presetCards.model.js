const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cardSchema = new Schema({
  name: String,
  desc: String,
  fact: String,
  picture: String
}, {collection: "card_bank"});

let PresetCard = mongoose.model('PresetCard', cardSchema);

module.exports = PresetCard;