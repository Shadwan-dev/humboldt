'use client';

import { Project } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Building2,
  Users,
  Target,
  Award,
  BookOpen,
  MapPin,
  ExternalLink,
  FlaskConical,
  Leaf,
  TreePine,
  Gauge,
} from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

// ✅ Función para formatear fechas sin date-fns (acepta undefined)
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('es', options);
}

// ✅ Función que acepta undefined y devuelve string
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

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const Icon = typeIcons[project.type as keyof typeof typeIcons] || FlaskConical;
  const startDate = new Date(project.startDate);
  const endDate = project.endDate ? new Date(project.endDate) : null;

  return (
    <Dialog open={!!project} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header con imagen */}
        <div className="relative h-64 -mt-6 -mx-6 mb-6">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
            <Badge className={`${typeColors[project.type as keyof typeof typeColors]} text-white border-0 flex items-center gap-1 px-3 py-1`}>
              <Icon className="h-4 w-4" />
              {typeLabels[project.type as keyof typeof typeLabels]}
            </Badge>
            <Badge className={`${
              project.status === 'activo' ? 'bg-emerald-500' :
              project.status === 'finalizado' ? 'bg-gray-500' : 'bg-amber-500'
            } text-white border-0 px-3 py-1`}>
              {project.status === 'activo' ? 'Activo' : 
               project.status === 'finalizado' ? 'Finalizado' : 'En planeación'}
            </Badge>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-white mb-2">
                {project.title}
              </DialogTitle>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatMonthYear(project.startDate)}
                    {project.endDate && ` - ${formatMonthYear(project.endDate)}`}
                  </span>
                </div>
              </div>
            </DialogHeader>
          </div>
        </div>

        {/* Contenido con tabs */}
        <Tabs defaultValue="info" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Información</TabsTrigger>
            <TabsTrigger value="objetivos">Objetivos</TabsTrigger>
            <TabsTrigger value="equipo">Equipo</TabsTrigger>
            <TabsTrigger value="publicaciones">Publicaciones</TabsTrigger>
          </TabsList>

          {/* Tab Información */}
          <TabsContent value="info" className="space-y-4 mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Building2 className="h-4 w-4" />
                  <span>Institución líder</span>
                </div>
                <p className="font-medium">{project.institution}</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Users className="h-4 w-4" />
                  <span>Coordinador</span>
                </div>
                <p className="font-medium">{project.coordinator}</p>
              </div>
            </div>

            {project.researchArea && project.researchArea.length > 0 && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Áreas de investigación</h4>
                <div className="flex flex-wrap gap-2">
                  {project.researchArea.map((area) => (
                    <Badge
                      key={area}
                      className={`${researchAreaColors[area]} text-white border-0`}
                    >
                      {researchAreaLabels[area] || area}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Descripción</h4>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            {project.funding && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Financiamiento</h4>
                <p className="text-muted-foreground">{project.funding}</p>
              </div>
            )}

            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold">Progreso del proyecto</h4>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          </TabsContent>

          {/* Tab Objetivos y Logros */}
          <TabsContent value="objetivos" className="space-y-4 mt-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Objetivos del proyecto
              </h4>
              <ul className="space-y-2">
                {project.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-muted-foreground">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.achievements && project.achievements.length > 0 && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Logros alcanzados
                </h4>
                <ul className="space-y-2">
                  {project.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">✓</span>
                      <span className="text-muted-foreground">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>

          {/* Tab Equipo */}
          <TabsContent value="equipo" className="space-y-4 mt-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Equipo y colaboradores
              </h4>
              <div className="space-y-3">
                {project.collaborators.map((collaborator, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-background rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">
                        {collaborator.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{collaborator}</p>
                      <p className="text-xs text-muted-foreground">Institución colaboradora</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Tab Publicaciones */}
          <TabsContent value="publicaciones" className="space-y-4 mt-4">
            {project.publications && project.publications.length > 0 ? (
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Publicaciones científicas
                </h4>
                <div className="space-y-3">
                  {project.publications.map((pub, index) => (
                    <div key={index} className="p-3 bg-background rounded-lg">
                      <p className="font-medium">{pub.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <span>Año: {pub.year}</span>
                        {pub.url && (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Ver publicación
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No hay publicaciones registradas aún.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}