
import { create } from 'zustand';

interface CommandState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useCommandStore = create<CommandState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
