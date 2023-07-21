const router = require('express').Router()

const {

getAllUsers,
getUserById,
createUser,
reviseUser,
deleteUser,
addFriend,
deleteFriend,

} = require('../../controllers/user-controllers');

router.route('/').get(getAllUsers).post(createUser)

router.route('/:id').get(getUserById).put(reviseUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router