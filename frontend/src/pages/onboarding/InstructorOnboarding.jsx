import React from 'react';
import { OnboardingProvider } from '../../context/OnboardingContext';
import OnboardingShell from '../../components/onboarding/OnboardingShell';

export default function InstructorOnboarding() {
  return (
    <OnboardingProvider initialRole="instructor">
      <OnboardingShell />
    </OnboardingProvider>
  );
}
