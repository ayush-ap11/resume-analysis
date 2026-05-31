import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/src/lib/mongodb";
import Submission from "@/src/models/Submission";
import { uploadToCloudinary, callGemini } from "@/src/lib/analyze-helpers";

const GEMINI_PROMPT = `
You are an expert career counselor and resume analyst. Analyze this resume deeply and return ONLY a valid JSON object with no markdown, no backticks, no explanation.

JSON structure:
{
  "summary": "2-3 sentence honest overall assessment",
  "domains": [
    {
      "name": "Domain name",
      "confidence": "High|Medium|Low",
      "rationale": "2 sentence evidence-based reason from the resume",
      "gap": "One specific skill or experience missing to be competitive"
    }
  ],
  "qualities": [
    {
      "title": "Quality title",
      "description": "One sentence specific to their resume, not generic"
    }
  ]
}

Rules:
- Return exactly 2-3 domains, ordered by confidence
- Return exactly 3-4 qualities, only the strongest signals
- Be direct and specific, reference actual content from their resume
- Never be generic (avoid: hardworking, team player, fast learner)
- qualities descriptions must reference specific projects or skills from the resume
`;

export async function POST(req: NextRequest) {
  let createdDocId: string | null = null;

  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const file = formData.get("resume") as File | null;

    // 1. Validation Checks
    if (!name || !email || !file) {
      return NextResponse.json(
        { error: "All fields (name, email, resume) are required." },
        { status: 400 },
      );
    }

    const isPDF =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");
    const isUnder5MB = file.size <= 5 * 1024 * 1024;

    if (!isPDF) {
      return NextResponse.json(
        { error: "Resume must be a PDF file." },
        { status: 400 },
      );
    }

    if (!isUnder5MB) {
      return NextResponse.json(
        { error: "Resume file size must be under 5MB." },
        { status: 400 },
      );
    }

    // 2. Connect to Database
    await connectDB();

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Upload File to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(buffer);

    // 4. Create database Submission record in "pending" status
    const submissionDoc = await Submission.create({
      submitterName: name,
      submitterEmail: email,
      resumeUrl: cloudinaryResult.secure_url,
      resumePublicId: cloudinaryResult.public_id,
      status: "pending",
      analysis: null,
    });
    createdDocId = submissionDoc._id.toString();

    // 5. Convert PDF file to base64 string
    const base64Data = buffer.toString("base64");

    // 6. Call Google Gemini 2.5 Flash
    const analysisResult = await callGemini(base64Data, GEMINI_PROMPT);

    // 7. Update Submission Document to "completed" status
    await Submission.findByIdAndUpdate(createdDocId, {
      status: "completed",
      analysis: {
        summary: analysisResult.summary,
        domains: analysisResult.domains,
        qualities: analysisResult.qualities,
      },
    });

    return NextResponse.json({
      success: true,
      submissionId: createdDocId,
    });
  } catch (error: any) {
    console.error("Resume Analysis API Error:", error);

    // 8. Safeguard: Set status to "failed" on any runtime crash
    if (createdDocId) {
      try {
        await connectDB();
        await Submission.findByIdAndUpdate(createdDocId, { status: "failed" });
      } catch (dbError) {
        console.error("Failed to update status to failed in DB:", dbError);
      }
    }

    return NextResponse.json(
      {
        error: error?.message || "An internal error occurred during analysis.",
      },
      { status: 500 },
    );
  }
}
