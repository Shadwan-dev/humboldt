'use client';

import { useState } from "react";
import { useProjectsStore } from "@/store/projectsStore";
import { Project } from "@/types";
import { ProjectCard } from "./ProjectsCard";
import { ProjectModal } from "./ProjectModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FlaskConical, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const {
    filteredProjects,
    searchQuery,
    setSearchQuery,
    selectedTypes,
    selectedResearchAreas,
    toggleType,
    toggleResearchArea,
    resetFilters
  } = useProjectsStore();

  const researchAreas = [
    { value: 'carbono14', label: 'Carbono 14', color: 'bg-amber-500' },
    { value: 'manglares', label: 'Manglares', color: 'bg-emerald-500' },
    { value: 'especies_amenazadas', label: 'Especies Amenazadas', color: 'bg-rose-500' },
    { value: 'cambio_climatico', label: 'Cambio Climático', color: 'bg-blue-500' },
    { value: 'biodiversidad', label: 'Biodiversidad', color: 'bg-purple-500' },
  ];

  const projectTypes = [
    { value: 'investigacion', label: 'Investigación', icon: '🔬' },
    { value: 'conservacion', label: 'Conservación', icon: '🌿' },
    { value: 'restauracion', label: 'Restauración', icon: '🌱' },
    { value: 'educacion', label: 'Educación', icon: '📚' },
    { value: 'monitoreo', label: 'Monitoreo', icon: '📊' },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
            <FlaskConical className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-600 to-green-600 bg-clip-text text-transparent">
              Proyectos Científicos
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Investigaciones y acciones para comprender y proteger nuestros ecosistemas
          </p>
        </div>

        {/* Filtros */}
        <div className="max-w-6xl mx-auto mb-8 space-y-4">
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar proyectos..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filtros por tipo y área */}
          <div className="flex flex-wrap gap-4">
            <Select
              value={selectedTypes[0] || ''}
              onValueChange={(value) => toggleType(value as any)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de proyecto" />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedResearchAreas[0] || ''}
              onValueChange={(value) => toggleResearchArea(value as any)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Área de investigación" />
              </SelectTrigger>
              <SelectContent>
                {researchAreas.map((area) => (
                  <SelectItem key={area.value} value={area.value}>
                    {area.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(selectedTypes.length > 0 || selectedResearchAreas.length > 0 || searchQuery) && (
              <Button variant="ghost" onClick={resetFilters} className="gap-2">
                <X className="h-4 w-4" />
                Limpiar filtros
              </Button>
            )}
          </div>

          {/* Badges de áreas activas */}
          {selectedResearchAreas.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedResearchAreas.map((area) => {
                const areaInfo = researchAreas.find(a => a.value === area);
                return (
                  <Badge
                    key={area}
                    className={`${areaInfo?.color} text-white cursor-pointer`}
                    onClick={() => toggleResearchArea(area)}
                  >
                    {areaInfo?.label}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                );
              })}
            </div>
          )}
        </div>

        {/* Grid de proyectos */}
        <div className="max-w-6xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <FlaskConical className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">
                No hay proyectos que coincidan con los filtros.
              </p>
              <Button variant="link" onClick={resetFilters}>
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'proyecto activo' : 'proyectos activos'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={setSelectedProject}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal de proyecto */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}