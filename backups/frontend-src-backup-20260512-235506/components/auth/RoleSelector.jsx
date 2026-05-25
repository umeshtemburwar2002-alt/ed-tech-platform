/**
 * RoleSelector — Animated role selection cards
 *
 * Props:
 *  selectedRole  : "Student" | "Instructor" | null
 *  onSelect      : (role: "Student" | "Instructor") => void
 *  disabled      : boolean  (during OAuth loading)
 */
import React from "react";
import { motion } from "framer-motion";

const ROLES = [
  {
    id: "Student",
    label: "Student",
    subtitle: "Access courses & learning paths",
    icon: "fa-user-graduate",
    gradient: "from-[#00B4D8]/20 to-[#0077B6]/10",
    border: "border-[#00B4D8]/40",
    ring: "ring-[#00B4D8]/60",
    glow: "#00B4D8",
    badge: "Learn",
    badgeColor: "bg-[#00B4D8]/20 text-[#00B4D8]",
    features: ["Access all courses", "Track progress", "Earn certificates"],
  },
  {
    id: "Instructor",
    label: "Instructor",
    subtitle: "Teach students & manage courses",
    icon: "fa-chalkboard-teacher",
    gradient: "from-violet-500/20 to-purple-600/10",
    border: "border-violet-500/40",
    ring: "ring-violet-500/60",
    glow: "#8B5CF6",
    badge: "Teach",
    badgeColor: "bg-violet-500/20 text-violet-400",
    features: ["Create courses", "Manage students", "View analytics"],
  },
];

const cardVariants = {
  idle: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -4, transition: { duration: 0.2 } },
  selected: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.2, type: "spring", stiffness: 300 },
  },
  tap: { scale: 0.98 },
};

const checkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
};

const RoleSelector = ({ selectedRole, onSelect, disabled }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {ROLES.map((role) => {
        const isSelected = selectedRole === role.id;

        return (
          <motion.button
            key={role.id}
            type="button"
            onClick={() => !disabled && onSelect(role.id)}
            disabled={disabled}
            variants={cardVariants}
            initial="idle"
            animate={isSelected ? "selected" : "idle"}
            whileHover={!disabled ? "hover" : undefined}
            whileTap={!disabled ? "tap" : undefined}
            className={`
              relative text-left p-5 rounded-2xl border-2 transition-all duration-300
              bg-gradient-to-br ${role.gradient}
              ${isSelected
                ? `${role.border} ring-2 ${role.ring} shadow-lg`
                : "border-white/10 hover:border-white/20"
              }
              ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
              group focus:outline-none
            `}
            aria-pressed={isSelected}
            aria-label={`Select ${role.label} role`}
          >
            {/* Glow effect when selected */}
            {isSelected && (
              <motion.div
                layoutId="role-glow"
                className="absolute inset-0 rounded-2xl opacity-10 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${role.glow}, transparent 70%)` }}
              />
            )}

            {/* Check badge */}
            <motion.div
              variants={checkVariants}
              initial="hidden"
              animate={isSelected ? "visible" : "hidden"}
              className={`
                absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center
                bg-gradient-to-br ${role.gradient} border ${role.border}
              `}
            >
              <i className="fas fa-check text-[10px] text-white" />
            </motion.div>

            {/* Role badge */}
            <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 ${role.badgeColor}`}>
              {role.badge}
            </span>

            {/* Icon + title */}
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center border ${role.border} bg-white/5 transition-transform duration-200 group-hover:scale-110`}
              >
                <i className={`fas ${role.icon} text-base`} style={{ color: role.glow }} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm leading-tight">{role.label}</h3>
                <p className="text-slate-500 text-[11px] leading-tight">{role.subtitle}</p>
              </div>
            </div>

            {/* Feature list */}
            <ul className="mt-3 space-y-1.5">
              {role.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: role.glow }} />
                  {f}
                </li>
              ))}
            </ul>
          </motion.button>
        );
      })}
    </div>
  );
};

export default RoleSelector;
