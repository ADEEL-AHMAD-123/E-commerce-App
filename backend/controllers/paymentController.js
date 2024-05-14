require("dotenv").config();
const createError = require("http-errors");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      throw createError(400, "Invalid amount provided");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      metadata: {
        company: "Ecommerce",
      },
    });

    res.status(200).json({ success: true, client_secret: paymentIntent.client_secret });
  } catch (error) {
    if (error.code && error.code === "parameter_invalid_integer") {
      error = createError(400, "Invalid amount format");
    }

    next(error);
  }
});
