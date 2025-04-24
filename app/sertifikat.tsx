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
    <div className="relative overflow-hidden w-full h-full py-20">
      <h2 className="text-3xl font-bold text-center text-white mb-12">
        My Sertification
      </h2>

      <Carousel slides={slideData} />
    </div>
  );
}
