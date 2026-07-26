"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle,
  Download,
  FileSpreadsheet,
  Filter,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  RefreshCw,
  School,
  Search,
  ShieldAlert,
  Sparkles,
  User,
  Users,
  Zap,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";

interface Submission {
  id: string;
  name: string;
  email: string;
  designation: string;
  address: string;
  workshopInterest: string;
  resource?: string;
  timestamp: string;
}

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passError, setPassError] = useState("");

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [resourceFilter, setResourceFilter] = useState("all");
  const [workshopFilter, setWorkshopFilter] = useState("all");

  // Check session storage on mount
  useEffect(() => {
    const authSession = sessionStorage.getItem("admin_authenticated");
    if (authSession === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Listen to Firebase RTDB download_requests
  useEffect(() => {
    if (!isAuthenticated) return;

    setLoading(true);
    const requestsRef = ref(db, "download_requests");
    const unsubscribe = onValue(
      requestsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const list: Submission[] = Object.entries(data).map(([id, val]: [string, any]) => ({
            id,
            name: val.name || "N/A",
            email: val.email || "N/A",
            designation: val.designation || "N/A",
            address: val.address || "N/A",
            workshopInterest: val.workshopInterest || "N/A",
            resource: val.resource || "esp8266_tracker",
            timestamp: val.timestamp || new Date().toISOString(),
          }));
          // Sort newest first
          list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          setSubmissions(list);
        } else {
          setSubmissions([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Firebase fetch error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "Rexplorer" || passcode === "ramu2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      setPassError("");
    } else {
      setPassError("Invalid passcode. Access denied.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    setPasscode("");
  };

  // Filtering
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.address.toLowerCase().includes(searchTerm.toLowerCase());

    const isEEEResource = (res?: string) => res === "eeecareerguide" || res === "eeecarrerguide";

    const matchesResource =
      resourceFilter === "all"
        ? true
        : resourceFilter === "eee"
        ? isEEEResource(sub.resource)
        : !isEEEResource(sub.resource);

    const matchesWorkshop =
      workshopFilter === "all" ? true : sub.workshopInterest.toLowerCase() === workshopFilter.toLowerCase();

    return matchesSearch && matchesResource && matchesWorkshop;
  });

  // Metrics
  const totalCount = submissions.length;
  const workshopYesCount = submissions.filter((s) => s.workshopInterest === "Yes").length;
  const workshopMaybeCount = submissions.filter((s) => s.workshopInterest === "Maybe").length;
  const eeeCount = submissions.filter((s) => isEEEResource(s.resource)).length;
  const trackerCount = totalCount - eeeCount;

  // Export CSV
  const exportToCSV = () => {
    if (filteredSubmissions.length === 0) return;

    const headers = ["Timestamp", "Name", "Email", "Designation", "Institution / Address", "Workshop Interest", "Resource"];
    const rows = filteredSubmissions.map((s) => [
      `"${new Date(s.timestamp).toLocaleString()}"`,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${s.designation.replace(/"/g, '""')}"`,
      `"${s.address.replace(/"/g, '""')}"`,
      `"${s.workshopInterest}"`,
      `"${s.resource || "esp8266_tracker"}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `download_requests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Passcode Gatekeeper View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
        <div className="fixed top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-900/20 blur-[130px] pointer-events-none" />
        <div className="fixed bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-900/20 blur-[130px] pointer-events-none" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl shadow-2xl space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-2">
              <Lock className="size-7" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-xs text-zinc-400">Enter administrator passcode to view submitted leads.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <KeyRound className="size-3.5" /> Passcode
              </label>
              <input
                type="password"
                placeholder="Enter passcode"
                className="w-full bg-white/5 border border-zinc-700/60 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
              {passError && <p className="text-red-400 text-xs mt-1.5 font-medium">{passError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg text-sm"
            >
              Access Admin Panel
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              ← Return to Blog
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative overflow-hidden selection:bg-purple-500/30">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-900/20 blur-[130px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-900/20 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
                <ArrowLeft className="size-4" />
              </Link>
              <h1 className="text-3xl font-black bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Submissions Dashboard
              </h1>
            </div>
            <p className="text-xs text-zinc-400">Live lead submissions captured from resource download requests.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportToCSV}
              disabled={filteredSubmissions.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 text-xs font-semibold transition-all disabled:opacity-50"
            >
              <FileSpreadsheet className="size-4" /> Export CSV ({filteredSubmissions.length})
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 text-xs font-semibold transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
              <span>Total Requests</span>
              <Users className="size-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-black text-white">{totalCount}</div>
            <div className="text-[11px] text-zinc-500">All submissions received</div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
              <span>Workshop Interested Leads</span>
              <School className="size-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">
              {workshopYesCount} <span className="text-base text-zinc-400 font-normal">Yes (+{workshopMaybeCount} Maybe)</span>
            </div>
            <div className="text-[11px] text-zinc-500">School/College workshop interest</div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
              <span>EEE Career Guide Downloads</span>
              <Zap className="size-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400">{eeeCount}</div>
            <div className="text-[11px] text-zinc-500">PDF Guide requests</div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
              <span>Solar Tracker Downloads</span>
              <Download className="size-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-cyan-400">{trackerCount}</div>
            <div className="text-[11px] text-zinc-500">Source code requests</div>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3 size-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by name, email, institution..."
              className="w-full bg-white/5 border border-zinc-700/50 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
            {/* Resource Filter */}
            <div className="flex items-center gap-1.5 bg-zinc-800/80 p-1 rounded-xl border border-zinc-700/50">
              <span className="px-2 text-zinc-400 font-medium">Resource:</span>
              {[
                { id: "all", label: "All" },
                { id: "eee", label: "EEE Guide" },
                { id: "tracker", label: "Solar Tracker" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setResourceFilter(f.id)}
                  className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                    resourceFilter === f.id ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Workshop Filter */}
            <div className="flex items-center gap-1.5 bg-zinc-800/80 p-1 rounded-xl border border-zinc-700/50">
              <span className="px-2 text-zinc-400 font-medium">Workshop:</span>
              {[
                { id: "all", label: "All" },
                { id: "yes", label: "Yes" },
                { id: "maybe", label: "Maybe" },
                { id: "no", label: "No" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setWorkshopFilter(f.id)}
                  className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                    workshopFilter === f.id ? "bg-emerald-600 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-xl">
          {loading ? (
            <div className="p-12 text-center text-zinc-400 text-sm space-y-2">
              <RefreshCw className="size-6 animate-spin mx-auto text-indigo-400" />
              <p>Fetching requests from database...</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="p-12 text-center text-zinc-500 text-sm">
              No submissions found matching your filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-950/80 text-zinc-400 font-semibold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Date & Time</th>
                    <th className="py-3.5 px-4">Full Name</th>
                    <th className="py-3.5 px-4">Email ID</th>
                    <th className="py-3.5 px-4">Designation</th>
                    <th className="py-3.5 px-4">Institution / Address</th>
                    <th className="py-3.5 px-4">Workshop Interest</th>
                    <th className="py-3.5 px-4">Resource</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  {filteredSubmissions.map((sub) => {
                    const isEEE = sub.resource === "eeecareerguide" || sub.resource === "eeecarrerguide";
                    const isYes = sub.workshopInterest.toLowerCase() === "yes";
                    const isMaybe = sub.workshopInterest.toLowerCase() === "maybe";

                    return (
                      <tr key={sub.id} className="hover:bg-zinc-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-zinc-400 whitespace-nowrap">
                          {new Date(sub.timestamp).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">{sub.name}</td>
                        <td className="py-3.5 px-4 font-mono text-indigo-300">{sub.email}</td>
                        <td className="py-3.5 px-4 text-zinc-300">{sub.designation}</td>
                        <td className="py-3.5 px-4 text-zinc-400 max-w-xs truncate" title={sub.address}>
                          {sub.address}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                              isYes
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                : isMaybe
                                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                                : "bg-zinc-800 text-zinc-400 border-zinc-700"
                            }`}
                          >
                            {sub.workshopInterest}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                              isEEE
                                ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                                : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                            }`}
                          >
                            {isEEE ? "EEE Career Guide" : "Solar Tracker"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
