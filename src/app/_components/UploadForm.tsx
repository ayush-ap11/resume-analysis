"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DropZone from "./DropZone";

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
      router.push("/thank-you");
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[520px] mx-auto space-y-6 bg-[var(--white)] p-6 md:p-8 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow-md)] text-sm">
      <div className="space-y-4 text-left">
        {["name", "email"].map((field) => (
          <div key={field} className="space-y-1.5">
            <label
              htmlFor={field}
              className="text-xs font-semibold text-[var(--text-secondary)] capitalize cursor-pointer"
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
              className="w-full px-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)] focus:outline-none placeholder:text-[var(--text-muted)] text-[var(--text-primary)] bg-[var(--surface)] cursor-pointer"
            />
          </div>
        ))}
      </div>

      <DropZone
        file={file}
        dragActive={dragActive}
        loading={loading}
        handleDrag={handleDrag}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files?.[0])
            validateAndSetFile(e.dataTransfer.files[0]);
        }}
        onClick={() => !loading && fileInputRef.current?.click()}
        fileInputRef={fileInputRef}
        onFileChange={(e) =>
          e.target.files?.[0] && validateAndSetFile(e.target.files[0])
        }
      />

      {error && (
        <p className="text-[var(--error)] bg-[var(--error-light)] p-2.5 rounded-[var(--radius-sm)] border border-[var(--error-border)] text-left font-medium">
          ⚠️ {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-3.5 rounded-[var(--radius-sm)] font-semibold text-[var(--white)] bg-[var(--primary)] hover:bg-[var(--primary-dark)] active:scale-[0.98] transition-all cursor-pointer shadow-[var(--shadow-sm)] flex items-center justify-center gap-2 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-[var(--white)]"
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
            Submitting...
          </>
        ) : (
          <>
            Submit Resume <span className="text-base font-bold">→</span>
          </>
        )}
      </button>
    </div>
  );
}
