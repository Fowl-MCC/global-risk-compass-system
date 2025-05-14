
import { useState, useEffect } from 'react';

export type FocusModeLevel = 'off' | 'minimal' | 'hyperfocus';

export function useFocusMode() {
  const [focusMode, setFocusMode] = useState<FocusModeLevel>('off');
  
  // Apply focus mode classes to the document body
  useEffect(() => {
    document.body.classList.remove('focus-mode-minimal', 'focus-mode-hyperfocus');
    
    if (focusMode === 'minimal') {
      document.body.classList.add('focus-mode-minimal');
    } else if (focusMode === 'hyperfocus') {
      document.body.classList.add('focus-mode-hyperfocus');
    }
    
    return () => {
      document.body.classList.remove('focus-mode-minimal', 'focus-mode-hyperfocus');
    };
  }, [focusMode]);
  
  // Toggle between focus mode levels
  const toggleFocusMode = () => {
    setFocusMode(current => {
      if (current === 'off') return 'minimal';
      if (current === 'minimal') return 'hyperfocus';
      return 'off';
    });
  };
  
  // Set a specific focus mode
  const setFocusModeLevel = (level: FocusModeLevel) => {
    setFocusMode(level);
  };
  
  return { 
    focusMode, 
    toggleFocusMode, 
    setFocusMode: setFocusModeLevel,
    isFocused: focusMode !== 'off'
  };
}
