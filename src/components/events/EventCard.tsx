'use client';

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import type { Event, EventType, EventStatus } from "@/types";

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

// Función auxiliar para formatear fechas sin date-fns
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  };
  return date.toLocaleDateString('es', options);
}

function formatDateRange(startDate: string, endDate?: string): string {
  if (!endDate) return formatDate(startDate);
  const start = new Date(startDate);
  const end = new Date(endDate);
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long' 
  };
  return `${formatDate(startDate)} - ${end.toLocaleDateString('es', options)}`;
}

// ✅ Definir los objetos con sus tipos explícitos
const typeColors: Record<EventType, string> = {
  taller: "bg-blue-500",
  circulo_interes: "bg-green-500",
  charla: "bg-purple-500",
  excursion: "bg-amber-500",
  voluntariado: "bg-rose-500",
};

const typeLabels: Record<EventType, string> = {
  taller: "Taller",
  circulo_interes: "Círculo de Interés",
  charla: "Charla",
  excursion: "Excursión",
  voluntariado: "Voluntariado",
};

const statusColors: Record<EventStatus, string> = {
  proximo: "bg-emerald-500",
  en_curso: "bg-amber-500",
  finalizado: "bg-gray-500",
  cancelado: "bg-red-500",
};

export function EventCard({ event, onClick }: EventCardProps) {
  const eventDate = new Date(event.date);
  const isMultiDay = event.endDate;
  const availableSpots = event.capacity - event.registered;
  const isFull = availableSpots === 0;

  return (
    <Card className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300">
      <div className="relative h-48">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <Badge className={`${typeColors[event.type]} text-white border-0`}>
            {typeLabels[event.type]}
          </Badge>
          <Badge className={`${statusColors[event.status]} text-white border-0`}>
            {event.status === 'proximo' ? 'Próximo' : 
             event.status === 'en_curso' ? 'En curso' : 
             event.status === 'finalizado' ? 'Finalizado' : 'Cancelado'}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>
              {isMultiDay 
                ? formatDateRange(event.date, event.endDate)
                : formatDate(event.date)
              }
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 shrink-0" />
            <span>
              {event.registered} / {event.capacity} inscritos
              {!isFull && availableSpots > 0 && ` (${availableSpots} disponibles)`}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {event.audience.map((aud) => (
            <Badge key={aud} variant="secondary" className="text-xs">
              {aud === 'niños' ? '👶 Niños' :
               aud === 'jovenes' ? '🧑 Jóvenes' :
               aud === 'adultos' ? '👨 Adultos' :
               aud === 'comunidad' ? '🏘️ Comunidad' : '👪 Familiar'}
            </Badge>
          ))}
        </div>

        <Button 
          className="w-full"
          variant={isFull ? "outline" : "default"}
          disabled={isFull || event.status !== 'proximo'}
          onClick={(e) => {
            e.stopPropagation();
            onClick(event);
          }}
        >
          {isFull ? 'Completo' : 'Ver detalles'}
        </Button>
      </div>
    </Card>
  );
}