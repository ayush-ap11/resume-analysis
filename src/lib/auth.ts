import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "./mongodb";
import Admin from "../models/Admin";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) {
          return null;
        }

        await connectDB();
        const admin = await Admin.findOne({ email });

        if (!admin) {
          return null;
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
          return null;
        }

        return {
          id: admin._id.toString(),
          email: admin.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
});
