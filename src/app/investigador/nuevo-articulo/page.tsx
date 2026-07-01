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
import { Loader2, FileText } from 'lucide-react';

export default function NuevoArticuloPage() {
  const { user, userRole, loading: authLoading } = useAuth(); // ← Obtener userRole
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    content: '',
    keywords: '',
    type: 'articulo'
  });

  // ✅ Verificar permisos: solo investigadores (y admins si quieres)
  if (!authLoading && (!user || (userRole !== 'investigador' && userRole !== 'admin' && userRole !== 'super_admin'))) {
    router.push('/auth/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast.error('Por favor, completa título y contenido');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'publicaciones_pendientes'), {
        ...formData,
        keywords: formData.keywords.split(',').map(k => k.trim()),
        authorId: user?.uid,
        authorName: user?.displayName || user?.email?.split('@')[0],
        status: 'pending',
        submittedAt: new Date(),
        type: 'articulo'
      });
      
      toast.success('Artículo enviado para revisión');
      router.push('/perfil');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al enviar el artículo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Nuevo Artículo Científico</CardTitle>
          <CardDescription>
            Completa el formulario para publicar tu artículo. Será revisado por el comité editorial.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Título del artículo *</Label>
              <Input 
                placeholder="Título descriptivo" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Resumen / Abstract</Label>
              <Textarea 
                rows={4}
                placeholder="Breve resumen del artículo..." 
                value={formData.abstract}
                onChange={(e) => setFormData({...formData, abstract: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>Contenido completo *</Label>
              <Textarea 
                rows={10}
                placeholder="Desarrollo completo del artículo..." 
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Palabras clave</Label>
              <Input 
                placeholder="biodiversidad, conservación, manglares (separadas por comas)" 
                value={formData.keywords}
                onChange={(e) => setFormData({...formData, keywords: e.target.value})}
              />
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-400">
                ⚠️ Tu artículo pasará por un proceso de revisión antes de ser publicado.
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <FileText className="h-4 w-4 mr-2" />}
              {loading ? 'Enviando...' : 'Enviar para revisión'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}