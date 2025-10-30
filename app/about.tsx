import RotatingText from '@/components/ui/rotating-text'
import React from 'react'

const About = () => {
  return (
    <section className="px-4 py-16 md:px-20 md:py-28 flex flex-col md:flex-row items-center gap-12">
      <div className="flex justify-center md:justify-center flex-1">
        <img
          src="gweh.jpg"
          alt="Profile"
          className="w-72 h-72 md:w-80 md:h-80 rounded-xl object-cover shadow-2xl"
        />
      </div>
      <div className="flex-1 max-w-3xl text-center md:text-left">
        <h2 className="text-white text-3xl font-bold mb-6">
          About Me
        </h2>

        <div className="text-base md:text-xl font-bold dark:text-neutral-200 flex items-center justify-center md:justify-start gap-2">
          <span>I'm ready for</span>
          <RotatingText
            texts={['web development', 'backend development', 'mobile development']}
            mainClassName="px-3 bg-white text-black overflow-hidden py-1 justify-center rounded-lg"
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

        <h2 className="text-lg sm:text-xl md:text-5xl lg:text-5xl font-bold dark:text-white mt-6">
          <span className="text-neutral-500">I’m Nashat Akram</span><br /> Backend Developer Student
        </h2>

        <p className="text-sm sm:text-base mt-6 mx-auto dark:text-neutral-200">
          Bersekolah di SMK Informatika Pesat dengan jurusan Rekayasa Perangkat Lunak (RPL), saya fokus untuk menguasai berbagai aspek dalam pengembangan perangkat lunak.
          Di jurusan ini, saya belajar tentang pemrograman, analisis sistem, serta pengembangan aplikasi baik di desktop maupun mobile.
        </p>
      </div>
    </section>



  )
}

export default About