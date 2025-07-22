import { useState } from "react";

const techStacks = [
  {
    name: "Next js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#ffffff",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#ffffff",
  },
  {
    name: "Laravel",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    color: "#ffffff",
  },
  {
    name: "PHP",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    color: "#ffffff",
  },
  {
    name: "CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#ffffff",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#ffffff",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#ffffff",
  },
  {
    name: "SQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    color: "#ffffff",
  },
];

export default function TechCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-white">
      <h1 className="text-3xl font-bold mb-10">Skill Programming Language</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-20 w-full max-w-6xl">
        {techStacks.map((tech, index) => (
          <div
            key={index}
            className="relative rounded-xl p-6 bg-black flex flex-col items-center justify-center transition-all duration-300 hover:scale-105"
            style={{
              border: `2px solid ${tech.name === "Next.js" ? "white" : tech.color}`,
              color: tech.color,
              boxShadow:
                hoveredIndex === index
                  ? tech.name === "Next.js"
                    ? `0 0 15px white, 0 0 25px white, 0 0 40px white`
                    : `0 0 15px ${tech.color}, 0 0 25px ${tech.color}, 0 0 40px ${tech.color}`
                  : "none",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={tech.logo}
              alt={tech.name}
              className="w-24 h-24 mb-4"
            />
            <h2 className="text-xl font-bold">{tech.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
