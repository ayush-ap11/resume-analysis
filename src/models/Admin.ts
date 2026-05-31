import mongoose, { Schema, Model } from "mongoose";

const AdminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

const Admin: Model<any> =
  mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;
