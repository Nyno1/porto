"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Programing from "./programing";
import Project from "./project";
import Sertfication from "./sertifikat";
import About from "./about";
import { ShootingStarsAndStarsBackgroundDemo } from "./home";
import Footer from "./footer";

export default function NavbarDemo() {
  const navItems = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Skill", link: "#skill" },
    { name: "Project", link: "#project" },
    { name: "Sertfikat", link: "#sertfication" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton
              variant="primary"
              onClick={() => window.open("https://github.com/Nyno1", "_blank")}
            >
              GitHub
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                GitHub
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Page Sections */}
      <div id="home">
        <ShootingStarsAndStarsBackgroundDemo />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="skill">
        <Programing />
      </div>
      <div id="project">
        <Project />
      </div>
      <div id="sertfication">
        <Sertfication />
      </div>
      <Footer />
    </div>
  );
}