const req = require("express/lib/request");
const { Thought, User } = require("../models");

const userControllers = {
  getAllUsers(req, res) {
    User.find()
      .then((myUsers) => res.json(myUsers))
      .catch((err) => res.status(500).json(err));
  },

  createUser(res, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  reviseUser(res, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((user) => {
        !user ? res.status(404).json({ message: "no user" }) : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "ID does not return a user" })
          : Thought.deleteMany({
              _id: {
                $in: user.thoughts,
              },
            })
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "this was deleted :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "ID does not return a user" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    console.log("Friend added");
    console.log(req, res);
    User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $addToSet: {
          friends: req.params.friendsId,
        },
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "ID does not return a friend :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $pull: {
          friends: req.params.FriendId,
        },
      },
      {
        runValidators: true,
        true: true,
      }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "ID does not return a friend:(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userControllers
