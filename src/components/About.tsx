"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Shield, Building2, Target } from "lucide-react";

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const NUM = 32, MAX_DIST = 120;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    const ps: P[] = Array.from({ length: NUM }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.3 + 0.5, hue: Math.random() > 0.5 ? 145 : 185,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,60%,0.55)`;
        ctx.shadowColor = `hsl(${p.hue},100%,60%)`; ctx.shadowBlur = 4;
        ctx.fill(); ctx.shadowBlur = 0;
      }
      for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
        const a = ps[i], b = ps[j], dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = `hsla(145,100%,55%,${(1 - d / MAX_DIST) * 0.15})`; ctx.lineWidth = 0.5; ctx.stroke(); }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <section id="about" className="relative z-10 bg-[#0a0e17] overflow-hidden">
      <ParticleBackground />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(10,14,23,0.1),rgba(10,14,23,0.8))]" />

      {/* Ghost initials */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-1vw] top-0 z-[1] text-[16vw] font-black leading-none tracking-tighter select-none"
        style={{ color: "transparent", WebkitTextStroke: "1px rgba(0,255,65,0.06)", lineHeight: 0.9 }}
      >
        HG
      </div>

      <div ref={ref} className="container mx-auto px-6 lg:px-24 py-28 max-w-7xl relative z-10">

        {/* ── TOP: label + rule ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex items-center gap-4 mb-10"
        >
          <span
            className="font-mono text-sm tracking-[0.2em] uppercase whitespace-nowrap font-semibold"
            style={{ background: "linear-gradient(90deg,#00ff41,#00f0ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            The Person Behind the Work
          </span>
          <span className="flex-1 h-px bg-gradient-to-r from-[#00ff41]/30 to-transparent" />
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* LEFT — vertical meta column */}
          <div className="hidden lg:flex flex-col gap-4 pt-2 w-64 shrink-0">
            {[
              { label: "Based in", value: "Gurugram, India", icon: <MapPin className="w-4 h-4 text-[#00ff41]" /> },
              { label: "Role", value: "Cyber Analyst", icon: <Shield className="w-4 h-4 text-[#00f0ff]" /> },
              { label: "Company", value: "Accenture", icon: <Building2 className="w-4 h-4 text-[#a78bfa]" /> },
              { label: "Focus", value: "Threat Detection & Data Security", icon: <Target className="w-4 h-4 text-[#fb923c]" /> },
            ].map(({ label, value, icon }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                className="flex items-center gap-3.5 p-3 rounded-xl bg-[#0a0e17]/80 border border-[#1a2235] hover:border-[#00ff41]/50 hover:bg-[#0c121e] group transition-all duration-300 relative overflow-hidden"
              >
                {/* Glow accent */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#00ff41] to-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-2 rounded-lg bg-[#111827] border border-[#252f4a] group-hover:border-transparent transition-colors shadow-inner">
                  {icon}
                </div>

                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-gray-500 uppercase">{label}</span>
                  <span className="font-mono text-[13px] text-[#f8fafc] font-semibold tracking-wide">{value}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block w-[1px] bg-gradient-to-b from-[#00ff41]/40 via-[#00f0ff]/20 to-transparent origin-top min-h-[300px]"
          />

          {/* RIGHT — heading + body */}
          <div className="flex flex-col gap-6">

            {/* Heading with gradient + glow underline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                <span
                  style={{
                    background: "linear-gradient(100deg, #ffffff 40%, #00f0ff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Who I Am
                </span>
              </h2>
              {/* Glow underline */}
              <div className="mt-3 w-16 h-[2px] rounded-full bg-gradient-to-r from-[#00ff41] to-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.4)]" />
            </motion.div>

            {/* Body block with left border accent + hover glow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="relative pl-5 group"
            >
              {/* Glowing left border */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-gradient-to-b from-[#00ff41] via-[#00f0ff] to-transparent shadow-[0_0_8px_rgba(0,255,65,0.4)] group-hover:shadow-[0_0_16px_rgba(0,240,255,0.55)] transition-all duration-500" />

              <div className="space-y-4 max-w-2xl">
                {/* Animated vertical accent line */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-[2px]"
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ originY: 0 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#00ff41] via-[#00f0ff] to-transparent shadow-[0_0_12px_rgba(0,255,65,0.6)] animate-pulse" />
                </motion.div>

                {([
                  <>Based in <span className="text-white font-semibold">Gurugram</span>, I have always been curious about what happens behind the scenes — not just how systems work, but what makes them <span className="text-[#00f0ff] font-medium">fail</span>.</>,
                  <>That curiosity evolved from building software to understanding how it can be exploited — studying <span className="text-[#00ff41] font-medium drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]">vulnerabilities</span>, attacker behavior, and how real-world <span className="text-[#00ff41] font-medium drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]">cybersecurity</span> incidents actually unfold.</>,
                  <>During college, working as a Subject Matter Expert at <span className="text-white font-semibold">Chegg</span> pushed me to think more clearly and communicate complex ideas simply — where my technical <span className="text-[#a78bfa] font-medium drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]">fundamentals</span> solidified.</>,
                  <>Today, I work on real <span className="text-[#00ff41] font-medium drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]">enterprise security</span> challenges — monitoring threats, protecting critical data, and understanding how systems behave under pressure.</>,
                  <>Outside of work, I design and build security tools, explore new research areas, and continuously sharpen my skills.</>,
                ] as React.ReactNode[]).map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.28 + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
                    className="text-gray-400 text-[15px] md:text-base leading-relaxed pl-4 relative"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* Closing accent */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex items-center gap-3 pl-5"
            >
              <span className="w-6 h-px bg-[#00f0ff]/80" />
              <span className="text-[#00f0ff] font-mono text-[13px] tracking-[0.15em] uppercase font-semibold drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
                Securing systems. Expanding boundaries.
              </span>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
