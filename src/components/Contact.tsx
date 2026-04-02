"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, Linkedin, ExternalLink } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────────────────────── */
const CONTACT_INFO = {
  internalEmail: "harshitgupta3017+portfolio@gmail.com",
  displayEmail: "harshitgupta3017@gmail.com",
  linkedin: "https://www.linkedin.com/in/harshit-gupta-b87a3b1ba/"
};

const SEND_STEPS = [
  "Validating input...",
  "Securing connection...",
  "Establishing channel...",
  "Ready to send."
];

/* ─────────────────────────────────────────────────────────────
   BRUTALIST DARK CYBERPUNK BACKGROUND
───────────────────────────────────────────────────────────── */
function CustomCyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf: number;
    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth ?? window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight ?? window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    type Star = { x: number; y: number; s: number; speed: number; opacity: number };
    const stars: Star[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      s: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.6 + 0.1
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        star.y -= star.speed;
        if (star.y < -10) {
          star.y = canvas.height + 10;
          star.x = Math.random() * canvas.width;
        }
        ctx.fillStyle = `rgba(252, 225, 0, ${star.opacity})`;
        ctx.fillRect(star.x, star.y, star.s, star.s);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#05080f]">
      {/* Dynamic Sector Stars */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen" />

      {/* Hazard Stripes - Cyberpunk signature (black & yellow) */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 opacity-40"
        style={{
          backgroundImage: "repeating-linear-gradient(-45deg, #FCE100, #FCE100 10px, transparent 10px, transparent 20px)"
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-1.5 opacity-40"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #FCE100, #FCE100 10px, transparent 10px, transparent 20px)"
        }}
      />

      {/* Massive subtle typography in background */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-0 whitespace-nowrap text-[15vw] font-black text-[#FCE100] opacity-[0.02] leading-none select-none mix-blend-screen"
      >
        SECURE LINK // INITIATE COMMS // SYSTEM READY // SECURE LINK // INITIATE COMMS // SYSTEM READY //
      </motion.div>

      {/* Random moving stark yellow lines */}
      <motion.div
        animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "circInOut", delay: 1 }}
        className="absolute left-[5%] w-[2px] bg-[#FCE100] opacity-30 shadow-[0_0_15px_#FCE100]"
      />
      <motion.div
        animate={{ width: ["0%", "100%", "0%"], left: ["0%", "0%", "100%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "circInOut", delay: 2 }}
        className="absolute top-[80%] h-[1px] bg-[#FCE100] opacity-40 shadow-[0_0_15px_#FCE100]"
      />

      {/* Solid blocks / brutalist geometry */}
      <div className="absolute top-[30%] right-[10%] w-[15vw] h-[5vw] bg-[#FCE100] opacity-[0.03]" style={{ clipPath: "polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)" }} />
      <div className="absolute bottom-[20%] left-[5%] w-[8vw] h-[8vw] bg-[#00f3ff] opacity-[0.03]" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CYBERPUNK INPUT
───────────────────────────────────────────────────────────── */
function CyberInput({
  label, id, type = "text", value, onChange, placeholder, multiline = false,
}: {
  label: string; id: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder: string; multiline?: boolean;
}) {
  const isFilled = value.trim().length > 0;
  return (
    <div className="relative group flex flex-col w-full shrink-0 font-mono z-20">
      <div className="flex justify-between items-end mb-2 px-1">
        <label htmlFor={id}
          className="text-[10px] lg:text-[11px] uppercase text-[#FCE100]/70 tracking-[0.2em] group-focus-within:text-[#FCE100] transition-colors flex items-center gap-2 drop-shadow-md">
          {label}
        </label>
        <div className={`w-2.5 h-2.5 rounded-sm transition-all duration-300 ${isFilled ? "bg-[#FCE100] shadow-[0_0_10px_#FCE100]" : "border border-[#FCE100]/30 bg-[#FCE100]/5"}`} />
      </div>
      <div className="relative">
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#FCE100] opacity-0 group-focus-within:opacity-100 transition-opacity z-20 pointer-events-none shadow-[0_0_8px_#FCE100]" />
        <div className="absolute bottom-[-2px] left-0 w-8 h-[2px] bg-[#FCE100] opacity-0 group-focus-within:opacity-100 transition-all duration-300 z-20 pointer-events-none shadow-[0_0_12px_#FCE100]" />

        {multiline ? (
          <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder} rows={5}
            className="w-full bg-[#030408]/80 border border-[#FCE100]/20 border-b-2 border-b-[#FCE100]/50 p-4 text-sm text-white placeholder-white/20 outline-none focus:bg-[#07090f]/90 focus:border-[#FCE100] transition-all resize-none shadow-inner" />
        ) : (
          <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder} autoComplete="off"
            className="w-full bg-[#030408]/80 border border-[#FCE100]/20 border-b-2 border-b-[#FCE100]/50 p-4 text-sm text-white placeholder-white/20 outline-none focus:bg-[#07090f]/90 focus:border-[#FCE100] transition-all shadow-inner" />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TACTICAL CARD
───────────────────────────────────────────────────────────── */
function TacticalCard({ icon: Icon, href, label, value }: { icon: any; href: string; label: string; value: string }) {
  return (
    <motion.a href={href} target="_blank" rel="noopener noreferrer" whileHover={{ x: 5 }}
      style={{ clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)" }}
      className="flex items-center gap-4 p-4 bg-[#0a0f1a] border-[1px] border-[#FCE100]/30 hover:border-[#FCE100] transition-all duration-300 group relative overflow-hidden shadow-[10px_10px_0_rgba(252,225,0,0.1)] hover:shadow-[5px_5px_0_rgba(252,225,0,0.25)] hover:-translate-y-1">
      <div className="absolute inset-0 bg-[#FCE100]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="w-12 h-12 flex items-center justify-center bg-[#FCE100] text-black transition-colors relative z-10"
        style={{ clipPath: "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)" }}>
        <Icon size={20} className="group-hover:scale-110 transition-transform" />
      </div>
      <div className="flex-1 font-mono relative z-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#FCE100]/60 mb-1 group-hover:text-[#FCE100] transition-colors">{label}</p>
        <p className="text-sm font-medium text-white/90 group-hover:text-white transition-colors truncate">{value}</p>
      </div>
      <ExternalLink size={16} className="text-[#FCE100] opacity-30 group-hover:opacity-100 transition-opacity relative z-10 mr-2" />
    </motion.a>
  );
}

/* ─────────────────────────────────────────────────────────────
   SYSTEM DIAGNOSTICS
───────────────────────────────────────────────────────────── */
function SystemDiagnostics() {
  const [latency, setLatency] = useState(14);
  const [isHovered, setIsHovered] = useState(false);
  // Pre-generate stable animation durations to avoid Math.random() in render
  const barDurations = useMemo(
    () => Array.from({ length: 16 }, () => Math.random() * 0.5 + 0.3),
    []
  );

  useEffect(() => {
    const int = setInterval(() => setLatency(Math.floor(Math.random() * 8) + 8), 1500);
    return () => clearInterval(int);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      className="hidden lg:flex flex-col gap-3 font-mono text-[10px] uppercase p-6 bg-[#0a0f1a] border border-[#FCE100]/20 shadow-[10px_10px_0_rgba(252,225,0,0.05)] hover:shadow-[10px_10px_0_rgba(252,225,0,0.15)] transition-all duration-300 min-w-[280px] relative overflow-hidden group cursor-crosshair"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)" }}
    >
      <div className="absolute inset-0 bg-[#FCE100] opacity-0 group-hover:opacity-[0.03] transition-opacity" />

      {/* Scanner Element */}
      <motion.div
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-[#FCE100] opacity-0 group-hover:opacity-40"
        style={{ boxShadow: "0 0 15px #FCE100" }}
      />

      <div className="flex justify-between items-center border-b border-[#FCE100]/20 pb-3 mb-1">
        <span className="text-white/50 tracking-widest">Connection</span>
        <span className="text-[#FCE100] flex items-center gap-2 font-bold">
          <span className="w-2 h-2 bg-[#FCE100] animate-pulse" />
          {isHovered ? "INTERLOCKED" : "SECURE"}
        </span>
      </div>

      <div className="flex justify-between text-white/70">
        <span>Latency:</span>
        <span className="text-[#FCE100]">{latency}ms</span>
      </div>
      <div className="flex justify-between text-white/70">
        <span>Encryption:</span>
        <span className="text-white">{isHovered ? "HS256_ACTIVE" : "AES-256-GCM"}</span>
      </div>
      <div className="flex justify-between text-white/70">
        <span>Route:</span>
        <span className="text-white">Relay // 0x8F</span>
      </div>

      {/* Tiny Data Graph — stable durations via useMemo */}
      <div className="mt-3 h-8 flex items-end gap-[2px] opacity-40 group-hover:opacity-100 transition-opacity">
        {barDurations.map((dur, i) => (
          <motion.div key={i} className="flex-1 bg-[#FCE100]"
            animate={isHovered ? { height: ["10%", "100%", "10%"] } : { height: ["20%", "40%", "20%"] }}
            transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────────── */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "transmitting" | "success">("idle");
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  const isNameFilled = form.name.trim().length > 0;
  const isEmailFilled = form.email.trim().length > 0;
  const isMessageFilled = form.message.trim().length > 0;
  const isFormValid = isNameFilled && isEmailFilled && isMessageFilled;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) { setError("Please fill out all required fields."); return; }
    
    setError(""); 
    setStatus("transmitting"); 
    setStep(0);
    
    // Start visual indicators
    SEND_STEPS.forEach((_, i) => setTimeout(() => setStep(i + 1), (i + 1) * 700));
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Transmission failed.");
      }
      
      // Wait for the animation sequence to complete before showing success
      setTimeout(() => setStatus("success"), SEND_STEPS.length * 700 + 400);
    } catch (err: any) {
      setError(err.message || "Network Error. Connection Terminated.");
      setStatus("idle");
    }
  };

  const handleReset = () => {
    setForm({ name: "", email: "", message: "" });
    setStatus("idle"); setStep(0); setError("");
  };

  return (
    <section id="contact"
      className="relative min-h-screen pt-16 md:pt-20 pb-32 md:pb-40 overflow-hidden selection:bg-[#FCE100] selection:text-black bg-[#05080f]">

      <CustomCyberBackground />

      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FCE100]/30 to-transparent z-30" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FCE100]/30 to-transparent z-30" />

      <div className="container mx-auto px-6 max-w-6xl relative z-20">

        {/* Header Block */}
        <div className="mb-16 md:mb-24 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
          <div className="flex flex-col items-start gap-4">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex items-center gap-3 bg-[#0a0f1a] border border-[#FCE100]/20 px-4 py-2"
              style={{ clipPath: "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)" }}>
              <div className="w-2 h-2 bg-[#FCE100] animate-pulse shadow-[0_0_10px_#FCE100]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#FCE100]">{"Terminal > Contact"}</span>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-[0_0_15px_rgba(252,225,0,0.2)]">
              INITIATE<br />
              <span className="text-transparent" style={{ WebkitTextStroke: "2px #FCE100" }}>CONNECTION</span>
            </motion.h2>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-white/80 bg-[#0a0f1a]/80 backdrop-blur-md px-6 py-4 border-l-4 border-[#FCE100] font-mono tracking-wide leading-relaxed mt-4 max-w-lg shadow-[5px_5px_0_rgba(252,225,0,0.15)]">
              <span className="font-bold text-[#FCE100]">{">"}</span> Open for cybersecurity projects, collaborations, and opportunities.
              <br></br>
              <span className="font-bold text-[#FCE100]">{">"}</span> Initiate a secure link by transmitting your message.
            </motion.div>
          </div>

          <SystemDiagnostics />
        </div>

        <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-12 lg:gap-20 items-stretch">

          {/* Form container - Brutalist Dark */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative group">
            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <motion.form key="form" onSubmit={handleSubmit} exit={{ opacity: 0, rotateX: 10, y: -20 }}
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
                  className="bg-[#080b12] border-t border-l border-[#FCE100]/30 border-r border-[#FCE100]/30 border-b-[4px] border-b-[#FCE100] p-8 md:p-12 relative flex flex-col gap-8 shadow-[15px_15px_0_rgba(252,225,0,0.1)]">

                  {/* Yellow brutalist corner box */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#FCE100]"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }} />
                  {/* Decorative barcode/stripes in top right */}
                  <div className="absolute top-2 right-4 flex gap-1 items-start">
                    {[...Array(5)].map((_, i) => {
                      const h = [10, 20, 12, 18, 15][i];
                      return <div key={i} className="w-1 bg-[#05080f]" style={{ height: `${h}px` }} />;
                    })}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8 relative z-10">
                    <CyberInput id="name" label="Identifier" placeholder="e.g. John Doe" value={form.name} onChange={(v) => setForm(p => ({ ...p, name: v }))} />
                    <CyberInput id="email" type="email" label="Reply Channel" placeholder="your.email@domain.com" value={form.email} onChange={(v) => setForm(p => ({ ...p, email: v }))} />
                  </div>
                  <CyberInput id="message" label="Message Content" placeholder="Describe your requirement, idea, or opportunity..." multiline value={form.message} onChange={(v) => setForm(p => ({ ...p, message: v }))} />

                  {error && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                      className="text-[#05080f] font-mono text-[10px] tracking-widest uppercase bg-[#FCE100] px-3 py-1 inline-flex items-center gap-2 self-start font-bold">
                      <span>[!] {error}</span>
                    </motion.div>
                  )}

                  <div className="pt-4 flex flex-col gap-6 relative z-10 w-full">
                    <button type="submit" disabled={status === "transmitting"}
                      style={{ clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)" }}
                      className="group/btn relative w-full bg-[#FCE100]/30 text-white hover:bg-black font-mono font-black uppercase text-xs md:text-sm tracking-[0.2em] p-[2px] transition-colors disabled:opacity-50">

                      {/* The button inner area */}
                      <div style={{ clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)" }}
                        className="bg-[#05080f] text-[#FCE100] group-hover/btn:bg-[#FCE100] group-hover/btn:text-black transition-colors duration-300 w-full px-6 py-5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span>{status === "transmitting" ? "TRANSMITTING..." : "SEND MESSAGE"}</span>
                          <div className="flex gap-1.5 ml-2">
                            {/* Dynamic led indicators inside button */}
                            <div className={`w-2 h-2 border transition-all duration-300 ${isNameFilled ? "bg-[#FCE100] group-hover/btn:bg-black border-transparent shadow-[0_0_10px_#FCE100] group-hover/btn:shadow-none" : "border-[#FCE100]/40 group-hover/btn:border-black/50"}`} />
                            <div className={`w-2 h-2 border transition-all duration-300 ${isEmailFilled ? "bg-[#FCE100] group-hover/btn:bg-black border-transparent shadow-[0_0_10px_#FCE100] group-hover/btn:shadow-none" : "border-[#FCE100]/40 group-hover/btn:border-black/50"}`} />
                            <div className={`w-2 h-2 border transition-all duration-300 ${isMessageFilled ? "bg-[#FCE100] group-hover/btn:bg-black border-transparent shadow-[0_0_10px_#FCE100] group-hover/btn:shadow-none" : "border-[#FCE100]/40 group-hover/btn:border-black/50"}`} />
                          </div>
                        </div>
                        <Send size={18} className="translate-x-0 group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    </button>

                    <AnimatePresence>
                      {status === "transmitting" && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                          className="font-mono flex flex-col gap-2 border-l-2 border-[#FCE100] pl-4 bg-[#FCE100]/10 p-3 mt-2">
                          {SEND_STEPS.slice(0, step).map((s, i) => (
                            <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                              className="text-[10px] text-[#FCE100] uppercase tracking-wider drop-shadow-[0_0_5px_rgba(252,225,0,0.5)]">
                              {">"} {s}
                            </motion.p>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.form>
              ) : (
                <motion.div key="success"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
                  className="bg-[#080b12] border-2 border-[#FCE100] p-16 md:p-24 flex flex-col items-center justify-center text-center gap-8 min-h-[500px] shadow-[15px_15px_0_rgba(252,225,0,0.15)]">
                  <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }}
                    className="w-24 h-24 bg-[#FCE100] flex items-center justify-center text-black shadow-[0_0_30px_rgba(252,225,0,0.4)]"
                    style={{ clipPath: "polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)" }}>
                    <Terminal size={40} />
                  </motion.div>
                  <div className="font-mono">
                    <h3 className="text-3xl text-white uppercase font-black tracking-widest mb-3">Transmission<br />Successful</h3>
                    <p className="text-xs text-[#FCE100] uppercase tracking-[0.2em] max-w-sm mx-auto opacity-80">Request received. I’ll get back to you soon.</p>
                  </div>
                  <button onClick={handleReset}
                    className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 hover:text-[#FCE100] transition-colors border-b-2 border-transparent hover:border-[#FCE100] mt-6 pb-1">
                    [ NEW CONNECTION ]
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex flex-col gap-10">

            {/* Nav Deck */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-8 h-[2px] bg-[#FCE100]/50" />
                <h4 className="font-mono text-[10px] uppercase font-bold tracking-[0.5em] text-[#FCE100]">Direct Channels</h4>
              </div>
              <TacticalCard icon={Terminal} label="Email Address" value={CONTACT_INFO.displayEmail} href={`mailto:${CONTACT_INFO.internalEmail}`} />
              <TacticalCard icon={Linkedin} label="LinkedIn" value="linkedin.com/in/harshit" href={CONTACT_INFO.linkedin} />
            </div>

            {/* Quote Block - brutalist tape style */}
            <div className="bg-[#0a0f1a] text-white/80 p-8 relative font-mono text-sm tracking-wide leading-loose shadow-[10px_10px_0_rgba(252,225,0,0.1)] border border-[#FCE100]/20"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)" }}>
              <div className="absolute top-0 right-0 w-8 h-8 bg-[#FCE100]/10" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }} />
              <div className="absolute bottom-[2px] left-[-2px] w-2 h-8 bg-[#FCE100]" />
              <p className="italic">
                <span className="text-l font-black text-[#FCE100] mr-1">"</span>
                Attack surfaces evolve. Defenses must evolve faster. Let’s build secure systems.
                <span className="text-l font-black text-[#FCE100] ml-1">"</span>
              </p>
            </div>
          </motion.div>

        </div>
      </div>

    </section >
  );
}