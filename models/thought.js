const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const formatDate = require('../utils/format.js')

const schemaThought = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 300
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => formatDate(date)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);


schemaThought
  .virtual('reactionAmount')
  .get(function () {
    return this.reactions.length;
  })

const Thought = model('thought', schemaThought);

module.exports = Thought;