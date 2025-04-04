import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connected to Database successfully`);
        
    } catch (error) {
        console.log(`Error connecting to database: ${error}`);
        
    }
}