"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { TerminalSquare } from "lucide-react";
import React from "react";

// --- Custom Interactive Components ---

const HackSimulation = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const bar = Array(20).fill("-").map((_, i) => (i < (progress / 5) ? "#" : "-")).join("");

  return (
    <div className="font-mono mt-2">
      <div className="text-red-400">Initiating bypass protocol...</div>
      <div className="text-yellow-400">Target locked: Mainframe firewall</div>
      <div className="text-gray-300 mt-1">Brute-forcing access: [{bar}] {Math.min(100, Math.floor(progress))}%</div>
      {progress >= 100 && (
        <div className="text-[#00ff41] mt-2 font-bold animate-pulse">[+] System Secured. Root access maintained.</div>
      )}
    </div>
  );
};

const MatrixEffect = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [msg] = useState(() => {
    const msgs = [
      "Connection established. We're watching you scroll... 👀",
      "System breached. We know you haven't blinked in 4 minutes. 🕶️",
      "Tracing connection... Just kidding, enjoy the portfolio! 🕵️‍♂️",
      "The Matrix has you... or at least your browser does. 👽"
    ];
    return msgs[Math.floor(Math.random() * msgs.length)];
  });

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    let count = 0;
    const interval = setInterval(() => {
      setLines(prev => {
        const newLine = Array(30).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join(" ");
        return [...prev, newLine].slice(-8); // Keep last 8 lines
      });
      count++;
      if (count > 25) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-[#00ff41] font-mono text-xs opacity-80 leading-relaxed mt-2">
      {lines.map((l, i) => <div key={i}>{l}</div>)}
      {lines.length > 5 && <div className="mt-2 text-[#00f0ff] font-bold">{msg}</div>}
    </div>
  );
};

const SkillsVisual = () => (
  <div className="flex flex-col gap-3 w-full max-w-sm mt-4 font-mono">
    <div>
      <div className="flex justify-between text-xs mb-1 text-[#00ff41]"><span>Threat Hunting & SIEM</span><span>95%</span></div>
      <div className="w-full bg-[#1a2235] h-1.5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: "95%" }} transition={{ duration: 1 }} className="bg-[#00ff41] h-full" /></div>
    </div>
    <div>
      <div className="flex justify-between text-xs mb-1 text-[#00f0ff]"><span>Python & Automation</span><span>90%</span></div>
      <div className="w-full bg-[#1a2235] h-1.5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: "90%" }} transition={{ duration: 1, delay: 0.2 }} className="bg-[#00f0ff] h-full" /></div>
    </div>
    <div>
      <div className="flex justify-between text-xs mb-1 text-purple-400"><span>Cloud Security (Azure/AWS)</span><span>85%</span></div>
      <div className="w-full bg-[#1a2235] h-1.5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 1, delay: 0.4 }} className="bg-purple-400 h-full" /></div>
    </div>
    <div>
      <div className="flex justify-between text-xs mb-1 text-amber-400"><span>React & Full-Stack</span><span>80%</span></div>
      <div className="w-full bg-[#1a2235] h-1.5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: "80%" }} transition={{ duration: 1, delay: 0.6 }} className="bg-amber-400 h-full" /></div>
    </div>
  </div>
);

// --- Main Component ---

export default function TerminalCard() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<{ command: string; response: string | React.ReactNode; isTypingCommand?: boolean }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Interactive Modifiers
  const [terminalMode, setTerminalMode] = useState<"normal" | "ctf" | "game">("normal");
  const [gameTarget, setGameTarget] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const BOOT_SEQUENCE = `Access granted.\n\n[+] Threat Intelligence Loaded\n[+] Monitoring Systems Active\n[+] Secure Environment Initialized\n\nWelcome to Harshit's cyber terminal.\nType 'help' to continue.`;

  useEffect(() => {
    setMounted(true);
    // Start with the first command already visible, but its response empty
    setOutput([{ command: "sudo access --portfolio", response: "" }]);
    setIsTyping(true);

    let currentText = "";
    let index = 0;

    // Step 1: Type the BOOT_SEQUENCE response for the first command
    const interval = setInterval(() => {
      currentText += BOOT_SEQUENCE.charAt(index);
      setOutput((prev) => {
        const newOutput = [...prev];
        if (newOutput.length > 0) {
          newOutput[0].response = currentText;
          newOutput[0].isTypingCommand = false;
        }
        return newOutput;
      });
      index++;

      if (index === BOOT_SEQUENCE.length) {
        clearInterval(interval);

        // Step 2: Add the new prompt IMMEDIATELY for seamless continuation
        setOutput(prev => [...prev, { command: "", response: "", isTypingCommand: true }]);

        setTimeout(() => {
          const statusCmd = "status";
          const statusResp = "⟹ Available for roles & collaborations";

          let cmdIndex = 0;
          const cmdInterval = setInterval(() => {
            cmdIndex++;
            setOutput(prev => {
              const next = [...prev];
              next[next.length - 1].command = statusCmd.slice(0, cmdIndex);
              return next;
            });

            if (cmdIndex === statusCmd.length) {
              clearInterval(cmdInterval);

              // Transition from command typing to response typing
              setOutput(prev => {
                const next = [...prev];
                next[next.length - 1].isTypingCommand = false;
                return next;
              });

              // Step 3: Type the response for 'status'
              let respIndex = 0;
              const respInterval = setInterval(() => {
                respIndex++;
                setOutput(prev => {
                  const next = [...prev];
                  next[next.length - 1].response = statusResp.slice(0, respIndex);
                  return next;
                });

                if (respIndex === statusResp.length) {
                  clearInterval(respInterval);
                  setIsTyping(false);
                  typingIntervalRef.current = null;
                }
              }, 15);
              typingIntervalRef.current = respInterval;
            }
          }, 60);
          typingIntervalRef.current = cmdInterval;
        }, 300); // reduced pause
      }
    }, 15);
    typingIntervalRef.current = interval;

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  // Smart Auto-Focus: only auto-focus if user has previously interacted with the terminal
  useEffect(() => {
    if (!isTyping && mounted && inputRef.current && userInteracted) {
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 10);
    }
  }, [isTyping, mounted, userInteracted]);

  // Ctrl+C Interrupt Handling
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "c" && isTyping) {
        e.preventDefault();
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
          setIsTyping(false);
        }
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isTyping]);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [output, isTyping]);

  // Removed auto-focus to prevent page jumping when typing finishes
  // Users can click the terminal to focus manually
  const typeResponse = (command: string, response: string | React.ReactNode, typeSpeed = 10) => {
    setIsTyping(true);
    if (typeof response === "string") {
      let currentText = "";
      let index = 0;
      setOutput((prev) => [...prev, { command, response: "" }]);

      const interval = setInterval(() => {
        currentText += response.charAt(index);
        setOutput((prev) => {
          const newOutput = [...prev];
          newOutput[newOutput.length - 1].response = currentText;
          return newOutput;
        });
        index++;
        if (index === response.length) {
          clearInterval(interval);
          typingIntervalRef.current = null;
          setIsTyping(false);
        }
      }, typeSpeed);
      typingIntervalRef.current = interval;
    } else {
      setOutput((prev) => [...prev, { command, response }]);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInput(history[history.length - 1 - nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(history[history.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const cmd = input.trim();
    const lowerCmd = cmd.toLowerCase();

    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput("");

    let response: string | React.ReactNode = "";

    // INTERACTIVE MODES
    if (terminalMode === "ctf") {
      if (lowerCmd === "exit") {
        setTerminalMode("normal");
        response = "[!] Disconnected from CTF server.";
      } else if (lowerCmd === "hack") {
        setTerminalMode("normal");
        response = `[+] INJECT SUCCESSFUL.\n\nFLAG CAPTURED: THM{1_4m_7h3_cyb3r_k1ng}\n\nExcellent work. Sending you back to base.`;
      } else {
        response = "[-] Connection refused. Incorrect payload.\nHint: Convert HEX to ASCII -> 48 61 63 6b\n(Type 'exit' to abort)";
      }
      typeResponse(cmd, response, 5);
      return;
    }

    if (terminalMode === "game") {
      if (lowerCmd === "exit" || lowerCmd === "quit") {
        setTerminalMode("normal");
        response = "Game aborted. Thanks for playing!";
      } else {
        const guess = parseInt(lowerCmd);
        if (isNaN(guess)) {
          response = "Please enter a valid number, or 'exit' to stop.";
        } else if (guess < gameTarget) {
          response = `[-] ${guess} is too low. Try again!`;
        } else if (guess > gameTarget) {
          response = `[-] ${guess} is too high. Try again!`;
        } else {
          setTerminalMode("normal");
          response = `[+] OVERRIDE SUCCESSFUL! You guessed the sequence ${gameTarget}.\nReturning to standard terminal...`;
        }
      }
      typeResponse(cmd, response, 5);
      return;
    }

    // NORMAL COMMANDS
    switch (lowerCmd) {
      case "help":
        response = `Available commands:\n  about             → Who I am\n  skills            → Technical capabilities\n  skills --visual   → View competence metrics\n  projects          → Featured work\n  experience        → Professional journey\n  contact           → Get in touch\n  clear             → Clear terminal\n  whoami            → Display identity\n\nAdvanced tools:\n  hack              → Penetration test routine\n  matrix            → Enter the construct\n  funfact           → Load cyber knowledge\n  ctf               → Connect to challenge server\n  game              → Initialize override mini-game\n  sudo hire me      → Execute recruitment payload`;
        break;

      case "whoami":
        response = `Harshit Gupta\nRole: Cybersecurity Analyst & Developer\nCompany: Accenture\n\nI specialize in threat detection, incident response, and security automation.\nI love breaking things to learn how to actively secure them.`;
        break;

      case "about":
        response = "Harshit Gupta\nCybersecurity Analyst & Developer\n\nI work in cybersecurity, focusing on threat detection, incident response, and building secure systems.\nI also enjoy creating tools and projects that automate security tasks and solve real-world problems.\n\nCurrently working at Accenture, gaining hands-on experience with real security incidents, SIEM tools, and cloud security.\n\nAlways learning, building, and improving.";
        break;

      case "skills":
        response = `Cybersecurity:\n  ${resumeData.skills.cybersecurity.map(s => s.name).join(", ")}\n\nProgramming:\n  ${resumeData.skills.technical.map(s => s.name).join(", ")}\n\nCloud & Tools:\n  ${resumeData.skills.tools.map(s => s.name).join(", ")}`;
        break;

      case "skills --visual":
      case "skills -v":
        response = <SkillsVisual />;
        break;

      case "projects":
        response = resumeData.projects.map(proj => `> ${proj.title}\n  ${proj.description}\n  Status: ${proj.status}`).join("\n\n");
        break;

      case "experience":
        response = resumeData.experience.map(exp => `> ${exp.title} @ ${exp.company}\n  ${exp.period}`).join("\n\n");
        break;

      case "contact":
        response = `LinkedIn: ${resumeData.personal.socials.linkedin}\nGitHub:   ${resumeData.personal.socials.github}\nEmail:    ${resumeData.personal.email}`;
        break;

      case "sudo hire me":
        response = `[!] Unauthorized access detected...\n[!] Evaluating candidate profile...\n[+] Profile match: 99.9%\n[+] Recommendation: Schedule an interview immediately.\n\nContact me at: ${resumeData.personal.email}`;
        break;

      case "funfact":
        const facts = [
          "The first computer virus was created in 1983 and was called the 'Elk Cloner'.",
          "There is a hacker attack every 39 seconds globally.",
          "Over 90% of successful cyber attacks start with a phishing email.",
          "The most common password is still '123456'. Don't be that person.",
          "A single data breach costs companies millions, but setting up MFA is almost free."
        ];
        response = `[+] Did you know?\n${facts[Math.floor(Math.random() * facts.length)]}`;
        break;

      case "ctf":
        setTerminalMode("ctf");
        response = `[+] Connected to Capture The Flag server.\n[!] Objective: Decode the following payload to gain access.\n\nPayload (Hex): 48 61 63 6b\n\nEnter the decoded ASCII string below:`;
        break;

      case "game":
        const target = Math.floor(Math.random() * 100) + 1;
        setGameTarget(target);
        setTerminalMode("game");
        response = `[+] Initialized 'System Override' Mini-Game.\n[!] Objective: Guess the 2-digit admin passcode (1-100).\n\nEnter your guess:`;
        break;

      case "hack":
        response = <HackSimulation />;
        break;

      case "matrix":
        response = <MatrixEffect />;
        break;

      case "clear":
        setOutput([]);
        return;

      default:
        response = `Command not found: ${cmd}\nType 'help' for a list of commands.`;
    }

    typeResponse(cmd, response, 8);
  };

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto bg-[#050912]/90 backdrop-blur-xl border border-[#1a2235] rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.15)] font-fira hover:shadow-[0_0_40px_rgba(0,255,65,0.25)] transition-shadow duration-300"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-[#0a0e17] border-b border-[#1a2235]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-500 hover:bg-red-500 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-500 hover:bg-yellow-500 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-500 hover:bg-green-500 transition-colors"></div>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-xs text-center font-medium opacity-80">
          <TerminalSquare className="w-3 h-3" /> guest@harshit-sec: ~
        </div>
        <div className="w-16"></div>
      </div>

      <div
        ref={containerRef}
        className="p-6 h-[400px] overflow-y-auto text-sm cyber-scrollbar bg-opacity-90 relative cursor-text scroll-smooth"
        onClick={() => {
          setUserInteracted(true);
          inputRef.current?.focus({ preventScroll: true });
        }}
      >
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,255,65,0.02)_50%)] bg-[length:100%_4px] z-0" />

        <div className="relative z-10 flex flex-col gap-4">
          {output.map((item, i) => (
            <div key={i} className="flex flex-col gap-1 text-gray-300">
              <div className="flex gap-2 text-[#00f0ff] font-medium tracking-wide">
                <span className="shrink-0 whitespace-nowrap">guest@harshit-sec:~$</span>
                <span className="text-white">
                  {item.command}
                  {isTyping && i === output.length - 1 && item.isTypingCommand && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-2.5 h-[1.1rem] bg-[#00ff41] ml-px translate-y-px align-middle"
                    />
                  )}
                </span>
              </div>
              <div className="text-[#00ff41] whitespace-pre-wrap pl-4 border-l-2 border-[#1a2235] opacity-90 leading-relaxed font-mono relative">
                {item.response}
                {isTyping && i === output.length - 1 && !item.isTypingCommand && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2.5 h-[1.1rem] bg-[#00ff41] ml-px translate-y-px align-middle"
                  />
                )}
              </div>
            </div>
          ))}


          {!isTyping && (
            <form onSubmit={handleCommand} className="flex gap-2 text-[#00f0ff] font-medium tracking-wide items-center relative mt-2">
              <span className="shrink-0 whitespace-nowrap">
                {terminalMode === "ctf" ? "flag@ctf-server:~#" : terminalMode === "game" ? "sys@override:~#" : "guest@harshit-sec:~$"}
              </span>
              <div className="relative flex-1 flex items-center h-full">
                <input
                  ref={inputRef}
                  id="terminal-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none text-transparent caret-transparent w-full absolute inset-0 z-20"
                  autoComplete="off"
                  spellCheck="false"
                />
                <div className="text-white relative z-10 flex items-center font-fira tracking-wide whitespace-pre h-full">
                  <span>{input}</span>
                  <motion.span
                    animate={{ opacity: [1, 0.2] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className={`inline-block w-2.5 h-[1.1rem] ml-px translate-y-px ${terminalMode !== "normal" ? 'bg-red-500' : 'bg-[#00ff41]'}`}
                  />
                </div>
              </div>
            </form>
          )}
          <div className="h-2" />
        </div>
      </div>
    </motion.div>
  );
}
