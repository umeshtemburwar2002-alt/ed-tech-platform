import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressStepper from './ProgressStepper';
import { useOnboarding } from '../../context/OnboardingContext';
import WelcomeStep from './steps/WelcomeStep';
import BasicInfoStep from './steps/BasicInfoStep';
import LearningProfileStep from './steps/student/LearningProfileStep';
import LearningPreferencesStep from './steps/student/LearningPreferencesStep';
import SocialStep from './steps/student/SocialStep';
import StudentFinishStep from './steps/student/StudentFinishStep';

export default function OnboardingShell() {
  const {
    currentStep,
    totalSteps,
    role,
    formData,
    updateForm,
    nextStep,
    prevStep,
    completeOnboarding,
  } = useOnboarding();

  const stepLabels = role === 'student'
    ? ['Welcome', 'Basic Info', 'Learning Profile', 'Preferences', 'Social', 'Finish']
    : ['Welcome', 'Basic Info', 'Professional', 'Business', 'Payout', 'Finish'];

  const renderStep = () => {
    if (role === 'student') {
      switch (currentStep) {
        case 1:
          return <WelcomeStep onNext={nextStep} role={role} />;
        case 2:
          return (
            <BasicInfoStep
              formData={formData}
              onChange={updateForm}
              onNext={nextStep}
              onPrev={prevStep}
            />
          );
        case 3:
          return (
            <LearningProfileStep
              formData={formData}
              onChange={updateForm}
              onNext={nextStep}
              onPrev={prevStep}
            />
          );
        case 4:
          return (
            <LearningPreferencesStep
              formData={formData}
              onChange={updateForm}
              onNext={nextStep}
              onPrev={prevStep}
            />
          );
        case 5:
          return (
            <SocialStep
              formData={formData}
              onChange={updateForm}
              onNext={nextStep}
              onPrev={prevStep}
            />
          );
        case 6:
          return <StudentFinishStep onComplete={completeOnboarding} name={formData.full_name} />;
        default:
          return null;
      }
    } else {
      switch (currentStep) {
        case 1:
          return <WelcomeStep onNext={nextStep} role={role} />;
        case 2:
          return (
            <BasicInfoStep
              formData={formData}
              onChange={updateForm}
              onNext={nextStep}
              onPrev={prevStep}
            />
          );
        case 6:
          return <StudentFinishStep onComplete={completeOnboarding} name={formData.full_name} />;
        default:
          return (
            <div className="text-center py-20 text-gray-400">
              <h3 className="text-xl font-bold">Step {currentStep} (Instructor Onboarding Coming Soon)</h3>
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                >
                  Back
                </button>
                {currentStep < totalSteps && (
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl text-white font-bold"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          );
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl">
        <ProgressStepper currentStep={currentStep} totalSteps={totalSteps} labels={stepLabels} />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
