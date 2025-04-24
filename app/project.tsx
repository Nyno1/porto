import React from "react";

const githubRepos = [
  {
    title: "TechXperience",
    description: "Ngerjain soal STS produktif RPL.",
    image: "/1.png",
    link: "https://github.com/Nyno1/techxperience",
  },
  {
    title: "Perpustakaan",
    description: "Website manajemen perpustakaan digital.",
    image: "",
    link: "https://github.com/Nyno1/perpustakaan",
  },
  {
    title: "TodoList",
    description: "Aplikasi todo list untuk mengatur tugas harian.",
    image: "/3.jpg",
    link: "https://github.com/Nyno1/todolist",
  },
  {
    title: "Vidio clone",
    description: "Aplikasi vidio clone.",
    image: "/2.jpg",
    link: "https://github.com/Nyno1/vidio",
  },
];

const GithubCardGrid = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-16">
        <h2 className="text-white text-3xl font-bold mb-10 text-center">
            My GitHub Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl w-full">
            {githubRepos.map((repo, index) => (
            <a
                key={index}
                href={repo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 border border-gray-700"
            >
                <img src={repo.image} alt={repo.title} className="w-full h-48 object-cover object-top"/>
                <div className="p-4">
                <h3 className="text-white text-lg font-bold">{repo.title}</h3>
                <p className="text-gray-400 text-sm">{repo.description}</p>
                </div>
            </a>
            ))}
        </div>
        </div>

  );
};

export default GithubCardGrid;
