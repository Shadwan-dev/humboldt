import { useState } from "react";
import { EventCard } from "./EventCard";
import { EventModal } from "./EventModal";
import { useEventsStore } from "@/store/eventsStore";
import { Event } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar as CalendarIcon, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { 
    filteredEvents, 
    searchQuery, 
    setSearchQuery,
    selectedTypes,
    toggleType,
    resetFilters 
  } = useEventsStore();

  const eventTypes = [
    { value: 'taller', label: 'Talleres' },
    { value: 'circulo_interes', label: 'Círculos de Interés' },
    { value: 'charla', label: 'Charlas' },
    { value: 'excursion', label: 'Excursiones' },
    { value: 'voluntariado', label: 'Voluntariado' },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Eventos y Actividades
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Únete a nuestras actividades comunitarias y círculos de interés para aprender 
            y participar en la conservación de nuestra biodiversidad.
          </p>
        </div>

        {/* Filtros */}
        <div className="max-w-6xl mx-auto mb-8 space-y-4">
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar eventos..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filtros por tipo */}
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
                  data-state={selectedTypes.includes(type.value as any) ? "active" : "inactive"}
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
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">
                No hay eventos que coincidan con los filtros.
              </p>
              <Button variant="link" onClick={resetFilters}>
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <>
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
            </>
          )}
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