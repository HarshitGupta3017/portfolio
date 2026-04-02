"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Code2, ShieldAlert, CloudLightning, Terminal, ChevronDown } from "lucide-react";
import TerminalCard from "./ui/Terminal";
import { resumeData } from "@/data/resume";

function TypewriterText() {
  const messages = [
    "Initializing security protocols...",
    "Loading threat intelligence...",
    "Scanning for anomalies...",
    "Deploying detection systems...",
    "Monitoring real-world threats...",
    "Securing data pipelines...",
    "System ready."
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [text, setText] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Initial 0.5s delay before first type
    if (!hasStarted) {
      timeout = setTimeout(() => {
        setHasStarted(true);
      }, 500);
      return () => clearTimeout(timeout);
    }

    if (isFadingOut) {
      timeout = setTimeout(() => {
        setIsFadingOut(false);
        setText("");
        setCurrentIndex((prev) => (prev + 1) % messages.length);
      }, 500);
      return () => clearTimeout(timeout);
    }

    const currentMsg = messages[currentIndex];

    if (text.length < currentMsg.length) {
      timeout = setTimeout(() => {
        setText(currentMsg.slice(0, text.length + 1));
      }, 30 + Math.random() * 40); // Random typing speed between 30-70ms
    } else {
      timeout = setTimeout(() => {
        setIsFadingOut(true);
      }, 1500); // Wait 1.5s after finishing sentence
    }

    return () => clearTimeout(timeout);
  }, [text, isFadingOut, currentIndex, hasStarted]);

  return (
    <div className={`transition-opacity duration-500 ease-in-out flex items-center h-8 md:h-10 mt-2 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <span className="text-[#00ff41] font-mono text-base md:text-lg lg:text-xl drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]">
        {hasStarted ? `> ${text}` : '> '}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-2.5 h-[1.1em] bg-[#00ff41] ml-1 shadow-[0_0_10px_rgba(0,255,65,0.8)] align-middle"
      />
    </div>
  );
}

function BinaryRain({ count = 25 }) {
  const [streams, setStreams] = useState<
    { id: number; left: number; delay: number; duration: number; bits: string[] }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 20,
      // pre-bake the bit string so Math.random() never runs during render
      bits: Array.from({ length: 35 }, () => (Math.random() > 0.5 ? "1" : "0")),
    }));
    setStreams(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none mix-blend-screen opacity-[0.06]">
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          initial={{ y: "-100%" }}
          animate={{ y: "120vh" }}
          transition={{ duration: stream.duration, repeat: Infinity, delay: stream.delay, ease: "linear" }}
          className="absolute text-[#00ff41] font-mono text-[10px] md:text-sm flex flex-col items-center leading-none"
          style={{ left: `${stream.left}%` }}
        >
          {stream.bits.map((bit, j) => (
            <span key={j} className="opacity-70 my-[1px]">{bit}</span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  const terminalRef = useRef<HTMLDivElement>(null);

  const scrollToTerminal = () => {
    terminalRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    // Focus the terminal input after scrolling
    setTimeout(() => {
      const input = document.getElementById("terminal-input");
      input?.focus();
    }, 500);
  };

  const socialLinks = [
    {
      name: "Explore My Work",
      url: resumeData.personal.socials.github,
      icon: <Github className="w-6 h-6" />,
      color: "text-[#00ff41]",
      hoverColor: "hover:bg-[#00ff41]/10 hover:border-[#00ff41]/50 hover:shadow-[0_0_15px_rgba(0,255,65,0.4)]",
    },
    {
      name: "Professional Profile",
      url: resumeData.personal.socials.linkedin,
      icon: <Linkedin className="w-6 h-6" />,
      color: "text-[#00f0ff]",
      hoverColor: "hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]",
    },
    {
      name: "Cyber Labs",
      url: (resumeData.personal.socials as any).tryhackme,
      icon: <CloudLightning className="w-6 h-6" />,
      color: "text-red-400",
      hoverColor: "hover:bg-red-400/10 hover:border-red-400/50 hover:shadow-[0_0_15px_rgba(248,113,113,0.4)]",
    },
    {
      name: "Coding Practice",
      url: resumeData.personal.socials.leetcode,
      icon: <span className="font-bold font-serif italic text-2xl leading-none">L</span>,
      color: "text-purple-400",
      hoverColor: "hover:bg-purple-400/10 hover:border-purple-400/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]",
    }
  ];

  return (
    <section id="hero" className="min-h-[100dvh] w-full flex items-center justify-center relative pt-20 pb-8 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[#00ff41] rounded-full blur-[150px] mix-blend-screen opacity-10 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#00f0ff] rounded-full blur-[150px] mix-blend-screen opacity-10 right-[-10%] top-[-10%] animate-[pulse_6s_ease-in-out_infinite_alternate]" />
      </div>

      {/* Subtle Binary Code Rain */}
      <BinaryRain />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff41]/10 border border-[#00ff41]/30 w-fit text-[#00ff41] text-sm font-fira">
            <ShieldAlert className="w-4 h-4" />
            <span>Cybersecurity Analyst & Developer</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Hi, I&apos;m <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff41] to-[#00f0ff] animate-pulse">
              Harshit Gupta
            </span>
          </h1>

          <TypewriterText />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col gap-6 mt-4"
          >
            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#00ff41]/10 border border-[#00ff41] text-[#00ff41] font-fira font-medium tracking-wide rounded hover:bg-[#00ff41] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,255,65,0.2)] hover:shadow-[0_0_25px_rgba(0,255,65,0.6)] flex items-center justify-center gap-2 interactive group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-[#00ff41] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Code2 className="w-5 h-5 relative z-10 group-hover:text-black transition-colors" />
                <span className="relative z-10 group-hover:text-black transition-colors">View Projects</span>
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] font-fira font-medium tracking-wide rounded hover:bg-[#00f0ff] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] flex items-center justify-center gap-2 interactive group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-[#00f0ff] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Terminal className="w-5 h-5 relative z-10 group-hover:text-black transition-colors" />
                <span className="relative z-10 group-hover:text-black transition-colors">Initiate Comms</span>
              </a>
            </div>

            {/* Social Links Sub-Row */}
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              {socialLinks.map((link, idx) => (
                <div key={idx} className="relative group flex items-center justify-center">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.name}
                    className={`w-12 h-12 bg-[#0a0e17]/60 backdrop-blur-md ${link.color} rounded-xl flex items-center justify-center transition-all duration-300 border border-[#1a2235] shadow-lg hover:scale-110 interactive ${link.hoverColor}`}
                  >
                    {link.icon}
                  </a>
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#0a0e17] border border-[#252f4a] text-gray-200 text-xs font-fira rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl z-20 translate-y-2 group-hover:translate-y-0">
                    {link.name}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a0e17] border-b border-r border-[#252f4a] rotate-45 transform" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Interactive Element */}
        <div ref={terminalRef} className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-auto h-full flex items-center justify-center">
          <TerminalCard />
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[9px] font-mono tracking-[0.3em] text-[#00ff41] uppercase">Explore</span>
        <ChevronDown className="w-4 h-4 text-[#00ff41]" />
      </motion.div>
    </section>
  );
}
