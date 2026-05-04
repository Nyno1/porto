"use client";
import React from "react";

const experiences = [
  {
    company: "SMK Informatika Pesat",
    role: "Siswa RPL (Rekayasa Perangkat Lunak)",
    period: "2022 – Sekarang",
    type: "Education",
    achievements: [
      "Mempelajari pemrograman web, desktop, dan mobile secara intensif",
      "Aktif mengerjakan project praktek termasuk sistem hotel dan beasiswa",
      "Menguasai Laravel, PHP, MySQL, dan ekosistem modern JavaScript",
    ],
  },
  {
    company: "Komunitas Katakans",
    role: "Web Developer",
    period: "2024",
    type: "Project",
    achievements: [
      "Membangun website komunitas Katakans dari nol bersama tim",
      "Menangani arsitektur backend dan integrasi database MySQL",
      "Berkolaborasi menggunakan Git & GitHub untuk version control",
    ],
  },
  {
    company: "Latihan BNSP",
    role: "Full-Stack Developer",
    period: "2023 – 2024",
    type: "Certification",
    achievements: [
      "Mengerjakan 3 project lengkap: hotel booking, beasiswa, dan perpustakaan",
      "Menerapkan CRUD penuh dengan validasi dan autentikasi user",
      "Mempersiapkan diri untuk uji kompetensi nasional BNSP",
    ],
  },
];

const typeColors: Record<string, string> = {
  Education: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Project: "bg-green-500/10 text-green-400 border-green-500/20",
  Certification: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function Experience() {
  return (
    <section className="bg-[#0A0A0A] px-4 md:px-20 py-20">
      <div className="max-w-4xl mx-auto">
        <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3 text-center">
          Experience
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center">
          My Journey
        </h2>
        <p className="text-[#888888] text-sm md:text-base text-center mb-16 max-w-lg mx-auto">
          Perjalanan belajar dan pengalaman project yang membentuk saya sebagai developer.
        </p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#2A2A2A] -translate-x-1/2 hidden md:block" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row gap-6 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Card */}
                <div className="flex-1 md:max-w-[calc(50%-2rem)]">
                  <div className="rounded-2xl bg-[#111111] border border-[#2A2A2A] p-6 hover:border-[#3A3A3A] transition-colors duration-200">
                    <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                      <div>
                        <h3 className="text-white font-bold text-lg">{exp.company}</h3>
                        <p className="text-[#888888] text-sm">{exp.role}</p>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full border font-medium flex-shrink-0 ${typeColors[exp.type]}`}
                      >
                        {exp.type}
                      </span>
                    </div>

                    <p className="text-xs text-[#888888] mb-4 flex items-center gap-1.5">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {exp.period}
                    </p>

                    <ul className="space-y-2">
                      {exp.achievements.map((a, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#888888]">
                          <span className="text-blue-400 mt-0.5 flex-shrink-0">▸</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex items-start justify-center w-8 flex-shrink-0 pt-6">
                  <div className="w-3 h-3 rounded-full bg-blue-500 ring-4 ring-[#0A0A0A] border border-blue-400" />
                </div>

                {/* Spacer for alternating */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}