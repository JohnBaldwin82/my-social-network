const mongoose = require('mongoose')
const myData = require('../config/connection')
const {myUser, myThought} = require('..models')
const {getSomeUsers, getSomeThoughts} = require('./data')

myData.once('open', async () => {
    try {
        await User.deletMany({})
        await Thought.deleteMany({})

        const myUser = await myUser.create(getSomeUsers(8))
        const myThought = await myThought.create(getSomeThoughts(user, 16))

        console.log('Finished')
        process.exit(0)
    } catch (err) {
        throw err
    }
})