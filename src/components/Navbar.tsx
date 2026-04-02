"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Download, Menu, X, TerminalSquare } from "lucide-react";
import { cn } from "@/utils/cn";

/* ── module-level constant avoids stale closure in useCallback ── */
const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Activity", href: "#activity" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Use ref for throttling
  const ticking = useRef(false);

  const updateScrollState = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 50);

    // Scroll progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);

    // Active section tracking
    const sections = NAV_LINKS.map((link) => link.href.substring(1));
    let currentSection = scrollY < 80 ? "" : "";

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = section;
          break;
        }
      }
    }

    setActiveSection(currentSection);

    // Update URL hash without pushing history entry
    const newHash = currentSection ? `#${currentSection}` : (scrollY < 80 ? "/" : "");
    if (newHash) {
      const target = newHash === "/" ? window.location.pathname : newHash;
      if (window.location.hash !== (newHash === "/" ? "" : newHash)) {
        history.replaceState(null, "", target);
      }
    }

    ticking.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollState);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call to set correct state on page load
    updateScrollState();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateScrollState]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        isScrolled
          ? "bg-[#0a0e17]/85 backdrop-blur-xl py-3 border-[#1a2235]/60 shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(0,255,65,0.05)]"
          : "bg-transparent py-5"
      )}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#00ff41] via-[#00f0ff] to-[#00ff41]"
        style={{ width: `${scrollProgress}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group interactive">
          <TerminalSquare className="w-8 h-8 text-[#00ff41] group-hover:text-[#00f0ff] transition-colors" />
          <span className="text-xl font-bold font-fira tracking-wider text-white group-hover:text-shadow-neon transition-all">
            HG<span className="text-[#00ff41]">_</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 font-sans font-medium text-sm tracking-wide">
            {NAV_LINKS.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className={cn(
                    "transition-all duration-300 relative group py-2 px-1 interactive flex items-center",
                    activeSection === link.href.substring(1)
                      ? "text-[#00ff41] drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]"
                      : "text-gray-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-[2px] transition-all duration-300 shadow-[0_0_10px_rgba(0,255,65,0.5)]",
                    activeSection === link.href.substring(1) ? "w-full bg-[#00ff41]" : "w-0 group-hover:w-full bg-white"
                  )}></span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive flex items-center gap-2 px-5 py-2.5 bg-[#00ff41]/5 border border-[#00ff41] text-[#00ff41] rounded-[4px] font-fira text-sm hover:bg-[#00ff41] hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(0,255,65,0.1)] hover:shadow-[0_0_20px_rgba(0,255,65,0.4)]"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white hover:text-[#00ff41] transition-colors interactive"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={{ height: isMobileMenuOpen ? "auto" : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
        className="md:hidden bg-[#0a0e17] border-b border-[#1a2235] overflow-hidden"
      >
        <ul className="flex flex-col items-center py-6 gap-6 font-sans font-medium">
          {NAV_LINKS.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-lg transition-colors",
                  activeSection === link.href.substring(1) ? "text-[#00ff41]" : "text-gray-300 hover:text-white"
                )}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/Resume.pdf"
              className="flex items-center gap-2 px-6 py-3 border border-[#00ff41] text-[#00ff41] rounded-[4px] font-fira text-sm hover:bg-[#00ff41] hover:text-black transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </li>
        </ul>
      </motion.div>
    </motion.header>
  );
}
