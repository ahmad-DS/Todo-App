import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
async function connectMongoDB() {
    try {
        if (!process.env.MONGO_URL)
            throw new Error("Please provide MONGO_URL");
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connection is set up successfully");
    }
    catch (error) {
        // con
        console.error("db connection error:", error.message);
    }
}
export default connectMongoDB;
