/**
 * POST /api/admin/signup
 * Body (raw JSON):
 * {
 *   "email": "admin@resumeiq.com",
 *   "password": "yourpassword",
 *   "secretKey": "your_secret_key_here"
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/src/lib/mongodb";
import Admin from "@/src/models/Admin";

export async function POST(req: NextRequest) {
  try {
    const { email, password, secretKey } = await req.json();

    // 1. Validate fields
    if (!email || !password || !secretKey) {
      return NextResponse.json(
        { error: "Email, password, and secretKey are required." },
        { status: 400 },
      );
    }

    // 2. Validate secret key against env variable
    const expectedSecretKey = process.env.ADMIN_SECRET_KEY;
    if (!expectedSecretKey || secretKey !== expectedSecretKey) {
      return NextResponse.json(
        { error: "Unauthorized. Secret key mismatch." },
        { status: 401 },
      );
    }

    // 3. Connect to Database
    await connectDB();

    // 4. Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin already exists." },
        { status: 409 },
      );
    }

    // 5. Hash password and create admin document
    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { success: true, message: "Admin created successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Admin Signup API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error occurred." },
      { status: 500 },
    );
  }
}
