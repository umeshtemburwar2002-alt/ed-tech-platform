import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function ProgressStepper({ currentStep, totalSteps, labels = [] }) {
  return (
    <div className="w-full flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;
        const isUpcoming = step > currentStep;
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted ? '#10B981' : isCurrent ? '#6366F1' : '#1E1E2E',
                  borderColor: isCurrent ? '#6366F1' : isCompleted ? '#10B981' : '#2E2E4E',
                }}
                transition={{ duration: 0.3 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2
                  ${isCurrent ? 'shadow-lg shadow-indigo-500/30' : ''}`}
              >
                {isCompleted ? (
                  <Check size={18} className="text-white" />
                ) : (
                  <span className={`text-sm font-bold ${isUpcoming ? 'text-gray-500' : 'text-white'}`}>
                    {step}
                  </span>
                )}
              </motion.div>
              {labels[index] && (
                <span className={`text-[10px] font-medium ${isCurrent ? 'text-indigo-400' : isCompleted ? 'text-emerald-400' : 'text-gray-500'}`}>
                  {labels[index]}
                </span>
              )}
            </div>
            {index < totalSteps - 1 && (
              <div className={`h-0.5 flex-1 max-w-12 rounded-full transition-all duration-300
                ${index < currentStep - 1 ? 'bg-emerald-500' : 'bg-gray-800'}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
