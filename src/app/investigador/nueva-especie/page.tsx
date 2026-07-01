'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Image as ImageIcon, Upload, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

export default function NuevaEspeciePage() {
  const { user, userRole, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    nombreComun: '',
    nombreCientifico: '',
    categoria: 'fauna',
    estatus: 'endémica',
    habitat: '',
    descripcion: '',
    estadoConservacion: 'preocupación menor'
  });

  // ✅ Verificar permisos: solo investigadores y admins
  if (!authLoading && (!user || (userRole !== 'investigador' && userRole !== 'admin' && userRole !== 'super_admin'))) {
    router.push('/');
    return null;
  }

  // Configuración de react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        toast.success('Imagen seleccionada correctamente');
      }
    },
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0]?.errors[0];
      if (error?.code === 'file-too-large') {
        toast.error('La imagen no debe superar los 5MB');
      } else if (error?.code === 'file-invalid-type') {
        toast.error('Solo se permiten imágenes (JPG, PNG, WEBP)');
      } else {
        toast.error('Error al seleccionar la imagen');
      }
    }
  });

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombreComun || !formData.nombreCientifico || !formData.habitat || !formData.descripcion) {
      toast.error('Completa todos los campos obligatorios');
      return;
    }
    
    if (!imageFile) {
      toast.error('Debes seleccionar una foto de la especie');
      return;
    }

    setLoading(true);
    
    try {
      // 1. Subir imagen a Firebase Storage
      const imageRef = ref(storage, `especies/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);
      
      // 2. Guardar datos en Firestore
      await addDoc(collection(db, 'especies'), {
        ...formData,
        imageUrl,
        autorId: user?.uid,
        autorNombre: user?.displayName || user?.email?.split('@')[0],
        createdAt: new Date(),
        status: 'published'
      });
      
      toast.success('¡Especie agregada exitosamente!');
      
      // Resetear formulario
      setFormData({
        nombreComun: '',
        nombreCientifico: '',
        categoria: 'fauna',
        estatus: 'endémica',
        habitat: '',
        descripcion: '',
        estadoConservacion: 'preocupación menor'
      });
      removeImage();
      
      router.push('/especies');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al guardar la especie');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">🌿 Nueva Especie</CardTitle>
          <CardDescription>
            Agrega una nueva especie al catálogo del Humboldt Atlas. 
            Todos los campos con * son obligatorios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dropzone para imágenes */}
            <div className="space-y-2">
              <Label>Foto de la especie *</Label>
              {!imagePreview ? (
                <div
                  {...getRootProps()}
                  className={`
                    border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${isDragActive 
                      ? 'border-green-500 bg-green-50 dark:bg-green-950/20' 
                      : 'border-gray-300 hover:border-green-400 dark:border-gray-700'
                    }
                  `}
                >
                  <input {...getInputProps()} />
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isDragActive 
                      ? '📥 Suelta la imagen aquí' 
                      : '🖱️ Arrastra o haz clic para seleccionar una imagen'
                    }
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Formatos: JPG, PNG, WEBP (máx. 5MB)
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Campos del formulario */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre común *</Label>
                <Input
                  placeholder="Ej: Colibrí Esmeralda"
                  value={formData.nombreComun}
                  onChange={(e) => setFormData({...formData, nombreComun: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Nombre científico *</Label>
                <Input
                  placeholder="Ej: Chlorostilbon ricordii"
                  value={formData.nombreCientifico}
                  onChange={(e) => setFormData({...formData, nombreCientifico: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoría</Label>
                <Select
                  value={formData.categoria}
                  onValueChange={(value) => setFormData({...formData, categoria: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fauna">🦜 Fauna</SelectItem>
                    <SelectItem value="flora">🌿 Flora</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Estatus</Label>
                <Select
                  value={formData.estatus}
                  onValueChange={(value) => setFormData({...formData, estatus: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="endémica">🔴 Endémica</SelectItem>
                    <SelectItem value="migratoria">🟡 Migratoria</SelectItem>
                    <SelectItem value="nativa">🟢 Nativa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Hábitat *</Label>
              <Input
                placeholder="Ej: Bosque húmedo tropical, manglares, zonas costeras"
                value={formData.habitat}
                onChange={(e) => setFormData({...formData, habitat: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Estado de conservación</Label>
              <Select
                value={formData.estadoConservacion}
                onValueChange={(value) => setFormData({...formData, estadoConservacion: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="preocupación menor">🟢 Preocupación menor</SelectItem>
                  <SelectItem value="casi amenazada">🟡 Casi amenazada</SelectItem>
                  <SelectItem value="vulnerable">🟠 Vulnerable</SelectItem>
                  <SelectItem value="en peligro">🔴 En peligro</SelectItem>
                  <SelectItem value="crítico">🟣 Crítico</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Descripción *</Label>
              <Textarea
                rows={5}
                placeholder="Describe las características, comportamiento, particularidades de la especie..."
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ImageIcon className="h-4 w-4 mr-2" />}
              {loading ? 'Guardando...' : '📤 Publicar Especie'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}