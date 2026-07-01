import { create } from 'zustand';
import type { Event, EventType, EventAudience, EventStatus } from '@/types';

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
  applyFilters: (events: Event[]) => void;
  setEvents: (events: Event[]) => void;
}

export const useEventsStore = create<EventsState>((set, get) => ({
  events: [],
  filteredEvents: [],
  selectedTypes: [],
  selectedAudiences: [],
  selectedStatus: ['proximo', 'en_curso'],
  searchQuery: '',
  
  setSearchQuery: (searchQuery) => {
    set({ searchQuery });
    get().applyFilters(get().events);
  },
  
  toggleType: (type) => {
    const current = get().selectedTypes;
    const selectedTypes = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    set({ selectedTypes });
    get().applyFilters(get().events);
  },
  
  toggleAudience: (audience) => {
    const current = get().selectedAudiences;
    const selectedAudiences = current.includes(audience)
      ? current.filter(a => a !== audience)
      : [...current, audience];
    set({ selectedAudiences });
    get().applyFilters(get().events);
  },
  
  toggleStatus: (status) => {
    const current = get().selectedStatus;
    const selectedStatus = current.includes(status)
      ? current.filter(s => s !== status)
      : [...current, status];
    set({ selectedStatus });
    get().applyFilters(get().events);
  },
  
  resetFilters: () => {
    set({
      selectedTypes: [],
      selectedAudiences: [],
      selectedStatus: ['proximo', 'en_curso'],
      searchQuery: '',
    });
    get().applyFilters(get().events);
  },
  
  applyFilters: (events) => {
    const { selectedTypes, selectedAudiences, selectedStatus, searchQuery } = get();
    
    const filtered = events.filter(event => {
      // Solo mostrar eventos aprobados
      if (event.approvalStatus !== 'approved') return false;
      
      if (selectedTypes.length > 0 && !selectedTypes.includes(event.type)) return false;
      if (selectedAudiences.length > 0 && !event.audience.some(a => selectedAudiences.includes(a))) return false;
      if (selectedStatus.length > 0 && !selectedStatus.includes(event.status)) return false;
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
  
  setEvents: (events) => {
    set({ events });
    get().applyFilters(events);
  },
}));