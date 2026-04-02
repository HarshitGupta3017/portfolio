"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────────────────────── */

const TIMELINE = [
  {
    date: "2026.03.25",
    code: "ANALYSIS",
    color: "#00f3ff",
    message: "Reverse engineered phishing payload patterns and improved detection logic"
  },
  {
    date: "2026.03.20",
    code: "STREAK",
    color: "#00ff41",
    message: "Maintained 180+ day offensive security learning streak (TryHackMe)"
  },
  {
    date: "2026.03.15",
    code: "DETECTION",
    color: "#f3f312",
    message: "Developed ML-based phishing URL classifier with heuristic fallback system"
  },
  {
    date: "2026.03.05",
    code: "SOC",
    color: "#ff0042",
    message: "Analyzed simulated SOC alerts and triaged false positives vs real threats"
  },
  {
    date: "2026.02.25",
    code: "OSINT",
    color: "#8b5cf6",
    message: "Performed OSINT investigation tracing digital footprint across public sources"
  },
  {
    date: "2026.02.15",
    code: "CERT",
    color: "#f3f312",
    message: "Completed CSEDP certification with merit distinction"
  },
  {
    date: "2026.02.08",
    code: "FORENSICS",
    color: "#00f3ff",
    message: "Investigated network traffic using Wireshark to identify suspicious patterns"
  },
  {
    date: "2026.01.28",
    code: "CTF",
    color: "#00ff41",
    message: "Solved multi-stage CTF challenges involving web exploitation and privilege escalation"
  },
  {
    date: "2026.01.10",
    code: "AUTOMATION",
    color: "#ff0042",
    message: "Built automation scripts for reconnaissance and enumeration workflows"
  },
  {
    date: "2025.12.20",
    code: "CLOUD",
    color: "#00f3ff",
    message: "Secured Azure cloud fundamentals with identity and access management concepts"
  },
];

const ACHIEVEMENTS = [
  {
    title: "OFFENSIVE_SECURITY",
    org: "TryHackMe",
    icon: "👑",
    color: "#00f3ff",
    desc: "Hands-on exploitation & adversary simulation"
  },
  {
    title: "ALGORITHMIC_PROBLEM_SOLVER",
    org: "LeetCode",
    icon: "⚔️",
    color: "#f3f312",
    desc: "Strong DSA & pattern recognition skills"
  },
  {
    title: "BUILD_ENGINEER",
    org: "GitHub",
    icon: "💾",
    color: "#ff0042",
    desc: "Ships real-world tools & security systems"
  },
  {
    title: "CTF_OPERATOR",
    org: "Cyber Ranges",
    icon: "🏅",
    color: "#00ff41",
    desc: "Applies skills in attack-defense scenarios"
  },
];

/* ─────────────────────────────────────────────────────────────
   CANVAS BACKGROUND
───────────────────────────────────────────────────────────── */
const CyberCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; type: number; code: string }[] = [];
    let animId: number;
    const CODES = ["0x", "FF", "01", "A7", ">>", "!!", "$$", "//"];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      particles = [];
      const count = Math.min(55, Math.floor((canvas.width * canvas.height) / 18000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width, y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 2.5 + 0.5, type: Math.floor(Math.random() * 4),
          code: CODES[Math.floor(Math.random() * CODES.length)],
        });
      }
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        const dx = mouse.current.x - p.x, dy = mouse.current.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110) { const f = (110 - dist) / 110; p.x -= dx * f * 0.04; p.y -= dy * f * 0.04; }
        ctx.fillStyle = "rgba(0,243,255,0.25)";
        ctx.strokeStyle = "rgba(0,243,255,0.15)";
        ctx.font = "7px monospace"; ctx.lineWidth = 0.8;
        if (p.type === 1) {
          ctx.beginPath(); ctx.moveTo(p.x - p.size, p.y); ctx.lineTo(p.x + p.size, p.y);
          ctx.moveTo(p.x, p.y - p.size); ctx.lineTo(p.x, p.y + p.size); ctx.stroke();
        } else if (p.type === 2) {
          ctx.fillRect(p.x, p.y, p.size * 4, 0.5);
        } else if (p.type === 3) {
          ctx.fillText(p.code, p.x, p.y);
        } else { ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2); ctx.fill(); }
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]; const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 120) {
            ctx.strokeStyle = `rgba(0,243,255,${0.08 * (1 - d / 120)})`; ctx.lineWidth = 0.4;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    resize(); animate();
    return () => { window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMouse); cancelAnimationFrame(animId); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-25" />;
};

/* ─────────────────────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────────────────────── */
function Counter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState("---");
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value === "---") { setDisplay("---"); return; }
    const num = parseInt(value, 10);
    if (isNaN(num)) { setDisplay(value); return; }
    if (started.current) { setDisplay(num.toString() + suffix); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return;
      started.current = true;
      const duration = 1400, start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        setDisplay(Math.round(eased * num).toString() + suffix);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.disconnect();
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, suffix]);

  return <div ref={ref}>{display}</div>;
}


/* ─────────────────────────────────────────────────────────────
   SYSTEM TOPOLOGY MAP
───────────────────────────────────────────────────────────── */

type TopoNode = {
  id: string; label: string; type: "core" | "platform" | "skill";
  x: number; y: number; color: string; desc: string; weeks?: number[];
};

type TopoLink = { source: string; target: string };

const TOPO_NODES: TopoNode[] = [
  { id: "SYS_CORE", label: "SYS_CORE", type: "core", x: 400, y: 260, color: "#00ff41", desc: "Central coordination hub for all platform telemetry" },
  { id: "TRYHACKME", label: "TryHackMe", type: "platform", x: 210, y: 155, color: "#00f3ff", desc: "Offensive security telemetry & adversary labs", weeks: [0.5, 0.7, 0.9, 1.0, 0.8, 0.95, 0.85, 1.0] },
  { id: "LEETCODE", label: "LeetCode", type: "platform", x: 590, y: 155, color: "#f3f312", desc: "Algorithmic logic unit & pattern recognition engine", weeks: [0.4, 0.6, 0.8, 0.75, 0.9, 1.0, 0.7, 0.85] },
  { id: "GITHUB", label: "GitHub", type: "platform", x: 400, y: 400, color: "#ff0042", desc: "Build engine, distributed version control & OSS", weeks: [0.3, 0.5, 0.6, 0.45, 0.8, 0.7, 0.9, 0.6] },
  { id: "SOC_TRIAGE", label: "SOC Triage", type: "skill", x: 80, y: 55, color: "#00ff41", desc: "Security operations, threat detection & triage logic" },
  { id: "WEB_EXPLOIT", label: "Web Exploit", type: "skill", x: 80, y: 400, color: "#00f3ff", desc: "Vulnerability analysis & web exploitation techniques" },
  { id: "PRIV_ESC", label: "PrivEsc", type: "skill", x: 718, y: 55, color: "#8b5cf6", desc: "Privilege escalation & post-exploitation tactics" },
  { id: "DSA", label: "Data Struct", type: "skill", x: 718, y: 400, color: "#f3f312", desc: "Data structures & optimized algorithmic problem solving" },
  { id: "ML_DETECT", label: "ML Detect", type: "skill", x: 65, y: 248, color: "#ff0042", desc: "ML-powered heuristic threat & phishing detection" },
  { id: "AZURE_CLOUD", label: "Azure Cloud", type: "skill", x: 730, y: 248, color: "#00f3ff", desc: "Cloud security posture & identity/access management" },
  { id: "OSINT", label: "OSINT", type: "skill", x: 400, y: 48, color: "#8b5cf6", desc: "Open-source intelligence & digital footprint analysis" },
  { id: "AUTOMATION", label: "Automation", type: "skill", x: 560, y: 455, color: "#ff0042", desc: "Recon & enumeration workflow automation scripting" },
];

const TOPO_LINKS: TopoLink[] = [
  { source: "SYS_CORE", target: "TRYHACKME" },
  { source: "SYS_CORE", target: "LEETCODE" },
  { source: "SYS_CORE", target: "GITHUB" },
  { source: "TRYHACKME", target: "SOC_TRIAGE" },
  { source: "TRYHACKME", target: "WEB_EXPLOIT" },
  { source: "TRYHACKME", target: "OSINT" },
  { source: "LEETCODE", target: "DSA" },
  { source: "LEETCODE", target: "ML_DETECT" },
  { source: "LEETCODE", target: "PRIV_ESC" },
  { source: "GITHUB", target: "AZURE_CLOUD" },
  { source: "GITHUB", target: "AUTOMATION" },
];

/* HUD right-panel sub-views */
const HudSparklines = () => (
  <svg viewBox="0 0 200 70" className="w-full h-full" preserveAspectRatio="none">
    {/* Horizontal grid lines */}
    {[0.25, 0.5, 0.75].map((v, i) => (
      <line key={i} x1="0" y1={65 - v * 58} x2="200" y2={65 - v * 58}
        stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="3 3" />
    ))}
    {TOPO_NODES.filter(n => n.type === "platform").map((p, i) => {
      const pts = p.weeks!.map((v, idx) => `${(idx / 7) * 200},${65 - v * 55}`);
      const areaPath = `M ${pts[0]} L ${pts.join(" L ")} L 200,70 L 0,70 Z`;
      const linePath = `M ${pts.join(" L ")}`;
      return (
        <g key={p.id}>
          {/* Area fill */}
          <motion.path d={areaPath} fill={p.color} fillOpacity={0.06}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: i * 0.3 }} />
          {/* Line */}
          <motion.path d={linePath} fill="none" stroke={p.color} strokeWidth="1.4" strokeOpacity="0.8"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, delay: i * 0.3 }} />
          {/* Last point dot */}
          <motion.circle cx={200} cy={65 - p.weeks![7] * 55} r="2" fill={p.color}
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }} />
        </g>
      );
    })}
    <text x="2" y="69" fontSize="6" fill="rgba(255,255,255,0.2)" fontFamily="monospace">W-8</text>
    <text x="179" y="69" fontSize="6" fill="rgba(255,255,255,0.2)" fontFamily="monospace">NOW</text>
  </svg>
);
const HudBarChart = ({ weeks, color }: { weeks: number[]; color: string }) => (
  <div className="flex items-end gap-[2px] h-full w-full">
    {weeks.map((w, i) => (
      <motion.div key={i} className="flex-1 rounded-t-[1px]"
        initial={{ height: 0 }} animate={{ height: `${w * 100}%` }}
        style={{ backgroundColor: color, opacity: 0.25 + (i / weeks.length) * 0.75 }} />
    ))}
  </div>
);
const HudResonanceBar = ({ color, pct }: { color: string; pct: number }) => (
  <div className="flex flex-col justify-center gap-1.5 w-full h-full">
    <div className="flex justify-between text-[7px] font-mono text-white/30 uppercase tracking-widest">
      <span>Resonance_Freq</span><span>{pct}%</span>
    </div>
    <div className="relative h-[5px] bg-white/5 overflow-hidden rounded-full">
      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="h-full relative rounded-full" style={{ backgroundColor: color }}>
        <motion.div animate={{ x: ["-100%", "300%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 w-1/2 bg-white/30 skew-x-12" />
      </motion.div>
    </div>
  </div>
);

/* Main component */
function PlatformActivityChart() {
  const [hovered, setHovered] = useState<string | null>(null);
  const activeNode = TOPO_NODES.find(n => n.id === hovered) ?? null;

  const isConnected = (id: string) => {
    if (!hovered) return true;
    if (hovered === id) return true;
    return TOPO_LINKS.some(l => (l.source === hovered && l.target === id) || (l.target === hovered && l.source === id));
  };

  const activeBg = activeNode?.color ?? "#00f3ff";
  const SKILL_PCTS: Record<string, number> = { SOC_TRIAGE: 88, WEB_EXPLOIT: 76, PRIV_ESC: 72, DSA: 80, ML_DETECT: 84, AZURE_CLOUD: 70, OSINT: 75, AUTOMATION: 78 };

  return (
    <div className="flex flex-col h-full gap-0">

      {/* ── Telemetry HUD strip ── */}
      <div className="shrink-0 flex border-b border-white/8 bg-black/40 overflow-hidden" style={{ height: 120 }}>
        {/* Left: node info */}
        <div className="w-1/2 px-4 flex flex-col justify-center border-r border-white/5 relative overflow-hidden">
          {/* Animated accent line */}
          <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 right-0 h-px w-1/2 opacity-40"
            style={{ background: `linear-gradient(90deg, transparent, ${activeBg}, transparent)` }} />
          <AnimatePresence mode="wait">
            <motion.div key={hovered ?? "global"} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}>
              <div className="flex items-center gap-2 mb-0.5">
                <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: activeBg }} />
                <span className="text-[9px] font-mono font-bold tracking-[0.18em] truncate" style={{ color: activeBg }}>
                  {activeNode?.id ?? "OPS_CORE"}
                </span>
              </div>
              <div className="text-[8px] font-mono text-white/35 leading-snug line-clamp-2">
                {activeNode?.desc ?? "Central activity processor tracking all operational signals in real-time."}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Right: data viz */}
        <div className="w-1/2 px-3 py-2.5 flex items-center bg-black/20">
          <AnimatePresence mode="wait">
            {!hovered ? (
              <motion.div key="spark" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <HudSparklines />
              </motion.div>
            ) : activeNode?.type === "platform" ? (
              <motion.div key="bars" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <HudBarChart weeks={activeNode.weeks!} color={activeNode.color} />
              </motion.div>
            ) : (
              <motion.div key="res" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <HudResonanceBar color={activeNode?.color ?? "#00f3ff"} pct={SKILL_PCTS[activeNode?.id ?? ""] ?? 80} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Topology SVG canvas ── */}
      <div className="relative flex-grow overflow-hidden">
        {/* Dot-grid background */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#00f3ff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <svg viewBox="0 0 800 460" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full select-none">
          <defs>
            <filter id="topo-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="topo-glow-sm" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="topo-glow-lg" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Links */}
          {TOPO_LINKS.map((link, i) => {
            const s = TOPO_NODES.find(n => n.id === link.source)!;
            const t = TOPO_NODES.find(n => n.id === link.target)!;
            const dimmed = hovered && s.id !== hovered && t.id !== hovered;
            return (
              <g key={i} style={{ opacity: dimmed ? 0.04 : 1, transition: "opacity 0.25s" }}>
                {/* Soft base line */}
                <line x1={s.x} y1={s.y} x2={t.x} y2={t.y} stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                {/* Glow duplicate line */}
                <line x1={s.x} y1={s.y} x2={t.x} y2={t.y} stroke={s.color} strokeWidth="1" strokeOpacity="0.15" />
                {/* Animated dashed flow */}
                <motion.line x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                  stroke={s.color} strokeWidth="1.2" strokeDasharray="6 6"
                  animate={{ strokeDashoffset: [0, -24] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  strokeOpacity="0.7" />
                {/* Moving particle */}
                <motion.circle r="3" fill={s.color} filter="url(#topo-glow-sm)"
                  animate={{ cx: [s.x, t.x, s.x], cy: [s.y, t.y, s.y], opacity: [0, 1, 0] }}
                  transition={{ duration: 2.5 + i * 0.25, repeat: Infinity, delay: i * 0.45, ease: "linear" }} />
              </g>
            );
          })}

          {/* Nodes */}
          {TOPO_NODES.map((node) => {
            const dimmed = hovered && !isConnected(node.id);
            const isHov = hovered === node.id;
            const isCo = node.type === "core";
            const isPl = node.type === "platform";
            const r = isCo ? 8 : isPl ? 6 : 4;
            const labelY = node.y + (node.y > 185 ? -(r + 8) : (r + 12));

            return (
              <g key={node.id} onMouseEnter={() => setHovered(node.id)} onMouseLeave={() => setHovered(null)}
                style={{ opacity: dimmed ? 0.1 : 1, transition: "opacity 0.25s", cursor: "crosshair" }}>
                {/* Hover area */}
                <circle cx={node.x} cy={node.y} r={r + 16} fill="transparent" />

                {/* Spinning reticle on hover */}
                {isHov && (
                  <motion.circle cx={node.x} cy={node.y} r={r + 10}
                    fill="none" stroke={node.color} strokeWidth="0.8" strokeDasharray="3 3"
                    animate={{ rotate: 360 }} style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
                )}

                {/* Outer ambient glow blob */}
                {(isCo || isPl) && (
                  <motion.circle cx={node.x} cy={node.y} r={r + 14}
                    fill={node.color} fillOpacity={0.06}
                    filter="url(#topo-glow-lg)"
                    animate={{ r: [r + 12, r + 18, r + 12] }}
                    transition={{ duration: 3, repeat: Infinity }} />
                )}
                {/* Pulsing ring */}
                {(isCo || isPl) && (
                  <motion.circle cx={node.x} cy={node.y} r={r + 5}
                    fill="none" stroke={node.color} strokeWidth="0.8"
                    animate={{ opacity: [0.2, 0.65, 0.2], r: [r + 4, r + 9, r + 4] }}
                    transition={{ duration: 2, repeat: Infinity }} />
                )}
                {/* Skill nodes also get a subtle ambient ring */}
                {node.type === "skill" && (
                  <motion.circle cx={node.x} cy={node.y} r={r + 4}
                    fill="none" stroke={node.color} strokeWidth="0.5"
                    animate={{ opacity: [0.1, 0.35, 0.1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
                )}

                {/* Node glow halo */}
                <circle cx={node.x} cy={node.y} r={r + 2}
                  fill={node.color} fillOpacity={isCo ? 0.35 : isPl ? 0.2 : 0.15}
                  filter="url(#topo-glow)" />
                {/* Node body */}
                <motion.circle cx={node.x} cy={node.y} r={r}
                  fill={node.color} filter={isHov ? "url(#topo-glow-lg)" : "url(#topo-glow-sm)"}
                  animate={isHov ? { r: [r, r + 2.5, r] } : { opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: isHov ? 0.8 : 2.5 + Math.random(), repeat: Infinity }} />

                {/* Label */}
                <text x={node.x} y={labelY} textAnchor="middle" fontFamily="monospace"
                  fontSize={isCo ? "8" : isPl ? "7.5" : "6.5"} fontWeight={isCo || isHov ? "bold" : "normal"}
                  fill={node.color} opacity={isHov ? 1 : isCo ? 0.9 : 0.6}>
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Vertical scanner sweep */}
        <motion.div animate={{ y: ["-5%", "105%"] }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-[1px] pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,243,255,0.15), transparent)", boxShadow: "0 0 8px rgba(0,243,255,0.1)" }} />
        {/* Ambient corner glows */}
        <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none" style={{ background: "radial-gradient(circle at 0 0, rgba(0,243,255,0.06), transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none" style={{ background: "radial-gradient(circle at 100% 100%, rgba(255,0,66,0.06), transparent 70%)" }} />
        <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: "radial-gradient(circle at 100% 0, rgba(243,243,18,0.05), transparent 70%)" }} />
      </div>
    </div>
  );
}




/* ─────────────────────────────────────────────────────────────
   METRIC CARD
───────────────────────────────────────────────────────────── */
function MetricCard({
  label, value, unit, color, icon, sublabel, delay = 0,
}: {
  label: string; value: string; unit: string; color: string;
  icon: string; sublabel?: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative p-5 border bg-black/40 backdrop-blur-sm overflow-hidden flex flex-col group cursor-default"
      style={{ borderColor: `${color}25` }}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: `${color}60` }} />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: `${color}60` }} />
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}12, transparent 70%)` }}
      />
      {/* Animated top line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay }}
          className="h-full w-1/2"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />
      </div>
      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl">{icon}</span>
          <span
            className="text-[8px] font-bold tracking-[0.15em] uppercase font-mono px-2 py-0.5 border"
            style={{ color, borderColor: `${color}30`, backgroundColor: `${color}10` }}
          >
            LIVE
          </span>
        </div>
        <div>
          <div className="text-[9px] font-mono tracking-widest uppercase mb-1" style={{ color: `${color}80` }}>
            {label}
          </div>
          <div
            className="text-4xl font-black tracking-tighter font-mono leading-none"
            style={{ color, textShadow: `0 0 20px ${color}50` }}
          >
            <Counter value={value} />
          </div>
          <div className="text-[9px] opacity-40 font-mono uppercase tracking-widest mt-1">{unit}</div>
          {sublabel && (
            <div className="text-[9px] font-mono mt-2 opacity-50 tracking-wider">{sublabel}</div>
          )}
        </div>
      </div>
      {/* Animated bottom bar */}
      <div className="mt-4 h-[2px] w-full overflow-hidden" style={{ backgroundColor: `${color}15` }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: delay + 0.3, ease: "easeOut" }}
          className="h-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
      <div
        className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TIMELINE FEED
───────────────────────────────────────────────────────────── */
function TimelineFeed() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] animate-pulse" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#00f3ff]/70">Ops_Log</span>
        </div>
        <div className="flex gap-1">
          {["#ff0042", "#f3f312", "#00f3ff"].map((c, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c, opacity: 0.5 }} />
          ))}
        </div>
      </div>
      <div className="flex-grow overflow-y-auto space-y-0 pr-1" style={{ scrollbarWidth: "thin", scrollbarColor: "#00f3ff20 transparent" }}>
        {TIMELINE.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="group relative flex gap-3 py-3 border-b border-white/5 hover:border-white/10 transition-colors last:border-0"
          >
            <div className="flex flex-col items-center pt-0.5 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-[3px]" style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}` }} />
              {i < TIMELINE.length - 1 && <div className="w-px flex-grow mt-1" style={{ backgroundColor: `${item.color}20` }} />}
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[8px] font-bold font-mono tracking-[0.15em] px-1.5 py-0.5 border shrink-0"
                  style={{ color: item.color, borderColor: `${item.color}30`, backgroundColor: `${item.color}10` }}>
                  {item.code}
                </span>
                <span className="text-[8px] font-mono text-white/25 shrink-0">{item.date}</span>
              </div>
              <p className="text-[11px] text-white/70 leading-snug group-hover:text-white/80 transition-colors font-mono">{item.message}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ACHIEVEMENT BADGE
───────────────────────────────────────────────────────────── */
function AchievementBadge({ ach, delay }: { ach: typeof ACHIEVEMENTS[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ x: -4, scale: 1.01 }}
      className="group relative flex items-start gap-3 p-3 border transition-all duration-300 cursor-default overflow-hidden"
      style={{ borderColor: `${ach.color}20`, backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(90deg, ${ach.color}08, transparent)` }} />
      <div className="absolute left-0 top-0 bottom-0 w-[2px] opacity-40 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: ach.color }} />
      <div className="text-xl shrink-0 mt-0.5" style={{ filter: `drop-shadow(0 0 8px ${ach.color}80)` }}>{ach.icon}</div>
      <div className="relative z-10 min-w-0 flex-1">
        <div
          className="text-[9px] font-black tracking-[0.08em] font-mono leading-tight"
          style={{ color: ach.color, textShadow: `0 0 10px ${ach.color}50`, wordBreak: "break-word", overflowWrap: "anywhere" }}
        >
          {ach.title}
        </div>
        <div className="text-[8px] font-mono text-white/25 uppercase tracking-[0.1em] mt-1 leading-snug">{ach.org}</div>
        <div className="text-[8px] font-mono text-white/20 mt-0.5 leading-snug">{ach.desc}</div>
      </div>
      <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay }}
          className="h-full w-1/2 opacity-0 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent, ${ach.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   GLOBAL STATS ROW
───────────────────────────────────────────────────────────── */
function GlobalStats({ thmStreak, lcSolved, ghContrib }: { thmStreak: string; lcSolved: string; ghContrib: string }) {
  const items = [
    { val: "50+", label: "OSINT_CASES", color: "#00f3ff" },
    { val: thmStreak !== "---" ? `${thmStreak}+` : "183+", label: "THM_STREAK", color: "#00ff41" },
    { val: lcSolved !== "---" ? `${lcSolved}+` : "970+", label: "DSA_PROBLEMS", color: "#f3f312" },
    { val: ghContrib !== "---" ? `${ghContrib}+` : "1K+", label: "CODE_COMMITS", color: "#ff0042" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-white/10 overflow-hidden">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="relative bg-black/60 p-4 text-center group hover:bg-black/80 transition-colors"
        >
          <div className="text-2xl font-black italic tracking-tighter font-mono" style={{ color: item.color, textShadow: `0 0 15px ${item.color}50` }}>
            {item.val}
          </div>
          <div className="text-[8px] font-mono uppercase tracking-[0.2em] opacity-40 mt-1">{item.label}</div>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }} />
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────────────── */
export default function Activity() {
  const [thmStreak, setThmStreak] = useState("---");
  const [thmRank, setThmRank] = useState("Wizard 0xA");
  const [lcStreak, setLcStreak] = useState("---");
  const [lcSolved, setLcSolved] = useState("---");
  const [lcRanking, setLcRanking] = useState<string | null>(null);
  const [ghContrib, setGhContrib] = useState("---");
  const [ghRepos, setGhRepos] = useState("---");
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15], [40, 0]);

  useEffect(() => {
    setMounted(true);
    const update = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    update();
    const iv = setInterval(update, 1000);
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    window.addEventListener("mousemove", onMove);
    return () => { clearInterval(iv); window.removeEventListener("mousemove", onMove); };
  }, []);

  useEffect(() => {
    fetch(`/api/stats?t=${Date.now()}`)
      .then((r) => r.json())
      .then((d) => {
        // TryHackMe
        if (d?.thm?.streak != null) setThmStreak(d.thm.streak.toString());
        if (d?.thm?.rank) setThmRank(d.thm.rank);
        // LeetCode
        if (d?.lc?.streak != null) setLcStreak(d.lc.streak.toString());
        if (d?.lc?.solved != null) setLcSolved(d.lc.solved.toString());
        if (d?.lc?.ranking != null) setLcRanking(d.lc.ranking.toLocaleString());
        // GitHub
        const gc = d?.gh?.contributions;
        if (gc != null) {
          if (typeof gc === "object") {
            const sum = Object.values(gc).reduce((a: number, v: unknown) => a + (Number(v) || 0), 0);
            setGhContrib(sum.toString());
          } else {
            setGhContrib(gc.toString());
          }
        }
        if (d?.gh?.repos != null) setGhRepos(d.gh.repos.toString());
      })
      .catch(() => { });
  }, []);

  return (
    <section
      id="activity"
      ref={containerRef}
      className="relative bg-[#05080f] text-[#00f3ff] py-24 overflow-hidden font-mono"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 z-[999] pointer-events-none">
        <div className="h-[1px] bg-white/30 scale-y-[0.6] origin-top" />
      </div>

      <CyberCanvas />

      {/* Mouse-follow glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-300"
        style={{ background: `radial-gradient(900px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,243,255,0.10), transparent 70%)` }}
      />
      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#00f3ff]/[0.08] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-[#00ff41]/[0.08] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 left-1/3 w-[400px] h-[400px] bg-[#f3f312]/[0.06] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00f3ff]/[0.05] blur-[200px] rounded-full pointer-events-none" />

      {/* Full-section subtle radial gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 20%, rgba(0,243,255,0.06), transparent 60%)" }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(rgba(0,243,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      {/* Scanlines */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]" />

      <motion.div style={{ opacity, y }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Section Header ── */}
        <div className="flex items-end justify-between mb-14 pb-5 border-b border-white/10 relative">
          <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden pointer-events-none">
            <motion.div
              animate={{ x: ["0%", "100%", "0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="h-full w-32"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,243,255,0.6), transparent)" }}
            />
          </div>
          <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-2 text-[10px] font-mono uppercase tracking-[0.4em] text-[#00ff41]">
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-[#00ff41]" style={{ boxShadow: "0 0 8px #00ff41" }} />
              Ops_Timeline
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-none">
              Performance
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#00ff41] ml-3">Grid</span>
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }} className="text-[#00ff41] ml-1">_</motion.span>
            </h2>
            <div className="flex items-center gap-4 mt-2 text-[9px] text-[#00f3ff]/40 font-mono">
              <span>● STATUS: LIVE ACTIVITY STREAM</span>
              <span>● SOURCE: MULTI-PLATFORM INPUT</span>
              <span className="hidden md:inline">● WINDOW: REAL-TIME TRACKING</span>
            </div>
          </motion.div>
          <div className="hidden md:flex flex-col items-end gap-1 text-right">
            <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">SYSTEM_CLOCK</span>
            <span className="text-2xl font-black font-mono tracking-tighter text-[#00f3ff]" style={{ textShadow: "0 0 20px rgba(0,243,255,0.5)" }}>
              {mounted ? time : "--:--:--"}
            </span>
            <div className="flex items-center gap-1.5 text-[8px] font-mono text-white/25">
              <span className="w-1 h-1 rounded-full bg-[#00ff41] animate-pulse" />
              LIVE TELEMETRY FEED
            </div>
          </div>
        </div>

        {/* ── Main 12-col Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* ── Col 1: Timeline Log (3/12) ── */}
          <div className="lg:col-span-3">
            <div className="h-full border border-[#00f3ff]/12 bg-black/40 backdrop-blur-sm p-4 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[linear-gradient(rgba(0,243,255,1)_1px,transparent_1px)] bg-[size:100%_3px]" />
              <TimelineFeed />
            </div>
          </div>

          {/* ── Col 2: Central Metrics + Activity Chart (6/12) ── */}
          <div className="lg:col-span-6 flex flex-col gap-5">

            {/* Metric cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MetricCard
                label="THM_STREAK"
                value={thmStreak}
                unit="Consecutive Days"
                color="#00f3ff"
                icon="🌐"
                sublabel={`Rank: ${thmRank}`}
                delay={0}
              />
              <MetricCard
                label="LC_STREAK"
                value={lcStreak}
                unit="Day Streak"
                color="#f3f312"
                icon="⚔️"
                sublabel={lcSolved !== "---" ? `${lcSolved} solved${lcRanking ? ` · #${lcRanking}` : ""}` : undefined}
                delay={0.1}
              />
              <MetricCard
                label="GH_CONTRIBS"
                value={ghContrib}
                unit="Total Contributions"
                color="#ff0042"
                icon="💾"
                sublabel={ghRepos !== "---" ? `${ghRepos} public repos` : undefined}
                delay={0.2}
              />
            </div>

            {/* Platform Activity Chart */}
            <div className="relative border border-[#00ff41]/12 bg-black/40 backdrop-blur-sm p-5 overflow-hidden flex-grow">
              <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[linear-gradient(rgba(0,243,255,1)_1px,transparent_1px)] bg-[size:100%_3px]" />
              <PlatformActivityChart />
            </div>

            {/* Global Stats */}
            <GlobalStats thmStreak={thmStreak} lcSolved={lcSolved} ghContrib={ghContrib} />
          </div>

          {/* ── Col 3: Achievements + Terminal (3/12) ── */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Achievements */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-[1px] flex-grow" style={{ background: "linear-gradient(90deg, #00f3ff40, transparent)" }} />
                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] text-[#00f3ff]/50">Core Strengths</span>
                <div className="h-[1px] flex-grow" style={{ background: "linear-gradient(90deg, transparent, #00f3ff40)" }} />
              </div>
              <div className="flex flex-col gap-2">
                {ACHIEVEMENTS.map((ach, i) => (
                  <AchievementBadge key={i} ach={ach} delay={i * 0.08} />
                ))}
              </div>
            </div>

            {/* Terminal block */}
            <div className="border border-[#00f3ff]/10 bg-black/60 p-4 relative overflow-hidden flex-grow flex flex-col">
              <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[linear-gradient(rgba(0,243,255,1)_1px,transparent_1px)] bg-[size:100%_3px]" />
              {/* Terminal top bar */}
              <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-white/8 shrink-0">
                <div className="w-2 h-2 rounded-full bg-[#ff0042]/60" />
                <div className="w-2 h-2 rounded-full bg-[#f3f312]/60" />
                <div className="w-2 h-2 rounded-full bg-[#00ff41]/60" />
                <span className="ml-2 text-[8px] font-mono text-white/20 tracking-widest uppercase">root@portfolio:~</span>
              </div>
              {/* Commands */}
              <div className="space-y-1.5 text-[10px] font-mono shrink-0">
                <div className="text-white/30"><span className="text-[#00ff41]/70">$ </span>whoami</div>
                <div className="text-[#00f3ff]/70">⟹ Security Engineer | Offensive | Builder</div>
                <div className="text-white/30 mt-2"><span className="text-[#00ff41]/70">$ </span>focus --current</div>
                <div className="text-[#00ff41]/60">⟹ Phishing Detection Systems</div>
                <div className="text-white/20">⟹ SOC Simulation & Threat Analysis</div>
                <div className="text-white/20">⟹ Automation of Security Workflows</div>
                <div className="text-white/30 mt-2"><span className="text-[#00ff41]/70">$ </span>tools --active</div>
                <div className="text-[#f3f312]/60">⟹ Purview · Splunk · Defender · OSINT</div>
                <div className="text-white/30 mt-2"><span className="text-[#00ff41]/70">$ </span>status</div>
                <div className="text-[#00ff41]/60">⟹ Building real-world detection systems</div>
              </div>
              {/* Domain skill bars */}
              <div className="mt-4 space-y-2 shrink-0">
                <div className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em] mb-2">Domain_Strength</div>
                {[
                  { label: "SEC_OPS", pct: 88, color: "#00ff41" },
                  { label: "THREAT", pct: 82, color: "#00f3ff" },
                  { label: "DEV", pct: 72, color: "#8b5cf6" },
                  { label: "ALGO", pct: 80, color: "#f3f312" },
                  { label: "OSINT", pct: 75, color: "#ff0042" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[8px] text-white/20 w-12 uppercase tracking-wide shrink-0">{s.label}</span>
                    <div className="flex-grow h-[3px] bg-white/5 overflow-hidden rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: s.color, boxShadow: `0 0 6px ${s.color}80` }}
                      />
                    </div>
                    <span className="text-[8px] font-mono text-white/15 shrink-0 w-6 text-right">{s.pct}</span>
                  </div>
                ))}
              </div>
              {/* Uptime grid — interactive, fills remaining space */}
              <div className="mt-4 flex-grow border-t border-white/5 pt-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">Uptime_Status</div>
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                      className="w-1 h-1 rounded-full bg-[#00ff41]"
                    />
                    <span className="text-[7px] font-mono text-white/20 uppercase tracking-wider">LIVE</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { k: "CONSISTENCY", v: "HIGH", c: "#00ff41", pulse: true },
                    { k: "ACTIVITY_LEVEL", v: "PEAK", c: "#ff0042", pulse: true },
                    { k: "LEARNING_CURVE", v: "ASCENDING", c: "#00f3ff", pulse: false },
                    { k: "BUILD_STATE", v: "ACTIVE", c: "#f3f312", pulse: true },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ scale: 1.04, y: -1 }}
                      className="group relative p-2 border overflow-hidden cursor-default"
                      style={{ borderColor: `${item.c}20`, backgroundColor: `${item.c}06` }}
                    >
                      {/* Hover glow fill */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ background: `radial-gradient(circle at 50% 100%, ${item.c}15, transparent 70%)` }}
                      />
                      {/* Animated top border sweep */}
                      <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
                        <motion.div
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                          className="h-full w-1/2 opacity-0 group-hover:opacity-100"
                          style={{ background: `linear-gradient(90deg, transparent, ${item.c}, transparent)` }}
                        />
                      </div>
                      <div className="relative z-10">
                        <div className="text-[7px] font-mono text-white/30 uppercase tracking-wider mb-1">{item.k}</div>
                        <div className="flex items-center gap-1.5">
                          {item.pulse && (
                            <motion.div
                              animate={{ opacity: [1, 0.2, 1] }}
                              transition={{ duration: 1.2 + i * 0.3, repeat: Infinity }}
                              className="w-1 h-1 rounded-full shrink-0"
                              style={{ backgroundColor: item.c }}
                            />
                          )}
                          <div
                            className="text-[10px] font-black font-mono leading-none"
                            style={{ color: item.c, textShadow: `0 0 10px ${item.c}60` }}
                          >
                            {item.v}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Blinking cursor */}
              <div className="flex items-center gap-1 mt-3 shrink-0">
                <span className="text-[#00ff41]/70 text-[10px] font-mono">$ </span>
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="text-[10px] font-mono text-[#00f3ff]">█</motion.span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating watermark */}
        <div className="absolute bottom-8 right-8 text-[100px] md:text-[140px] font-black opacity-[0.015] pointer-events-none select-none italic leading-none whitespace-nowrap text-white">
          SYSTEM_2026
        </div>
      </motion.div>
    </section>
  );
}
