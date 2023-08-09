const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

const users = [
    {
        username: 'Ari',
        email: 'Ari@yahoo.com'
    },
    {
        username: 'Connor',
        email: 'Connor@yahoo.com'
    },
    {
        username: 'Harper',
        email: 'Harper@yahoo.com'
    },
    {
        username: 'Beth',
        email: 'Beth@yahoo.com'
    },
    {
        username: 'John',
        email: 'John@yahoo.com'
    }
]

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});

    await User.collection.insertMany(users);

    console.info('Successfully seeded');
    process.exit(0);
});