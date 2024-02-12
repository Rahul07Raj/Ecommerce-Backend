const express = require("express");
const {addUser, getAllUser, getUserByID, deleteUserById} = require("../controllers/user");
const { isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.route("/add").post(addUser);
router.route("/all").get(isAdmin,getAllUser);
router.route("/get/:id").get(isAdmin,getUserByID);
router.route("/delete/:id").delete(isAdmin,deleteUserById);

module.exports = router;
