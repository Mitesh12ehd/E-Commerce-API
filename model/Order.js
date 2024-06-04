const mongoose = require("mongoose");

//generate random number for ordernumber
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000);

const OrderSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        orderItems:[
            {
                type:Object,
                required:true,
            },
        ],
        shippingAddress:{
            type:Object,
            required:true,
        },
        orderNumber:{
            type:String,
            default: randomTxt + randomNumbers,
        },
        //for Stripe payment
        paymentStatus:{
            type:String,
            default:"Not paid",
        },
        paymentMethod:{
            type:String,
            default:"Not specified"
        },
        totalPrice:{
            type:Number,
            default:0.0,
        },
        currency:{
            type:String,
            default:"Not specified"
        },

        //for admin
        status:{
            type:String,
            default:"pending",
            enum: ["pending" ,"processing" , "shipped","delivered"]
        },
        deliveredAt:{
            type:Date,
        }
    },
    {
        timestamps:true,
    }
)

const Order = mongoose.model("Order",OrderSchema);
module.exports = Order;