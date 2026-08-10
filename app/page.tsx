"use client";

import * as React from "react";
import { Github, Linkedin, ExternalLink } from "lucide-react";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";
import { MorphingText } from "@/components/ui/liquid-text";

// ── Data ───────────────────────────────────────────────────────────────────

const MORPH_TEXTS = [
  "ML Engineer",
  "NLP Engineer",
  "PTA Medan",
  "Fadil Iyad Rofid",
  "Build & Ship",
];

const CERT_SLIDES = [
  { src: "/cert/cert-google-ai.png", alt: "Google AI Professional Certificate" },
  { src: "/cert/cert-google-ai-career-certificate.png", alt: "Google AI Career Certificate" },
  { src: "/cert/cert-google-certificate-for-students.png", alt: "Google Certificate for Students" },
  { src: "/cert/cert-hcia-ai.png", alt: "HCIA-AI V4.0" },
  { src: "/cert/cert-hcia-datacom.png", alt: "HCIA-Datacom V1.0" },
  { src: "/cert/ibm-ai-foundations-professional-certificate.png", alt: "IBM AI Foundations" },
];

// ── Types ───────────────────────────────────────────────────────────────────

interface GithubRepo {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage: string | null;
}

// ── Loading Screen ──────────────────────────────────────────────────────────

function LoadingScreen({ onDone }: { onDone: () => void }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <MorphingText texts={MORPH_TEXTS} className="text-white tracking-tight" />
      <div className="mt-8 h-px w-48 bg-zinc-800" />
    </div>
  );
}

// ── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="fixed top-0 z-40 w-full px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <span className="font-mono text-sm font-medium text-zinc-200">FIR</span>
        <div className="flex items-center gap-6">
          <a href="#project" className="text-xs text-zinc-400 transition-colors hover:text-white">Project</a>
          <a href="#certificates" className="text-xs text-zinc-400 transition-colors hover:text-white">Certificate</a>
          <a href="#about" className="text-xs text-zinc-400 transition-colors hover:text-white">About</a>
          <a href="https://github.com/fadilyadd" target="_blank" rel="noopener" className="text-zinc-400 transition-colors hover:text-white">
            <Github className="size-4" />
          </a>
          <a href="https://www.linkedin.com/in/fadil-iyad-rofid-" target="_blank" rel="noopener" className="text-zinc-400 transition-colors hover:text-white">
            <Linkedin className="size-4" />
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center px-6">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-[#e8ff47]/5 blur-3xl" />
      </div>

      <div className="relative z-10 text-center">
        <p className="mb-4 font-mono text-xs tracking-widest text-zinc-500 uppercase">Portfolio</p>
        <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
          Fadil Iyad<br />Rofid
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-zinc-400">
          91 public repositories — ML, NLP, Deep Learning, Generative AI.
          End-to-end pipelines with working demos.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="#project"
            className="rounded-full bg-[#e8ff47] px-5 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-80">
            View Projects
          </a>
          <a href="https://github.com/fadilyadd" target="_blank" rel="noopener"
            className="rounded-full border border-zinc-700 px-5 py-2 text-xs text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white">
            GitHub
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="h-px w-6 bg-zinc-600" />
      </div>
    </section>
  );
}

// ── Project Section ─────────────────────────────────────────────────────────

function ProjectSection() {
  const [repos, setRepos] = React.useState<GithubRepo[]>([]);
  const [filter, setFilter] = React.useState<string>("All");
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    fetch("https://api.github.com/users/fadilyadd/repos?per_page=100&sort=updated&type=public")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setRepos(data); })
      .catch(() => {});
  }, []);

  const languages = ["All", ...Array.from(new Set(repos.map(r => r.language).filter(Boolean)))].sort((a, b) =>
    a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)
  ) as string[];

  const filtered = repos.filter(r => {
    const matchLang = filter === "All" || r.language === filter;
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || (r.description || "").toLowerCase().includes(search.toLowerCase());
    return matchLang && matchSearch;
  });

  return (
    <section id="project" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="mb-2 font-mono text-xs tracking-widest text-zinc-500 uppercase">01 / Project</p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Public Repositories</h2>
          <p className="mt-3 max-w-md text-sm text-zinc-400">{repos.length} projects and counting</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {languages.map(lang => (
            <button key={lang} onClick={() => setFilter(lang)}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${filter === lang ? "bg-[#e8ff47] text-black font-medium" : "border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"}`}>
              {lang}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-10 w-full max-w-sm rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-white placeholder-zinc-600 focus:border-zinc-600 focus:outline-none"
        />

        {/* Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 60).map(repo => (
            <a key={repo.name} href={repo.html_url} target="_blank" rel="noopener"
              className="group relative flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 transition-all hover:border-zinc-700">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-mono text-sm font-medium text-white group-hover:text-[#e8ff47]">{repo.name}</h3>
                <ExternalLink className="size-3 shrink-0 text-zinc-600 transition-colors group-hover:text-zinc-400" />
              </div>
              <p className="text-xs leading-relaxed text-zinc-500 line-clamp-2">{repo.description || "No description"}</p>
              <div className="mt-auto flex items-center gap-2">
                {repo.language && (
                  <span className="font-mono text-[10px] text-zinc-600">{repo.language}</span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Certificate Section ─────────────────────────────────────────────────────

function CertificateSection() {
  return (
    <section id="certificates" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="mb-2 font-mono text-xs tracking-widest text-zinc-500 uppercase">02 / Certificates</p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Certifications</h2>
          <p className="mt-3 max-w-md text-sm text-zinc-400">Professional certifications and course completions</p>
        </div>
        <CoverflowCarousel
          slides={CERT_SLIDES}
          showCaption
          showPagination
          showNavigation
          label="Certificate gallery"
          cardClassName="bg-zinc-900"
        />
      </div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="mb-2 font-mono text-xs tracking-widest text-zinc-500 uppercase">03 / About</p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Who I Am</h2>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-sm leading-relaxed text-zinc-400">
              Information Technology student with a focus on Machine Learning and NLP.
              Building ML and NLP projects independently — from model experiments and training
              to API deployment and working demos.
            </p>
            <p className="text-sm leading-relaxed text-zinc-400">
              Currently doing an internship at PTA Medan, supporting the development of the
              IKPA (Indeks Kinerja Peradilan Agama) case management system.
            </p>
            <p className="text-sm leading-relaxed text-zinc-400">
              Comfortable with Python, PyTorch, scikit-learn, HuggingFace Transformers,
              Flask, and FastAPI. Interested in AI applications that are actually usable
              and solve real problems.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-mono text-xs tracking-widest text-zinc-500 uppercase">Stack</h3>
            <div className="flex flex-wrap gap-2">
              {["Python", "PyTorch", "scikit-learn", "TensorFlow", "HuggingFace", "Flask", "FastAPI", "Streamlit", "ChromaDB", "RAG", "LLM"].map(s => (
                <span key={s} className="rounded border border-zinc-800 px-2 py-1 font-mono text-[10px] text-zinc-400">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-zinc-900 px-6 py-12">
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-6 text-center">
        <p className="text-lg font-bold text-white">Fadil Iyad Rofid</p>
        <div className="flex items-center gap-6">
          <a href="https://github.com/fadilyadd" target="_blank" rel="noopener" className="text-zinc-500 transition-colors hover:text-white">
            <Github className="size-5" />
          </a>
          <a href="https://www.linkedin.com/in/fadil-iyad-rofid-" target="_blank" rel="noopener" className="text-zinc-500 transition-colors hover:text-white">
            <Linkedin className="size-5" />
          </a>
        </div>
        <p className="font-mono text-[10px] text-zinc-700">&copy; 2026 All rights reserved</p>
      </div>
    </footer>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function Home() {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <div className={`min-h-screen bg-black text-white transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <Nav />
        <Hero />
        <ProjectSection />
        <CertificateSection />
        <AboutSection />
        <Footer />
      </div>
    </>
  );
}
