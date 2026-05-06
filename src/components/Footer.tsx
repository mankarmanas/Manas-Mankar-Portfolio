"use client";

import { Github, Linkedin, Mail, Heart, Brain } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const { personal } = portfolioData;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
              <Brain size={16} className="text-primary-light" />
            </div>
            <span className="font-bold text-text-primary">
              Manas<span className="text-primary-light">.</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-text-muted text-sm">
            © {year} Manas Mankar
          </p>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-2 transition-all"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-text-muted hover:text-accent hover:bg-surface-2 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="p-2 rounded-lg text-text-muted hover:text-primary-light hover:bg-surface-2 transition-all"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
