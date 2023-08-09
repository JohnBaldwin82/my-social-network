const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    changeThought,
    removeThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thoughtController');
 
  router.route('/').get(getThoughts).post(createThought);
  
  router.route('/:thoughtId').get(getSingleThought);
  router.route('/:thoughtId').put(changeThought);
  router.route('/:thoughtId').delete(removeThought);
  
  router.route('/:thoughtId/reactions').post(addReaction);
  router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)
  
  module.exports = router;