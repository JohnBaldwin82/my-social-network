const { Schema, model } = require("mongoose");

const schemaUser = new Schema(
    {
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, 'please enter your valid email address'],
  },

  thoughts:  [
    {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    },
  ],

  friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
  ]

},
{

    toJSON: {
        virtuals:true,
        getters: true,
    },
    id: false,
},
)

schemaUser.virtual('count').get(function () {
    return this.friends.length
});

const User = model("User", schemaUser)

module.exports = User
