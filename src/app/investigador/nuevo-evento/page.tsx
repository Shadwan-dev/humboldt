'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, CalendarPlus, X } from 'lucide-react';
import type { EventType, EventAudience } from '@/types';

export default function NuevoEventoPage() {
  const { user, userRole, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'taller' as EventType,
    audience: [] as EventAudience[],
    date: '',
    endDate: '',
    time: '',
    location: '',
    capacity: 10,
    requirements: '',
    tags: '',
  });

  // Verificar permisos
  if (!authLoading && (!user || (userRole !== 'investigador' && userRole !== 'admin' && userRole !== 'super_admin'))) {
    router.push('/');
    return null;
  }

  const handleAudienceToggle = (value: EventAudience) => {
    setFormData(prev => ({
      ...prev,
      audience: prev.audience.includes(value)
        ? prev.audience.filter(a => a !== value)
        : [...prev.audience, value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.date || !formData.location) {
      toast.error('Por favor, completa todos los campos obligatorios');
      return;
    }

    if (formData.audience.length === 0) {
      toast.error('Selecciona al menos un tipo de audiencia');
      return;
    }

    setLoading(true);
    try {
      const eventData = {
        ...formData,
        requirements: formData.requirements.split(',').map(r => r.trim()).filter(Boolean),
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        capacity: Number(formData.capacity),
        registered: 0,
        status: 'proximo',
        approvalStatus: 'pending',
        organizer: user?.displayName || user?.email?.split('@')[0] || 'Investigador',
        organizerId: user?.uid,
        createdAt: new Date(),
      };
      
      await addDoc(collection(db, 'eventos'), eventData);
      
      toast.success('✅ Evento creado exitosamente. Espera la aprobación del administrador.');
      router.push('/eventos');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al crear el evento');
    } finally {
      setLoading(false);
    }
  };

  const audienceOptions: { value: EventAudience; label: string; emoji: string }[] = [
    { value: 'niños', label: 'Niños', emoji: '👶' },
    { value: 'jovenes', label: 'Jóvenes', emoji: '🧑' },
    { value: 'adultos', label: 'Adultos', emoji: '👨' },
    { value: 'comunidad', label: 'Comunidad', emoji: '🏘️' },
    { value: 'familiar', label: 'Familiar', emoji: '👪' },
  ];

  const typeOptions: { value: EventType; label: string }[] = [
    { value: 'taller', label: 'Taller' },
    { value: 'circulo_interes', label: 'Círculo de Interés' },
    { value: 'charla', label: 'Charla' },
    { value: 'excursion', label: 'Excursión' },
    { value: 'voluntariado', label: 'Voluntariado' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <CalendarPlus className="h-8 w-8 text-green-600" />
            Nuevo Evento
          </CardTitle>
          <CardDescription>
            Crea un nuevo evento comunitario. Será revisado antes de publicarse.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título */}
            <div className="space-y-2">
              <Label>Título del evento *</Label>
              <Input
                placeholder="Ej: Taller de Identificación de Aves"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label>Descripción *</Label>
              <Textarea
                rows={4}
                placeholder="Describe el evento, qué se hará, qué aprenderán los participantes..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>

            {/* Tipo y Audiencia */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de evento</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({...formData, type: value as EventType})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Audiencia *</Label>
                <div className="flex flex-wrap gap-2">
                  {audienceOptions.map((opt) => (
                    <Button
                      key={opt.value}
                      type="button"
                      variant={formData.audience.includes(opt.value) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAudienceToggle(opt.value)}
                      className="gap-1"
                    >
                      {opt.emoji} {opt.label}
                    </Button>
                  ))}
                </div>
                {formData.audience.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.audience.map((a) => (
                      <span key={a} className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                        {audienceOptions.find(o => o.value === a)?.emoji} {audienceOptions.find(o => o.value === a)?.label}
                        <button
                          type="button"
                          onClick={() => handleAudienceToggle(a)}
                          className="hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Fechas */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha del evento *</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha de finalización (opcional)</Label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
            </div>

            {/* Hora y Capacidad */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hora *</Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Capacidad</Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})}
                />
              </div>
            </div>

            {/* Ubicación */}
            <div className="space-y-2">
              <Label>Ubicación *</Label>
              <Input
                placeholder="Centro de Visitantes, Sendero El Yunque..."
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>

            {/* Requisitos y Tags */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Requisitos (separados por comas)</Label>
                <Input
                  placeholder="Ropa cómoda, Binoculares, Agua"
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Etiquetas (separadas por comas)</Label>
                <Input
                  placeholder="aves, conservación, taller"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                />
              </div>
            </div>

            {/* Advertencia */}
            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-400">
                ⚠️ Este evento pasará por un proceso de revisión antes de ser publicado.
                Recibirás una notificación cuando sea aprobado.
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CalendarPlus className="h-4 w-4 mr-2" />}
              {loading ? 'Guardando...' : 'Crear Evento'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}