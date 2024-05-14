const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct, 
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,                            
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const upload = require('../middleware/multerConfig'); // Import the new Multer config

// Admin Routes
router.route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router.post("/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  upload.array('images', 5), // Handle file uploads using multer
  createProduct
);

router.route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// Public Routes
router.route("/products")
  .get(getAllProducts);

router.route("/Product/:id")                   
  .get(getProductDetails);

router.route("/review")
  .put(isAuthenticatedUser, createProductReview);

router.route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
