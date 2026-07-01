'use client';

import { useState, useEffect } from 'react';
import { EventCard } from "./EventCard";
import { EventModal } from "./EventModal";
import { useEventsStore } from "@/store/eventsStore";
import { useFirestore } from "@/hooks/useFirestore";
import { Event } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { 
    filteredEvents, 
    searchQuery, 
    setSearchQuery,
    selectedTypes,
    toggleType,
    resetFilters,
    setEvents
  } = useEventsStore();

  const { data: eventosFirebase, loading, error } = useFirestore<Event>('eventos');

  // Cuando los datos cambian, actualizar el store
  useEffect(() => {
    if (eventosFirebase) {
      const approvedEvents = eventosFirebase
        .filter(e => e.approvalStatus === 'approved')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setEvents(approvedEvents);
    } else {
      // ✅ Si no hay datos, limpiar el store
      setEvents([]);
    }
  }, [eventosFirebase, setEvents]);

  const eventTypes = [
    { value: 'taller', label: 'Talleres' },
    { value: 'circulo_interes', label: 'Círculos de Interés' },
    { value: 'charla', label: 'Charlas' },
    { value: 'excursion', label: 'Excursiones' },
    { value: 'voluntariado', label: 'Voluntariado' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <p className="text-muted-foreground">Cargando eventos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error al cargar eventos: {error.message}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </Button>
      </div>
    );
  }

  // ✅ Si no hay eventos (la colección está vacía o no hay aprobados)
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className="text-center py-16">
        <CalendarIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No hay eventos disponibles</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Los eventos aparecerán aquí cuando sean creados y aprobados por el administrador.
        </p>
        <Button variant="outline" className="mt-4" asChild>
          <a href="/investigador/nuevo-evento">Crear un evento</a>
        </Button>
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">📅 Eventos Comunitarios</h1>
        <p className="text-muted-foreground mt-2">
          Descubre y participa en las actividades del Parque Alejandro de Humboldt
        </p>
      </div>

      {/* Filtros */}
      <div className="max-w-6xl mx-auto mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar eventos..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="flex flex-wrap h-auto p-1">
            <TabsTrigger 
              value="todos" 
              onClick={() => resetFilters()}
              className="flex-1"
            >
              Todos
            </TabsTrigger>
            {eventTypes.map((type) => (
              <TabsTrigger
                key={type.value}
                value={type.value}
                onClick={() => toggleType(type.value as any)}
                className="flex-1"
              >
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Grid de eventos */}
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-muted-foreground mb-4">
          {filteredEvents.length} {filteredEvents.length === 1 ? 'evento encontrado' : 'eventos encontrados'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={setSelectedEvent}
            />
          ))}
        </div>
      </div>

      {/* Modal de evento */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
}