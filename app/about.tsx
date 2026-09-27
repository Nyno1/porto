import RotatingText from '@/components/ui/rotating-text'
import React from 'react'

const stats = [
  { value: '3+', label: 'Academic year' },
  { value: '10+', label: 'Project Completed' },
  { value: '15+', label: 'Languages Mastered' },
]

const About = () => {
  return (
    <section className="bg-[#0A0A0A] px-4 py-20 md:px-20 md:py-28">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
      {/* Photo */}
      <div className="flex justify-center flex-shrink-0">
        <div className="relative">
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 blur-xl -z-10 scale-110" />
          <img
            src="gweh.jpg"
            alt="Nashat Akram"
            className="w-64 h-64 md:w-80 md:h-80 rounded-2xl object-cover border border-[#2A2A2A]"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
        <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">About Me</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
          Nashat Akram
        </h2>

        <div className="text-base md:text-lg font-semibold text-[#CCCCCC] flex items-center justify-center md:justify-start gap-2 mb-6">
          <span>I&apos;m ready for</span>
          <RotatingText
            texts={['web development', 'backend development', 'mobile development']}
            mainClassName="px-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 overflow-hidden py-1 justify-center rounded-lg"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>

        <p className="text-[#888888] text-sm md:text-base leading-relaxed mb-4">
          Mahasiswa di <span className="text-[#CCCCCC]">Universitas Gunadarma</span> yang
          memiliki minat besar pada pengembangan perangkat lunak, mencakup pemrograman,
          analisis sistem, serta perancangan aplikasi desktop dan mobile. Di sela-sela
          perkuliahan, saya konsisten membangun proyek pribadi maupun kolaboratif untuk
          mengasah kemampuan teknis, memperluas pemahaman tentang arsitektur software
          yang baik, dan mempersiapkan diri untuk berkarier sebagai Software Engineer
          yang kompeten dan adaptif terhadap perkembangan teknologi.
        </p>
        <p className="text-[#888888] text-sm md:text-base leading-relaxed mb-10">
          Pendekatan saya: memahami masalah dulu sebelum menulis satu baris kode pun. Saya percaya
          developer terbaik adalah mereka yang bisa berkomunikasi dengan jelas dan deliver solusi
          yang benar-benar bermanfaat.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center md:items-start p-4 rounded-xl bg-[#111111] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors duration-200"
            >
              <span className="text-2xl font-extrabold text-white">{s.value}</span>
              <span className="text-xs text-[#888888] mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}

export default About
