import mongoose from "mongoose";
import {Tweet} from "../models/tweetSchema.js"; 
import dotenv from "dotenv";

dotenv.config({
    path:"../config/.env"
})

const dropUnnecessaryIndexes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Tweet.collection.dropIndex('comments.userSchema.username_1');
        console.log("Dropped unnecessary index");
    } catch (error) {
        console.error("Error dropping index:", error);
    } finally {
        mongoose.disconnect();
    }
};

export default dropUnnecessaryIndexes;
