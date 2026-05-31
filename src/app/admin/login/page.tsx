import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import AdminLoginForm from "./_components/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login — ResumeIQ",
};

export default function AdminLoginPage() {
  return (
    <div className="relative min-h-screen bg-background font-poppins text-text-primary flex flex-col items-center justify-center p-6">
      {/* Subtle Yellow Blob Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[500px] md:h-[500px] rounded-full bg-primary-light/25 blur-3xl -z-10" />

      <div className="w-full flex flex-col items-center justify-center space-y-6">
        <Link
          href="/"
          className="font-bold text-2xl flex items-center text-text-primary hover:opacity-90 transition-opacity cursor-pointer select-none"
        >
          ResumeIQ<span className="text-primary text-3xl leading-none">.</span>
        </Link>

        <AdminLoginForm />
      </div>
    </div>
  );
}
