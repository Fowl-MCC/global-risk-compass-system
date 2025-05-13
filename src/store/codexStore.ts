
import { create } from 'zustand';

interface Entity {
  id: string;
  name: string;
  type: string;
}

export interface CodexEntry {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  tags?: string[];
  relatedEntities?: Entity[];
}

interface CodexState {
  isCodexOpen: boolean;
  activeEntry: CodexEntry | null;
  entries: CodexEntry[];
  openCodex: (entryId?: string) => void;
  closeCodex: () => void;
  setActiveEntry: (entryId: string) => void;
}

export const useCodexStore = create<CodexState>((set, get) => ({
  isCodexOpen: false,
  activeEntry: null,
  entries: [
    {
      id: '1',
      title: 'Taiwan Semiconductor Risk Analysis',
      content: 'Recent flooding in Taiwan has affected TSMC production capacity by an estimated 12%. This is likely to impact global semiconductor supply chains within the next 30-45 days. Historical patterns suggest price increases of 8-15% for consumer electronics containing affected components.',
      timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2,
      tags: ['semiconductors', 'supply-chain', 'taiwan', 'natural-disaster'],
      relatedEntities: [
        { id: 'tsmc', name: 'TSMC', type: 'Company' },
        { id: 'amd', name: 'AMD', type: 'Company' },
        { id: 'apple', name: 'Apple', type: 'Company' },
        { id: 'electronics', name: 'Electronics', type: 'Sector' }
      ]
    },
    {
      id: '2',
      title: 'Russian Energy Sanctions Impact',
      content: 'New sanctions against Russia\'s energy sector are expected to reduce European natural gas supply by approximately 18%. Based on historical data, energy prices in affected regions may increase by 25-40% over the next quarter.',
      timestamp: Date.now() - 1000 * 60 * 60 * 24 * 5,
      tags: ['energy', 'sanctions', 'russia', 'geopolitical'],
      relatedEntities: [
        { id: 'gazprom', name: 'Gazprom', type: 'Company' },
        { id: 'energy', name: 'Energy', type: 'Sector' },
        { id: 'russia', name: 'Russia', type: 'Country' },
        { id: 'europe', name: 'Europe', type: 'Region' }
      ]
    }
  ],
  openCodex: (entryId) => {
    const { entries } = get();
    
    if (entryId) {
      const entry = entries.find(e => e.id === entryId);
      set({ isCodexOpen: true, activeEntry: entry || null });
    } else {
      set({ isCodexOpen: true });
    }
  },
  closeCodex: () => set({ isCodexOpen: false }),
  setActiveEntry: (entryId) => {
    const { entries } = get();
    const entry = entries.find(e => e.id === entryId);
    set({ activeEntry: entry || null });
  },
}));
