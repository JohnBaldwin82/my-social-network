const { User, Thought } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  gotOneUser(req, res) {
    console.log(req.params.userId);
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'This id does not return a user' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create({
        username: req.body.username,
        email: req.body.email
    })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  changeUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        thoughtText: req.body.thoughtText,
        username: req.body.username
      },
      { new: true }
    ).then((thought) => {
      if (thought) {
        res.status(200).json(thought);
      }
    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
  },

    removeUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'This id does not return a user' })
                : Thought.deleteMany( { username: user.username})
                  .then((thoughts) => 
                    !thoughts
                    ? res.status(404).json({ message: 'This id does not return a thought' })
                    : res.json(user)
                  )
                )
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOne({ _id: req.params.friendId })
          .select('-__v')
          .then((user) => {
              return User.findOneAndUpdate (
                { _id: req.params.userId}, 
                {$addToSet: {
                    friends: user._id
                }},
                { new: true} 
              );
          }).then((user) => 
            !user
              ? res.status(404).json({ message: 'This id does not return a user' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        User.findOne({ _id: req.params.friendId })
          .select('-__v')
          .then((user) => {
              return User.findOneAndUpdate (
                { _id: req.params.userId}, 
                {$pull: {
                    friends: user._id
                }},
                { new: true} 
              );
          }).then((user) => 
            !user
              ? res.status(404).json({ message: 'This id does not return a user' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    }
};