import { EventsSection } from '@/components/events/EventsSection';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'Eventos - Humboldt Atlas',
  description: 'Descubre y participa en los eventos del Parque Alejandro de Humboldt',
};

export default function EventosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      }>
        <EventsSection />
      </Suspense>
    </div>
  );
}