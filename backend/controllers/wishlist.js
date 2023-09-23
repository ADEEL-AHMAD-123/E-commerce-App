const User = require("../models/user-model");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// Add a product to the user's wishlist
exports.addToWishlist = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user._id;

  // Check if the product exists
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Check if the product is already in the user's wishlist
  const user = await User.findById(userId);

  if (user.wishlist.includes(productId)) {
    return res.status(400).json({ message: "Product already in wishlist" });
  }

  // Add the product to the user's wishlist
  user.wishlist.push(productId);
  await user.save();

  // Update the product's wishlistedBy field
  product.wishlistedBy.push(userId);
  await product.save();

  res.status(200).json({ message: "Product added to wishlist" });
});

// Remove a product from the user's wishlist
exports.removeFromWishlist = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user._id;

  // Check if the product exists
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Remove the product from the user's wishlist
  const user = await User.findById(userId);

  const index = user.wishlist.indexOf(productId);

  if (index !== -1) {
    user.wishlist.splice(index, 1);
    await user.save();

    // Update the product's wishlistedBy field
    const productIndex = product.wishlistedBy.indexOf(userId);

    if (productIndex !== -1) {
      product.wishlistedBy.splice(productIndex, 1);
      await product.save();
    }

    res.status(200).json({ message: "Product removed from wishlist" });
  } else {
    res.status(400).json({ message: "Product not in wishlist" });
  }
});

// Get the user's wishlist
exports.getWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).populate("wishlist");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ wishlist: user.wishlist });
});
