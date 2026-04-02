"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, Crosshair, MapPin, Activity, ShieldAlert, Hexagon, Database } from "lucide-react";

const experiences = [
  {
    id: "associate",
    role: "Security Delivery Associate",
    company: "Accenture",
    period: "Aug 2024 – Present",
    location: "Gurugram, IN",
    summary: "Part of a Security Operations team, working on real-time threat monitoring, incident handling, and data protection across enterprise systems.",
    points: [
      "Monitored and analyzed security alerts across SIEM and EDR platforms (Splunk, CrowdStrike, Microsoft Defender) to identify potential threats",
      "Performed alert triage and investigation, supporting incident response workflows including analysis, documentation, and containment actions",
      "Managed encryption operations and key lifecycle processes using Thales CipherTrust for enterprise data security",
      "Implemented and supported data protection policies using Microsoft Purview, ensuring compliance and secure handling of sensitive data"
    ],
    tech: ["Thales CipherTrust", "Microsoft Purview", "Splunk", "CrowdStrike", "Microsoft Defender", "Python"],
    status: "Active Role",
    color: "#00ff41", // Neon Green
  },
  {
    id: "intern",
    role: "Cyber Security Intern",
    company: "Accenture",
    period: "Mar 2024 – June 2024",
    location: "Gurugram, IN",
    summary: "Gained hands-on experience in vulnerability management, log analysis, and SOC workflows within an enterprise security environment.",
    points: [
      "Conducted vulnerability assessments using Qualys and assisted in risk prioritization and remediation tracking",
      "Assisted in monitoring and analyzing security alerts using Splunk as part of SOC triage processes",
      "Performed basic investigation of alerts, helping identify false positives and potential security events",
      "Developed Python scripts for log parsing and data analysis to support security monitoring tasks"
    ],
    tech: ["Qualys", "Splunk", "Python"],
    status: "Internship",
    color: "#00f0ff", // Cyan
  },
  {
    id: "sme",
    role: "Subject Matter Expert",
    company: "Chegg",
    period: "Freelance",
    location: "Remote",
    summary: "Delivered structured solutions and guidance across core computer science topics, with a focus on problem-solving and algorithmic thinking.",
    points: [
      "Solved diverse algorithmic problems focusing on optimal approaches, time complexity, and clean implementation",
      "Guided students in understanding core CS concepts, improving their problem-solving and analytical thinking skills",
      "Wrote clear, step-by-step technical solutions to complex problems, ensuring accuracy and readability",
      "Strengthened ability to break down complex logic into simple, structured explanations for diverse learners"
    ],
    tech: ["C++", "Java", "Data Structures & Algorithms"],
    status: "Freelance",
    color: "#8b5cf6", // Purple
  }
];

function TimelineNode({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row items-center w-full my-8 md:my-16 ${isEven ? "md:flex-row-reverse" : ""}`}>

      {/* Central Axis Node / Icon */}
      <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 bg-[#050505] flex items-center justify-center relative shadow-[0_0_30px_rgba(0,0,0,0.8)]"
          style={{ borderColor: exp.color, boxShadow: `0 0 25px ${exp.color}80, inset 0 0 15px ${exp.color}60` }}
        >
          <Crosshair className="w-6 h-6 md:w-8 md:h-8 drop-shadow-[0_0_8px_currentColor]" style={{ color: exp.color }} />
          {/* Animated rings around the node - SHINY */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed shadow-[0_0_15px_currentColor]"
            style={{ borderColor: exp.color, color: exp.color }}
          />
        </motion.div>
      </div>

      {/* Telemetry Panel (Opposite side) - Filling the Empty Space */}
      <div className={`hidden md:flex w-1/2 px-8 lg:px-16 xl:px-24 flex-col justify-center relative h-full ${isEven ? "items-start" : "items-end"}`}>

        {/* Giant Watermark Letter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className={`absolute top-1/2 transform -translate-y-1/2 font-black text-[180px] leading-none pointer-events-none z-0 ${isEven ? 'left-8' : 'right-8'}`}
          style={{ color: `${exp.color}10` }}
        >
          {exp.company.charAt(0)}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={`relative z-10 flex flex-col gap-4 ${isEven ? "text-left" : "text-right"} w-full max-w-sm`}
        >
          {/* Header Block */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: exp.color }}>
              Timeline_
            </div>
            <div className="text-2xl font-black italic tracking-tighter text-white">
              {exp.period}
            </div>
            <div className={`flex items-center gap-2 mt-1 font-mono text-xs text-white/70 uppercase tracking-widest ${isEven ? "justify-start" : "justify-end"}`}>
              <MapPin className="w-3.5 h-3.5" />
              <span>{exp.location}</span>
            </div>
          </div>

          {/* Graphical Abstract HUD */}
          <div className={`flex items-center gap-4 opacity-70 ${isEven ? "justify-start" : "justify-end"}`}>
            <div className="flex flex-col gap-1.5">
              <div className="w-20 h-[2px] bg-white/10 overflow-hidden relative">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-y-0 w-1/2" style={{ backgroundColor: exp.color, opacity: 0.8 }}
                />
              </div>
              <div className="w-12 h-[2px] bg-white/10 overflow-hidden relative">
                <motion.div
                  animate={{ x: ["100%", "-100%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.3 }}
                  className="absolute inset-y-0 w-1/2" style={{ backgroundColor: exp.color, opacity: 0.8 }}
                />
              </div>
            </div>
            <Hexagon className="w-8 h-8 opacity-50" style={{ color: exp.color }} />
          </div>

          {/* Tech Stack */}
          <div className={`mt-2 bg-[#0a0f1a]/50 border p-4 rounded-xl border-white/5 ${isEven ? "items-start" : "items-end"} relative overflow-hidden group`}>
            <div className="flex items-center gap-2 mb-3 font-mono text-[10px] text-white/50 tracking-[0.2em] uppercase relative z-10">
              <Database className="w-3 h-3" /> Tech_Stack:
            </div>
            <div className={`flex flex-wrap gap-2 ${isEven ? "justify-start" : "justify-end"} relative z-10`}>
              {exp.tech.map((t, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-[11px] font-mono tracking-widest border rounded bg-white/5 border-white/10"
                  style={{ color: '#f8fafc' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

        </motion.div>
      </div>

      {/* Main Experience Card */}
      <div className={`w-full pl-20 md:pl-0 md:w-1/2 md:px-8 lg:px-16 xl:px-24 flex ${isEven ? "justify-end" : "justify-start"} relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
          className="relative w-full max-w-lg group"
        >
          {/* Card Background: Shiny Frosted Glass */}
          <div
            className="absolute inset-0 bg-[#0d1320]/70 backdrop-blur-2xl rounded-2xl border transition-all duration-300 overflow-hidden"
            style={{
              borderColor: `${exp.color}40`,
              boxShadow: `0 15px 35px -5px rgba(0,0,0,0.7), 0 0 30px ${exp.color}15, inset 0 0 20px ${exp.color}10`
            }}
          >
            {/* Highlight top/left edges on hover - SHINY */}
            <div
              className="absolute top-0 left-0 w-full h-[2px] opacity-50 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)`, boxShadow: `0 0 15px ${exp.color}` }}
            />
            <div
              className="absolute top-0 left-0 w-[2px] h-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(180deg, ${exp.color}, transparent)`, boxShadow: `0 0 15px ${exp.color}` }}
            />

            {/* Animated Shimmer sweep across the card */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
              className="absolute inset-0 w-1/2 h-full skew-x-12 opacity-10 group-hover:opacity-20 pointer-events-none"
              style={{ background: `linear-gradient(90deg, transparent, white, transparent)` }}
            />

            {/* Scanline overlay (subtle) */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
              style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)` }}
            />

            {/* Glowing gradient blob inside card */}
            <div
              className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full blur-[70px] opacity-30 pointer-events-none transition-opacity duration-300 group-hover:opacity-50"
              style={{ backgroundColor: exp.color }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 p-5 md:p-8 flex flex-col gap-4">

            {/* Header: Status & Company */}
            <div className="flex flex-col gap-1 pb-4 border-b border-white/20 relative">
              {/* Shiny underline */}
              <div className="absolute bottom-[-1px] left-0 w-1/3 h-[1px]" style={{ backgroundColor: exp.color, boxShadow: `0 0 10px ${exp.color}` }} />

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_12px_currentColor]" style={{ backgroundColor: exp.color, color: exp.color }} />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                  {exp.status}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase leading-none mt-1 drop-shadow-md group-hover:text-shadow-neon transition-all" style={{ '--text-shadow-color': exp.color } as React.CSSProperties}>
                {exp.company}
              </h3>
            </div>

            {/* Body: Role & Summary */}
            <div>
              <h4 className="font-mono text-xs md:text-sm tracking-widest uppercase mb-3 drop-shadow-[0_0_10px_currentColor]" style={{ color: exp.color }}>
                <span className="opacity-70 mr-2">&gt;</span>{exp.role}
              </h4>
              <p className="text-[14px] md:text-[15px] text-gray-300 leading-relaxed font-light">
                {exp.summary}
              </p>
            </div>

            {/* Terminal Logs (Points) */}
            <div className="bg-[#03050a]/90 rounded-xl p-4 font-mono text-[11px] md:text-[12px] text-white/80 space-y-2.5 border border-white/10 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] relative overflow-hidden">
              {/* Decorative left accent - SHINY */}
              <div className="absolute top-0 left-0 w-[3px] h-full" style={{ backgroundColor: exp.color, opacity: 1, boxShadow: `0 0 15px ${exp.color}` }} />

              {exp.points.map((point, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span style={{ color: exp.color }} className="shrink-0 animate-pulse drop-shadow-[0_0_5px_currentColor]">_</span>
                  <span className="text-gray-200 leading-relaxed hover:text-white transition-colors">{point}</span>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

        {/* Mobile Telemetry (Visible only on small screens) */}
        <div className="md:hidden mt-6 flex flex-col gap-3 pl-4 border-l-2 relative z-10" style={{ borderColor: `${exp.color}60`, boxShadow: `-2px 0 10px ${exp.color}20` }}>
          <div className="text-lg font-black italic tracking-tighter drop-shadow-[0_0_10px_currentColor]" style={{ color: exp.color }}>
            {exp.period}
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-white/70 uppercase tracking-widest">
            <MapPin className="w-3 h-3" />
            {exp.location}
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {exp.tech.map((t, i) => (
              <span
                key={i}
                className="px-2 py-1 text-[9px] font-mono tracking-widest border rounded bg-white/10 shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                style={{ borderColor: `${exp.color}50`, color: '#e2e8f0' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate timeline height based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const lineColor = useTransform(
    scrollYProgress,
    [0, 0.45, 0.9],
    [experiences[0].color, experiences[1].color, experiences[2].color]
  );

  const lineGlow = useTransform(
    scrollYProgress,
    [0, 0.45, 0.9],
    [
      `0 0 30px ${experiences[0].color}, inset 0 0 10px ${experiences[0].color}`,
      `0 0 30px ${experiences[1].color}, inset 0 0 10px ${experiences[1].color}`,
      `0 0 30px ${experiences[2].color}, inset 0 0 10px ${experiences[2].color}`
    ]
  );

  return (
    <section
      ref={containerRef}
      id="experience"
      className="py-20 relative bg-[#020408] overflow-hidden min-h-screen"
      style={{ position: "relative" }}
    >

      {/* Dynamic Background Elements - Tech Matte & Scanlines (No Orbs shared with Skills) */}

      {/* 1. Dynamic Background Gradients - INTENSIFIED GLOW */}
      <div className="absolute top-0 left-[-10%] w-[50vw] h-[800px] bg-[#00ff41]/[0.15] blur-[180px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[25%] right-[-10%] w-[40vw] h-[800px] bg-[#00f0ff]/[0.15] blur-[180px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[50%] left-[-10%] w-[50vw] h-[800px] bg-[#8b5cf6]/[0.15] blur-[180px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[75%] right-[-10%] w-[40vw] h-[800px] bg-[#00ff41]/[0.15] blur-[180px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-5%] left-[10%] w-[60vw] h-[800px] bg-[#00f0ff]/[0.15] blur-[180px] rounded-full pointer-events-none z-0" />

      {/* 2. Soft Noise/Film Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none z-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 3. Horizontal Scanlines overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0 mix-blend-overlay bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left mb-14 md:mb-20 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/20 pb-6 relative"
        >
          {/* Decorative scanner line on header */}
          <div className="absolute bottom-[-1px] left-0 w-full h-[1px] bg-white/10">
            <motion.div
              animate={{ x: ["0%", "200%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="h-full w-48 shadow-[0_0_20px_#00f0ff]"
              style={{ background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)' }}
            />
          </div>

          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 text-xs mb-3 font-mono uppercase tracking-[0.4em] drop-shadow-[0_0_8px_#00ff41]">
              <Activity className="w-5 h-5 text-[#00ff41]" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff41] to-[#00f0ff] font-bold">Career_Trajectory</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] italic">
              Operational<span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 pr-2"> Experience</span><span className="text-[#00ff41] not-italic animate-pulse drop-shadow-[0_0_15px_#00ff41]">_</span>
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1 font-mono text-[11px] text-white/70 tracking-[0.2em] uppercase text-right">
            <div className="flex items-center gap-2"><ShieldAlert className="w-3.5 h-3.5 text-[#00ff41] drop-shadow-[0_0_8px_#00ff41]" /> CONNECTION: ESTABLISHED</div>
            <div>CONTEXT: <span className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">PROFESSIONAL EXPERIENCE</span></div>
            <div>STREAM: <span className="text-[#00f0ff] drop-shadow-[0_0_8px_#00f0ff] font-bold">ROLE TIMELINE</span></div>
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative w-full max-w-[1400px] mx-auto">

          {/* Central Line Data Stream (Desktop & Mobile) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 transform -translate-x-1/2 z-0" />

          {/* Animated Glowing Progress Line - DYNAMIC COLOR SHIFT */}
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 w-[4px] md:w-[6px] transform -translate-x-1/2 z-10 rounded-full"
            style={{
              height: lineHeight,
              backgroundColor: lineColor,
              boxShadow: lineGlow
            }}
          />

          {/* Timeline Nodes */}
          <div className="flex flex-col relative z-20">
            {experiences.map((exp, index) => (
              <TimelineNode key={exp.id} exp={exp} index={index} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}