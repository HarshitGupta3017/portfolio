"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Lock, Code2 } from "lucide-react";
import { useRef, useState } from "react";

// Custom 3D Tilt Card Component
function TiltCard({ children, className, glowColor }: { children: React.ReactNode; className?: string; glowColor: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);



  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`${className} relative`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      {/* Glow effect following cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 40%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

function AnimatedIcon({ children, color, delay }: { children: React.ReactNode; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{
        scale: [1, 1.1, 1],
        filter: [
          `drop-shadow(0 0 0px ${color})`,
          `drop-shadow(0 0 8px ${color})`,
          `drop-shadow(0 0 0px ${color})`
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

export default function WhatIDo() {
  const features = [
    {
      icon: (
        <AnimatedIcon color="#00ff41" delay={0}>
          <ShieldAlert className="w-6 h-6 text-[#00ff41]" />
        </AnimatedIcon>
      ),
      rawIcon: <ShieldAlert className="w-48 h-48" style={{ color: '#00ff41' }} />,
      title: "Threat Detection & Response",
      description: (
        <>
          Monitoring and investigating <span className="text-[#00ff41] font-medium">phishing, malware, and insider threats</span> using tools like <span className="text-white font-medium drop-shadow-md">CrowdStrike</span> and <span className="text-white font-medium drop-shadow-md">Microsoft Defender</span>, ensuring timely detection and mitigation.
        </>
      ),
      glowColor: "rgba(0, 255, 65, 0.15)",
      borderColor: "border-[#00ff41]/30",
      accentColor: "from-transparent via-[#00ff41] to-transparent",
      titleColor: "text-[#00ff41]",
      hoverBorder: "hover:border-[#00ff41]/60"
    },
    {
      icon: (
        <AnimatedIcon color="#00f0ff" delay={0.5}>
          <Lock className="w-6 h-6 text-[#00f0ff]" />
        </AnimatedIcon>
      ),
      rawIcon: <Lock className="w-48 h-48" style={{ color: '#00f0ff' }} />,
      title: "Data Security & Encryption",
      description: (
        <>
          Working with <span className="text-[#00f0ff] font-medium">Microsoft Purview</span> for <span className="text-white font-medium drop-shadow-md">data loss prevention (DLP)</span> and sensitive data classification, along with <span className="text-white font-medium drop-shadow-md">Thales CipherTrust Manager</span> for encryption and key management.
        </>
      ),
      glowColor: "rgba(0, 240, 255, 0.15)",
      borderColor: "border-[#00f0ff]/30",
      accentColor: "from-transparent via-[#00f0ff] to-transparent",
      titleColor: "text-[#00f0ff]",
      hoverBorder: "hover:border-[#00f0ff]/60"
    },
    {
      icon: (
        <AnimatedIcon color="#a78bfa" delay={1}>
          <Code2 className="w-6 h-6 text-[#a78bfa]" />
        </AnimatedIcon>
      ),
      rawIcon: <Code2 className="w-48 h-48" style={{ color: '#a78bfa' }} />,
      title: "Security Automation & Dev",
      description: (
        <>
          Building tools and scripts to automate <span className="text-white font-medium drop-shadow-md">log analysis</span> and <span className="text-[#a78bfa] font-medium">security workflows</span>, along with developing practical applications like <span className="text-white font-medium drop-shadow-md">phishing detection systems</span>.
        </>
      ),
      glowColor: "rgba(168, 85, 247, 0.15)",
      borderColor: "border-[#a78bfa]/30",
      accentColor: "from-transparent via-[#a78bfa] to-transparent",
      titleColor: "text-[#a78bfa]",
      hoverBorder: "hover:border-[#a78bfa]/60"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 20 } }
  };

  return (
    <section className="py-24 relative z-10 bg-[#04060a] border-y border-[#1a2235] overflow-hidden">
      {/* Ambient Cyber Background - Enhanced and Brighter */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-[#00ff41]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-[#00f0ff]/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.1)_0%,rgba(0,0,0,0)_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_30%,transparent_100%)] opacity-80" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Modern styled heading */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 mb-6 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
              <span className="font-mono text-[11px] tracking-[0.25em] text-[#00f0ff] uppercase font-medium">
                DEFENSIVE POSTURE
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
              What I Do
            </h2>
            <div className="mx-auto w-24 h-[3px] bg-gradient-to-r from-[#00ff41] to-[#00f0ff] rounded-full mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00ff41] to-[#00f0ff] rounded-full blur-sm opacity-50" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed mix-blend-screen"
          >
            I work in cybersecurity, focusing on threat detection, data protection, and automation. I handle real-world security incidents and build solutions to improve detection and response.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {features.map((feature, i) => (
            <TiltCard
              key={i}
              glowColor={feature.glowColor}
              className="h-full"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: `0 20px 40px -5px ${feature.glowColor}`
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`bg-[#050810]/40 backdrop-blur-xl p-8 rounded-xl border border-[#1a2235]/60 transition-all duration-500 group relative overflow-hidden flex flex-col interactive shadow-2xl h-full`}
              >
                {/* Subtle internal grid for tech feel */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 pointer-events-none" />

                {/* Top glowing accelerator line */}
                <div className={`absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r ${feature.accentColor} group-hover:w-full transition-all duration-700 ease-out`} />
                
                {/* HUD Corner Brackets */}
                <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-gray-600/30 group-hover:border-white/50 transition-colors pointer-events-none" />
                <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-gray-600/30 group-hover:border-white/50 transition-colors pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-gray-600/30 group-hover:border-white/50 transition-colors pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-gray-600/30 group-hover:border-white/50 transition-colors pointer-events-none" />

                {/* Giant watermark icon */}
                <div className="absolute -right-8 -bottom-8 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none transform group-hover:scale-110 group-hover:-rotate-6">
                  {feature.rawIcon}
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-8 w-14 h-14 rounded-full bg-[#0a0e17] flex items-center justify-center border border-[#1a2235] group-hover:border-transparent shadow-inner transition-colors duration-500">
                    {feature.icon}
                  </div>

                  <h3 className={`text-[22px] font-bold text-white mb-3 ${feature.titleColor} transition-all duration-300 drop-shadow-md`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 text-[15px] leading-relaxed transition-colors duration-300 flex-1">
                    {feature.description}
                  </p>
                  
                  {/* Hover Tech Line */}
                  <div className="mt-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
                    <div className="h-px bg-gradient-to-r from-white/30 to-transparent flex-1" />
                    <span className="font-mono text-[10px] text-white/50 tracking-[0.2em] uppercase">SYS.ACTIVE</span>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
