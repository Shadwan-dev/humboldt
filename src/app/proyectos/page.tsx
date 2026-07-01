import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'Proyectos - Humboldt Atlas',
  description: 'Descubre los proyectos de investigación del Parque Alejandro de Humboldt',
};

export default function ProyectosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      }>
        <ProjectsSection />
      </Suspense>
    </div>
  );
}