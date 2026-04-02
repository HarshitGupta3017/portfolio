
"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Github,
  ArrowUpRight,
  Mic,
  Coins,
  Shield,
  AlertTriangle,
} from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */

const THREAT_CHECKS = [
  { label: "Domain Age", verdict: "Newly Registered", flagged: true },
  { label: "SSL Certificate", verdict: "VALID", flagged: false },
  { label: "Redirect Chain", verdict: "MULTIPLE REDIRECTS", flagged: true },
  { label: "Reputation Score", verdict: "MALICIOUS", flagged: true },
  { label: "Content Patterns", verdict: "Phishing Indicators", flagged: true },
  { label: "WHOIS Disclosure", verdict: "Privacy Protected", flagged: true },
];

const PANELS = [
  {
    id: "phishio",
    num: "01",
    title: "Phishio AI",
    category: "Security Tooling",
    status: "Live",
    accent: "#00ff41",
    bg: "radial-gradient(ellipse 80% 60% at 65% 50%, rgba(0,255,65,0.20) 0%, transparent 70%)",
    borderColor: "rgba(0,255,65,0.14)",
    description:
      "Real-time phishing detection platform that automates URL risk analysis using multi-signal threat intelligence — reducing manual triage effort and accelerating incident response.",
    details: [
      { label: "Problem", color: "#ff6b00", text: "Security teams rely on manual URL triage, leading to delayed detection and increased exposure to phishing attacks." },
      { label: "Solution", color: "#00f0ff", text: "Built a FastAPI-based pipeline that aggregates domain intelligence, analyzes behavioral signals, and generates real-time risk scores." },
      { label: "Impact", color: "#00ff41", text: "Reduced investigation time significantly and enabled faster threat containment through automated decision-making." },
    ],
    tech: ["Python", "FastAPI", "BeautifulSoup", "Vercel"],
    link: "https://phishio-ai.vercel.app/",
    github: "https://github.com/HarshitGupta3017/phishio-ai",
    icon: Shield,
    visual: "scanner",
  },
  {
    id: "jarvis",
    num: "02",
    title: "JARVIS",
    category: "AI Assistant",
    status: "In Development",
    accent: "#8b5cf6",
    bg: "radial-gradient(ellipse 80% 60% at 65% 50%, rgba(139,92,246,0.20) 0%, transparent 70%)",
    borderColor: "rgba(139,92,246,0.14)",
    description:
      "Voice-driven AI assistant for system automation and real-time information retrieval, designed to streamline repetitive workflows and improve operational efficiency.",
    details: [
      { label: "Interface", color: "#8b5cf6", text: "Implemented voice-based command execution for system tasks, enabling hands-free interaction and workflow automation." },
      { label: "Engine", color: "#00f0ff", text: "Integrated GPT-based intelligence with offline TTS capabilities, ensuring low-latency responses and partial offline functionality." },
      { label: "Performance", color: "#00ff41", text: "Optimized asynchronous processing to reduce response latency and improve execution efficiency across tasks." },
    ],
    tech: ["Python", "OpenAI", "Pyttsx3", "SpeechRecognition"],
    link: "#",
    github: "#",
    icon: Mic,
    visual: "voice",
  },
  {
    id: "nobto",
    num: "03",
    title: "NOBTO",
    category: "Crypto Intelligence",
    status: "Live",
    accent: "#00f0ff",
    bg: "radial-gradient(ellipse 80% 60% at 65% 50%, rgba(0,240,255,0.20) 0%, transparent 70%)",
    borderColor: "rgba(0,240,255,0.14)",
    description:
      "Real-time cryptocurrency intelligence platform delivering live market insights, exchange comparisons, and high-frequency data visualization.",
    details: [
      { label: "Data Pipeline", color: "#00f0ff", text: "Designed a high-frequency polling system integrating multiple exchange APIs for real-time price tracking and arbitrage insights." },
      { label: "Frontend", color: "#8b5cf6", text: "Built a performance-optimized UI with dynamic charting and minimal re-rendering for smooth real-time updates." },
      { label: "Scalability", color: "#00ff41", text: "Handled concurrent API responses efficiently, ensuring stable performance under continuous data flow." },
    ],
    tech: ["ReactJS", "ChakraUI", "JavaScript", "REST API"],
    link: "https://nobto.vercel.app/",
    github: "https://github.com/HarshitGupta3017",
    icon: Coins,
    visual: "chart",
  },
];

/* ─────────────────────────────────────────────────────────────
   VISUALS
───────────────────────────────────────────────────────────── */

function ThreatScanner({ accent, active }: { accent: string; active: boolean }) {
  const [revealed, setRevealed] = useState(-1);
  const [barWidth, setBarWidth] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const ran = useRef(false);

  useEffect(() => {
    if (!active || ran.current) return;
    ran.current = true;
    const t = setTimeout(() => {
      let i = 0;
      const tick = setInterval(() => {
        setRevealed(i++);
        if (i >= THREAT_CHECKS.length) {
          clearInterval(tick);
          setTimeout(() => {
            setBarWidth(87);
            let s = 0;
            const st = setInterval(() => {
              s += 2;
              if (s >= 87) { setScore(87); setDone(true); clearInterval(st); }
              else setScore(s);
            }, 16);
          }, 250);
        }
      }, 350);
    }, 400);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="space-y-2 font-mono text-xs">
      <div className="px-3 py-2 rounded-lg mb-3 flex items-center gap-2"
        style={{ background: "rgba(0,0,0,0.5)", border: "0.5px solid rgba(255,255,255,0.06)" }}>
        <span className="text-white/20 text-[9px] uppercase tracking-wider">URL</span>
        <span className="text-[#00f0ff] text-[10px] truncate">https://secure-paypal.verify-usr-access.co/login</span>
      </div>
      {THREAT_CHECKS.map((c, i) => (
        <motion.div key={i} animate={{ opacity: revealed >= i ? 1 : 0.1 }} transition={{ duration: 0.2 }}
          className="flex justify-between items-center px-3 py-1.5 rounded-md"
          style={{ background: "rgba(0,0,0,0.3)", border: "0.5px solid rgba(255,255,255,0.03)" }}>
          <span className="text-white/30 text-[10px]">{c.label}</span>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded"
            style={revealed >= i
              ? { color: c.flagged ? "#ff5555" : "#00ff41", background: c.flagged ? "rgba(255,68,68,0.08)" : "rgba(0,255,65,0.08)" }
              : { color: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
            {revealed >= i ? c.verdict : "———"}
          </span>
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: revealed >= THREAT_CHECKS.length - 1 ? 1 : 0 }}
        transition={{ duration: 0.4 }} className="p-4 rounded-xl mt-1"
        style={{ border: "0.5px solid rgba(255,68,68,0.2)", background: "rgba(255,68,68,0.04)" }}>
        <div className="flex justify-between mb-2">
          <span className="text-white/20 text-[9px] uppercase tracking-[0.2em]">Risk Score</span>
          <AlertTriangle className="w-3 h-3 text-[#ff5555]" />
        </div>
        <div className="text-3xl font-black text-[#ff5555] mb-2">
          {score}<span className="text-sm text-white/15 font-normal ml-1">/100</span>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all ease-out"
            style={{ width: `${barWidth}%`, transitionDuration: "1.4s", background: "linear-gradient(90deg,#ff6b00,#ff4444)" }} />
        </div>
        {done && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-[9px] text-[#ff5555] uppercase tracking-[0.2em] mt-2">⚠ High Confidence Threat</motion.p>
        )}
      </motion.div>
    </div>
  );
}

function VoiceVisual({ accent }: { accent: string }) {
  const H = [0.3, 0.65, 0.5, 1, 0.55, 0.85, 0.4, 0.9, 0.6, 0.75, 0.35, 0.7, 0.45, 0.8];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-1.5 h-20">
        {H.map((h, i) => (
          <motion.div key={i}
            animate={{ scaleY: [h, h * 0.35, h * 1.15, h] }}
            transition={{ duration: 1.1 + i * 0.09, repeat: Infinity, ease: "easeInOut", delay: i * 0.07 }}
            className="w-1.5 rounded-full"
            style={{ height: "100%", transformOrigin: "bottom", backgroundColor: accent, opacity: 0.75 }}
          />
        ))}
      </div>
      <div className="font-mono text-[10px] text-white/20 text-center">Listening...</div>
      <div className="space-y-1.5">
        {["Open dashboard", "Search latest ML papers", "Trigger incident response playbook"].map((cmd, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-md"
            style={{ background: "rgba(0,0,0,0.35)", border: "0.5px solid rgba(255,255,255,0.04)" }}>
            <span className="font-mono text-[9px]" style={{ color: `${accent}50` }}>▸</span>
            <span className="font-mono text-[10px] text-white/30">{cmd}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartVisual({ accent }: { accent: string }) {
  const [prices, setPrices] = useState([42, 55, 48, 61, 58, 71, 65, 80, 74, 88, 82, 95]);
  const [volumes, setVolumes] = useState([12, 25, 18, 30, 22, 15, 28, 35, 20, 10, 24, 16]);
  const [coins, setCoins] = useState([
    { sym: "BTC", p: 67240.50, ch: 2.4 },
    { sym: "ETH", p: 3512.20, ch: 1.8 },
    { sym: "SOL", p: 182.45, ch: -0.6 },
  ]);

  useEffect(() => {
    const tick = setInterval(() => {
      // Simulate real-time price tick
      setPrices(prev => {
        const last = prev[prev.length - 1];
        const next = Math.max(20, Math.min(100, last + (Math.random() - 0.5) * 25));
        return [...prev.slice(1), next];
      });

      // Volume tick
      setVolumes(prev => [...prev.slice(1), Math.random() * 25 + 10]);

      // Fluctuate coin prices
      setCoins(prev => prev.map(c => {
        const change = (Math.random() - 0.5) * (c.p * 0.003);
        return {
          ...c,
          p: c.p + change,
          ch: c.ch + (change / c.p) * 100
        };
      }));
    }, 1200);
    return () => clearInterval(tick);
  }, []);

  const max = Math.max(...prices, 100);
  const W = 240, H = 80;
  const pts = prices.map((p, i) => `${(i / (prices.length - 1)) * W},${H - (p / max) * H}`).join(" ");

  // Last point coordinates for the glowing dot
  const lastX = W;
  const lastY = H - (prices[prices.length - 1] / max) * H;

  return (
    <div className="space-y-3">
      <div className="rounded-lg overflow-hidden p-3 relative"
        style={{ background: "rgba(0,0,0,0.4)", border: "0.5px solid rgba(255,255,255,0.05)" }}>

        {/* 'LIVE' Badge overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/50 border border-white/5 z-10">
          <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-[#ff5555]" />
          <span className="font-mono text-[8px] text-white/50 tracking-wider">LIVE</span>
        </div>

        <svg width="100%" viewBox={`0 0 ${W} ${H + 4}`} preserveAspectRatio="none" className="h-[72px] relative z-0 mt-1">
          <defs>
            <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="vol-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
              <stop offset="100%" stopColor={accent} stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[1, 2, 3].map(i => (
            <line key={`h-${i}`} x1="0" y1={(H / 4) * i} x2={W} y2={(H / 4) * i} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="2,2" />
          ))}

          {/* Animated Volume Bars */}
          {volumes.map((v, i) => {
            const vx = (i / (prices.length - 1)) * W;
            return (
              <motion.rect
                key={`vol-${i}`}
                initial={{ height: v, y: H - v + 4 }}
                animate={{ height: v, y: H - v + 4 }}
                transition={{ duration: 0.5, ease: "linear" }}
                x={vx - 2} width="4.5" fill="url(#vol-grad)" rx="1"
              />
            );
          })}

          <motion.polygon
            animate={{ points: `0,${H} ${pts} ${W},${H}` }}
            transition={{ duration: 0.5, ease: "linear" }}
            fill="url(#area-grad)"
          />
          <motion.polyline
            animate={{ points: pts }}
            transition={{ duration: 0.5, ease: "linear" }}
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{ filter: `drop-shadow(0 0 4px ${accent})` }}
          />

          {/* Active Tracker Line */}
          <motion.line
            initial={{ y1: lastY, y2: lastY }}
            animate={{ y1: lastY, y2: lastY }}
            transition={{ duration: 0.5, ease: "linear" }}
            x1="0" x2={lastX} stroke={accent} strokeWidth="0.5" strokeDasharray="3,3" style={{ opacity: 0.5 }}
          />

          {/* Pulsing end dot representing the live cursor */}
          <motion.circle
            initial={{ cx: lastX, cy: lastY }}
            animate={{ cx: lastX, cy: lastY }}
            transition={{ duration: 0.5, ease: "linear" }}
            r="2" fill="#fff"
          />
          <motion.circle
            initial={{ cx: lastX, cy: lastY }}
            animate={{ cx: lastX, cy: lastY, r: [4, 8, 4], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            fill={accent}
          />
        </svg>
      </div>

      {coins.map((c) => (
        <div key={c.sym} className="flex justify-between items-center px-3 py-1.5 rounded-md transition-colors duration-300"
          style={{ background: "rgba(0,0,0,0.3)", border: "0.5px solid rgba(255,255,255,0.04)" }}>
          <span className="font-mono text-[10px]" style={{ color: accent, textShadow: `0 0 10px ${accent}50` }}>{c.sym}</span>
          <span className="font-mono text-[10px] text-white/80 tracking-wide">
            ${c.p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="font-mono text-[9px]" style={{ color: c.ch >= 0 ? "#00ff41" : "#ff5555" }}>
            {c.ch >= 0 ? "+" : ""}{c.ch.toFixed(2)}%
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SINGLE FULL-HEIGHT PANEL
───────────────────────────────────────────────────────────── */

function Panel({ panel, index, total }: { panel: typeof PANELS[0]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const Icon = panel.icon;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.3"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center">
      {/* Ambient accent wash */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: panel.bg }} />

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 py-20"
      >
        <div className="grid lg:grid-cols-[1fr_360px] gap-16 lg:gap-24 items-center">

          {/* ── Left: content ── */}
          <div>
            {/* Counter + category */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[11px] text-white/40">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="block w-8 h-px" style={{ background: `${panel.accent}60` }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: panel.accent, textShadow: `0 0 10px ${panel.accent}50` }}>
                {panel.category}
              </span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: panel.accent, opacity: panel.status === "Live" ? 1 : 0.4 }} />
            </div>

            <h2 className="text-[clamp(3rem,8vw,6rem)] font-black text-white tracking-tight leading-none mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              {panel.title}
            </h2>
            <p className="text-white/80 text-base font-light leading-relaxed max-w-lg mb-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              {panel.description}
            </p>

            {/* Details */}
            <div className="space-y-6 mb-10">
              {panel.details.map((d) => (
                <div key={d.label} className="flex gap-5">
                  <span className="font-mono text-[9px] mt-0.5 shrink-0 w-16 uppercase tracking-[0.2em]"
                    style={{ color: d.color, textShadow: `0 0 10px ${d.color}60` }}>{d.label}</span>
                  <p className="text-sm text-white/80 font-light leading-relaxed">{d.text}</p>
                </div>
              ))}
            </div>

            {/* Tech + CTAs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {panel.tech.map((t) => (
                <span key={t} className="font-mono text-[9px] px-3 py-1.5 rounded-md border"
                  style={{ borderColor: `${panel.accent}30`, color: panel.accent, background: `${panel.accent}10`, textShadow: `0 0 8px ${panel.accent}40` }}>
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {panel.link !== "#" && (
                <a href={panel.link} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-black transition-all hover:scale-105"
                  style={{ background: panel.accent, boxShadow: `0 0 20px ${panel.accent}40` }}>
                  View Live <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              <a href={panel.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm text-white/40 border border-white/8 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all">
                <Github className="w-4 h-4" /> Source
              </a>
            </div>
          </div>

          {/* ── Right: visual panel ── */}
          <div className="rounded-2xl overflow-hidden border"
            style={{ borderColor: panel.borderColor, background: "rgba(6,9,15,0.85)" }}>
            <div className="px-5 py-3.5 border-b flex items-center gap-2.5"
              style={{ borderColor: panel.borderColor, background: "rgba(0,0,0,0.3)" }}>
              <Icon className="w-3.5 h-3.5" style={{ color: panel.accent }} />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: `${panel.accent}60` }}>
                {panel.id} · preview
              </span>
            </div>
            <div className="p-5">
              {panel.visual === "scanner" && <ThreatScanner accent={panel.accent} active={active} />}
              {panel.visual === "voice" && <VoiceVisual accent={panel.accent} />}
              {panel.visual === "chart" && <ChartVisual accent={panel.accent} />}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom divider */}
      {index < total - 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${panel.accent}20, transparent)` }} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────────────── */

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.3", "end 0.85"]
  });

  return (
    <section
      id="projects"
      className="relative pt-16 lg:pt-24 pb-8"
      style={{ background: "#020408" }}
    >
      {/* ── Top Section Divider ── */}
      <div className="absolute top-0 left-0 right-0 z-[999] pointer-events-none">
        <div className="h-[1px] bg-white/30 scale-y-[0.6] origin-top" />
      </div>

      {/* ── HUGE Glowing Ambient Orb ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[1200px] h-[800px] pointer-events-none blur-[120px] mix-blend-screen opacity-60"
        style={{ background: "radial-gradient(circle, rgba(0,255,65,0.2) 0%, rgba(139,92,246,0.2) 40%, rgba(0,240,255,0.1) 60%, transparent 80%)" }}
      />

      {/* ── Dot-grid background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Section header ── */}
      <div className="relative z-10 flex flex-col items-start px-8 lg:px-16 pt-8 pb-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-6 h-px" style={{ background: "rgba(0,255,65,0.6)", boxShadow: "0 0 10px rgba(0,255,65,0.5)" }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/80 drop-shadow-md">Selected Projects</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black tracking-tight leading-none bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent pb-3">
            Systems I've Built
          </h2>
        </motion.div>
      </div>

      {/* ── Panels container with dynamic progress bar ── */}
      <div className="relative z-10" ref={containerRef}>
        {/* ── Center-Aligned Fixed Progress Bar ── */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]) }}
          className="fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block pointer-events-none"
        >
          <div className="h-[30vh] w-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-[#00f0ff] origin-top"
              style={{ scaleY: scrollYProgress, height: "100%", boxShadow: "0 0 15px #00f0ff" }}
            />
          </div>
        </motion.div>

        {PANELS.map((panel, i) => (
          <div key={panel.id} id={`panel-${panel.id}`}>
            <Panel panel={panel} index={i} total={PANELS.length} />
          </div>
        ))}
      </div>
    </section>
  );
}