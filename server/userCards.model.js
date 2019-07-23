const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cardSchema = new Schema({
  name: {
    type: String,
    validate: {
      isAsync: true,
      validator: function(value, isValid) {
        const self = this;
        return self.constructor.findOne({ name: value })
        .exec((err, card) => {
          if(err) {
            throw err;
          } else if (card) {
            (self.id === card.id) ?
              isValid(true) :
              isValid(false);
          } else {
            return isValid(true);
          }
        })
      },
      message: 'Card with that name already exists!'
    }
  },
  desc: String,
  fact: String,
  picture: String
}, {collection: "active_user"});

let UserCard = mongoose.model('UserCard', cardSchema);

module.exports = UserCard;