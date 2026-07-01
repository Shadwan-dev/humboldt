'use client';

import { Project } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Building2, Target, ArrowRight, FlaskConical, Leaf, TreePine, Gauge } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

// ✅ Función que acepta string | undefined
function formatMonthYear(dateString: string | undefined): string {
  if (!dateString) return 'Fecha no disponible';
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long' 
  };
  return date.toLocaleDateString('es', options);
}

const typeIcons = {
  investigacion: FlaskConical,
  conservacion: Leaf,
  restauracion: TreePine,
  educacion: Target,
  monitoreo: Gauge,
};

const typeColors = {
  investigacion: "bg-purple-500",
  conservacion: "bg-green-500",
  restauracion: "bg-amber-500",
  educacion: "bg-blue-500",
  monitoreo: "bg-rose-500",
};

const typeLabels = {
  investigacion: "Investigación",
  conservacion: "Conservación",
  restauracion: "Restauración",
  educacion: "Educación",
  monitoreo: "Monitoreo",
};

const statusColors = {
  activo: "bg-emerald-500",
  finalizado: "bg-gray-500",
  en_planeacion: "bg-amber-500",
};

const researchAreaLabels: Record<string, string> = {
  carbono14: "Carbono 14",
  manglares: "Manglares",
  especies_amenazadas: "Especies Amenazadas",
  cambio_climatico: "Cambio Climático",
  biodiversidad: "Biodiversidad",
};

const researchAreaColors: Record<string, string> = {
  carbono14: "bg-amber-500",
  manglares: "bg-emerald-500",
  especies_amenazadas: "bg-rose-500",
  cambio_climatico: "bg-blue-500",
  biodiversidad: "bg-purple-500",
};

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const Icon = typeIcons[project.type as keyof typeof typeIcons] || FlaskConical;
  const startDate = new Date(project.startDate);
  const endDate = project.endDate ? new Date(project.endDate) : null;

  return (
    <Card className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300">
      <div className="relative h-56">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <Badge className={`${typeColors[project.type as keyof typeof typeColors]} text-white border-0 flex items-center gap-1`}>
            <Icon className="h-3 w-3" />
            {typeLabels[project.type as keyof typeof typeLabels]}
          </Badge>
          <Badge className={`${statusColors[project.status as keyof typeof statusColors]} text-white border-0`}>
            {project.status === 'activo' ? 'Activo' : 
             project.status === 'finalizado' ? 'Finalizado' : 'En planeación'}
          </Badge>
        </div>

        <div className="absolute bottom-3 left-3 text-white text-sm flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatMonthYear(project.startDate)}</span>
          </div>
          {endDate && (
            <>
              <span>-</span>
              <span>{formatMonthYear(project.endDate)}</span>
            </>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{project.title}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Building2 className="h-4 w-4" />
          <span className="line-clamp-1">{project.institution}</span>
        </div>

        {project.researchArea && project.researchArea.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {project.researchArea.map((area) => (
              <Badge
                key={area}
                variant="secondary"
                className={`${researchAreaColors[area]} text-white border-0 text-xs`}
              >
                {researchAreaLabels[area] || area}
              </Badge>
            ))}
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progreso</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {project.collaborators.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex -space-x-2">
              {project.collaborators.slice(0, 3).map((collab, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border-2 border-background"
                  title={collab}
                >
                  <span className="text-xs font-medium">
                    {collab.charAt(0)}
                  </span>
                </div>
              ))}
            </div>
            {project.collaborators.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{project.collaborators.length - 3}
              </span>
            )}
          </div>
        )}

        <Button 
          className="w-full group"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onClick(project);
          }}
        >
          Ver detalles del proyecto
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Card>
  );
}