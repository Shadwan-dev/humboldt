import { create } from 'zustand';
import type { Project, ProjectType, ProjectStatus, ResearchArea } from '@/types';
import { projectsData } from '@/data/projects';

interface ProjectsState {
  projects: Project[];
  filteredProjects: Project[];
  selectedTypes: ProjectType[];
  selectedStatus: ProjectStatus[];
  selectedResearchAreas: ResearchArea[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleType: (type: ProjectType) => void;
  toggleStatus: (status: ProjectStatus) => void;
  toggleResearchArea: (area: ResearchArea) => void;
  resetFilters: () => void;
  applyFilters: () => void;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: projectsData,
  filteredProjects: projectsData,
  selectedTypes: [],
  selectedStatus: ['activo', 'en_planeacion'],
  selectedResearchAreas: [],
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
  
  toggleStatus: (status) => {
    const current = get().selectedStatus;
    const selectedStatus = current.includes(status)
      ? current.filter(s => s !== status)
      : [...current, status];
    set({ selectedStatus });
    get().applyFilters();
  },
  
  toggleResearchArea: (area) => {
    const current = get().selectedResearchAreas;
    const selectedResearchAreas = current.includes(area)
      ? current.filter(a => a !== area)
      : [...current, area];
    set({ selectedResearchAreas });
    get().applyFilters();
  },
  
  resetFilters: () => {
    set({
      selectedTypes: [],
      selectedStatus: ['activo', 'en_planeacion'],
      selectedResearchAreas: [],
      searchQuery: '',
    });
    get().applyFilters();
  },
  
  applyFilters: () => {
    const { projects, selectedTypes, selectedStatus, selectedResearchAreas, searchQuery } = get();
    
    const filtered = projects.filter(project => {
      if (selectedTypes.length > 0 && !selectedTypes.includes(project.type)) return false;
      if (selectedStatus.length > 0 && !selectedStatus.includes(project.status)) return false;
      if (selectedResearchAreas.length > 0 && 
          (!project.researchArea || !project.researchArea.some(area => selectedResearchAreas.includes(area)))) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.coordinator.toLowerCase().includes(query) ||
          project.institution.toLowerCase().includes(query) ||
          project.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      return true;
    });
    
    set({ filteredProjects: filtered });
  },
}));