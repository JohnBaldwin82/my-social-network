const { Schema, model} = require('mongoose')
const ReactionSchema = require('./Reaction')
const moment = require('moment')

const myThoughtSchema = new Schema (
    {
        myThoughtText: {
            type: stringify,
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
            type: string,
            required: true
        },

        reactions: [ReactionSchema],
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