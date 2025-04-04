import User from "@/models/user";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB() 
        const { email } = req.json()
        const user = await User.findOne({email}).select("_id")
        console.log(`User: ${user}`);
        return NextResponse.json({ user })
        
    } catch (error) {
        console.log(`Error in userExists route: ${error}`);
        
    }
}