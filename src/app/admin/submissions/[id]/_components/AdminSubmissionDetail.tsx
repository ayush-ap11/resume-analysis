"use client";

import React from "react";
import Link from "next/link";
import { SubmissionDocument } from "@/src/types/analysis";
import { ArrowLeft } from "@/src/app/results/[id]/_components/ResultIcons";
import DomainCards from "@/src/app/results/[id]/_components/DomainCards";
import QualityCards from "@/src/app/results/[id]/_components/QualityCards";

// SVG Icons
const ExternalLink = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

const Loader2 = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const AlertCircle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

interface AdminSubmissionDetailProps {
  submission: SubmissionDocument;
}

export default function AdminSubmissionDetail({
  submission,
}: AdminSubmissionDetailProps) {
  const formattedDate = new Date(submission.uploadedAt).toLocaleString(
    "en-US",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  );

  const getStatusBadge = (status: SubmissionDocument["status"]) => {
    switch (status) {
      case "completed":
        return "bg-primary text-black font-semibold border border-primary";
      case "pending":
        return "bg-surface-2 text-text-secondary border border-border font-medium";
      case "failed":
        return "bg-red-50 text-red-600 border border-red-100 font-semibold";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background font-poppins text-text-primary flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-border backdrop-blur-md bg-white/95 h-16 flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer select-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="text-right text-[10px] text-text-muted hidden sm:block">
            <span className="font-semibold block text-text-secondary select-all">
              ID: {submission._id}
            </span>
            <span className="mt-0.5 block">{formattedDate}</span>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full space-y-10">
        {/* Header Title */}
        <div className="text-left space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary">
            Submission Details
          </h1>
          <p className="text-xs md:text-sm text-text-secondary font-medium">
            Review candidate metrics and AI-generated analysis.
          </p>
        </div>

        {/* Submitter Info Card */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-border border-l-4 border-l-primary shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-text-primary">
                {submission.submitterName}
              </h2>
              <span
                className={`text-[10px] px-2.5 py-1 rounded-full select-none ${getStatusBadge(
                  submission.status,
                )}`}
              >
                {submission.status}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs md:text-sm text-text-secondary">
              <p>
                <strong>Email:</strong> {submission.submitterEmail}
              </p>
              <p>
                <strong>Submitted At:</strong> {formattedDate}
              </p>
            </div>
          </div>
          <a
            href={`/api/view-pdf?url=${encodeURIComponent(submission.resumeUrl)}&filename=${encodeURIComponent(
              `${submission.submitterName.replace(/\s+/g, "_")}_Resume.pdf`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-black rounded-lg font-semibold transition-all hover:scale-[1.02] shadow-sm cursor-pointer text-sm"
          >
            <ExternalLink />
            <span>View Resume PDF</span>
          </a>
        </section>

        {/* 1. Pending State Card */}
        {submission.status === "pending" && (
          <div className="bg-white p-8 rounded-xl border border-border shadow-sm text-center flex flex-col items-center justify-center space-y-4 py-16">
            <div className="w-12 h-12 bg-primary-light flex items-center justify-center rounded-full text-primary-dark">
              <Loader2 className="animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-text-primary">
                Analysis processing
              </h3>
              <p className="text-sm text-text-secondary">
                Your resume is currently being parsed. Please refresh in a
                moment to review insights.
              </p>
            </div>
          </div>
        )}

        {/* 2. Failed State Card */}
        {submission.status === "failed" && (
          <div className="bg-white p-8 rounded-xl border border-border shadow-sm text-center flex flex-col items-center justify-center space-y-4 py-16">
            <div className="w-12 h-12 bg-red-50 text-red-600 flex items-center justify-center rounded-full border border-red-100">
              <AlertCircle />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-text-primary">
                Analysis failed for this submission
              </h3>
              <p className="text-sm text-text-secondary">
                The parsing pipeline encountered an error. Candidate may need to
                re-upload.
              </p>
            </div>
          </div>
        )}

        {/* 3. Completed State Sections */}
        {submission.status === "completed" && submission.analysis && (
          <div className="space-y-10">
            {/* AI Summary Card */}
            <section className="bg-white p-6 md:p-8 rounded-xl border border-border border-l-4 border-l-primary shadow-sm space-y-3">
              <h2 className="text-xs uppercase font-bold tracking-widest text-text-muted">
                AI Executive Summary
              </h2>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed font-medium">
                {submission.analysis.summary}
              </p>
            </section>

            {/* Domain Matches Grid */}
            <section className="space-y-6">
              <div className="text-left">
                <h3 className="text-xl font-bold text-text-primary">
                  Domain Fit Insights
                </h3>
                <p className="text-sm text-text-secondary">
                  Career alignment index and gaps parsing.
                </p>
              </div>
              <DomainCards domains={submission.analysis.domains} />
            </section>

            {/* Key Qualities */}
            <section className="space-y-6">
              <div className="text-left">
                <h3 className="text-xl font-bold text-text-primary">
                  Strongest Skills
                </h3>
                <p className="text-sm text-text-secondary">
                  Standout signal attributes from the resume.
                </p>
              </div>
              <QualityCards qualities={submission.analysis.qualities} />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
