import { create } from 'zustand';

export type SpeciesStatus = 'endémica' | 'migratoria' | 'nativa';
export type SpeciesType = 'fauna' | 'flora';

interface FiltersState {
  type: SpeciesType | 'all';
  status: SpeciesStatus | 'all';
  searchQuery: string;
  setType: (type: SpeciesType | 'all') => void;
  setStatus: (status: SpeciesStatus | 'all') => void;
  setSearchQuery: (query: string) => void;
  reset: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  type: 'all',
  status: 'all',
  searchQuery: '',
  setType: (type) => set({ type }),
  setStatus: (status) => set({ status }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  reset: () => set({ type: 'all', status: 'all', searchQuery: '' }),
}));