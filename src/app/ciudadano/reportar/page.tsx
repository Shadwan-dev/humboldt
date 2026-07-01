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
import { toast } from 'sonner';
import { Loader2, MapPin, Camera } from 'lucide-react';

export default function ReportarAvistamientoPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    especie: '',
    ubicacion: '',
    fecha: new Date().toISOString().split('T')[0],
    descripcion: '',
    imagenUrl: ''
  });

  if (!authLoading && !user) {
    router.push('/auth/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.especie || !formData.ubicacion) {
      toast.error('Por favor, completa especie y ubicación');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'avistamientos'), {
        ...formData,
        userId: user?.uid,
        userEmail: user?.email,
        status: 'pending',
        createdAt: new Date(),
        fechaAvistamiento: new Date(formData.fecha)
      });
      
      toast.success('¡Avistamiento reportado! Gracias por contribuir.');
      router.push('/perfil');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al reportar avistamiento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Reportar Avistamiento</CardTitle>
          <CardDescription>
            Ayuda a la comunidad científica reportando tus observaciones de flora y fauna
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Especie observada</Label>
              <Input 
                placeholder="Nombre de la especie" 
                value={formData.especie}
                onChange={(e) => setFormData({...formData, especie: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Ubicación</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-10"
                  placeholder="Parque Humboldt, Sendero El Yunque..." 
                  value={formData.ubicacion}
                  onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Fecha del avistamiento</Label>
              <Input 
                type="date" 
                value={formData.fecha}
                onChange={(e) => setFormData({...formData, fecha: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea 
                rows={4}
                placeholder="Describe lo que observaste..." 
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>URL de la imagen (opcional)</Label>
              <div className="relative">
                <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-10"
                  placeholder="https://..." 
                  value={formData.imagenUrl}
                  onChange={(e) => setFormData({...formData, imagenUrl: e.target.value})}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Reportar Avistamiento
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}