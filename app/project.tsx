import React from "react";

const githubRepos = [
  {
    title: "Website Katakans",
    description: "Website untuk komunitas katakans — platform komunitas dengan fitur interaksi anggota.",
    image: "1.png",
    link: "https://github.com/Alezonythh/katakans_Web",
    liveLink: null,
    tags: ["Laravel", "PHP", "MySQL", "Tailwind"],
    metric: "Community platform",
  },
  {
    title: "Website Sertifikat Digital",
    description: "Platform untuk mencari dan melihat sertifikat digital sekolah Pesat secara online.",
    image: "4.png",
    link: "https://github.com/Nyno1/project_3bulan",
    liveLink: null,
    tags: ["Laravel", "MySQL", "Bootstrap"],
    metric: "Digital certification",
  },
  {
    title: "Website Hotel",
    description: "Sistem pemesanan hotel lengkap dengan manajemen kamar dan reservasi.",
    image: "3.png",
    link: "https://github.com/Nyno1/hotel-latihan-bnsp",
    liveLink: null,
    tags: ["PHP", "MySQL", "CSS"],
    metric: "Booking system",
  },
  {
    title: "Website Beasiswa",
    description: "Sistem input IPK mahasiswa untuk seleksi penerimaan beasiswa secara otomatis.",
    image: "2.png",
    link: "https://github.com/Nyno1/beasiswa-latihan-bnsp",
    liveLink: null,
    tags: ["PHP", "MySQL"],
    metric: "Automated selection",
  },
];

const tagColors: Record<string, string> = {
  "Next.js": "bg-white/5 text-white border-white/10",
  "React": "bg-blue-500/10 text-blue-300 border-blue-500/20",
  "Laravel": "bg-red-500/10 text-red-300 border-red-500/20",
  "PHP": "bg-purple-500/10 text-purple-300 border-purple-500/20",
  "MySQL": "bg-orange-500/10 text-orange-300 border-orange-500/20",
  "Tailwind": "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  "Bootstrap": "bg-violet-500/10 text-violet-300 border-violet-500/20",
  "CSS": "bg-blue-400/10 text-blue-200 border-blue-400/20",
  "TypeScript": "bg-blue-600/10 text-blue-300 border-blue-600/20",
  "PostgreSQL": "bg-sky-500/10 text-sky-300 border-sky-500/20",
};

const GithubCardGrid = () => {
  return (
    <section className="bg-[#0A0A0A] min-h-screen flex flex-col items-center justify-center px-4 md:px-20 py-20">
      <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">Projects</p>
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center">
        My GitHub Projects
      </h2>
      <p className="text-[#888888] text-sm md:text-base text-center mb-12 max-w-lg">
        Kumpulan project yang sudah saya bangun — dari latihan BNSP hingga project komunitas nyata.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl w-full">
        {githubRepos.map((repo, index) => (
          <div
            key={index}
            className="group rounded-2xl overflow-hidden bg-[#111111] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-all duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="relative overflow-hidden h-48 bg-[#1A1A1A]">
              <img
                src={repo.image}
                alt={repo.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
              {/* Metric badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0A0A0A]/80 backdrop-blur border border-[#2A2A2A] text-xs text-[#888888]">
                {repo.metric}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-white text-lg font-bold mb-2 capitalize">{repo.title}</h3>
              <p className="text-[#888888] text-sm leading-relaxed mb-4 flex-1">{repo.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {repo.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${
                      tagColors[tag] || "bg-[#1E1E1E] text-gray-300 border-[#2A2A2A]"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3">
                <a
                  href={repo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#888888] hover:text-white transition-colors duration-200 border border-[#2A2A2A] hover:border-[#444] px-3 py-1.5 rounded-md"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub
                </a>
                {repo.liveLink && (
                  <a
                    href={repo.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors duration-200 border border-blue-500/30 hover:border-blue-400/50 px-3 py-1.5 rounded-md"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GithubCardGrid;