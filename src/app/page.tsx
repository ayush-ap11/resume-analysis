import Link from "next/link";
import UploadForm from "./_components/UploadForm";

export default function Home() {
  return (
    <div className="w-full relative min-h-screen flex flex-col bg-[var(--background)] font-poppins overflow-hidden">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-[var(--white)] border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-xl flex items-center text-[var(--text-primary)] hover:opacity-90 transition-opacity cursor-pointer"
          >
            ResumeIQ
            <span className="text-[var(--primary)] text-2xl leading-none">.</span>
          </Link>
          <nav className="flex items-center">
            <Link
              href="/admin/login"
              className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--primary-dark)] transition-colors cursor-pointer"
            >
              Admin Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-6">
        <div className="w-full max-w-[520px] text-center space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[var(--primary-dark)] bg-[var(--primary-light)] px-3 py-1.5 rounded-full">
              AI Resume Screening
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Submit Your Resume
            </h1>
            <p className="text-sm md:text-base text-[var(--text-secondary)]">
              Fill in your details and upload your PDF to get started.
            </p>
          </div>

          <UploadForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--white)] border-t border-[var(--border)] py-6 text-center text-xs text-[var(--text-muted)]">
        <div className="max-w-6xl mx-auto px-6">
          <p>© 2026 ResumeIQ. Powered by AI.</p>
        </div>
      </footer>
    </div>
  );
}
