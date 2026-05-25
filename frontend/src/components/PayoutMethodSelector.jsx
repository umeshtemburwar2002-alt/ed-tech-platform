import React from "react";
import { motion } from "framer-motion";
import { PROVIDER_CONFIG, METHOD_CONFIG } from "../constants/payoutConstants";

const PayoutMethodSelector = ({ selectedProvider, selectedMethod, onSelectMethod }) => {
  const methods = PROVIDER_CONFIG[selectedProvider]?.methods || [];

  if (methods.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {methods.map((methodKey) => {
        const config = METHOD_CONFIG[methodKey];
        const isSelected = selectedMethod === methodKey;

        return (
          <motion.button
            key={methodKey}
            type="button"
            onClick={() => onSelectMethod(methodKey)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-xl p-4 border text-center transition-all duration-200 ${
              isSelected
                ? "border-violet-500/60 bg-violet-500/10 text-violet-200"
                : "border-white/10 bg-white/3 text-slate-400 hover:border-white/20 hover:bg-white/5"
            }`}
          >
            <div className="text-2xl mb-1">{config.icon}</div>
            <div className="text-sm font-semibold">{config.label}</div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default PayoutMethodSelector;
