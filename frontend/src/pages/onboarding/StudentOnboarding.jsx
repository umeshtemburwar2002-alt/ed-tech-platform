import React from 'react';
import { OnboardingProvider } from '../../context/OnboardingContext';
import OnboardingShell from '../../components/onboarding/OnboardingShell';

export default function StudentOnboarding() {
  return (
    <OnboardingProvider initialRole="student">
      <OnboardingShell />
    </OnboardingProvider>
  );
}
