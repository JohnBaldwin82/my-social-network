const { User, Thought } = require("../models");

const thoughtController = {
  async getAllThoughts(req, res) {
    try {
      const myThoughts = await Thought.find({});
      res.json(myThoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getThoughtsById({ params }, res) {
    try {
      const myThoughts = await Thought.findOne({ _id: params.id });
      if (!myThoughts) {
        res
          .status(404)
          .json({ message: "This id does not return any thoughts" });
        return;
      }
      res.json(myThoughts);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async createThought({ params, body }, res) {
    try {
      const { _id } = await Thought.create(body);
      const user = await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { myThoughts: _id } },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ message: "Not a valid user id" });
      }
      res.json(user);
    } catch (err) {
      res.json(err);
    }
  },

  async reviseThought({ params, body }, res) {
    try {
      const myThoughts = await Thought.findOneAndUpdate(
        { _id: params.id },
        body,
        { new: true, runValidators: true }
      );
      if (!myThoughts) {
        res.status(404).json({ message: "This id does not return a thought" });
        return;
      }
      res.json(myThoughts);
    } catch (err) {
      res.json(err);
    }
  },

  async removeThought({ params }, res) {
    try {
      const myThoughts = await Thought.findOneAndDelete({ _id: params.id });
      if (!myThoughts) {
        res.status(404).json({ message: "This id does not return a thought" });
        return;
      }
      res.json(myThoughts);
    } catch (err) {
      res.json(err);
    }
  },

  async addReaction({ params, body}, res) {
    try {
        const myThoughts = await Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            { $pull: {reactions: {reactionId: params.reactionId}}},
            {new: true, runValidators: true}
        )

        if(!myThoughts) {
            res.status(404).json({ message: 'This id does not return a thought'})
            return
        }

        res.json(thoughts)
    }   catch (err) {
        res.json(err)
    }
  },

  async deleteReaction({ params}, res) {
    try {
        const myThoughts = await Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        res.json(myThoughts)
    }   catch (err) {
        res.json(err)
    }
  }
};
