const mongoose = require('mongoose')
const myData = require('../config/connection')
const {User, Thought} = require('..models')
const {getSomeUsers, getSomeThoughts} = require('./data')

myData.once('open', async () => {
    try {
        await User.deletMany({})
        await Thought.deleteMany({})

        const user = await User.create(getSomeUsers(8))
        const thought = await Thought.create(getSomeThoughts(user, 16))

        console.log('Finished')
        process.exit(0)
    } catch (err) {
        throw err
    }
})