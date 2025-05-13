
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCodexStore } from '../../store/codexStore';

const CodexPanel: React.FC = () => {
  const { closeCodex, activeEntry } = useCodexStore();
  
  return (
    <motion.div
      className="fixed top-0 right-0 h-full w-96 bg-theme-dark-800 border-l border-theme-dark-600 shadow-xl shadow-black/30 z-50 overflow-hidden"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-theme-dark-600">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-theme-purple-500 to-theme-blue-600 flex items-center justify-center mr-2">
              <span className="font-bold text-xs">C</span>
            </div>
            <h3 className="font-medium">Codex</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={closeCodex}>
            <X size={18} />
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {activeEntry ? (
            <>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-primary">{activeEntry.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {activeEntry.tags?.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-theme-dark-700 text-theme-blue-400 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{new Date(activeEntry.timestamp).toLocaleString()}</p>
              </div>
              
              <div className="prose prose-invert max-w-none prose-sm">
                {activeEntry.content}
              </div>
              
              {activeEntry.relatedEntities && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Related Entities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {activeEntry.relatedEntities.map(entity => (
                      <div 
                        key={entity.id}
                        className="p-2 bg-theme-dark-700/50 border border-theme-dark-600 rounded-md text-sm hover:bg-theme-dark-600 cursor-pointer transition-colors"
                      >
                        <div className="font-medium">{entity.name}</div>
                        <div className="text-xs text-muted-foreground">{entity.type}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <p>No codex entry selected</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CodexPanel;
