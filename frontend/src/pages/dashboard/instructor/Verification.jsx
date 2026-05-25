import React from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle, Clock, AlertCircle, Upload, BadgeCheck } from "lucide-react";
import toast from "react-hot-toast";

// Stub — status can be: "pending" | "verified" | "rejected"
const STATUS = "pending";

const STATUS_META = {
  pending:  { icon: Clock,        color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20",   label: "Verification Pending",  desc: "Your documents are under review. This usually takes 24-48 hours." },
  verified: { icon: BadgeCheck,   color: "text-emerald-400",bg: "bg-emerald-500/10 border-emerald-500/20",label: "Verified Instructor",    desc: "Congratulations! Your account is verified. Your profile shows a verified badge." },
  rejected: { icon: AlertCircle,  color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20",        label: "Verification Rejected",  desc: "Your verification was rejected. Please re-submit with clearer documents." },
};

const STEPS = [
  { step: 1, label: "Account Created",      done: true  },
  { step: 2, label: "Profile Completed",    done: true  },
  { step: 3, label: "Documents Submitted",  done: true  },
  { step: 4, label: "Under Review",         done: STATUS !== "pending" },
  { step: 5, label: "Verified",             done: STATUS === "verified" },
];

export default function Verification() {
  const meta = STATUS_META[STATUS];
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-white">Instructor Verification</h1>
        <p className="text-sm text-slate-500 mt-0.5">Get verified to unlock premium features and earn a verified badge</p>
      </motion.div>

      {/* Status Card */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className={`flex items-center gap-5 p-6 rounded-2xl border ${meta.bg}`}>
        <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0`}>
          <meta.icon className={`w-8 h-8 ${meta.color}`} />
        </div>
        <div>
          <p className={`text-lg font-black ${meta.color}`}>{meta.label}</p>
          <p className="text-sm text-slate-400 mt-1">{meta.desc}</p>
        </div>
      </motion.div>

      {/* Progress Steps */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
        <h2 className="text-sm font-black text-white mb-5">Verification Progress</h2>
        <div className="flex items-center gap-0">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.step}>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${s.done ? "border-emerald-500 bg-emerald-500/20" : "border-white/20 bg-white/5"}`}>
                  {s.done ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <span className="text-xs font-black text-slate-500">{s.step}</span>}
                </div>
                <p className={`text-[10px] font-bold text-center ${s.done ? "text-emerald-400" : "text-slate-500"}`}>{s.label}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mb-6 ${STEPS[i + 1].done ? "bg-emerald-500" : "bg-white/10"}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Document Upload */}
      {STATUS !== "verified" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <h2 className="text-sm font-black text-white mb-4">Submit Documents</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {["Government ID (Aadhar/Passport)", "Teaching Credential or Degree", "Professional Certificate (Optional)", "Profile Photo"].map((doc, i) => (
              <div key={doc} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                <div>
                  <p className="text-xs font-bold text-white">{doc}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{i < 2 ? "Required" : "Optional"} · PDF or JPG · Max 5 MB</p>
                </div>
                <button onClick={() => toast.success("Upload dialog opened")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-600/20 border border-violet-500/30 text-xs font-bold text-violet-300 hover:bg-violet-600/30 transition-all">
                  <Upload className="w-3 h-3" /> Upload
                </button>
              </div>
            ))}
          </div>
          <button className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" /> Submit for Verification
          </button>
        </motion.div>
      )}
    </div>
  );
}
