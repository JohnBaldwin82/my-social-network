const { Schema, Types } = require('mongoose')
const moment = require('moment')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Schema.Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            required: true,
            maxlength: 300,
        },

        username: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            defaule: Date.now,
            get: (createdAt) =>
            moment(createdAt).format('MMM DD, YYYY [at] hh:mm a')
        },
    },
    {
        toJSON: {
            getters: true,
        },
        _id: false,
    }
)