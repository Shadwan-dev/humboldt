import { FilterBar } from '@/components/filters/FilterBar';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'Especies - Humboldt Atlas',
  description: 'Explora la biodiversidad del Parque Nacional Alejandro de Humboldt',
};

export default function EspeciesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">🌿 Especies del Parque</h1>
        <p className="text-muted-foreground mt-2">
          Descubre la increíble biodiversidad del Parque Alejandro de Humboldt
        </p>
      </div>
      
      <FilterBar />
      
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      }>
        <GalleryGrid />
      </Suspense>
    </div>
  );
}