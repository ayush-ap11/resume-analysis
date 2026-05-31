"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, FileText } from "./Icons";

export default function UploadForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "" });
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (f: File) => {
    setError("");
    const isPDF =
      f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
    if (!isPDF) return setError("Please select a PDF file only.");
    if (f.size > 5 * 1024 * 1024)
      return setError("File size exceeds 5MB limit.");
    setFile(f);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.name.trim() || !form.email.trim())
      return setError("Please enter your name and email.");
    if (!file) return setError("Please upload your PDF resume.");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("resume", file);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed.");
      router.push("/results/" + data.submissionId);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 bg-white p-6 md:p-8 rounded-lg border border-border shadow-md text-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        {["name", "email"].map((field) => (
          <div key={field} className="space-y-1.5">
            <label
              htmlFor={field}
              className="text-xs font-semibold text-text-secondary capitalize cursor-pointer"
            >
              {field === "name" ? "Full Name" : "Email Address"}
            </label>
            <input
              id={field}
              type={field === "name" ? "text" : "email"}
              placeholder={field === "name" ? "John Doe" : "john@example.com"}
              value={form[field as "name" | "email"]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              disabled={loading}
              className="w-full px-4 py-2.5 rounded-md border border-border focus:border-primary focus:ring-2 focus:ring-primary-light focus:outline-none placeholder:text-text-muted text-text-primary bg-surface cursor-pointer"
            />
          </div>
        ))}
      </div>

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files?.[0])
            validateAndSetFile(e.dataTransfer.files[0]);
        }}
        onClick={() => !loading && fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          dragActive
            ? "border-primary bg-primary-light"
            : file
              ? "border-primary bg-surface"
              : "border-border hover:border-primary hover:bg-surface"
        } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={(e) =>
            e.target.files?.[0] && validateAndSetFile(e.target.files[0])
          }
          disabled={loading}
          className="hidden"
        />

        {file ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-primary-light flex items-center justify-center rounded-full text-primary-dark">
              <FileText className="w-6 h-6" />
            </div>
            <p className="font-semibold text-text-primary">{file.name}</p>
            <p className="text-xs text-text-muted">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-surface-2 flex items-center justify-center rounded-full text-text-secondary">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="font-medium text-text-primary">
              <span className="text-primary-dark font-semibold">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-text-muted font-medium">
              PDF files only (Max 5MB)
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-600 bg-red-50 p-2.5 rounded-md border border-red-100 text-left font-medium">
          ⚠️ {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-3.5 rounded-md font-semibold text-black bg-primary hover:bg-primary-dark active:scale-[0.98] transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-black"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Analyzing...
          </>
        ) : (
          <>
            Analyze My Resume <span className="text-base font-bold">→</span>
          </>
        )}
      </button>
    </div>
  );
}
