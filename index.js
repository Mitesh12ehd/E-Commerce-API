const express = require("express");
const connect_MongoDb = require("./utils/connectDB");
const Stripe = require("stripe");
const Order = require("./model/Order");

//router import
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productsRoute");
const categoryRouter = require("./routes/categoriesRouter");
const brandRouter = require("./routes/brandsRouter");
const colorRouter = require("./routes/colorRouter");
const reviewRouter = require("./routes/reviewRouter");
const orderRouter = require("./routes/ordersRouter");
const coupensRouter = require("./routes/couponsRouter");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 7000;

//------stripe webhook--------
//stripe login required in cmd promt before making payment

//stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally it expire after 90 days.
const endpointSecret = "whsec_98a6932c276e7157e5e0f568d45c5ffd8e350d0aaec741cebf41c657376c6703";

app.post('/webhook',
    express.raw({type: 'application/json'}),
    async(request, response) => {
        const sig = request.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
            console.log(event);
        }
        catch (err) {
            console.log('err',err.message);
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        if(event.type === 'checkout.session.completed'){
            //update the order
            const session = event.data.object;
            const {orderId} = session.metadata;
            const paymentStatus = session.payment_status;
            const paymentMethod = session.payment_method_types[0];
            const totalAmount = session.amount_total;
            const currency = session.currency; 

            //find the order
            const order = await Order.findByIdAndUpdate(
                JSON.parse(orderId),
                {
                    totalPrice : totalAmount / 100,
                    currency,
                    paymentMethod,
                    paymentStatus,
                },
                {
                    new:true,
                }
            )
            console.log(order);
        }
        else{
            return;
        }

        // Return a 200 response to acknowledge receipt of the event
        response.send();
    }
);

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//server static files
app.use(express.static("public"));

//connect mongodb database
connect_MongoDb();

//Router
app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
app.use("/api/categories",categoryRouter);
app.use("/api/brands",brandRouter);
app.use("/api/colors",colorRouter);
app.use("/api/reviews",reviewRouter);
app.use("/api/orders",orderRouter);
app.use("/api/coupons",coupensRouter);

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});