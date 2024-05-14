const createError = require("http-errors");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/user-model");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw createError(400, "User already exists");
  }

  const user = await User.create({ firstName, lastName, email, password });

  sendToken(user, 201, res, "Registration successful");
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw createError(400, "Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw createError(401, "Invalid email or password");
  }

  sendToken(user, 200, res, "Logged in successfully");
});

// Logout User
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(404, "User not found");
  }

  const resetToken = user.generatePasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND}/reset-password?token=${encodeURIComponent(resetToken)}`;
  const message = `Your password reset token is:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, please ignore it.`;

  await sendEmail({ email: user.email, subject: "Ecommerce Password Recovery", message });

  res.status(200).json({
    success: true,
    message: `Email sent to ${user.email} successfully`,
  });
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const resetPasswordToken = req.params.token;

  if (!resetPasswordToken || !password || !confirmPassword) {
    throw createError(400, "Token, password, and confirmPassword are required");
  }

  const hashedToken = crypto.createHash("sha256").update(resetPasswordToken).digest("hex");
  const user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordExpire: { $gt: Date.now() } });

  if (!user) {
    throw createError(400, "Reset Password Token is invalid or has expired");
  }

  if (password !== confirmPassword) {
    throw createError(400, "Password and confirmPassword do not match");
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save({ validateBeforeSave: false });

  sendToken(user, 200, res, "Password updated successfully");
});

// Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    throw createError(400, "Old password, new password, and confirmPassword are required");
  }

  if (!(await user.comparePassword(oldPassword))) {
    throw createError(400, "Old password is incorrect");
  }

  if (newPassword !== confirmPassword) {
    throw createError(400, "New password and confirmPassword do not match");
  }

  user.password = newPassword;
  await user.save();

  sendToken(user, 200, res, "Password updated successfully");
});

// Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, email } = req.body;
  const newUserData = { name, email };
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, { new: true, runValidators: true, useFindAndModify: false });

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

// Get all users (admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
}); 

// Get single user by ID (admin) 
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw createError(404, `User not found with ID: ${req.params.id}`);
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Role by ID (admin)
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const { name, email, role } = req.body;
  const newUserData = { name, email, role };

  await User.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, useFindAndModify: false });

  res.status(200).json({
    success: true,
    message: "User role updated successfully",
  });
});

// Delete User by ID (admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw createError(404, `User not found with ID: ${req.params.id}`);
  }

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
 