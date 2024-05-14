const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  stock: {
    type: Number,
    required: [false, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: false,
      },
      name: {
        type: String,
        required: false,
      },
      rating: {
        type: Number,
        required: false,
      },
      comment: {
        type: String,
        required: false,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },

  // Add a field to store the users who have wishlisted this product
  wishlistedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a text index on name, category, and brand fields
productSchema.index({ name: "text", category: "text" });

// Populate the 'user' field in the 'reviews' array
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "reviews.user",
    select: "name", // Specify the fields you want to include from the user document
  });
  next();
});

module.exports = mongoose.model("Product", productSchema);
