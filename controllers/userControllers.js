const { User } = require("../models");

const userControllers = {
  async getAllUsers(req, res) {
    try {
      const myUsers = await User.find({})
        .populate({ path: "thoughts", select: "-__v" })
        .select("-__v");
      res.json(myUsers);
    } catch (err) {
      console.log(err);
      res.status(500).json(error);
    }
  },

  async getOneUser({ params }, res) {
    try {
      const myUsers = await User.findOne({ _id: params.id })
        .populate({ path: "thoughts", select: "-__v" })
        .select("-__v");

      if (!myUsers) {
        res.status(404).json({ message: "this ID does not return a user" });
        return;
      }
      res.json(myUsers);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async createUser({ body }, res) {
    try {
      const myUsers = await User.create(body);
      res.json(myUsers);
    } catch (err) {
      console.log(err);
      res.status;
    }
  },

  async reviseUser({ body }, res) {
    try {
      const myUsers = await User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      });

      if (!myUsers) {
        res.status(404).json({ message: "this id does not return a user" });
        return;
      }

      res.json(myUsers);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async removeUser({ params }, res) {
    try {
      const myUsers = await User.findOneAndDelete({ _id: params.id });

      if (!myUsers) {
        res.status(404).json({ message: "this id does not return a user" });
        return;
      }

      res.json(myUsers);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async addFriend({ params }, res) {
    try {
      const myUsers = await User.findOneAndUpdate(
        { _id: params.id },
        { $push: { friends: params.friendId } },
        { new: true, runValidators: true }
      );

      if (!myUsers) {
        res.status(404).json({ message: "this ID does not return a user" });
        return;
      }

      res.json(myUsers);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async deleteFriend({ params }, res) {
    try {
      const myUsers = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      );

      if (!myUsers) {
        res.status(404).json({ message: "this ID does not return a user" });
      }

      res.json(myUsers);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
};

module.exports = userControllers;
