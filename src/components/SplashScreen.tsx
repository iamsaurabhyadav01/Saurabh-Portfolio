"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onDone, 600);
          }, 200);
          return 100;
        }
        return p + 2.5;
      });
    }, 35);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "#030712" }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="relative mb-12"
          >
            <div className="w-24 h-24 rounded-2xl border border-cyan-500/30 flex items-center justify-center relative overflow-hidden"
              style={{ boxShadow: "0 0 40px rgba(0,212,255,0.2)" }}>
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(124,58,237,0.1))" }} />
              <span className="relative z-10 font-display font-bold text-3xl gradient-text">SY</span>
            </div>
            {/* Orbit ring */}
            <motion.div
              className="absolute inset-[-8px] rounded-[20px] border border-cyan-500/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ borderTopColor: "rgba(0,212,255,0.6)" }}
            />
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="font-mono text-xs text-cyan-500/60 tracking-[0.2em] mb-2">PORTFOLIO</div>
            <div className="font-display font-bold text-2xl text-white">Saurabh Yadav</div>
            <div className="text-muted text-sm mt-1">Data Analyst</div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-48 space-y-2"
          >
            <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #00d4ff, #7c3aed)",
                }}
                transition={{ duration: 0.05 }}
              />
            </div>
            <div className="font-mono text-xs text-muted/40 text-center">{Math.round(progress)}%</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
