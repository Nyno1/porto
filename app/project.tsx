import React from "react";

const githubRepos = [
  {
    title: "Website Katakans",
    description: "Website untuk komunitas katakans.",
    image: "1.png",
    link: "https://github.com/Alezonythh/katakans_Web",
  },
  {
    title: "website sertifikat digital",
    description: "Website untuk mencari atau melihat sertifikat digital sekolah pesat.",
    image: "4.png",
    link: "https://github.com/Nyno1/project_3bulan",
  },
  {
    title: "Website hotel",
    description: "Website untuk memesan hotel.",
    image: "3.png",
    link: "https://github.com/Nyno1/hotel-latihan-bnsp",
  },
  {
    title: "website beasiswa",
    description: "Website untuk menginput IPK mahasiswa untuk mendapatkan beasiswa.",
    image: "2.png",
    link: "https://github.com/Nyno1/beasiswa-latihan-bnsp",
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
