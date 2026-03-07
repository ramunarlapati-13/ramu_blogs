"use client";
import Link from "next/link";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Zap, Cpu, Cloud, Settings, Maximize2, Download, X, CheckCircle, User, Mail, Briefcase, MapPin, School } from 'lucide-react';
import { db } from '@/lib/firebase';
import { ref, push } from 'firebase/database';



interface FormData {
    name: string;
    email: string;
    designation: string;
    address: string;
    workshopInterest: string;
}

const initialForm: FormData = {
    name: '',
    email: '',
    designation: '',
    address: '',
    workshopInterest: '',
};

export default function SolarTrackerPage() {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [form, setForm] = useState<FormData>(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const validate = () => {
        const newErrors: Partial<FormData> = {};
        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email address';
        if (!form.designation.trim()) newErrors.designation = 'Designation is required';
        if (!form.address.trim()) newErrors.address = 'Address is required';
        if (!form.workshopInterest) newErrors.workshopInterest = 'Please select an option';
        return newErrors;
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
        try {
            await push(ref(db, 'download_requests'), {
                ...form,
                timestamp: new Date().toISOString(),
            });
            setSubmitted(true);
            // Trigger download
            const link = document.createElement('a');
            link.href = '/esp8266_tracker.zip';
            link.download = 'esp8266_tracker.zip';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error('Firebase error:', err);
            alert('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setSubmitted(false);
        setForm(initialForm);
        setErrors({});
    };

    const inputClass = (field: keyof FormData) =>
        `w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${errors[field]
            ? 'border-red-500 focus:ring-red-500/50'
            : 'border-white/10 focus:ring-[var(--accent-blue)]/50 focus:border-[var(--accent-blue)]'
        }`;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-5xl mx-auto"
            >
                <Link
                    href="/"
                    className="flex items-center gap-2 text-[var(--accent-blue)] hover:text-[var(--accent-green)] transition-colors mb-8 group"
                >
                    <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Blogs
                </Link>

                {/* Hero Section */}
                <div
                    className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl border border-[var(--glass-border)] bg-zinc-900/50 cursor-pointer group"
                    onClick={() => setSelectedImage('/images/solar-tracker-hero.png')}
                >
                    <img
                        src="/images/solar-tracker-hero.png"
                        alt="Solar Tracker Hero"
                        className="w-full h-[300px] md:h-[480px] object-contain group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)] via-[var(--primary-dark)]/40 to-transparent" />
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="size-5 text-white" />
                    </div>
                    <div className="absolute bottom-8 left-8 right-8">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter"
                        >
                            Solar Tracking, Monitoring <span className="text-[var(--accent-green)]">& Controlling System</span>
                            <span className="block text-xl md:text-2xl font-bold text-[var(--accent-blue)] mt-2 text-wrap">with ESP8266</span>
                        </motion.h1>
                        <div className="flex flex-wrap gap-3">
                            {['IoT', 'ESP8266', 'Firebase', 'Real-time'].map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm text-white font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="md:col-span-2 space-y-12 text-[var(--text-primary)]">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Zap className="text-[var(--accent-orange)]" /> Introduction
                            </h2>
                            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
                                The search for sustainable energy efficiency has led to significant innovations in how we capture sunlight.
                                While static solar panels are common, they lose a massive percentage of potential energy as the sun moves across the sky.
                                This project presents a <strong>Dual-Axis Solar Tracker</strong> powered by the <strong>ESP8266</strong>,
                                which follows the sun in real-time and streams live data to a global dashboard via <strong>Firebase</strong>.
                                By maintaining a perfect 90-degree incident angle, this system significantly maximizes energy harvest compared to traditional fixed mounts.
                            </p>
                        </section>

                        <section className="p-8 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-md">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[var(--accent-blue)]">
                                <Cpu /> Hardware Precision
                            </h2>
                            <div className="space-y-6 text-[var(--text-secondary)]">
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="h-2 w-2 rounded-full bg-[var(--accent-blue)] mt-2 shrink-0" />
                                        <p><strong className="text-[var(--text-primary)]">Dual-Axis Mobility:</strong> Using two high-torque servo motors (Horizontal and Vertical), the system can rotate nearly 180 degrees in multiple directions.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="h-2 w-2 rounded-full bg-[var(--accent-blue)] mt-2 shrink-0" />
                                        <p><strong className="text-[var(--text-primary)]">Sensor Array:</strong> Four LDRs (Top-Left, TR, BL, BR) provide a high-resolution "vision" of where the light is strongest.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="h-2 w-2 rounded-full bg-[var(--accent-blue)] mt-2 shrink-0" />
                                        <p><strong className="text-[var(--text-primary)]">Voltage Monitoring:</strong> A dedicated sensor on the solar panel monitors energy generation in real-time for efficiency calculations.</p>
                                    </div>
                                </div>

                                <div className="mt-8 overflow-x-auto">
                                    <h3 className="text-lg font-bold text-white mb-4">Pin Mapping Table</h3>
                                    <table className="w-full text-sm text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/10 text-[var(--accent-blue)]">
                                                <th className="pb-2 pr-4">Component</th>
                                                <th className="pb-2 px-4">ESP8266 Bin</th>
                                                <th className="pb-2 px-4">NodeMCU Label</th>
                                                <th className="pb-2 pl-4">Function</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-400">
                                            {[
                                                ['LDR Top Left', 'GPIO 5', 'D1', 'Light Sensor Input'],
                                                ['LDR Top Right', 'GPIO 4', 'D2', 'Light Sensor Input'],
                                                ['LDR Bottom Left', 'GPIO 14', 'D5', 'Light Sensor Input'],
                                                ['LDR Bottom Right', 'GPIO 12', 'D6', 'Light Sensor Input'],
                                                ['Horizontal Servo', 'GPIO 13', 'D7', 'Movement Control'],
                                                ['Vertical Servo', 'GPIO 15', 'D8', 'Movement Control'],
                                                ['Voltage Sensor', 'A0', 'A0', 'Analog Voltage Read'],
                                            ].map(([comp, pin, label, func], idx) => (
                                                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                    <td className="py-2 pr-4 font-medium text-white">{comp}</td>
                                                    <td className="py-2 px-4 font-mono">{pin}</td>
                                                    <td className="py-2 px-4 font-mono">{label}</td>
                                                    <td className="py-2 pl-4">{func}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6">Connection Schematic</h2>
                            <div
                                className="rounded-2xl overflow-hidden border border-[var(--glass-border)] group relative cursor-pointer"
                                onClick={() => setSelectedImage('/images/solar-tracker-diagram.png')}
                            >
                                <img
                                    src="/images/solar-tracker-diagram.png"
                                    alt="Wiring Diagram"
                                    className="w-full hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Maximize2 className="text-white size-8" />
                                </div>
                            </div>
                            <div className="mt-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium flex gap-3 items-start">
                                <div className="shrink-0 mt-0.5 whitespace-nowrap">⚠️ IMPORTANT:</div>
                                <p>Use a separate 5V power supply for the servo motors. This is critical to prevent system resets and ensure stable operation during heavy movement.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Settings className="text-[var(--accent-green)] animate-spin-slow" /> "Smart" Tracking Logic
                            </h2>
                            <p className="text-[var(--text-secondary)] mb-6">
                                Unlike simple trackers, this system uses a <strong>Differential Centering Algorithm</strong> to ensure the panel is always perpendicular to the sun's rays. It calculates the delta between opposing sensors and applies corrective movement.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {[
                                    { title: "Differential Logic", desc: "Compares light intensity between opposing sensors to calculate the precise error vector." },
                                    { title: "Auto-Home System", desc: "Performs a smooth return to home position (90/45) after 3s of darkness detected." },
                                    { title: "Deadzone Tuning", desc: "Prevents motor 'hunting' and jitter by ignoring small insignificant imbalances." },
                                    { title: "Smooth Stepping", desc: "Moves in 2-degree increments with 15ms buffers to prevent sudden current spikes." }
                                ].map((item, i) => (
                                    <div key={i} className="p-4 rounded-xl border border-[var(--glass-border)] bg-white/5">
                                        <h4 className="font-bold text-[var(--accent-green)] mb-1">{item.title}</h4>
                                        <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-4">Logic Phase Matrix</h3>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-4 text-xs font-bold text-[var(--accent-blue)] uppercase tracking-wider pb-2 border-b border-white/10">
                                        <div>Condition</div>
                                        <div>Action</div>
                                    </div>
                                    {[
                                        ['(Top Left OR Top Right) detect light while Bottoms are dark', 'Tilt UP: Incr Vertical'],
                                        ['(Bottom Left OR Bottom Right) detect light while Tops are dark', 'Tilt DOWN: Decr Vertical'],
                                        ['(Top Left OR Bottom Left) detect light while Rights are dark', 'Turn LEFT: Decr Horizontal'],
                                        ['(Top Right OR Bottom Right) detect light while Lefts are dark', 'Turn RIGHT: Incr Horizontal']
                                    ].map(([cond, act], idx) => (
                                        <div key={idx} className="grid grid-cols-2 gap-4 text-sm py-1">
                                            <div className="text-gray-400">{cond}</div>
                                            <div className="text-[var(--accent-green)] font-medium underline underline-offset-4 decoration-white/10">{act}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--secondary-dark)] to-[var(--primary-dark)] border border-[var(--glass-border)]">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[var(--accent-blue)]">
                                <Cloud /> IoT Connectivity
                            </h3>
                            <div className="space-y-4">
                                <ul className="space-y-3 text-sm border-b border-white/10 pb-4">
                                    <li className="flex justify-between">
                                        <span className="text-[var(--text-secondary)]">Database</span>
                                        <span className="text-white font-mono">Firebase RTDB</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-[var(--text-secondary)]">Sync Latency</span>
                                        <span className="text-white font-mono">&lt; 500ms</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-[var(--text-secondary)]">Remote Control</span>
                                        <span className="text-[var(--accent-green)] font-bold uppercase">Active</span>
                                    </li>
                                </ul>
                                <div className="space-y-3">
                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                        Every 500ms, the tracker sends its current angles, voltage, and individual sensor readings to the cloud.
                                    </p>
                                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                        <h4 className="text-[10px] uppercase tracking-widest text-[var(--accent-blue)] mb-1">Global Override</h4>
                                        <p className="text-[11px] text-gray-400">Manual mode allows for remote control of elevation and azimuth via dashboard sliders.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-[var(--glass-border)]">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-[var(--accent-green)]">
                                <Settings className="size-5" /> Technical Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { label: 'Firmware', val: 'C++ (Arduino)' },
                                    { label: 'Database', val: 'Firebase' },
                                    { label: 'Frontend', val: 'Next.js / Tailwind' },
                                    { label: 'Charts', val: 'Chart.js' }
                                ].map((tech, i) => (
                                    <div key={i} className="flex-1 min-w-[100px] bg-white/5 p-2 rounded-lg border border-white/5">
                                        <div className="text-[10px] text-[var(--text-secondary)] uppercase">{tech.label}</div>
                                        <div className="text-xs font-bold text-white">{tech.val}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-center">Dashboard Interface</h3>
                            <div className="space-y-3">
                                {[
                                    { src: '/images/solar-tracker-ui-1.png', label: 'Real-Time Gauges' },
                                    { src: '/images/solar-tracker-ui-2.png', label: 'Historical Analytics' }
                                ].map((img, i) => (
                                    <div
                                        key={i}
                                        className="group relative rounded-xl overflow-hidden border border-[var(--glass-border)] cursor-pointer"
                                        onClick={() => setSelectedImage(img.src)}
                                    >
                                        <img src={img.src} alt={img.label} className="w-full transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                            <div className="flex items-center justify-between w-full">
                                                <span className="text-xs font-bold text-white uppercase tracking-widest">{img.label}</span>
                                                <Maximize2 className="size-4 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] text-center text-gray-500 px-4">
                                Interactive sliders, power analytics, and heartbeat monitoring system.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-[var(--glow-blue)] border border-[var(--accent-blue)]/20 text-center">
                            <h4 className="text-sm uppercase tracking-widest text-[var(--accent-blue)] mb-2">Project Stats</h4>
                            <div className="text-4xl font-black text-white mb-1">94%</div>
                            <p className="text-xs text-[var(--text-secondary)]">Efficiency improvement over static panels in simulated testing.</p>
                        </div>
                    </div>
                </div>

                {/* Conclusion */}
                <section className="mt-16 p-8 rounded-3xl bg-white/5 border border-white/10 text-center max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-white">Conclusion</h2>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                        This Dual-Axis Solar Tracker demonstrates how low-cost microcontrollers and cloud technologies can significantly improve renewable energy infrastructure. By keeping the panel perfectly perpendicular to the sun and providing instant diagnostic data to the user, we bridge the gap between simple hardware and intelligent energy management.
                    </p>
                </section>

                {/* Footer Connect */}
                <div className="mt-20 pt-8 border-t border-[var(--glass-border)] text-center">
                    <p className="text-[var(--text-secondary)] mb-4">Interested in the technical implementation?</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="https://github.com/ramunarlapati-13/dual_axis_solar_monitor"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-white hover:bg-[var(--accent-blue)] hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                            View Repository
                        </a>
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                            <Download className="size-4" /> Download Code (.zip)
                        </button>
                    </div>
                    <p className="mt-4 text-xs text-[var(--text-secondary)]">Note: The zip archive is password protected. Password: <strong>Rexplorer</strong></p>
                </div>
            </motion.div>

            {/* Download Gate Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
                        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
                        onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
                            style={{
                                background: 'linear-gradient(135deg, #0d1136 0%, #1a1f3a 100%)',
                                border: '1px solid rgba(0,217,255,0.2)',
                            }}
                        >
                            {/* Glow accent top */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-green)] to-[var(--accent-orange)]" />

                            <div className="p-8">
                                {/* Close btn */}
                                <button
                                    onClick={handleClose}
                                    className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors"
                                >
                                    <X className="size-5" />
                                </button>

                                {!submitted ? (
                                    <>
                                        <div className="mb-6 text-center">
                                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-green)] mb-4">
                                                <Download className="size-6 text-black" />
                                            </div>
                                            <h2 className="text-2xl font-black text-white">Get the Source Code</h2>
                                            <p className="text-gray-400 text-sm mt-1">Fill in your details to download the ESP8266 Tracker code.</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            {/* Name */}
                                            <div>
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                                                    <User className="size-3.5" /> Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Narlapati Ramu"
                                                    className={inputClass('name')}
                                                    value={form.name}
                                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                                />
                                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                                                    <Mail className="size-3.5" /> Email ID
                                                </label>
                                                <input
                                                    type="email"
                                                    placeholder="e.g. you@example.com"
                                                    className={inputClass('email')}
                                                    value={form.email}
                                                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                                />
                                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                                            </div>

                                            {/* Designation */}
                                            <div>
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                                                    <Briefcase className="size-3.5" /> Designation
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Student, Professor, Engineer"
                                                    className={inputClass('designation')}
                                                    value={form.designation}
                                                    onChange={e => setForm(f => ({ ...f, designation: e.target.value }))}
                                                />
                                                {errors.designation && <p className="text-red-400 text-xs mt-1">{errors.designation}</p>}
                                            </div>

                                            {/* Address */}
                                            <div>
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                                                    <MapPin className="size-3.5" /> Address / Institution
                                                </label>
                                                <textarea
                                                    placeholder="e.g. JNTUK, Kakinada, Andhra Pradesh"
                                                    rows={2}
                                                    className={`${inputClass('address')} resize-none`}
                                                    value={form.address}
                                                    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                                                />
                                                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                                            </div>

                                            {/* Workshop Interest */}
                                            <div>
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                                                    <School className="size-3.5" /> Are you interested to conduct a workshop in your School or College?
                                                </label>
                                                <div className="flex gap-3">
                                                    {['Yes', 'No', 'Maybe'].map(opt => (
                                                        <label
                                                            key={opt}
                                                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border cursor-pointer transition-all duration-200 text-sm font-semibold ${form.workshopInterest === opt
                                                                ? opt === 'Yes'
                                                                    ? 'bg-[var(--accent-green)]/20 border-[var(--accent-green)] text-[var(--accent-green)]'
                                                                    : opt === 'No'
                                                                        ? 'bg-red-500/20 border-red-500 text-red-400'
                                                                        : 'bg-[var(--accent-blue)]/20 border-[var(--accent-blue)] text-[var(--accent-blue)]'
                                                                : 'border-white/10 text-gray-400 hover:border-white/30'
                                                                }`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="workshopInterest"
                                                                value={opt}
                                                                className="sr-only"
                                                                onChange={() => setForm(f => ({ ...f, workshopInterest: opt }))}
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
                                                className="w-full py-3.5 rounded-xl font-bold text-black transition-all duration-200 flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                                style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-green))' }}
                                            >
                                                {submitting ? (
                                                    <svg className="animate-spin size-5" viewBox="0 0 24 24" fill="none">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                    </svg>
                                                ) : (
                                                    <Download className="size-5" />
                                                )}
                                                {submitting ? 'Submitting...' : 'Submit & Download'}
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-8 text-center"
                                    >
                                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--accent-green)]/20 border-2 border-[var(--accent-green)] mb-6">
                                            <CheckCircle className="size-10 text-[var(--accent-green)]" />
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-2">Download Started! 🎉</h3>
                                        <p className="text-gray-400 mb-2">
                                            Thank you, <strong className="text-white">{form.name}</strong>!<br />
                                            Your download has begun automatically.
                                        </p>
                                        <p className="text-sm text-[var(--accent-blue)] mb-6">
                                            Password: <strong className="font-mono">Rexplorer</strong>
                                        </p>
                                        <button
                                            onClick={handleClose}
                                            className="px-8 py-2.5 rounded-xl border border-[var(--glass-border)] text-gray-300 hover:text-white hover:border-white/40 transition-all"
                                        >
                                            Close
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Image Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[20000] flex items-center justify-center p-4 md:p-12"
                        style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)' }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-3 rounded-full backdrop-blur-md transition-all z-10"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="size-8" />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-7xl max-h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Full scale view"
                                className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

