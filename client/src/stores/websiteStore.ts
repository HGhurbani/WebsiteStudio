import { create } from 'zustand';
import type { Website } from '@shared/schema';

interface WebsiteState {
  websites: Website[];
  currentWebsite: Website | null;
  setWebsites: (websites: Website[]) => void;
  setCurrentWebsite: (website: Website | null) => void;
  addWebsite: (website: Website) => void;
  updateWebsite: (id: number, website: Partial<Website>) => void;
  removeWebsite: (id: number) => void;
}

export const useWebsiteStore = create<WebsiteState>((set) => ({
  websites: [],
  currentWebsite: null,
  setWebsites: (websites) => set({ websites }),
  setCurrentWebsite: (website) => set({ currentWebsite: website }),
  addWebsite: (website) => set((state) => ({ 
    websites: [...state.websites, website] 
  })),
  updateWebsite: (id, websiteUpdate) => set((state) => ({
    websites: state.websites.map(w => w.id === id ? { ...w, ...websiteUpdate } : w),
    currentWebsite: state.currentWebsite?.id === id 
      ? { ...state.currentWebsite, ...websiteUpdate } 
      : state.currentWebsite
  })),
  removeWebsite: (id) => set((state) => ({
    websites: state.websites.filter(w => w.id !== id),
    currentWebsite: state.currentWebsite?.id === id ? null : state.currentWebsite
  }))
}));
