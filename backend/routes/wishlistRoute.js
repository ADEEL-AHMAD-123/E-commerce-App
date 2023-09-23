// Example wishlist routes
const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/wishlist"); 
 
router.post("/wishlist/add/:productId", isAuthenticatedUser, addToWishlist);
router.post("/wishlist/remove/:productId", isAuthenticatedUser, removeFromWishlist);
router.get("/wishlist", isAuthenticatedUser, getWishlist);

module.exports = router;
