
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';
import EnhancedCommandPalette from '../command/EnhancedCommandPalette';
import { useCommandStore } from '../../store/commandStore';
import CodexPanel from '../codex/CodexPanel';
import { useCodexStore } from '../../store/codexStore';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isOpen } = useCommandStore();
  const { isCodexOpen } = useCodexStore();
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize app with loading effect
  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  return (
    <motion.div 
      className="flex h-screen w-full overflow-hidden bg-theme-dark-800 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <motion.main 
          className="flex-1 overflow-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ 
            duration: 0.5,
            delay: 0.3,
            ease: "easeOut"
          }}
        >
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </motion.main>
      </div>
      <AnimatePresence mode="wait">
        {isCodexOpen && (
          <motion.div
            key="codex"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="relative z-20"
          >
            <CodexPanel />
          </motion.div>
        )}
      </AnimatePresence>
      {isOpen && <EnhancedCommandPalette />}
    </motion.div>
  );
};

export default AppLayout;
