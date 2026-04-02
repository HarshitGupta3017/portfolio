"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TerminalSquare,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  Wifi,
  Lock,
  Activity,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   SOCIALS
───────────────────────────────────────────────────────────── */
const SOCIALS = [
  { icon: Github, href: "https://github.com/HarshitGupta3017", label: "GitHub", color: "#e2e8f0" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/harshit-gupta-b87a3b1ba/", label: "LinkedIn", color: "#0078d4" },
  { icon: Mail, href: "mailto:harshitgupta3017@gmail.com", label: "Email", color: "#00ff41" },
];

/* ─────────────────────────────────────────────────────────────
   LIVE CLOCK — client-only, no SSR mismatch
───────────────────────────────────────────────────────────── */
function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time}</span>;
}

/* ─────────────────────────────────────────────────────────────
   SESSION ID — stable random hex, generated once on client
───────────────────────────────────────────────────────────── */
function SessionId() {
  const [id, setId] = useState("");
  useEffect(() => {
    const hex = () => Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, "0");
    setId(`${hex()}-${hex()}`);
  }, []);
  return <span className="tabular-nums opacity-70">{id || "----"}</span>;
}

/* ─────────────────────────────────────────────────────────────
   SIGNAL BARS — animated strength indicator
───────────────────────────────────────────────────────────── */
function SignalBars() {
  const heights = [3, 5, 7, 9, 11]; // px heights
  return (
    <span className="flex items-end gap-0.5">
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-0.5 rounded-[1px]"
          style={{
            height: h,
            background: i < 4 ? "#00ff41" : "rgba(255,255,255,0.1)",
            boxShadow: i < 4 ? "0 0 4px rgba(0,255,65,0.6)" : "none",
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   THREAT LEVEL TRACKER — cycles through secure states
───────────────────────────────────────────────────────────── */
const THREAT_STATES = [
  { label: "SECURE", color: "#00ff41", glow: "rgba(0,255,65,0.8)" },
  { label: "MONITORED", color: "#00f0ff", glow: "rgba(0,240,255,0.8)" },
  { label: "ENCRYPTED", color: "#00ff41", glow: "rgba(0,255,65,0.8)" },
];

function ThreatBadge() {
  const [idx, setIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setIdx((i) => (i + 1) % THREAT_STATES.length), 4000);
    return () => clearInterval(id);
  }, []);

  const state = THREAT_STATES[idx];

  if (!mounted) {
    return (
      <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest px-2 py-0.5 rounded border border-white/5">
        SECURE
      </span>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={state.label}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.35 }}
        className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded"
        style={{
          color: state.color,
          border: `0.5px solid ${state.color}30`,
          background: `${state.color}08`,
          textShadow: `0 0 6px ${state.glow}`,
        }}
      >
        {state.label}
      </motion.span>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCANLINE CANVAS — subtle CRT scanline overlay
───────────────────────────────────────────────────────────── */
function ScanlineOverlay() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    for (let y = 0; y < canvas.height; y += 3) {
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.fillRect(0, y, canvas.width, 1);
    }
  }, []);
  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      style={{ mixBlendMode: "overlay" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   COPYRIGHT YEAR — client-only
───────────────────────────────────────────────────────────── */
function CopyrightYear() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);
  return <>{year ?? "2026"}</>;
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden" style={{ background: "#020408" }}>

      {/* CRT scanlines */}
      <ScanlineOverlay />

      {/* Top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,255,65,0.25) 25%, rgba(0,240,255,0.2) 50%, rgba(0,255,65,0.15) 75%, transparent 100%)",
        }}
      />

      {/* Sweeping scan beam on mount */}
      <motion.div
        initial={{ x: "-100%", opacity: 0.9 }}
        animate={{ x: "110%", opacity: 0 }}
        transition={{ duration: 2.6, ease: "easeInOut", delay: 0.2 }}
        className="absolute top-0 left-0 w-56 h-px pointer-events-none z-10"
        style={{ background: "linear-gradient(90deg, transparent, #00ff41 50%, transparent)" }}
      />

      {/* Ambient corner glows */}
      <div
        className="absolute left-0 top-0 bottom-0 w-48 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(0,255,65,0.03), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-48 pointer-events-none"
        style={{ background: "linear-gradient(270deg, rgba(0,240,255,0.025), transparent)" }}
      />

      {/* ── MAIN ROW ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between gap-4 py-4">

          {/* LEFT — identity */}
          <div className="flex items-center gap-2.5 shrink-0">
            <TerminalSquare className="w-3.5 h-3.5 text-[#00ff41] opacity-80" />
            <span className="font-mono text-[10px] text-white/60 uppercase tracking-[0.25em]">
              Harshit Gupta
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1.5 }}
              className="text-[#00ff41] font-mono text-xs leading-none"
            >
              _
            </motion.span>
          </div>

          {/* CENTRE — Status HQ strip */}
          <div
            className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl font-mono select-none"
            style={{
              background: "rgba(255,255,255,0.018)",
              border: "0.5px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Threat badge */}
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-[#00ff41]/80 shrink-0" />
              <ThreatBadge />
            </div>

            {/* Separator */}
            <div className="w-px h-3.5 bg-white/20" />

            {/* Signal + connection */}
            <div className="flex items-center gap-1.5">
              <SignalBars />
              <span className="text-[8px] text-white/55 uppercase tracking-wider">TLS 1.3</span>
              <Lock className="w-2.5 h-2.5 text-[#00f0ff]/70" />
            </div>

            {/* Separator */}
            <div className="w-px h-3.5 bg-white/20" />

            {/* Live clock */}
            <div className="flex items-center gap-1.5">
              <Activity className="w-2.5 h-2.5 text-[#00f0ff]/60 shrink-0" />
              <span className="text-[9px] text-white/70 uppercase tracking-wider">
                <LiveClock />
              </span>
            </div>

            {/* Separator */}
            <div className="w-px h-3.5 bg-white/20 hidden md:block" />

            {/* Session token */}
            <div className="items-center gap-1 hidden md:flex">
              <Wifi className="w-2.5 h-2.5 text-white/50 shrink-0" />
              <span className="text-[8px] text-white/45 uppercase tracking-wider">SID·</span>
              <span className="text-[8px] text-[#00f0ff]/80 font-mono">
                <SessionId />
              </span>
            </div>
          </div>

          {/* RIGHT — socials */}
          <div className="flex items-center gap-4 shrink-0">
            {SOCIALS.map(({ icon: Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="group relative text-white/50 transition-colors duration-200"
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = color)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
              >
                <Icon className="w-4 h-4" />
                <motion.span
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-px rounded-full block"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.18 }}
                  style={{ background: color }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM MICRO ROW ── */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.03)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-2 flex items-center justify-between">
          <span className="font-mono text-[8px] text-white/35 uppercase tracking-[0.3em]">
            © <CopyrightYear /> · Next.js &amp; Secured by Design
          </span>
          <span className="font-mono text-[8px] text-white/35 uppercase tracking-[0.2em] hidden sm:block">
            Cybersecurity · Full‑Stack · Open Source
          </span>
          {/* Heartbeat line */}
          <motion.div
            className="hidden md:flex items-center gap-1"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span className="w-8 h-px block" style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,65,0.7))" }} />
            <span className="font-mono text-[8px] text-[#00ff41]/70 uppercase tracking-wider">online</span>
            <motion.span
              className="w-1 h-1 rounded-full bg-[#00ff41]"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ boxShadow: "0 0 4px rgba(0,255,65,0.9)" }}
            />
          </motion.div>
        </div>
      </div>
    </footer>
  );
}