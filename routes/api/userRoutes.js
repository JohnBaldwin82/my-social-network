const router = require('express').Router();

const {
    getUsers,
    gotOneUser,
    createUser,
    changeUser,
    removeUser,
    addFriend,
    deleteFriend
  } = require('../../controllers/userController');
  
  router.route('/').get(getUsers).post(createUser);
  
  router.route('/:userId').get(gotOneUser);
  router.route('/:userId').put(changeUser);
  router.route('/:userId').delete(removeUser);
  
  router.route('/:userId/friends/:friendId').post(addFriend);
  router.route('/:userId/friends/:friendId').delete(deleteFriend);
  
  module.exports = router;
