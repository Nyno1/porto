import React from 'react';
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

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

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skill' },
    { label: 'Projects', href: '#project' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#111111] border-t border-[#1A1A1A] text-white py-12">
      <div className="max-w-5xl mx-auto px-4 md:px-20">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <h2 className="text-xl font-bold text-white mb-2">Nashat Akram</h2>
            <p className="text-[#888888] text-sm leading-relaxed">
              Backend Developer Student di SMK Informatika Pesat. Membangun web apps yang cepat dan skalabel.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-400 text-xs font-medium">Open To Freelance</span>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs text-[#888888] font-semibold tracking-widest uppercase mb-4">Navigation</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#888888] text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs text-[#888888] font-semibold tracking-widest uppercase mb-4">Socials</p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[#888888] hover:text-white text-sm transition-colors duration-200"
                >
                  <span className="text-base">{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#1A1A1A] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#888888] text-xs">
            &copy; 2026 Nashat Akram. All rights reserved.
          </p>
          <p className="text-[#888888] text-xs">
            Built with Next.js · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;