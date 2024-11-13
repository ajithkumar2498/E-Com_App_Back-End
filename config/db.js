import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const connectDB = async ()=> {
    try {
        
        mongoose.connect(`${process.env.MONGODB_URL}${process.env.DB_NAME} `)
    } catch (error) {
        console.log(error)
    }
}

export default connectDB

