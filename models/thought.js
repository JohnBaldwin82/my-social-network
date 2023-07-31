const { Schema, model} = require('mongoose')
const reactionSchema = require('./reaction')
const moment = require('moment')

const myThoughtSchema = new Schema (
    {
        myThoughtText: {
            type: String,
            required: true,
            validate: [
                ({length}) => length >= 1 && length <= 300,
                'your text for your thought should be between 1 and 300 characters'
            ],
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) =>
            moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),

        },

        username: {
            type: String,
            required: true
        },

        reactions: [reactionSchema],
    },

    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
)
myThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

const Thought = model('Thought', myThoughtSchema)

module.export = Thought