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
                <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl border border-[var(--glass-border)]">
                    <img
                        src="/images/solar-tracker-hero.png"
                        alt="Solar Tracker Hero"
                        className="w-full h-auto block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)] via-[var(--primary-dark)]/40 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter"
                        >
                            Solar Tracking, Monitoring <span className="text-[var(--accent-green)]">& Controlling System</span>
                            <div className="text-xl md:text-2xl font-bold text-[var(--accent-blue)] mt-2">with ESP8266</div>
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
                            </p>
                        </section>

                        <section className="p-8 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-md">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[var(--accent-blue)]">
                                <Cpu /> The Hardware Architecture
                            </h2>
                            <div className="space-y-4 text-[var(--text-secondary)]">
                                <div className="flex gap-4">
                                    <div className="h-2 w-2 rounded-full bg-[var(--accent-blue)] mt-2 shrink-0" />
                                    <p><strong className="text-[var(--text-primary)]">Dual-Axis Mobility:</strong> Using two high-torque servo motors (Horizontal and Vertical), the system maintains a perfect 90-degree incident angle.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-2 w-2 rounded-full bg-[var(--accent-blue)] mt-2 shrink-0" />
                                    <p><strong className="text-[var(--text-primary)]">Sensor Array:</strong> Four LDRs (Top-Left, TR, BL, BR) provide a high-resolution "vision" of the light source.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-2 w-2 rounded-full bg-[var(--accent-blue)] mt-2 shrink-0" />
                                    <p><strong className="text-[var(--text-primary)]">Voltage Monitoring:</strong> Integrated voltage divider circuit monitors real-time energy conversion efficiency.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6">Connection Schematic</h2>
                            <div className="rounded-2xl overflow-hidden border border-[var(--glass-border)] group relative">
                                <img
                                    src="/images/solar-tracker-diagram.png"
                                    alt="Wiring Diagram"
                                    className="w-full hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                    <Maximize2 className="text-white size-8" />
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-[var(--text-secondary)] italic text-center">
                                Standard NodeMCU ESP8266 Wiring with 4 LDR Modules and 2 SG90 Servos.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Settings className="text-[var(--accent-green)] animate-spin-slow" /> Tracking Mechanism
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { title: "Differential Logic", desc: "Compares light intensity between opposing sensors to calculate error." },
                                    { title: "Auto-Home System", desc: "Detects darkness and returns to 90/90 home position for the night." },
                                    { title: "Deadzone Tuning", desc: "Software-defined thresholds prevent jittery small movements." },
                                    { title: "Smooth Stepping", desc: "Interpolates movements to prevent rapid motor wear." }
                                ].map((item, i) => (
                                    <div key={i} className="p-4 rounded-xl border border-[var(--glass-border)] bg-white/5">
                                        <h4 className="font-bold text-[var(--accent-green)] mb-1">{item.title}</h4>
                                        <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--secondary-dark)] to-[var(--primary-dark)] border border-[var(--glass-border)]">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[var(--accent-blue)]">
                                <Cloud /> Cloud Capabilities
                            </h3>
                            <ul className="space-y-4 text-sm">
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
                                    <span className="text-[var(--accent-green)] font-bold">ACTIVE</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-center">Dashboard Interface</h3>
                            <div className="rounded-xl overflow-hidden border border-[var(--glass-border)]">
                                <img src="/images/solar-tracker-ui-1.png" alt="UI Top" className="w-full" />
                            </div>
                            <div className="rounded-xl overflow-hidden border border-[var(--glass-border)]">
                                <img src="/images/solar-tracker-ui-2.png" alt="UI Bottom" className="w-full" />
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-[var(--glow-blue)] border border-[var(--accent-blue)]/20 text-center">
                            <h4 className="text-sm uppercase tracking-widest text-[var(--accent-blue)] mb-2">Project Stats</h4>
                            <div className="text-4xl font-black text-white mb-1">94%</div>
                            <p className="text-xs text-[var(--text-secondary)]">Efficiency improvement over static panels in simulated testing.</p>
                        </div>
                    </div>
                </div>

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
                            className="px-6 py-3 rounded-lg bg-[var(--accent-orange)] text-black font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg"
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
        </>
    );
}

