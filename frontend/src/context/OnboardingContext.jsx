import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { setOnboardingCompleted } from '../slices/profileSlice';

const initialState = {
  currentStep: 1,
  totalSteps: 6,
  role: 'student',
  formData: {},
  isLoading: false,
  isSaving: false,
  errors: {},
  isDraft: false,
};

function onboardingReducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload, totalSteps: action.payload === 'student' ? 6 : 6 };
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1 };
    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(1, state.currentStep - 1) };
    case 'UPDATE_FORM':
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_SAVING':
      return { ...state, isSaving: action.payload };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'RESET':
      return { ...initialState, role: state.role };
    default:
      return state;
  }
}

const OnboardingContext = createContext(undefined);

export function OnboardingProvider({ children, initialRole = 'student' }) {
  const [state, dispatch] = useReducer(onboardingReducer, { ...initialState, role: initialRole });
  const reduxDispatch = useReduxDispatch();

  const nextStep = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  const prevStep = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const updateForm = (data) => {
    dispatch({ type: 'UPDATE_FORM', payload: data });
  };

  const setStep = (step) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };

  const completeOnboarding = () => {
    reduxDispatch(setOnboardingCompleted(true));
    toast.success('Onboarding complete! Welcome aboard! 🎉');
  };

  return (
    <OnboardingContext.Provider
      value={{
        ...state,
        dispatch,
        nextStep,
        prevStep,
        updateForm,
        setStep,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error('useOnboarding must be used within OnboardingProvider');
  return context;
}
