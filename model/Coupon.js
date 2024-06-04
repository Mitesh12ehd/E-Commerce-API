const mongoose = require("mongoose");

const CouponSchema = mongoose.Schema(
    {
        code: {
        type: String,
        required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
    }
);

const Coupon = mongoose.model("Coupon", CouponSchema);
module.exports = Coupon;