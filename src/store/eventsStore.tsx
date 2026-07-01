import { create } from 'zustand';
import type { Event, EventType, EventAudience, EventStatus } from '@/types';
import { eventsData } from '@/data/events';

interface EventsState {
  events: Event[];
  filteredEvents: Event[];
  selectedTypes: EventType[];
  selectedAudiences: EventAudience[];
  selectedStatus: EventStatus[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleType: (type: EventType) => void;
  toggleAudience: (audience: EventAudience) => void;
  toggleStatus: (status: EventStatus) => void;
  resetFilters: () => void;
  applyFilters: () => void;
}

export const useEventsStore = create<EventsState>((set, get) => ({
  events: eventsData,
  filteredEvents: eventsData,
  selectedTypes: [],
  selectedAudiences: [],
  selectedStatus: ['proximo', 'en_curso'],
  searchQuery: '',
  
  setSearchQuery: (searchQuery) => {
    set({ searchQuery });
    get().applyFilters();
  },
  
  toggleType: (type) => {
    const current = get().selectedTypes;
    const selectedTypes = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    set({ selectedTypes });
    get().applyFilters();
  },
  
  toggleAudience: (audience) => {
    const current = get().selectedAudiences;
    const selectedAudiences = current.includes(audience)
      ? current.filter(a => a !== audience)
      : [...current, audience];
    set({ selectedAudiences });
    get().applyFilters();
  },
  
  toggleStatus: (status) => {
    const current = get().selectedStatus;
    const selectedStatus = current.includes(status)
      ? current.filter(s => s !== status)
      : [...current, status];
    set({ selectedStatus });
    get().applyFilters();
  },
  
  resetFilters: () => {
    set({
      selectedTypes: [],
      selectedAudiences: [],
      selectedStatus: ['proximo', 'en_curso'],
      searchQuery: '',
    });
    get().applyFilters();
  },
  
  applyFilters: () => {
    const { events, selectedTypes, selectedAudiences, selectedStatus, searchQuery } = get();
    
    const filtered = events.filter(event => {
      // Filtro por tipo
      if (selectedTypes.length > 0 && !selectedTypes.includes(event.type)) return false;
      
      // Filtro por audiencia
      if (selectedAudiences.length > 0 && !event.audience.some(a => selectedAudiences.includes(a))) return false;
      
      // Filtro por estado
      if (selectedStatus.length > 0 && !selectedStatus.includes(event.status)) return false;
      
      // Filtro por búsqueda
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
    
    set({ filteredEvents: filtered });
  },
}));