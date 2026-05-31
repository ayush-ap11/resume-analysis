import mongoose from "mongoose";
import connectDB from "./mongodb";
import Submission from "../models/Submission";

export async function getSubmission(id: string): Promise<any | null> {
  // Validate Mongo ID to prevent CastError before querying
  if (!id || !mongoose.isValidObjectId(id)) {
    return null;
  }

  try {
    await connectDB();
    const doc = await Submission.findById(id).lean();

    if (!doc) {
      return null;
    }

    // Convert _id and Date objects to plain strings for clean Next.js serialization
    return {
      ...doc,
      _id: doc._id.toString(),
      uploadedAt:
        doc.uploadedAt instanceof Date
          ? doc.uploadedAt.toISOString()
          : new Date(doc.uploadedAt).toISOString(),
    };
  } catch (error) {
    return null;
  }
}
