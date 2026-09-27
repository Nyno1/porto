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
import Certification from "./certification";
import About from "./about";
import { ShootingStarsAndStarsBackgroundDemo } from "./home";
import Footer from "./footer";
import Experience from "./experience";
import CommentSection from "@/components/CommentSection";
import UserMenu from "@/components/UserMenu";

const Divider = () => (
  <div className="w-full max-w-5xl mx-auto px-4 md:px-20">
    <div className="border-t border-[#1A1A1A]" />
  </div>
);

export default function NavbarDemo() {
  const navItems = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Skill", link: "#skill" },
    { name: "Project", link: "#project" },
    { name: "Experience", link: "#experience" },
    { name: "Certification", link: "#certification" },
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
            <UserMenu />
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
            <div className="pt-2 border-t border-[#1A1A1A]">
              <UserMenu />
            </div>
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

      <Divider />

      <div id="about" className="mt-8">
        <About />
      </div>

      <Divider />

      <div id="skill" className="mt-8">
        <Programing />
      </div>

      <Divider />

      <div id="project" className="mt-8">
        <Project />
      </div>

      <Divider />

      <div id="experience" className="mt-8">
        <Experience />
      </div>

      <Divider />

      <div id="certification" className="mt-8">
        <Certification />
      </div>

      <Footer />
      <CommentSection postSlug="portfolio" />
    </div>
  );
}
