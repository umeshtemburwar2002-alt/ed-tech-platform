import React from "react";
import { motion } from "framer-motion";
import { PROVIDERS, PROVIDER_CONFIG } from "../constants/payoutConstants";

const PayoutProviderCards = ({ selectedProvider, onSelectProvider }) => {
  const providers = [
    PROVIDERS.STRIPE,
    PROVIDERS.RAZORPAY,
    PROVIDERS.BANK_TRANSFER,
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {providers.map((providerKey) => {
        const config = PROVIDER_CONFIG[providerKey];
        const isSelected = selectedProvider === providerKey;

        return (
          <motion.button
            key={providerKey}
            type="button"
            onClick={() => onSelectProvider(providerKey)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative rounded-2xl p-5 border text-left transition-all duration-300 overflow-hidden ${
              isSelected
                ? `bg-gradient-to-br ${config.gradient} ${config.border} shadow-lg ${config.shadow}`
                : "border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5"
            }`}
          >
            {isSelected && (
              <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none" />
            )}
            {config.recommended && (
              <div className="absolute top-3 right-3">
                <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  Recommended
                </span>
              </div>
            )}
            <div className="relative z-10">
              <div className="text-3xl mb-2">{config.icon}</div>
              <div className="text-base font-bold text-white">{config.label}</div>
              <div className="text-xs text-slate-400 mt-1">{config.description}</div>
              {isSelected && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-emerald-300">Selected</span>
                </div>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default PayoutProviderCards;
