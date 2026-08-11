"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Briefcase,
  Building,
  CheckCircle2,
  CheckSquare,
  ChevronRight,
  Compass,
  Cpu,
  Download,
  ExternalLink,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Rocket,
  School,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  X,
  Zap,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { ref, push } from "firebase/database";

interface FormData {
  name: string;
  email: string;
  designation: string;
  address: string;
  workshopInterest: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  designation: "Student",
  address: "",
  workshopInterest: "",
};

// Data Structures extracted from eee_career_guide.md
const MUST_HAVE_CERTS = [
  { name: "MATLAB Onramp", why: "Industry-standard tool for electrical engineering", platform: "MathWorks Academy", link: "https://matlabacademy.mathworks.com/" },
  { name: "Simulink Onramp", why: "Simulation for control systems and power systems", platform: "MathWorks Academy", link: "https://matlabacademy.mathworks.com/" },
  { name: "Python for Engineers", why: "Automation, data analysis, AI basics", platform: "Coursera / freeCodeCamp", link: "https://www.coursera.org/" },
  { name: "AutoCAD Electrical Basics", why: "Electrical drawings and panel design", platform: "Autodesk / Udemy", link: "https://www.autodesk.com/" },
  { name: "Excel for Engineers", why: "Reporting, calculations, data analysis", platform: "Microsoft Learn", link: "https://learn.microsoft.com/" },
  { name: "Electrical Safety (Basic)", why: "Essential for every electrical engineer", platform: "Alison / NPTEL", link: "https://alison.com/" },
];

const SHOULD_HAVE_CERTS = [
  { name: "ETAP Fundamentals", benefit: "Power system analysis, load flow & short circuit calculation" },
  { name: "PLC Programming", benefit: "Industrial automation & process control logic" },
  { name: "SCADA Basics", benefit: "Industrial monitoring, supervisory control & telemetry" },
  { name: "Solar PV Design", benefit: "Renewable energy sizing, solar power installation" },
  { name: "EV Technology", benefit: "Electric vehicle powertrains, drives & charging infrastructure" },
  { name: "Power System Protection", benefit: "Substation relays, switchgear & grid protection" },
  { name: "Embedded Systems (Arduino/ESP32)", benefit: "Product development, microcontrollers & IoT" },
];

const BONUS_CERTS = [
  "AI for Everyone",
  "Machine Learning Basics",
  "Industrial IoT",
  "Digital Twin Technology",
  "Battery Management Systems (BMS)",
  "Smart Grid Technologies",
  "Cybersecurity for Industrial Control Systems",
  "Power BI for Engineers",
];

const FREE_PLATFORMS = [
  {
    name: "MathWorks Academy",
    courses: ["MATLAB Onramp", "Simulink Onramp", "Signal Processing", "Control Design"],
    note: "Perfect for EEE students.",
    badge: "Interactive Labs",
  },
  {
    name: "NPTEL",
    courses: ["Power System Analysis", "Power Electronics", "Control Systems", "Renewable Energy", "Electrical Machines"],
    note: "Recognized by top universities & core PSU/Indian employers.",
    badge: "IIT Certification",
  },
  {
    name: "Coursera",
    courses: ["Python for Everybody", "Excel Skills for Business", "AI for Everyone", "Google Data Analytics"],
    note: "Audit many courses for free (certificates optional).",
    badge: "Global University Courses",
  },
  {
    name: "Infosys Springboard",
    courses: ["AI Fundamentals", "Python Programming", "Soft Skills & Communication", "Cloud Basics"],
    note: "Free recognized industry certificates.",
    badge: "100% Free Certificate",
  },
  {
    name: "Alison",
    courses: ["Electrical Safety", "Renewable Energy Basics", "Electrical Engineering Fundamentals"],
    note: "Free learning modules with self-paced tracks.",
    badge: "Self-Paced Learning",
  },
];

const ROADMAP_YEARS = [
  {
    year: "Second Year",
    level: "Foundation & Software Skills",
    color: "from-blue-500 to-cyan-500",
    items: ["MATLAB Onramp", "Simulink Onramp", "Python Basics", "Excel for Engineers"],
  },
  {
    year: "Third Year",
    level: "Core Specialization & Simulation",
    color: "from-emerald-500 to-teal-500",
    items: ["ETAP Fundamentals", "PLC Programming", "SCADA Basics", "AutoCAD Electrical", "Solar PV Design"],
  },
  {
    year: "Final Year",
    level: "Advanced & Industry Ready",
    color: "from-purple-500 to-indigo-500",
    items: ["Power System Protection", "EV Technology", "Battery Management System (BMS)", "Embedded Systems", "AI for Electrical Engineers"],
  },
];

const TOP_10_CERTS = [
  "MATLAB Onramp",
  "Simulink Onramp",
  "ETAP Fundamentals",
  "PLC Programming",
  "SCADA Basics",
  "AutoCAD Electrical",
  "Python for Engineers",
  "Solar PV Design",
  "EV Technology",
  "Power System Protection",
];

const TARGET_DOMAINS = [
  {
    id: "power-gen",
    title: "1. Power Generation & Transmission",
    desc: "Generate electricity, operate substations, manage high-voltage transmission lines, and maintain national power grids.",
    companies: ["NTPC", "Power Grid Corporation of India (PGCIL)", "NHPC", "SJVN", "NLC India"],
    skills: ["Power Systems", "Electrical Machines", "Protection", "Switchgear", "Load Flow", "Relay Coordination", "ETAP", "MATLAB"],
    salary: "₹6 – 15 LPA",
    color: "amber",
  },
  {
    id: "power-equip",
    title: "2. Power Equipment Manufacturers",
    desc: "Manufacture transformers, electric motors, switchgear, protection relays, and compact substations.",
    companies: ["Schneider Electric", "Siemens", "ABB", "Hitachi Energy", "GE Vernova", "CG Power", "Kirloskar Electric"],
    skills: ["ETAP", "AutoCAD Electrical", "PLC", "Protection", "Electrical Machines", "Industrial Wiring", "Circuit Design"],
    salary: "₹4 – 12 LPA",
    color: "blue",
  },
  {
    id: "automation",
    title: "3. Industrial Automation",
    desc: "Smart factory transformation using PLCs, SCADA networks, industrial robotics, and distributed control systems.",
    companies: ["Siemens", "Rockwell Automation", "Honeywell", "Mitsubishi Electric", "Emerson", "Yokogawa"],
    skills: ["PLC", "SCADA", "HMI", "Industrial Networking", "Sensors", "VFDs"],
    salary: "₹4.5 – 11 LPA",
    color: "emerald",
  },
  {
    id: "ev",
    title: "4. Electric Vehicle (EV) Industry",
    desc: "One of the fastest-growing sectors for EEE graduates focusing on battery packs, motor controllers, and charging stations.",
    companies: ["Tesla", "BYD", "Tata Motors", "Mahindra Electric", "Ather Energy", "Ola Electric"],
    skills: ["Battery Management System (BMS)", "Motor Drives", "Embedded Systems", "MATLAB", "Simulink", "CAN Communication", "Battery Tech"],
    salary: "₹6 – 14 LPA",
    color: "cyan",
  },
  {
    id: "renewable",
    title: "5. Renewable Energy",
    desc: "Global clean energy shift: solar utility farms, onshore/offshore wind energy, and hybrid grid storage systems.",
    companies: ["Adani Green Energy", "Tata Power Renewable Energy", "ReNew", "Suzlon", "Vestas"],
    skills: ["Solar PV Design", "Wind Energy", "Power Electronics", "Grid Integration", "ETAP", "PVSyst"],
    salary: "₹4.5 – 10 LPA",
    color: "green",
  },
  {
    id: "oil-gas",
    title: "6. Oil & Gas / EPC Companies",
    desc: "Design and maintain complex electrical power systems for offshore platforms, refineries, and mega industrial plants.",
    companies: ["Larsen & Toubro (L&T)", "Technip Energies", "Fluor", "Petrofac"],
    skills: ["AutoCAD Electrical", "Electrical Design", "Cable Sizing", "Earthing", "Lighting Design"],
    salary: "₹5 – 12 LPA",
    color: "orange",
  },
  {
    id: "semiconductor",
    title: "7. Semiconductor & Embedded Electronics",
    desc: "Exciting technical roles in microchip design, analog electronics, power management ICs, and VLSI systems.",
    companies: ["Texas Instruments", "Intel", "NXP Semiconductors", "Infineon Technologies", "Analog Devices", "Micron Technology"],
    skills: ["Embedded C", "Digital Electronics", "VLSI Basics", "PCB Design", "Microcontrollers"],
    salary: "₹8 – 20+ LPA",
    color: "purple",
  },
  {
    id: "govt",
    title: "8. Government & PSU Engineering Jobs",
    desc: "High stability, prestigious public sector engineering roles through GATE examination and PSU interviews.",
    companies: ["BHEL", "Indian Railways", "DRDO", "ISRO", "NPCIL"],
    skills: ["GATE Exam Prep", "Electrical Core Subjects", "Aptitude", "Technical Interview Prep"],
    salary: "₹8 – 18 LPA",
    color: "indigo",
  },
];

const SKILLS_MATRIX = [
  { skill: "Electrical Fundamentals", stars: 5 },
  { skill: "Power Systems", stars: 5 },
  { skill: "ETAP Analysis", stars: 5 },
  { skill: "MATLAB & Simulink", stars: 5 },
  { skill: "AutoCAD Electrical", stars: 4 },
  { skill: "PLC & SCADA", stars: 5 },
  { skill: "Python Basics", stars: 4 },
  { skill: "Communication Skills", stars: 5 },
  { skill: "Problem Solving", stars: 5 },
  { skill: "Teamwork", stars: 4 },
];

const CAREER_PATH_RECOMMENDATIONS = [
  {
    field: "Power Systems",
    learn: "ETAP, MATLAB, Protection, Power System Analysis",
    targets: "PGCIL, NTPC, Siemens, ABB, Schneider Electric",
    icon: Zap,
  },
  {
    field: "Industrial Automation",
    learn: "PLC, SCADA, HMI, Industrial Networking",
    targets: "Siemens, Rockwell Automation, Honeywell, Emerson",
    icon: Cpu,
  },
  {
    field: "Electric Vehicles (EVs)",
    learn: "BMS, Motor Drives, Embedded Systems, Simulink",
    targets: "Tesla, Tata Motors, Ather Energy, BYD",
    icon: Rocket,
  },
  {
    field: "Renewable Energy",
    learn: "Solar PV Design, ETAP, Grid Integration",
    targets: "Adani Green Energy, ReNew, Suzlon, Vestas",
    icon: Compass,
  },
  {
    field: "Electronics & Embedded",
    learn: "Embedded C, Digital Electronics, PCB Design",
    targets: "Texas Instruments, NXP Semiconductors, Infineon",
    icon: Layers,
  },
];

export default function EEECareerGuidePage() {
  const [checkedCerts, setCheckedCerts] = useState<Record<string, boolean>>({});
  const [priorityFilter, setPriorityFilter] = useState<"all" | "must" | "should" | "bonus">("all");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);
  const [designationOption, setDesignationOption] = useState<string>("Student");
  const [otherDesignation, setOtherDesignation] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const toggleCheck = (cert: string) => {
    setCheckedCerts((prev) => ({ ...prev, [cert]: !prev[cert] }));
  };

  const completedCount = TOP_10_CERTS.filter((c) => checkedCerts[c]).length;

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email address";
    if (designationOption === "Other" && !otherDesignation.trim()) {
      newErrors.designation = "Please specify your designation";
    } else if (!form.designation.trim()) {
      newErrors.designation = "Designation is required";
    }
    if (!form.address.trim()) newErrors.address = "Address or Institution is required";
    if (!form.workshopInterest) newErrors.workshopInterest = "Please select an option";
    return newErrors;
  };

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = "/eeecarrerguide.pdf";
    link.download = "eeecareerguide.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const finalDesignation = designationOption === "Other" ? otherDesignation.trim() : designationOption;

    // Trigger download immediately within the user click gesture
    triggerDownload();
    setSubmitted(true);

    try {
      await push(ref(db, "download_requests"), {
        ...form,
        designation: finalDesignation,
        resource: "eeecareerguide",
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Firebase submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowDownloadModal(false);
    setSubmitted(false);
    setForm(initialForm);
    setDesignationOption("Student");
    setOtherDesignation("");
    setErrors({});
  };

  const inputClass = (field: keyof FormData) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
      errors[field]
        ? "border-red-500 focus:ring-red-500/50"
        : "border-white/10 focus:ring-indigo-500/50 focus:border-indigo-500"
    }`;

  return (
    <article className="min-h-screen bg-black text-white pb-24 relative overflow-hidden selection:bg-purple-500/30">
      {/* Dynamic Background Glow Effects */}
      <div className="fixed top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-900/20 blur-[130px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-purple-900/20 blur-[130px] pointer-events-none" />

      {/* Hero Header */}
      <div className="relative h-[65vh] min-h-[480px] w-full overflow-hidden z-10 flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2670&auto=format&fit=crop"
          alt="EEE Career Guide Hero"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 mx-auto max-w-5xl px-6 pb-12">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to Blogs
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="rounded-full bg-indigo-500/20 px-3.5 py-1 text-xs font-semibold text-indigo-400 backdrop-blur-md border border-indigo-500/20">
              Career & Engineering
            </span>
            <span className="text-zinc-400 text-xs font-medium">July 26, 2026</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400 text-xs font-medium">10 min read</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Electrical & Electronics Engineering (EEE) Career & Certification Guide
          </h1>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-10 space-y-16">
        {/* Author Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/images/author-ramu.png"
              alt="Ramu Narlapati"
              className="h-12 w-12 rounded-full border border-indigo-500/30 object-cover bg-zinc-800"
            />
            <div>
              <div className="font-semibold text-white">Ramu Narlapati</div>
              <div className="text-xs text-zinc-400">Electrical Engineer & Educator</div>
            </div>
          </div>

          <button
            onClick={() => setShowDownloadModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="size-4" /> Download PDF Guide
          </button>
        </div>

        {/* Quick Nav / Jump Bar */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-md">
          <h3 className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-4 flex items-center gap-2">
            <Compass className="size-4" /> Jump to Section
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { label: "🏆 Top 10 Certifications", href: "#top-10" },
              { label: "Must-Have & Should-Have", href: "#priority-matrix" },
              { label: "🎓 Free Platforms", href: "#free-platforms" },
              { label: "💼 Year Roadmap", href: "#roadmap" },
              { label: "🏢 Target Companies & Salaries", href: "#domains" },
              { label: "🎯 Domain Path Matcher", href: "#path-matcher" },
              { label: "⭐ Skills Matrix", href: "#skills" },
            ].map((nav, idx) => (
              <a
                key={idx}
                href={nav.href}
                className="px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-indigo-500/20 hover:text-indigo-300 text-zinc-300 border border-zinc-700/50 transition-colors"
              >
                {nav.label}
              </a>
            ))}
          </div>
        </div>

        {/* Introduction */}
        <section className="text-lg leading-relaxed text-zinc-300 space-y-4">
          <p>
            Electrical and Electronics Engineering (EEE) is one of the most versatile and impactful branches of engineering. From power generation and industrial automation to electric vehicle (EV) powertrains, solar energy, and semiconductor microchip design—EEE powers the world.
          </p>
          <p>
            However, securing top-tier core placements at companies like <strong>Siemens, ABB, Schneider Electric, PGCIL, and Texas Instruments</strong> requires more than just high academic grades. Companies demand <strong>practical software skills, simulation fluency, and domain-specific certifications</strong>.
          </p>
        </section>

        {/* Interactive Top 10 Checklist */}
        <section id="top-10" className="p-8 rounded-3xl bg-gradient-to-b from-zinc-900/80 to-zinc-900/40 border border-zinc-800 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-indigo-400">Interactive Student Progress</span>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
                <CheckSquare className="text-indigo-400 size-6" /> Top 10 Essential Certifications Checklist
              </h2>
            </div>
            <div className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold self-start sm:self-auto">
              Completed: {completedCount} / {TOP_10_CERTS.length} ({Math.round((completedCount / TOP_10_CERTS.length) * 100)}%)
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {TOP_10_CERTS.map((cert, idx) => {
              const isChecked = !!checkedCerts[cert];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(cert)}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                    isChecked
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-200"
                      : "bg-zinc-800/40 border-zinc-700/40 hover:border-zinc-500 text-zinc-300"
                  }`}
                >
                  <div
                    className={`size-5 rounded-md border flex items-center justify-center transition-colors ${
                      isChecked ? "bg-emerald-500 border-emerald-400 text-black" : "border-zinc-500"
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="size-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-sm font-medium">
                    {idx + 1}. {cert}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-zinc-500 text-center">Click on any certification above to check off your progress as you complete them during engineering.</p>
        </section>

        {/* Priority Certifications Matrix */}
        <section id="priority-matrix" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-indigo-400">Certification Breakdown</span>
              <h2 className="text-3xl font-bold text-white flex items-center gap-2 mt-1">
                <Award className="text-amber-400 size-7" /> Certification Priority Matrix
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1 text-xs">
              {[
                { id: "all", label: "All Certifications" },
                { id: "must", label: "Must-Have" },
                { id: "should", label: "Core Placement" },
                { id: "bonus", label: "Future Growth" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPriorityFilter(tab.id as "all" | "must" | "should" | "bonus")}
                  className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                    priorityFilter === tab.id
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Must-Have Section */}
          {(priorityFilter === "all" || priorityFilter === "must") && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2 border-b border-zinc-800 pb-3">
                <ShieldCheck className="size-5" /> Must-Have Certifications (High Priority)
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {MUST_HAVE_CERTS.map((cert, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/40 transition-colors flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-white text-base">{cert.name}</h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                          {cert.platform}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{cert.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Should-Have Section */}
          {(priorityFilter === "all" || priorityFilter === "should") && (
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-blue-400 flex items-center gap-2 border-b border-zinc-800 pb-3">
                <Briefcase className="size-5" /> Should-Have Certifications (For Core Placements)
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {SHOULD_HAVE_CERTS.map((cert, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-blue-500/40 transition-colors flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                      <Zap className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base mb-1">{cert.name}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">{cert.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bonus Section */}
          {(priorityFilter === "all" || priorityFilter === "bonus") && (
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-purple-400 flex items-center gap-2 border-b border-zinc-800 pb-3">
                <Sparkles className="size-5" /> Bonus Certifications (For Future Growth)
              </h3>
              <div className="flex flex-wrap gap-3">
                {BONUS_CERTS.map((cert, idx) => (
                  <div key={idx} className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium flex items-center gap-2">
                    <Sparkles className="size-3.5 text-purple-400" />
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Free Certification Platforms Showcase */}
        <section id="free-platforms" className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-indigo-400">Zero Cost Learning</span>
            <h2 className="text-3xl font-bold text-white flex items-center gap-2 mt-1">
              <GraduationCap className="text-cyan-400 size-7" /> 🎓 Best Free Certification Platforms
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FREE_PLATFORMS.map((platform, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">{platform.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[11px] font-semibold border border-cyan-500/20">
                      {platform.badge}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-4 text-xs text-zinc-300">
                    {platform.courses.map((course, cIdx) => (
                      <li key={cIdx} className="flex items-center gap-2">
                        <div className="size-1.5 rounded-full bg-cyan-400" />
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t border-zinc-800 text-[11px] italic text-zinc-400">
                  {platform.note}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Year-by-Year Certification Roadmap */}
        <section id="roadmap" className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-indigo-400">Timeline Strategy</span>
            <h2 className="text-3xl font-bold text-white flex items-center gap-2 mt-1">
              <BookOpen className="text-emerald-400 size-7" /> 💼 Certification Roadmap (Year-Wise)
            </h2>
          </div>

          <div className="relative border-l-2 border-zinc-800 pl-6 sm:pl-8 space-y-8 ml-3">
            {ROADMAP_YEARS.map((roadmap, idx) => (
              <div key={idx} className="relative">
                {/* Node Bullet */}
                <div className={`absolute -left-[31px] sm:-left-[39px] top-1 size-5 rounded-full bg-gradient-to-r ${roadmap.color} ring-4 ring-black`} />
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{roadmap.year}</h3>
                    <span className="text-xs font-medium text-zinc-400 px-3 py-1 rounded-full bg-zinc-800">
                      {roadmap.level}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {roadmap.items.map((item, iIdx) => (
                      <span key={iIdx} className="px-3 py-1 rounded-lg bg-zinc-800 text-zinc-200 text-xs font-medium border border-zinc-700/50">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Companies & Industry Domains Explorer */}
        <section id="domains" className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-indigo-400">Career Opportunities</span>
            <h2 className="text-3xl font-bold text-white flex items-center gap-2 mt-1">
              <Building className="text-amber-400 size-7" /> Target Industry Domains & Hiring Companies
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Not every company hires for the same skills. Select your target domain and match your software preparation accordingly.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {TARGET_DOMAINS.map((domain) => (
              <div key={domain.id} className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white">{domain.title}</h3>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold shrink-0">
                      {domain.salary}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">{domain.desc}</p>

                  <div className="space-y-3">
                    <div>
                      <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Top Recruiters</div>
                      <div className="flex flex-wrap gap-1.5">
                        {domain.companies.map((c, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-200 text-xs font-medium">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Required Skills & Tools</div>
                      <div className="flex flex-wrap gap-1.5">
                        {domain.skills.map((s, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 text-xs border border-indigo-500/20">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Career Path Matcher */}
        <section id="path-matcher" className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-zinc-900 to-purple-950/30 border border-indigo-500/30">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
            <Compass className="text-indigo-400 size-6" /> Recommended Domain Path Matcher
          </h2>
          <p className="text-sm text-zinc-400 mb-6">Choose the domain that matches your passion to view your tailored roadmap.</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAREER_PATH_RECOMMENDATIONS.map((path, idx) => {
              const IconComp = path.icon;
              return (
                <div key={idx} className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                      <IconComp className="size-5" />
                    </div>
                    <h3 className="font-bold text-white text-base">{path.field}</h3>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mb-1">Key Software & Skills</div>
                    <p className="text-xs text-indigo-300 font-medium">{path.learn}</p>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mb-1">Target Employers</div>
                    <p className="text-xs text-zinc-400">{path.targets}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Core Skill Rating Table */}
        <section id="skills" className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Star className="text-amber-400 size-6" /> Skills Companies Look for in Freshers
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/60">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-6">Skill</th>
                  <th className="py-3 px-6">Industry Importance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {SKILLS_MATRIX.map((item, idx) => (
                  <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 px-6 font-medium text-white">{item.skill}</td>
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: item.stars }).map((_, i) => (
                          <Star key={i} className="size-4 fill-amber-400 stroke-amber-400" />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Final Actionable Advice Callout */}
        <section className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/30 via-zinc-900 to-indigo-900/30 border border-purple-500/30 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Final Advice for Juniors</h2>
          <p className="text-base text-zinc-300 leading-relaxed max-w-3xl mx-auto">
            Don't apply to every company with the exact same generic resume. Choose <strong>one core domain</strong> by your third year, build strong hands-on software skills (MATLAB, ETAP, PLC/SCADA, or Embedded C), complete 2–3 domain-specific projects, earn recognized certifications, and tailor your resume. A focused engineering profile is always far more attractive to recruiters!
          </p>
        </section>

        {/* Bottom PDF Download Banner */}
        <div className="pt-8 border-t border-zinc-800 text-center space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-zinc-900 to-slate-900 border border-indigo-500/40 shadow-2xl space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
              <Download className="size-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-white">Download Full EEE Career & Certification Guide (PDF)</h3>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto">
              Get the complete printable PDF edition of this career guide containing all certification roadmaps, company targets, software tools, and salary charts.
            </p>

            <button
              onClick={() => setShowDownloadModal(true)}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 text-black font-bold text-base hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2 mx-auto"
            >
              <Download className="size-5" /> Download PDF Guide (.pdf)
            </button>
          </div>
        </div>
      </div>

      {/* Download Gate Modal */}
      <AnimatePresence>
        {showDownloadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) handleCloseModal();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-lg max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-indigo-500/30 flex flex-col"
              style={{
                background: "linear-gradient(135deg, #0d1136 0%, #1a1f3a 100%)",
              }}
            >
              {/* Top accent bar */}
              <div className="h-1.5 w-full shrink-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400" />

              <div className="p-5 sm:p-8 overflow-y-auto max-h-[calc(90vh-6px)] relative">
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="size-5" />
                </button>

                {!submitted ? (
                  <>
                    <div className="mb-6 text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-3 shadow-lg">
                        <Download className="size-7 text-white" />
                      </div>
                      <h2 className="text-2xl font-black text-white">Get the EEE Career Guide PDF</h2>
                      <p className="text-zinc-400 text-xs mt-1">
                        Please fill in your details to instant-download the PDF resource.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                          <User className="size-3.5" /> Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Narlapati Ramu"
                          className={inputClass("name")}
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                          <Mail className="size-3.5" /> Email ID
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. you@example.com"
                          className={inputClass("email")}
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                      </div>

                      {/* Designation */}
                      <div>
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                          <Briefcase className="size-3.5" /> Designation
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                          {["Student", "Faculty", "Professional", "Organization", "Other"].map((opt) => (
                            <label
                              key={opt}
                              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border cursor-pointer transition-all duration-200 text-xs font-semibold text-center ${
                                designationOption === opt
                                  ? "bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-sm"
                                  : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
                              }`}
                            >
                              <input
                                type="radio"
                                name="designationOption"
                                value={opt}
                                checked={designationOption === opt}
                                className="sr-only"
                                onChange={() => {
                                  setDesignationOption(opt);
                                  if (opt !== "Other") {
                                    setForm((f) => ({ ...f, designation: opt }));
                                  } else {
                                    setForm((f) => ({ ...f, designation: otherDesignation }));
                                  }
                                }}
                              />
                              {opt}
                            </label>
                          ))}
                        </div>

                        {designationOption === "Other" && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2">
                            <input
                              type="text"
                              placeholder="Please specify your designation..."
                              className={inputClass("designation")}
                              value={otherDesignation}
                              onChange={(e) => {
                                setOtherDesignation(e.target.value);
                                setForm((f) => ({ ...f, designation: e.target.value }));
                              }}
                            />
                          </motion.div>
                        )}
                        {errors.designation && <p className="text-red-400 text-xs mt-1">{errors.designation}</p>}
                      </div>

                      {/* Address */}
                      <div>
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                          <MapPin className="size-3.5" /> Address / Institution
                        </label>
                        <textarea
                          placeholder="e.g. JNTUK, Kakinada, Andhra Pradesh"
                          rows={2}
                          className={`${inputClass("address")} resize-none`}
                          value={form.address}
                          onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                        />
                        {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                      </div>

                      {/* Workshop Interest */}
                      <div>
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                          <School className="size-3.5" /> Are you interested to conduct a workshop in your School or College?
                        </label>
                        <div className="flex gap-3">
                          {["Yes", "No", "Maybe"].map((opt) => (
                            <label
                              key={opt}
                              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border cursor-pointer transition-all duration-200 text-sm font-semibold ${
                                form.workshopInterest === opt
                                  ? opt === "Yes"
                                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                                    : opt === "No"
                                    ? "bg-red-500/20 border-red-500 text-red-400"
                                    : "bg-indigo-500/20 border-indigo-500 text-indigo-300"
                                  : "border-white/10 text-zinc-400 hover:border-white/30"
                              }`}
                            >
                              <input
                                type="radio"
                                name="workshopInterest"
                                value={opt}
                                className="sr-only"
                                onChange={() => setForm((f) => ({ ...f, workshopInterest: opt }))}
                              />
                              {opt}
                            </label>
                          ))}
                        </div>
                        {errors.workshopInterest && <p className="text-red-400 text-xs mt-1">{errors.workshopInterest}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3.5 rounded-xl font-bold text-black transition-all duration-200 flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 hover:brightness-110"
                      >
                        {submitting ? (
                          <svg className="animate-spin size-5 text-black" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : (
                          <Download className="size-5" />
                        )}
                        {submitting ? "Submitting..." : "Submit & Download PDF"}
                      </button>
                    </form>
                  </>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center">
                    <div className="inline-flex items-center justify-center size-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 mb-6">
                      <CheckCircle2 className="size-10 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">Download Started! 🎉</h3>
                    <p className="text-zinc-300 text-sm mb-6">
                      Thank you, <strong className="text-white">{form.name}</strong>!<br />
                      Your copy of <strong className="text-indigo-300">eeecareerguide.pdf</strong> is downloading.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href="/eeecarrerguide.pdf"
                        download="eeecareerguide.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:brightness-110 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Download className="size-4" /> Download PDF Now
                      </a>
                      <button
                        onClick={handleCloseModal}
                        className="px-6 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-all text-sm font-medium"
                      >
                        Close Window
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
