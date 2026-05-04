"use client";
import React, { useEffect, useState } from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const roles = ["Backend Developer", "Full-Stack Developer", "Web Developer"];

export function ShootingStarsAndStarsBackgroundDemo() {
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 80);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 45);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((r) => (r + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <div className="h-screen flex flex-col items-center justify-center relative w-full overflow-hidden bg-[#0A0A0A]">
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Available badge */}
      <div className="relative z-10 flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#2A2A2A] bg-[#111111] text-sm text-gray-400">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        Available for freelance &amp; full-time
      </div>

      {/* Main headline */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-4">
          Nashat Akram
        </h1>
        <div className="text-2xl md:text-3xl font-semibold text-[#CCCCCC] mb-6 h-10 flex items-center justify-center gap-2">
          <span>I&apos;m a</span>
          <span className="text-blue-400">
            {displayed}
            <span className="animate-pulse">|</span>
          </span>
        </div>
        <p className="text-base md:text-lg text-[#888888] max-w-xl mx-auto mb-10 leading-relaxed">
          Building fast, scalable web apps with modern tech stacks. Currently a
          student at SMK Informatika Pesat — RPL.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="#project"
            className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 text-sm"
          >
            See My Work
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-transparent border border-[#2A2A2A] text-white font-semibold rounded-md hover:border-white transition-all duration-300 text-sm"
          >
            Download CV
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6 text-[#888888]">
          {[
            {
              label: "GitHub",
              href: "https://github.com/Nyno1",
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              ),
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/nashat-akram-537146390/",
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              ),
            },
            {
              label: "Twitter",
              href: "https://x.com/nynxd19711",
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              ),
            },
            {
              label: "Instagram",
              href: "https://www.instagram.com/__akramzz/",
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              ),
            },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="hover:text-white transition-colors duration-200"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Star decorations */}
      <svg
        className="absolute top-24 right-16 text-blue-400/40 hidden md:block"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" />
      </svg>
      <svg
        className="absolute bottom-32 left-20 text-purple-400/30 hidden md:block"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" />
      </svg>
      <svg
        className="absolute top-40 left-32 text-blue-300/20 hidden md:block"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" />
      </svg>

      <ShootingStars />
      <StarsBackground />
    </div>
  );
}