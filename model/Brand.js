const mongoose = require("mongoose");

const BrandSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    {
        timestamps:true
    }
)

const Brand = mongoose.model("Brand",BrandSchema);
module.exports = Brand;