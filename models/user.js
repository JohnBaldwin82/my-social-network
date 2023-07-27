const { Schema, model } = require("mongoose");

const mySchemaUsers = new Schema(
    {
  username: {
    type: string,
    unique: true,
    required: true,
    trim: true,
  },

  email: {
    type: string,
    required: true,
    unique: true,
    match: [^a-zA-Z0-9+_.-+ @-zA-Z0-9.-+$, 'please enter a valid email address'],
  },

  thoughts:  [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

UserSchema.virtual('count').get(function () {
    return this.friends.length
});

const User = model("User", UserSchema)

module.exports = User
