import User from "@/models/user";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectDB();

        const { name, email, password } = await req.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 } 
            );
        }

         
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error in user registration:", error);

        if (error.code === 11000) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "An error occurred while registering", error: error.message },
            { status: 500 }
        );
    }
}
