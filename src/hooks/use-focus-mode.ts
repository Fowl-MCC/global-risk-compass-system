
import { useState, useEffect } from 'react';
import { create } from 'zustand';

type FocusMode = 'off' | 'minimal' | 'hyperfocus';

interface FocusModeState {
  focusMode: FocusMode;
  setFocusMode: (mode: FocusMode) => void;
  toggleFocusMode: () => void;
}

export const useFocusModeStore = create<FocusModeState>((set) => ({
  focusMode: 'off',
  setFocusMode: (mode) => set({ focusMode: mode }),
  toggleFocusMode: () => set((state) => ({ 
    focusMode: state.focusMode === 'off' 
      ? 'minimal' 
      : state.focusMode === 'minimal' 
        ? 'hyperfocus' 
        : 'off' 
  })),
}));

export const useFocusMode = () => {
  const store = useFocusModeStore();
  
  useEffect(() => {
    // Add class to body for global styling
    document.body.classList.toggle('focus-mode-active', store.focusMode !== 'off');
    document.body.classList.toggle('focus-mode-minimal', store.focusMode === 'minimal');
    document.body.classList.toggle('focus-mode-hyperfocus', store.focusMode === 'hyperfocus');
    
    return () => {
      // Clean up effect
      document.body.classList.remove('focus-mode-active', 'focus-mode-minimal', 'focus-mode-hyperfocus');
    };
  }, [store.focusMode]);
  
  return store;
};
