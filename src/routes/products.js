const express = require("express");
const {addProduct,getLatestProduct,getAllCategories,getAdminProducts,getSingleProduct,updateProduct, deleteProduct, getAllProducts} = require("../controllers/products");
const { singleUpload } = require("../middlewares/multer");
const { isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.route("/add").post(isAdmin, singleUpload, addProduct);
router.route("/latest").get(getLatestProduct);
router.route("/categories").get(getAllCategories);
router.route("/admin-products").get(isAdmin,getAdminProducts);
router.route("/all").get(getAllProducts);
router.route("/:id").get(getSingleProduct);
router.route("/:id").put(isAdmin,singleUpload,updateProduct);
router.route("/:id").delete(isAdmin,deleteProduct);

module.exports = router;
