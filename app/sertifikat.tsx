"use client";

import { Carousel } from "@/components/ui/carousel";

export default function Sertfication() {
  const slideData = [
    {
      title: "Aplikasi Pemesan Hotel",
      src: "/serti3.jpg",
    },
    {
      title: "Website Restaurant",
      src: "/serti2.jpg",
    },
    {
      title: "Website Perpustakaan",
      src: "/serti1.jpg",
    },
  ];

  return (
    <section className="bg-[#0A0A0A] relative overflow-hidden w-full h-full py-20">
      <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3 text-center">
        Certifications
      </p>
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-4">
        My Certifications
      </h2>
      <p className="text-[#888888] text-sm md:text-base text-center mb-12 max-w-lg mx-auto px-4">
        Sertifikat kompetensi yang diperoleh dari uji keahlian resmi.
      </p>

      <Carousel slides={slideData} />
    </section>
  );
}