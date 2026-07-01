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
import { Loader2, PlusCircle } from 'lucide-react';
import type { ProjectType, ProjectStatus, ResearchArea } from '@/types';

export default function NuevoProyectoPage() {
  const { user, userRole, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'investigacion' as ProjectType,
    status: 'activo' as ProjectStatus, // ✅ Ahora ProjectStatus está importado
    researchArea: [] as ResearchArea[],
    startDate: '',
    endDate: '',
    coordinator: '',
    institution: '',
    collaborators: '',
    objectives: '',
    achievements: '',
    funding: '',
    location: '',
    progress: 0,
    tags: '',
  });

  if (!authLoading && (!user || (userRole !== 'investigador' && userRole !== 'admin' && userRole !== 'super_admin'))) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.startDate || !formData.location) {
      toast.error('Por favor, completa todos los campos obligatorios');
      return;
    }

    setLoading(true);
    try {
      const projectData = {
        ...formData,
        researchArea: formData.researchArea.length > 0 ? formData.researchArea : ['biodiversidad'],
        collaborators: formData.collaborators.split(',').map(c => c.trim()).filter(Boolean),
        objectives: formData.objectives.split('\n').filter(o => o.trim()),
        achievements: formData.achievements ? formData.achievements.split('\n').filter(a => a.trim()) : [],
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        progress: Number(formData.progress),
        coordinator: formData.coordinator || user?.displayName || user?.email?.split('@')[0],
        coordinatorId: user?.uid,
        approvalStatus: 'pending',
        createdAt: new Date(),
        imageUrl: '/img/proyectos/default-project.jpg',
      };
      
      await addDoc(collection(db, 'proyectos'), projectData);
      
      toast.success('Proyecto creado exitosamente. Espera la aprobación del administrador.');
      router.push('/proyectos');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al crear el proyecto');
    } finally {
      setLoading(false);
    }
  };

  const researchAreas: { value: ResearchArea; label: string }[] = [
    { value: 'carbono14', label: 'Carbono 14' },
    { value: 'manglares', label: 'Manglares' },
    { value: 'especies_amenazadas', label: 'Especies Amenazadas' },
    { value: 'cambio_climatico', label: 'Cambio Climático' },
    { value: 'biodiversidad', label: 'Biodiversidad' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <PlusCircle className="h-8 w-8 text-green-600" />
            Nuevo Proyecto de Investigación
          </CardTitle>
          <CardDescription>
            Crea un nuevo proyecto de investigación. Será revisado antes de publicarse.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título */}
            <div className="space-y-2">
              <Label>Título del proyecto *</Label>
              <Input
                placeholder="Ej: Monitoreo de Carbono en Manglares"
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
                placeholder="Describe el proyecto, sus objetivos principales..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>

            {/* Tipo y Estado */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de proyecto</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({...formData, type: value as ProjectType})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investigacion">Investigación</SelectItem>
                    <SelectItem value="conservacion">Conservación</SelectItem>
                    <SelectItem value="restauracion">Restauración</SelectItem>
                    <SelectItem value="educacion">Educación</SelectItem>
                    <SelectItem value="monitoreo">Monitoreo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Estado del proyecto</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({...formData, status: value as ProjectStatus})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="en_planeacion">En planeación</SelectItem>
                    <SelectItem value="finalizado">Finalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Áreas de investigación */}
            <div className="space-y-2">
              <Label>Áreas de investigación</Label>
              <div className="flex flex-wrap gap-2">
                {researchAreas.map((area) => (
                  <Button
                    key={area.value}
                    type="button"
                    variant={formData.researchArea.includes(area.value) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        researchArea: prev.researchArea.includes(area.value)
                          ? prev.researchArea.filter(a => a !== area.value)
                          : [...prev.researchArea, area.value]
                      }));
                    }}
                  >
                    {area.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Fechas */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha de inicio *</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
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

            {/* Coordinador e Institución */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Coordinador</Label>
                <Input
                  placeholder="Nombre del coordinador"
                  value={formData.coordinator}
                  onChange={(e) => setFormData({...formData, coordinator: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Institución *</Label>
                <Input
                  placeholder="Institución líder"
                  value={formData.institution}
                  onChange={(e) => setFormData({...formData, institution: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Colaboradores */}
            <div className="space-y-2">
              <Label>Colaboradores (separados por comas)</Label>
              <Input
                placeholder="Universidad de La Habana, Instituto de Ecología..."
                value={formData.collaborators}
                onChange={(e) => setFormData({...formData, collaborators: e.target.value})}
              />
            </div>

            {/* Objetivos */}
            <div className="space-y-2">
              <Label>Objetivos (uno por línea) *</Label>
              <Textarea
                rows={4}
                placeholder="Establecer parcelas permanentes de monitoreo..."
                value={formData.objectives}
                onChange={(e) => setFormData({...formData, objectives: e.target.value})}
                required
              />
            </div>

            {/* Logros */}
            <div className="space-y-2">
              <Label>Logros alcanzados (opcional, uno por línea)</Label>
              <Textarea
                rows={3}
                placeholder="3 parcelas establecidas..."
                value={formData.achievements}
                onChange={(e) => setFormData({...formData, achievements: e.target.value})}
              />
            </div>

            {/* Ubicación y Progreso */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ubicación *</Label>
                <Input
                  placeholder="Costa norte, Parque Nacional..."
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Progreso (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => setFormData({...formData, progress: Number(e.target.value)})}
                />
              </div>
            </div>

            {/* Financiamiento */}
            <div className="space-y-2">
              <Label>Financiamiento (opcional)</Label>
              <Input
                placeholder="Fondo para el Medio Ambiente Mundial (FMAM)"
                value={formData.funding}
                onChange={(e) => setFormData({...formData, funding: e.target.value})}
              />
            </div>

            {/* Etiquetas */}
            <div className="space-y-2">
              <Label>Etiquetas (separadas por comas)</Label>
              <Input
                placeholder="manglares, carbono, cambio climático"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
              />
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800 dark:text-yellow-400">
                ⚠️ Este proyecto pasará por un proceso de revisión antes de ser publicado.
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <PlusCircle className="h-4 w-4 mr-2" />}
              {loading ? 'Guardando...' : 'Crear Proyecto'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}