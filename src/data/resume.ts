export const resumeData = {
  personal: {
    name: "HARSHIT GUPTA",
    location: "Gurugram",
    phone: "+91-9971301700",
    email: "harshitgupta3017@gmail.com",
    role: "Cybersecurity Analyst & Developer",
    socials: {
      linkedin: "https://www.linkedin.com/in/harshit-gupta-b87a3b1ba/",
      github: "https://github.com/HarshitGupta3017",
      portfolio: "https://harshitgupta3017.github.io",
      tryhackme: "https://tryhackme.com/p/harshitgupta3017",
      leetcode: "https://leetcode.com/u/_Harshit/",
      resume: "/Resume.pdf"
    },
  },
  about: "A passionate Cybersecurity Analyst and Developer dedicated to building secure, scalable applications and robust threat detection systems. Adept at bridging the gap between security operations and software engineering.",
  skills: {
    technical: [
      { name: "Python", icon: "Terminal" },
      { name: "JavaScript / TypeScript", icon: "Code" },
      { name: "React.js / Next.js", icon: "Braces" },
      { name: "Node.js", icon: "Database" },
      { name: "Java", icon: "Coffee" },
      { name: "C++", icon: "FileCode2" },
      { name: "SQL", icon: "Database" }
    ],
    cybersecurity: [
      { name: "Threat Hunting", icon: "Crosshair" },
      { name: "Incident Response", icon: "Activity" },
      { name: "Splunk (SIEM)", icon: "Search" },
      { name: "CrowdStrike", icon: "Shield" },
      { name: "MS Defender", icon: "ShieldCheck" },
      { name: "Vulnerability Assessment", icon: "Bug" },
      { name: "Penetration Testing", icon: "Unlock" },
      { name: "Network Security", icon: "Wifi" }
    ],
    tools: [
      { name: "Git / GitHub", icon: "GitBranch" },
      { name: "Azure", icon: "CloudRain" },
      { name: "AWS", icon: "Cloud" },
      { name: "Docker", icon: "Box" },
      { name: "Linux / Kali", icon: "TerminalSquare" },
      { name: "Wireshark", icon: "Activity" }
    ]
  },
  experience: [
    {
      title: "Security Delivery Associate",
      company: "Accenture",
      period: "Aug 2024 – Present",
      achievements: [
        "Managed advanced threat detection, key management, and system health using Thales CipherTrust Manager.",
        "Monitored, investigated, and escalated phishing, malware, and insider threat incidents using CrowdStrike and Microsoft Defender.",
        "Implemented Microsoft Purview for sensitive data discovery, pattern recognition, and compliance monitoring.",
        "Leveraged AI tools to build automation scripts for log analysis and workflow improvement."
      ]
    },
    {
      title: "Cyber Security Intern",
      company: "Accenture",
      period: "Mar 2024 – June 2024",
      achievements: [
        "Executed vulnerability assessments using Qualys, Splunk, and CrowdStrike under senior guidance.",
        "Developed Python scripts for alert correlation and log analysis to explore SOC workflows.",
        "Assisted in incident triage, log correlation, and risk assessments in a professional SOC environment."
      ]
    }
  ],
  projects: [
    {
      title: "PHISHIO AI",
      description: "A real-time phishing detection platform to analyze URLs and perform automated risk assessment using threat indicators.",
      techStack: ["Python", "FastAPI", "Uvicorn", "Cloud Scraper"],
      bullets: [
        "Built an automated pipeline that scores risk indicators in real-time.",
        "Reduced manual investigation effort significantly."
      ],
      link: "https://phishio-ai.vercel.app/",
      github: "https://github.com/HarshitGupta3017/phishio-ai",
      status: "live"
    },
    {
      title: "JARVIS",
      description: "Voice-controlled AI assistant to perform web actions, system tasks, and real-time search using natural language.",
      techStack: ["Python", "Pyttsx3", "SpeechRecognition", "OpenAI"],
      bullets: [
        "Voice-controlled local AI assistant.",
        "Improved response time by 25% through efficient library integration."
      ],
      link: "Coming Soon",
      github: "Coming Soon",
      status: "development"
    },
    {
      title: "NOBTO",
      description: "App focused on Cryptocurrency Comparison with real-time data updates and dynamic UI.",
      techStack: ["HTML", "ReactJS", "ChakraUI", "JavaScript"],
      bullets: [
        "Dynamic web application to compare crypto exchanges.",
        "Real-time data updates and personalized insights."
      ],
      link: "https://nobto.vercel.app/",
      github: "https://github.com/HarshitGupta3017",
      status: "live"
    }
  ],
  education: [
    {
      degree: "Bachelors in Computer Science Engineering",
      institution: "Chandigarh University",
      period: "2024",
      score: "8.61 CGPA"
    },
    {
      degree: "Intermediate (CBSE)",
      institution: "St. Michael Senior Secondary School, Gurugram",
      period: "2020",
      score: "94%"
    }
  ],
  certifications: [
    "CSEDP by The SecOps Group",
    "VMDR by Qualys",
    "Data Mining and Software Testing by Nptel",
    "Azure Fundamentals by Microsoft"
  ]
};
