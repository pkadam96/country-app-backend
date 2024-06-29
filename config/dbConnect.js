require("dotenv").config()
const mongoose = require("mongoose");

async function connectToDB(){
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Connected to DB")
    } 
    catch (error) {
        console.log(error);
        console.log("Database connection failed, Stopping the server...");
        process.exit(1);
    }
}

module.exports={connectToDB}