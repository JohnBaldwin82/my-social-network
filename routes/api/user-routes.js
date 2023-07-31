const router = require("express").Router();

const {
  getAllUsers,
  getOneUser,
  createUser,
  reviseUser,
  removeUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userControllers");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getOneUser).put(reviseUser).delete(removeUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
