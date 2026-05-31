import connectDB from "./mongodb";
import Submission from "../models/Submission";

export async function getAllSubmissions(): Promise<any[]> {
  try {
    await connectDB();
    const docs = await Submission.find({}).sort({ uploadedAt: -1 }).lean();

    return docs.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
      uploadedAt:
        doc.uploadedAt instanceof Date
          ? doc.uploadedAt.toISOString()
          : new Date(doc.uploadedAt).toISOString(),
    }));
  } catch (error) {
    console.error("Error in getAllSubmissions:", error);
    return [];
  }
}
