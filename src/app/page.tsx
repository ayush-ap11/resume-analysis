import Link from "next/link";
import { ArrowRight, FileText, Sparkles, Target } from "./_components/Icons";
import UploadForm from "./_components/UploadForm";

export default function Home() {
  return (
    <div className="w-full relative min-h-screen flex flex-col bg-background font-poppins overflow-hidden">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-border backdrop-blur-md bg-white/95">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-xl flex items-center text-text-primary hover:opacity-90 transition-opacity cursor-pointer"
          >
            ResumeIQ
            <span className="text-primary text-2xl leading-none">.</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link
              href="/admin/login"
              className="text-sm font-semibold text-text-secondary hover:text-primary-dark transition-colors cursor-pointer"
            >
              Admin Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 h-full">
        {/* Hero Section */}
        <section className="relative pt-20 md:pt-28 pb-16 md:pb-24 px-6 max-w-6xl mx-auto h-full flex flex-col items-center text-center">
          {/* Subtle Yellow Blob Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 md:w-[600px] md:h-[600px] rounded-full bg-primary-light/35 blur-3xl -z-10" />

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary max-w-3xl leading-[1.15] mb-6">
            Discover the Career Path Your Resume Points To
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl leading-relaxed mb-8">
            Upload your resume. Get AI-powered domain recommendations and honest
            skill analysis in seconds.
          </p>
          <a
            href="#upload"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-black rounded-full font-semibold transition-all hover:scale-[1.02] shadow-md hover:shadow-lg cursor-pointer"
          >
            Analyze My Resume
            <ArrowRight className="w-5 h-5" />
          </a>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-surface border-y border-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                How It Works
              </h2>
              <p className="text-sm md:text-base text-text-secondary">
                Get your professional alignment roadmap in three easy steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-white p-8 rounded-xl border border-border hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-4 right-6 text-5xl font-extrabold text-primary-light opacity-60 group-hover:scale-110 transition-transform select-none">
                  01
                </div>
                <div className="w-12 h-12 bg-primary-light text-primary-dark flex items-center justify-center rounded-lg mb-6">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Upload Resume
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Provide your latest resume in standard PDF format. We
                  prioritize your data security.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-8 rounded-xl border border-border hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-4 right-6 text-5xl font-extrabold text-primary-light opacity-60 group-hover:scale-110 transition-transform select-none">
                  02
                </div>
                <div className="w-12 h-12 bg-primary-light text-primary-dark flex items-center justify-center rounded-lg mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  AI Analyzes It
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Our advanced engine parses your skills, experience history,
                  and underlying career velocity.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-8 rounded-xl border border-border hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-4 right-6 text-5xl font-extrabold text-primary-light opacity-60 group-hover:scale-110 transition-transform select-none">
                  03
                </div>
                <div className="w-12 h-12 bg-primary-light text-primary-dark flex items-center justify-center rounded-lg mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Get Your Domain Match
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Receive tailored domain alignments, recommended skill gap
                  fixes, and immediate career roles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upload Form Section */}
        <section
          id="upload"
          className="py-20 md:py-28 px-6 max-w-6xl mx-auto text-center scroll-mt-20"
        >
          <div className="max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-dark bg-primary-light px-3 py-1.5 rounded-full">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-4 mb-3">
              Ready to Analyze Your Path?
            </h2>
            <p className="text-sm md:text-base text-text-secondary">
              Upload your PDF resume below and let our AI engine do the rest.
            </p>
          </div>
          <UploadForm />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-8 text-center text-sm text-text-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <p>© 2026 ResumeIQ. Built for smart job seekers.</p>
        </div>
      </footer>
    </div>
  );
}
