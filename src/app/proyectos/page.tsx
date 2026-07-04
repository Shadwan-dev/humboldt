'use client';

import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { useState, useEffect } from 'react';

export default function ProyectosPage() {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      console.log('✅ Página de proyectos cargada');
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err as Error);
    }
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Error al cargar proyectos</h1>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Proyectos de Investigación</h1>
      <ProjectsSection />
    </div>
  );
}