const mongoose = require("mongoose");
require("dotenv").config();

async function connect_MongoDb(){
    mongoose
        .connect(process.env.MONGODB_STRING)
        .then( () => console.log("MongoDb Connected"))
        .catch( (err) => console.log("Mongo Error",err));
}

module.exports = connect_MongoDb;