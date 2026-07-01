'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import type { Event } from "@/types";

interface EventModalProps {
  event: Event | null;
  onClose: () => void;
}

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  return date.toLocaleDateString('es', options);
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

const audienceLabels: Record<string, string> = {
  niños: "👶 Niños",
  jovenes: "🧑 Jóvenes",
  adultos: "👨 Adultos",
  comunidad: "🏘️ Comunidad",
  familiar: "👪 Familiar",
};

export function EventModal({ event, onClose }: EventModalProps) {
  if (!event) return null;

  const eventDate = new Date(event.date);
  const endDate = event.endDate ? new Date(event.endDate) : null;
  const availableSpots = event.capacity - event.registered;
  const isFull = availableSpots === 0;
  const isPast = new Date(event.endDate || event.date) < new Date();
  const isPending = event.approvalStatus === 'pending';

  return (
    <Dialog open={!!event} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="relative h-56 -mt-6 -mx-6 mb-6">
          <img
            src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format'}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
            <Badge className={`${typeColors[event.type]} text-white border-0 px-3 py-1`}>
              {typeLabels[event.type]}
            </Badge>
            {isPending && (
              <Badge className="bg-yellow-500 text-white border-0 px-3 py-1">
                ⏳ Pendiente
              </Badge>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                {event.title}
              </DialogTitle>
            </DialogHeader>
          </div>
        </div>

        <div className="space-y-6">
          {/* Estado y disponibilidad */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {event.status === 'proximo' && !isPending && (
                <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Próximo
                </Badge>
              )}
              {event.status === 'en_curso' && !isPending && (
                <Badge variant="outline" className="text-amber-600 border-amber-600">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  En curso
                </Badge>
              )}
              {event.status === 'finalizado' && !isPending && (
                <Badge variant="outline" className="text-gray-600 border-gray-600">
                  <XCircle className="h-3 w-3 mr-1" />
                  Finalizado
                </Badge>
              )}
              {event.status === 'cancelado' && !isPending && (
                <Badge variant="outline" className="text-rose-600 border-rose-600">
                  <XCircle className="h-3 w-3 mr-1" />
                  Cancelado
                </Badge>
              )}
              {isPending && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  <Clock className="h-3 w-3 mr-1" />
                  Pendiente de aprobación
                </Badge>
              )}
            </div>
            
            {event.status === 'proximo' && !isPending && (
              <div className="text-right">
                <p className={`text-sm font-medium ${isFull ? 'text-rose-600' : 'text-green-600'}`}>
                  {isFull ? 'Completo' : `${availableSpots} lugares disponibles`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {event.registered} de {event.capacity} inscritos
                </p>
              </div>
            )}
          </div>

          {/* Detalles principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Fecha</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(eventDate)}
                  {endDate && (
                    <> - {formatDate(endDate)}</>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Horario</p>
                <p className="text-sm text-muted-foreground">{event.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Ubicación</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Organiza</p>
                <p className="text-sm text-muted-foreground">{event.organizer}</p>
              </div>
            </div>
          </div>

          {/* Audiencia */}
          <div>
            <h4 className="font-medium mb-2">Dirigido a</h4>
            <div className="flex flex-wrap gap-2">
              {event.audience.map((aud) => (
                <Badge key={aud} variant="secondary">
                  {audienceLabels[aud] || aud}
                </Badge>
              ))}
            </div>
          </div>

          {/* Descripción */}
          <div>
            <h4 className="font-medium mb-2">Descripción</h4>
            <p className="text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Requisitos */}
          {event.requirements && event.requirements.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Requisitos / Qué llevar</h4>
              <ul className="list-disc list-inside space-y-1">
                {event.requirements.map((req, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contacto */}
          {(event.contactEmail || event.contactPhone) && (
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Contacto para inscripciones</h4>
              <div className="space-y-2">
                {event.contactEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`mailto:${event.contactEmail}`}
                      className="text-primary hover:underline"
                    >
                      {event.contactEmail}
                    </a>
                  </div>
                )}
                {event.contactPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`tel:${event.contactPhone}`}
                      className="text-primary hover:underline"
                    >
                      {event.contactPhone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {event.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Botón de inscripción */}
          {event.status === 'proximo' && !isPast && !isPending && (
            <Button className="w-full" size="lg" disabled={isFull}>
              {isFull ? 'Lista de espera' : 'Inscribirme ahora'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}