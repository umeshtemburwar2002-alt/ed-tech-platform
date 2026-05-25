import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaSave, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useOnboarding } from '../../../context/OnboardingContext';
import { useAuth } from '../../../context/AuthContext';
import ProgressBar from '../../../components/onboarding/ProgressBar';
import StepIndicator from '../../../components/onboarding/StepIndicator';
import Step1BasicProfile from './Step1BasicProfile';
import Step2Professional from './Step2Professional';
import Step3Teaching from './Step3Teaching';
import Step4Verification from './Step4Verification';
import Step5Payment from './Step5Payment';
import Step6Review from './Step6Review';

const STEPS = [
  { number: 1, title: 'Basic Profile', description: 'Tell us about yourself' },
  { number: 2, title: 'Professional', description: 'Your professional background' },
  { number: 3, title: 'Teaching', description: 'Your teaching experience' },
  { number: 4, title: 'Verification', description: 'Verify your identity' },
  { number: 5, title: 'Payment', description: 'Payment information' },
  { number: 6, title: 'Review', description: 'Review and submit' },
];

const stepComponents = {
  1: Step1BasicProfile,
  2: Step2Professional,
  3: Step3Teaching,
  4: Step4Verification,
  5: Step5Payment,
  6: Step6Review,
};

export default function OnboardingLayout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    currentStep,
    formData,
    loading,
    completionPercentage,
    isDraft,
    nextStep,
    prevStep,
    saveDraft,
    loadDraft,
  } = useOnboarding();

  useEffect(() => {
    // Load draft on mount
    loadDraft();
  }, [loadDraft]);

  useEffect(() => {
    // Redirect if not authenticated
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const CurrentStepComponent = stepComponents[currentStep];

  const handleSaveDraft = async () => {
    await saveDraft();
  };

  const handlePrevious = () => {
    prevStep();
  };

  const handleNext = () => {
    nextStep();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-black text-white">Instructor Onboarding</h1>
                <p className="text-slate-400 text-sm mt-1">Complete your profile to start teaching</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-blue-400">{completionPercentage}%</p>
                <p className="text-slate-400 text-xs">Complete</p>
              </div>
            </div>

            {/* Progress bar */}
            <ProgressBar percentage={completionPercentage} />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Step indicator sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <StepIndicator steps={STEPS} currentStep={currentStep} />
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm"
                >
                  {/* Step header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
                        <span className="text-blue-400 font-bold">{currentStep}</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-white">{STEPS[currentStep - 1].title}</h2>
                        <p className="text-slate-400 text-sm">{STEPS[currentStep - 1].description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Step content */}
                  <CurrentStepComponent />

                  {/* Navigation buttons */}
                  <div className="mt-12 flex items-center justify-between gap-4">
                    <button
                      onClick={handlePrevious}
                      disabled={currentStep === 1 || loading}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaArrowLeft className="text-xs" />
                      Previous
                    </button>

                    <div className="flex items-center gap-3">
                      {isDraft && (
                        <button
                          onClick={handleSaveDraft}
                          disabled={loading}
                          className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50"
                        >
                          <FaSave className="text-xs" />
                          Save Draft
                        </button>
                      )}
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={currentStep === 6 || loading}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <FaArrowRight className="text-xs" />
                    </button>
                  </div>

                  {/* Step indicator text */}
                  <p className="text-center text-slate-400 text-xs mt-6">
                    Step {currentStep} of 6
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
