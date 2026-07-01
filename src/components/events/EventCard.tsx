'use client';

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, CheckCircle } from "lucide-react";
import type { Event } from "@/types";

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

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
  const end = new Date(endDate);
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long' 
  };
  return `${formatDate(startDate)} - ${end.toLocaleDateString('es', options)}`;
}

const typeColors: Record<string, string> = {
  taller: "bg-blue-500",
  circulo_interes: "bg-green-500",
  charla: "bg-purple-500",
  excursion: "bg-amber-500",
  voluntariado: "bg-rose-500",
};

const typeLabels: Record<string, string> = {
  taller: "Taller",
  circulo_interes: "Círculo de Interés",
  charla: "Charla",
  excursion: "Excursión",
  voluntariado: "Voluntariado",
};

const statusColors: Record<string, string> = {
  proximo: "bg-emerald-500",
  en_curso: "bg-amber-500",
  finalizado: "bg-gray-500",
  cancelado: "bg-red-500",
};

export function EventCard({ event, onClick }: EventCardProps) {
  const availableSpots = event.capacity - event.registered;
  const isFull = availableSpots === 0;
  const isPending = event.approvalStatus === 'pending';
  const isRejected = event.approvalStatus === 'rejected';
  const isApproved = event.approvalStatus === 'approved';

  if (isRejected) return null;

  return (
    <Card className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300">
      <div className="relative h-48">
        <img
          src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <Badge className={`${typeColors[event.type] || 'bg-gray-500'} text-white border-0`}>
            {typeLabels[event.type] || event.type}
          </Badge>
          {isPending && (
            <Badge className="bg-yellow-500 text-white border-0">
              <Clock className="h-3 w-3 mr-1" />
              Pendiente
            </Badge>
          )}
          {isApproved && (
            <Badge className={`${statusColors[event.status] || 'bg-gray-500'} text-white border-0`}>
              {event.status === 'proximo' ? 'Próximo' : 
               event.status === 'en_curso' ? 'En curso' : 
               event.status === 'finalizado' ? 'Finalizado' : 'Cancelado'}
            </Badge>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>
              {event.endDate 
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

        <Button 
          className="w-full"
          variant={isFull || isPending ? "outline" : "default"}
          disabled={isFull || isPending || event.status !== 'proximo'}
          onClick={(e) => {
            e.stopPropagation();
            onClick(event);
          }}
        >
          {isPending ? '⏳ Pendiente de aprobación' :
           isFull ? 'Completo' : 'Ver detalles'}
        </Button>
      </div>
    </Card>
  );
}