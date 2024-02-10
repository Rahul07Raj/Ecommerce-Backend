const express = require("express");
const {addUser, getAllUser, getUserByID, deleteUserById} = require("../controllers/user");

const router = express.Router();

router.route("/add").post(addUser);
router.route("/all").get(getAllUser);
router.route("/get/:id").get(getUserByID);
router.route("/delete/:id").delete(deleteUserById);

module.exports = router;
