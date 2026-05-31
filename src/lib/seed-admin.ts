import bcrypt from "bcryptjs";
import Admin from "../models/Admin";
import connectDB from "./mongodb";

export async function seedAdmin() {
  await connectDB();

  const email = process.env.ADMIN_EMAIL || "admin@resumeiq.com";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.log(
      "Seed Admin: Skipping seeding. ADMIN_PASSWORD is not defined in env.",
    );
    return;
  }

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log(`Seed Admin: Admin already exists with email: ${email}`);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      email,
      password: hashedPassword,
    });

    console.log(`Seed Admin: Successfully seeded admin account: ${email}`);
  } catch (error) {
    console.error("Seed Admin: Error seeding admin account:", error);
  }
}
