// components/FooterSosial.tsx
import React from 'react';
import { FaTwitch, FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

interface SocialLink {
  name: string;
  url: string;
  icon: JSX.Element;
}

const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nashat-akram-537146390/', icon: <FaLinkedin /> },
    { name: 'Twitter', url: 'https://x.com/nynxd19711', icon: <FaTwitter /> },
    { name: 'Instagram', url: 'https://www.instagram.com/__akramzz/', icon: <FaInstagram /> },
    { name: 'GitHub', url: 'https://github.com/Nyno1', icon: <FaGithub /> },
  ];

  return (
    <footer className="bg-[#222222] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-semibold">Nashat Akram</h2>
          <p className="text-gray-400">belajar tentang pemrograman, analisis sistem, <br /> serta pengembangan aplikasi baik di desktop maupun mobile.</p>
        </div>
        <div className="flex space-x-6">
          {socialLinks.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-6 text-center text-gray-500 text-sm">
        &copy; 2025 Nashat Akram.
      </div>
    </footer>
  );
};

export default Footer;
