import mongoose, { Schema, Model } from "mongoose";

const SubmissionSchema = new Schema(
  {
    submitterName: { type: String, required: true },
    submitterEmail: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    resumePublicId: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    analysis: { type: Schema.Types.Mixed, default: null },
  },
  {
    timestamps: true,
  },
);

const Submission: Model<any> =
  mongoose.models.Submission || mongoose.model("Submission", SubmissionSchema);

export default Submission;
