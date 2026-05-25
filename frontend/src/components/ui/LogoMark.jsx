import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export default function LogoMark({ collapsed = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const rotation = useTransform(scrollY, [0, 1000], [0, 360]);

  const brandName = "COREDEV";
  const academyName = "ACADEMY";

  return (
    <div 
      className="flex items-center gap-3 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <motion.svg
          width={collapsed ? 44 : 40}
          height={collapsed ? 44 : 40}
          viewBox="0 0 100 100"
          initial="initial"
          animate={isHovered ? "hover" : "animate"}
          style={{ rotate: rotation }}
        >
          <defs>
            <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6C47FF" />
              <stop offset="50%" stopColor="#00D4AA" />
              <stop offset="100%" stopColor="#6C47FF" />
            </linearGradient>
            <linearGradient id="hexGradHover" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6C6C" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FF6C6C" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          <motion.polygon
            points="50,5 95,30 95,70 50,95 5,70 5,30"
            fill="none"
            animate={{
              stroke: isHovered ? "url(#hexGradHover)" : "url(#hexGrad)"
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            strokeWidth="4"
            filter={isHovered ? "url(#glow)" : "none"}
            variants={{
              initial: { pathLength: 0, opacity: 0 },
              animate: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
              hover: { scale: 1.05, transition: { duration: 0.2 } }
            }}
          />
          
          <motion.g opacity={0.6}>
            <motion.line
              x1="25" y1="50" x2="75" y2="50"
              animate={{
                stroke: isHovered ? "#FF6C6C" : "#6C47FF"
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              strokeWidth="2"
              variants={{
                initial: { pathLength: 0, opacity: 0 },
                animate: { pathLength: 1, opacity: 0.8, transition: { delay: 0.4, duration: 0.6 } }
              }}
            />
            <motion.line
              x1="50" y1="25" x2="50" y2="75"
              animate={{
                stroke: isHovered ? "#FFD700" : "#00D4AA"
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              strokeWidth="2"
              variants={{
                initial: { pathLength: 0, opacity: 0 },
                animate: { pathLength: 1, opacity: 0.8, transition: { delay: 0.5, duration: 0.6 } }
              }}
            />
          </motion.g>
        </motion.svg>
      </div>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col"
          >
            <div className="flex gap-0.5">
              {brandName.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
                  className="text-xl font-black tracking-tight"
                  style={{
                    color: isHovered 
                      ? (i < 4 ? '#FF6C6C' : '#FFD700') 
                      : (i < 4 ? '#6C47FF' : '#00D4AA'),
                    textShadow: isHovered 
                      ? '0 0 20px rgba(255,108,108,0.5)' 
                      : '0 0 20px rgba(108,71,255,0.3)',
                    transition: 'color 0.4s ease, text-shadow 0.4s ease'
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-xs font-bold tracking-[0.25em] text-gray-400 uppercase"
              style={{
                color: isHovered ? '#FFD700' : '#9CA3AF',
                transition: 'color 0.4s ease'
              }}
            >
              {academyName}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
