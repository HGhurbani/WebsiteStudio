import { create } from 'zustand';
import type { Page } from '@shared/schema';
import type { PageSection } from '@/types';

interface PageState {
  pages: Page[];
  currentPage: Page | null;
  selectedSection: PageSection | null;
  isEditMode: boolean;
  setPages: (pages: Page[]) => void;
  setCurrentPage: (page: Page | null) => void;
  setSelectedSection: (section: PageSection | null) => void;
  setEditMode: (isEdit: boolean) => void;
  addPage: (page: Page) => void;
  updatePage: (id: number, page: Partial<Page>) => void;
  removePage: (id: number) => void;
  addSection: (section: PageSection) => void;
  updateSection: (sectionId: string, content: any) => void;
  removeSection: (sectionId: string) => void;
  reorderSections: (sections: PageSection[]) => void;
}

export const usePageStore = create<PageState>((set, get) => ({
  pages: [],
  currentPage: null,
  selectedSection: null,
  isEditMode: true,
  setPages: (pages) => set({ pages }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedSection: (section) => set({ selectedSection: section }),
  setEditMode: (isEdit) => set({ isEditMode: isEdit }),
  addPage: (page) => set((state) => ({ 
    pages: [...state.pages, page] 
  })),
  updatePage: (id, pageUpdate) => set((state) => ({
    pages: state.pages.map(p => p.id === id ? { ...p, ...pageUpdate } : p),
    currentPage: state.currentPage?.id === id 
      ? { ...state.currentPage, ...pageUpdate } 
      : state.currentPage
  })),
  removePage: (id) => set((state) => ({
    pages: state.pages.filter(p => p.id !== id),
    currentPage: state.currentPage?.id === id ? null : state.currentPage
  })),
  addSection: (section) => set((state) => {
    if (!state.currentPage) return state;
    const updatedSections = [...state.currentPage.sections, section];
    const updatedPage = { ...state.currentPage, sections: updatedSections };
    return {
      currentPage: updatedPage,
      pages: state.pages.map(p => p.id === updatedPage.id ? updatedPage : p)
    };
  }),
  updateSection: (sectionId, content) => set((state) => {
    if (!state.currentPage) return state;
    const updatedSections = state.currentPage.sections.map(section =>
      section.id === sectionId ? { ...section, content: { ...section.content, ...content } } : section
    );
    const updatedPage = { ...state.currentPage, sections: updatedSections };
    return {
      currentPage: updatedPage,
      pages: state.pages.map(p => p.id === updatedPage.id ? updatedPage : p),
      selectedSection: state.selectedSection?.id === sectionId 
        ? { ...state.selectedSection, content: { ...state.selectedSection.content, ...content } }
        : state.selectedSection
    };
  }),
  removeSection: (sectionId) => set((state) => {
    if (!state.currentPage) return state;
    const updatedSections = state.currentPage.sections.filter(section => section.id !== sectionId);
    const updatedPage = { ...state.currentPage, sections: updatedSections };
    return {
      currentPage: updatedPage,
      pages: state.pages.map(p => p.id === updatedPage.id ? updatedPage : p),
      selectedSection: state.selectedSection?.id === sectionId ? null : state.selectedSection
    };
  }),
  reorderSections: (sections) => set((state) => {
    if (!state.currentPage) return state;
    const updatedPage = { ...state.currentPage, sections };
    return {
      currentPage: updatedPage,
      pages: state.pages.map(p => p.id === updatedPage.id ? updatedPage : p)
    };
  })
}));
