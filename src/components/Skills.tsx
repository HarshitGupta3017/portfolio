"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  Terminal,
  Lock,
  Zap
} from "lucide-react";

// --- Types ---
type Skill = {
  name: string;
};

// --- Data Structure ---
const skillGroups = [
  {
    id: "sec-ops",
    category: "Security Operations",
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "#3b82f6",
    skills: [
      { name: "Threat Detection", short: "Detection", level: 5, detail: "SIEM/EDR Monitoring" },
      { name: "Incident Response", short: "Response", level: 5, detail: "Playbook Execution" },
      { name: "Splunk / SIEM", short: "Splunk", level: 5, detail: "Advanced Search" },
      { name: "CrowdStrike / EDR", short: "EDR", level: 5, detail: "Endpoint Containment" },
      { name: "Microsoft Defender", short: "Defender", level: 4, detail: "XDR Implementation" },
      { name: "Microsoft Purview", short: "Purview", level: 5, detail: "DLP & Governance" },
      { name: "Vulnerability Assessment", short: "Vuln Assess", level: 4, detail: "Qualys Scanning" },
      { name: "Threat Hunting", short: "Hunting", level: 4, detail: "Behavior Analysis" }
    ]
  },
  {
    id: "sec-eng",
    category: "Security Engineering",
    icon: <Cpu className="w-5 h-5" />,
    color: "#10b981",
    skills: [
      { name: "Python", short: "Python", level: 5, detail: "Security Scripting" },
      { name: "Thales CipherTrust", short: "CipherTrust", level: 4, detail: "Key Management" },
      { name: "Security Automation", short: "Automation", level: 4, detail: "Workflow Automation" },
      { name: "Cloud Security", short: "Cloud Sec", level: 3, detail: "Azure / AWS Basics" },
      { name: "REST APIs", short: "REST APIs", level: 4, detail: "Tool Integration" },
      { name: "PowerShell", short: "PowerShell", level: 4, detail: "Systems Hardening" },
      { name: "GitHub", short: "GitHub", level: 4, detail: "Version Control" }
    ]
  },
  {
    id: "dev",
    category: "Core Development",
    icon: <Terminal className="w-5 h-5" />,
    color: "#8b5cf6",
    skills: [
      { name: "C++ / Java", short: "C++ / Java", level: 4, detail: "Systems Programming" },
      { name: "JavaScript", short: "JavaScript", level: 4, detail: "Web Development" },
      { name: "TypeScript", short: "TypeScript", level: 3, detail: "Typed Frontend" },
      { name: "React", short: "React", level: 3, detail: "UI Development" },
      { name: "SQL", short: "SQL", level: 4, detail: "Database Handling" },
      { name: "R Language", short: "R", level: 3, detail: "Data Analysis" }
    ]
  }
];

// --- Radar Chart Component ---
const RadarChart = ({ skills, color }: { skills: any[], color: string }) => {
  const size = 320;
  const center = size / 2;
  const radius = 100;
  const maxLevel = 5;

  const points = skills.map((skill, i) => {
    const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2;
    const distance = (skill.level / maxLevel) * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
      labelX: center + (radius + 35) * Math.cos(angle),
      labelY: center + (radius + 35) * Math.sin(angle),
      name: skill.name,
      short: skill.short,
      level: skill.level
    };
  });

  const dataPolygonPath = points.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="relative flex justify-center items-center w-full aspect-square"
    >
      {/* Background scanner ring effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[200px] h-[200px] rounded-full overflow-hidden relative" style={{ boxShadow: `0 0 40px ${color}20` }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
            style={{
              background: `conic-gradient(from 0deg, transparent 70%, ${color}80 100%)`,
            }}
          />
          <div className="absolute inset-0 rounded-full border border-white/10" style={{ borderColor: `${color}40` }} />
        </div>
      </div>

      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible relative z-10 w-full h-full">
        {/* Concentric Polygons */}
        {[1, 2, 3, 4, 5].map(level => {
          const levelRadius = (level / maxLevel) * radius;
          const levelPoints = skills.map((_, i) => {
            const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2;
            return `${center + levelRadius * Math.cos(angle)},${center + levelRadius * Math.sin(angle)}`;
          }).join(" ");
          return (
            <polygon
              key={level}
              points={levelPoints}
              fill={level % 2 === 0 ? "rgba(255,255,255,0.02)" : "none"}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          );
        })}

        {/* Axes */}
        {skills.map((_, i) => {
          const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2;
          return (
            <line
              key={i}
              x1={center} y1={center}
              x2={center + radius * Math.cos(angle)}
              y2={center + radius * Math.sin(angle)}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          );
        })}

        {/* Data Polygon */}
        <motion.polygon
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          points={dataPolygonPath}
          fill={`${color}40`}
          stroke={color}
          strokeWidth="2"
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />

        {/* Data Points */}
        {points.map((p, i) => (
          <motion.circle
            key={`data-point-${i}`}
            initial={{ r: 0 }}
            animate={{ r: 4 }}
            transition={{ delay: 0.3 + i * 0.05, type: 'spring' }}
            cx={p.x} cy={p.y}
            fill="#fff"
            style={{ filter: `drop-shadow(0 0 5px ${color})` }}
          />
        ))}

        {/* Labels */}
        {points.map((p, i) => {
          const num = String(i + 1).padStart(2, '0');

          return (
            <motion.g
              key={`label-group-${i}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.05, type: "spring" }}
            >
              {/* HUD Circle for the number */}
              <circle
                cx={p.labelX}
                cy={p.labelY}
                r="12"
                fill="#0a0a0a"
                stroke={color}
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text
                x={p.labelX} y={p.labelY + 1}
                fill={color}
                fontSize="10"
                fontWeight="700"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-mono tracking-tighter"
                style={{ textShadow: `0 0 8px ${color}` }}
              >
                {num}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </motion.div>
  );
};

// --- Skill Card ---
const SkillCard = ({ skill, color, index = 0 }: { skill: any, color: string, index?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ y: -4, borderColor: `${color}80`, transition: { duration: 0.2 } }}
      style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
      className="relative group bg-black/40 border border-white/10 p-5 rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-md"
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 50%, ${color}, transparent 80%)` }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-3">
            <div className="font-mono font-bold text-[10px] tracking-widest mt-1 opacity-80" style={{ color }}>
              [{String(index + 1).padStart(2, '0')}]
            </div>
            <div>
              <h4 className="text-white font-bold tracking-tight text-sm group-hover:text-white transition-colors duration-300">
                {skill.name}
              </h4>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mt-1">
                {skill.detail}
              </p>
            </div>
          </div>
          {/* Glowing dot representing selection */}
          <div className="w-2 h-2 rounded-full mt-1" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 flex-grow">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: 4, opacity: 0.2 }}
                animate={{
                  height: i < skill.level ? 6 : 4,
                  opacity: i < skill.level ? 1 : 0.2,
                  backgroundColor: i < skill.level ? color : "#ffffff"
                }}
                className="h-1.5 flex-grow rounded-full shadow-sm"
                style={{
                  boxShadow: i < skill.level ? `0 0 8px ${color}80` : "none"
                }}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase" style={{ color }}>
            Lvl {skill.level}
          </span>
        </div>
      </div>

      {/* Edge Highlight */}
      <div
        className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  );
};

// --- Main Section ---
export default function Skills() {
  const [activeTab, setActiveTab] = useState("sec-ops");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const activeGroup = skillGroups.find(g => g.id === activeTab)!;

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-[#050505] border-y border-[#1a2235] relative overflow-hidden">

      {/* --- NEW Dynamic Liquid Background --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/30 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.35, 0.15],
            x: [0, -60, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-emerald-600/30 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] bg-purple-600/30 blur-[100px] rounded-full"
        />

        {/* Shiny Moving Grid */}
        <motion.div
          animate={{ backgroundPosition: ["0px 0px", "64px 64px"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20"
              initial={{
                top: `${(i * 17) % 100}%`,
                left: `${(i * 23) % 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 8 + (i % 5) * 2,
                repeat: Infinity,
                ease: "linear",
                delay: (i % 5) * 1.5
              }}
              style={{
                filter: "blur(1px)",
                boxShadow: "0 0 10px 2px rgba(255,255,255,0.3)"
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-16 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 mb-6 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.25em] text-[#00f0ff] uppercase font-medium">
              STATUS: OPERATIONAL
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase drop-shadow-lg italic">
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500 not-italic">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14 items-start">

          {/* Navigation */}
          <div className="xl:col-span-3 lg:col-span-12 flex flex-row xl:flex-col gap-3 overflow-x-auto pb-4 xl:pb-0 scrollbar-hide w-full">
            {skillGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => setActiveTab(group.id)}
                className={`relative flex items-center gap-4 px-6 py-5 rounded-2xl min-w-[220px] lg:min-w-0 transition-all duration-300 ${activeTab === group.id ? "text-white" : "text-slate-500 hover:bg-white/[0.02]"
                  }`}
              >
                {activeTab === group.id && (
                  <motion.div
                    layoutId="active-nav-bg"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.02)] border-l-4"
                    style={{ borderLeftColor: group.color }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="z-10" style={{ color: activeTab === group.id ? group.color : "inherit" }}>
                  {group.icon}
                </span>
                <span className="z-10 font-bold text-sm uppercase tracking-widest">{group.category}</span>
              </button>
            ))}

            <div className="hidden xl:flex mt-12 p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md items-start gap-4 flex-col">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-white uppercase tracking-widest">Telemetry</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-tight leading-relaxed">
                Real-time representation of hands-on experience across security operations, engineering, and development domains.
              </p>
            </div>
          </div>

          {/* Radar Chart Area */}
          <div className="lg:col-span-5 xl:col-span-4 relative flex items-center justify-center p-8 bg-black/40 border border-white/10 rounded-3xl backdrop-blur-md min-h-[400px]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)", position: "absolute" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full h-full flex justify-center items-center"
              >
                <RadarChart skills={activeGroup.skills} color={activeGroup.color} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Cards Area */}
          <div className="lg:col-span-7 xl:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {activeGroup.skills.map((skill, idx) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    color={activeGroup.color}
                    index={idx}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}