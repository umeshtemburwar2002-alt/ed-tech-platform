import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { useOnboarding } from '../../context/OnboardingContext';

export default function StepIndicator({ steps, currentStep }) {
  const { goToStep } = useOnboarding();

  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isCurrent = step.number === currentStep;

        return (
          <motion.button
            key={step.number}
            onClick={() => goToStep(step.number)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`w-full text-left p-4 rounded-lg transition-all ${
              isCurrent
                ? 'bg-blue-500/20 border border-blue-500/50'
                : isCompleted
                ? 'bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-slate-700/50 border border-slate-600/50 hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  isCurrent
                    ? 'bg-blue-500 text-white'
                    : isCompleted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-600 text-slate-300'
                }`}
              >
                {isCompleted ? (
                  <FaCheckCircle className="text-lg" />
                ) : (
                  step.number
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-bold text-sm ${
                    isCurrent
                      ? 'text-blue-400'
                      : isCompleted
                      ? 'text-emerald-400'
                      : 'text-slate-300'
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-slate-400 truncate">{step.description}</p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
