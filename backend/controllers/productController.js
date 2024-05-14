const createError = require("http-errors");
const Product = require("../models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary").v2;
const { applyFilters, getPagination } = require("../utils/apifeatures.js");
const mongoose = require("mongoose");

// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  console.log(req.query);
  const { keyword, page = 1, limit = 10, price, rating, category } = req.query;

  const filters = { keyword, price, rating, category };
  const filterCriteria = applyFilters(filters);
  const pagination = getPagination(page, limit);

  const [products, totalProducts] = await Promise.all([
    Product.find(filterCriteria)
      .skip(pagination.skip)
      .limit(pagination.limit)
      .sort({ createdAt: -1 }), // Example sorting by createdAt field in descending order
    Product.countDocuments(filterCriteria),
  ]);

  res.status(200).json({
    success: true,
    products,
    totalProducts,
    resultPerPage: pagination.limit,
    currentPage: pagination.page,
  });
});

// Create Product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const imagesLinks = await Promise.all(
      req.files.map(async (file) => {
        const base64String = file.buffer.toString("base64"); // Convert buffer to base64 string
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${base64String}`,
          {
            folder: "products", // Optional folder for organizing images
          }
        );
        return {
          public_id: result.public_id,
          url: result.secure_url,
        };
      })
    );

    // Update req.body with Cloudinary image links and user ID
    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    // Create the product in your database
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
      message: "Product created successfully",
    });
  } catch (error) {
    next(createError(500, error.message || "Internal Server Error"));
  }
});

// Update Product
// Update Product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return next(createError(404, "Product not found. Invalid product id"));
    }

    // Update only the fields that are present in the update request
    Object.keys(updateFields).forEach((field) => {
      if (field in product) {
        product[field] = updateFields[field];
      }
    });

    await product.save();

    res.status(200).json({
      success: true,
      product,
      message: "Product updated successfully",
    });
  } catch (error) {
    return next(createError(400, "Failed to update product"));
  }
});


// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(createError(404, "Product not found. Invalid product id"));
  }

  // Delete images from Cloudinary (assuming a function called deleteImagesFromCloudinary)
  await deleteImagesFromCloudinary(product.images);

  // Delete the product using findByIdAndDelete
  await Product.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// Get Admin Products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
    message: "Admin products retrieved successfully",
  });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(createError(404, "Product not found"));
  }

  res.status(200).json({
    success: true,
    product,

  });
});

/// Create New Review or Update the Review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  if (!rating || !comment || !productId) {
    return next(createError(400, "Invalid input data"));
  }

  const product = await Product.findById(productId);

  if (!product) {
    return next(createError(404, "Product not found"));
  }

  let userId;
  try {
    userId = new mongoose.Types.ObjectId(req.user._id);
  } catch (error) {
    return next(createError(400, "Invalid user ID"));
  }

  const existingReview = product.reviews.find(
    (rev) => rev.user && rev.user.equals(userId)
  );

  if (existingReview) {
    // Update existing review if found
    console.log('Found existing review:', existingReview);
    existingReview.rating = rating;
    existingReview.comment = comment;
  } else {
    // Create new review if no existing review is found for the user
    const userName = req.user.firstName + " " + req.user.lastName;
    product.reviews.push({
      user: userId,
      name: userName,
      rating,
      comment,
    });
    product.numOfReviews += 1;
  }

  const totalRatings = product.reviews.reduce((acc, rev) => acc + rev.rating, 0);
  product.rating = totalRatings / product.numOfReviews;

  await product.save();

  res.status(201).json({
    success: true,
    message: existingReview ? "Review updated successfully" : "Review added successfully",
  });
});





// Get Product Reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.query;
console.log(req.query);
  const product = await Product.findById(id);

  if (!product) {
    return next(createError(404, "Product not found"));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const { productId, reviewId } = req.query;
console.log(req.query);
  const product = await Product.findById(productId);

  if (!product) {
    return next(createError(404, "Product not found"));
  }

  const existingReviewIndex = product.reviews.findIndex(
    (review) => review._id.toString() === reviewId.toString()
  );

  if (existingReviewIndex === -1) {
    return next(createError(404, "Review not found"));
  }

  product.reviews.splice(existingReviewIndex, 1);
  product.numOfReviews -= 1;

  if (product.numOfReviews > 0) {
    const totalRatings = product.reviews.reduce(
      (acc, rev) => acc + rev.rating,
      0
    );
    product.ratings = totalRatings / product.numOfReviews;
  } else {
    product.rating = 0;
  }

  await product.save();

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});

const deleteImagesFromCloudinary = async (images) => {
  for (const image of images) {
    await cloudinary.uploader.destroy(image.public_id);
  }
};

 