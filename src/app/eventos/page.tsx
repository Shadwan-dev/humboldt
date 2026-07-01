'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, ArrowLeft, User, Mail, Phone } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import type { Event } from '@/types';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  return date.toLocaleDateString('es', options);
}

export default function EventoDetallePage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const docRef = doc(db, 'eventos', params.id as string);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data() as Event;
          if (data.approvalStatus === 'approved') {
            setEvent({ ...data, id: docSnap.id });
          } else {
            setError('Este evento no está disponible');
          }
        } else {
          setError('Evento no encontrado');
        }
      } catch (err) {
        console.error('Error loading event:', err);
        setError('Error al cargar el evento');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadEvent();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">{error || 'Evento no encontrado'}</h1>
        <Button asChild>
          <Link href="/eventos">Volver a Eventos</Link>
        </Button>
      </div>
    );
  }

  const typeLabels: Record<string, string> = {
    taller: "Taller",
    circulo_interes: "Círculo de Interés",
    charla: "Charla",
    excursion: "Excursión",
    voluntariado: "Voluntariado",
  };

  const typeColors: Record<string, string> = {
    taller: "bg-blue-500",
    circulo_interes: "bg-green-500",
    charla: "bg-purple-500",
    excursion: "bg-amber-500",
    voluntariado: "bg-rose-500",
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/eventos">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Eventos
        </Link>
      </Button>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge className={`${typeColors[event.type] || 'bg-gray-500'} text-white mb-2`}>
                {typeLabels[event.type] || event.type}
              </Badge>
              <CardTitle className="text-3xl font-bold">{event.title}</CardTitle>
            </div>
            <Badge className={`${
              event.status === 'proximo' ? 'bg-emerald-500' :
              event.status === 'en_curso' ? 'bg-amber-500' :
              event.status === 'finalizado' ? 'bg-gray-500' : 'bg-red-500'
            } text-white text-sm px-4 py-1`}>
              {event.status === 'proximo' ? 'Próximo' : 
               event.status === 'en_curso' ? 'En curso' : 
               event.status === 'finalizado' ? 'Finalizado' : 'Cancelado'}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Imagen */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={event.imageUrl || '/img/eventos/default-event.jpg'}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Información principal */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Fecha</p>
                  <p className="text-muted-foreground">
                    {formatDate(event.date)}
                    {event.endDate && ` - ${formatDate(event.endDate)}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Horario</p>
                  <p className="text-muted-foreground">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Ubicación</p>
                  <p className="text-muted-foreground">{event.location}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Capacidad</p>
                  <p className="text-muted-foreground">
                    {event.registered} de {event.capacity} inscritos
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Organizador</p>
                  <p className="text-muted-foreground">{event.organizer}</p>
                </div>
              </div>
              {event.contactEmail && (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Contacto</p>
                    <a href={`mailto:${event.contactEmail}`} className="text-green-600 hover:underline">
                      {event.contactEmail}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Descripción */}
          <div>
            <h3 className="font-semibold mb-2">Descripción</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </div>

          {/* Requisitos */}
          {event.requirements && event.requirements.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Requisitos</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {event.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Audiencia */}
          <div>
            <h3 className="font-semibold mb-2">Dirigido a</h3>
            <div className="flex flex-wrap gap-2">
              {event.audience.map((aud) => (
                <Badge key={aud} variant="outline" className="text-xs">
                  {aud === 'niños' ? '👶 Niños' :
                   aud === 'jovenes' ? '🧑 Jóvenes' :
                   aud === 'adultos' ? '👨 Adultos' :
                   aud === 'comunidad' ? '🏘️ Comunidad' : '👪 Familiar'}
                </Badge>
              ))}
            </div>
          </div>

          {/* Botón de inscripción */}
          {event.status === 'proximo' && event.approvalStatus === 'approved' && (
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              📝 Inscribirme
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}