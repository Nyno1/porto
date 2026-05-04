"use client";
import { useState } from "react";

const categories = [
  {
    label: "Frontend",
    techs: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    label: "Backend",
    techs: [
      { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
      { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    ],
  },
  {
    label: "Database",
    techs: [
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Prisma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
    ],
  },
  {
    label: "Tools & DevOps",
    techs: [
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    ],
  },
];

export default function TechCards() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [pressedBtn, setPressedBtn] = useState<string | null>(null);

  const visibleCategories = activeCategory
    ? categories.filter((c) => c.label === activeCategory)
    : categories;

  const handleCategoryClick = (label: string | null) => {
    setPressedBtn(label ?? "all");
    setTimeout(() => setPressedBtn(null), 200);
    setActiveCategory(label === activeCategory ? null : label);
  };

  return (
    <section className="bg-[#0A0A0A] min-h-screen flex flex-col items-center justify-center px-4 md:px-20 py-20">
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardPop {
          0%   { opacity: 0; transform: scale(0.92) translateY(12px); }
          60%  { transform: scale(1.02) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes btnPress {
          0%   { transform: scale(1); }
          40%  { transform: scale(0.88); }
          100% { transform: scale(1); }
        }
        @keyframes ripple {
          0%   { transform: scale(0); opacity: 0.4; }
          100% { transform: scale(3); opacity: 0; }
        }
        .anim-fadeSlideIn { animation: fadeSlideIn 0.4s ease both; }
        .anim-cardPop     { animation: cardPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
        .anim-btnPress    { animation: btnPress 0.2s ease forwards; }
      `}</style>

      <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3 anim-fadeSlideIn" style={{ animationDelay: "0ms" }}>Skills</p>
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center anim-fadeSlideIn" style={{ animationDelay: "80ms" }}>
        My Tech Stack
      </h2>
      <p className="text-[#888888] text-sm md:text-base text-center mb-10 max-w-lg anim-fadeSlideIn" style={{ animationDelay: "140ms" }}>
        Teknologi yang saya kuasai untuk membangun produk digital yang cepat, skalabel, dan maintainable.
      </p>

      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2 mb-12 justify-center anim-fadeSlideIn" style={{ animationDelay: "200ms" }}>
        <button
          onClick={() => handleCategoryClick(null)}
          className={`relative overflow-hidden px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 select-none ${
            activeCategory === null
              ? "bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.25)]"
              : "bg-transparent text-[#888888] border-[#2A2A2A] hover:border-[#555] hover:text-white"
          } ${pressedBtn === "all" ? "anim-btnPress" : ""}`}
        >
          {pressedBtn === "all" && (
            <span
              className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-white/30 pointer-events-none"
              style={{ animation: "ripple 0.4s ease-out forwards" }}
            />
          )}
          All
        </button>

        {categories.map((c) => (
          <button
            key={c.label}
            onClick={() => handleCategoryClick(c.label)}
            className={`relative overflow-hidden px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 select-none ${
              activeCategory === c.label
                ? "bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                : "bg-transparent text-[#888888] border-[#2A2A2A] hover:border-[#555] hover:text-white"
            } ${pressedBtn === c.label ? "anim-btnPress" : ""}`}
          >
            {pressedBtn === c.label && (
              <span
                className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-white/30 pointer-events-none"
                style={{ animation: "ripple 0.4s ease-out forwards" }}
              />
            )}
            {c.label}
          </button>
        ))}
      </div>

      {/* Category cards */}
      <div className="flex flex-col gap-8 w-full max-w-5xl">
        {visibleCategories.map((cat, catIdx) => (
          <div
            key={cat.label}
            className="rounded-2xl bg-[#111111] border border-[#2A2A2A] p-6 hover:border-[#3A3A3A] transition-colors duration-200 anim-cardPop"
            style={{ animationDelay: `${catIdx * 60}ms` }}
          >
            <h3 className="text-[#888888] text-xs font-semibold tracking-widest uppercase mb-5">
              {cat.label}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {cat.techs.map((tech, techIdx) => (
                <div
                  key={tech.name}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[#0A0A0A] border border-[#2A2A2A] hover:border-blue-500/40 hover:bg-[#0F1520] transition-all duration-200 cursor-default group anim-cardPop"
                  style={{
                    animationDelay: `${catIdx * 60 + techIdx * 50}ms`,
                    boxShadow: hoveredTech === tech.name
                      ? "0 0 20px rgba(59,130,246,0.15), 0 0 40px rgba(59,130,246,0.05)"
                      : "none",
                  }}
                >
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-10 h-10 transition-transform duration-300 group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                    style={{
                      filter: tech.name === "Next.js" || tech.name === "Express" ? "invert(1)" : undefined,
                    }}
                  />
                  <span className="text-[#CCCCCC] text-sm font-medium group-hover:text-white transition-colors duration-200">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}