'use client';

import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { storage, db } from '@/lib/firebase/client';
import Image from 'next/image';

interface AvatarUploaderProps {
  currentAvatarUrl?: string | null;
  displayName?: string;
  onAvatarUpdate?: (url: string) => void;
}

export function AvatarUploader({ 
  currentAvatarUrl, 
  displayName = 'Usuario',
  onAvatarUpdate 
}: AvatarUploaderProps) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validar tamaño (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen no debe superar los 5MB');
      return;
    }

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecciona una imagen');
      return;
    }

    // Vista previa
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Subir a Firebase Storage
    setUploading(true);
    try {
      const path = `avatars/${user.uid}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);

      // Guardar en Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        avatarUrl: downloadUrl,
        photoURL: downloadUrl, // También actualizar photoURL para compatibilidad
      });

      toast.success('Avatar actualizado correctamente');
      if (onAvatarUpdate) onAvatarUpdate(downloadUrl);
      
      // Recargar la página para ver el cambio
      window.location.reload();
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Error al subir la imagen');
      setPreviewUrl(currentAvatarUrl || null);
    } finally {
      setUploading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <Avatar className="h-32 w-32 border-4 border-green-500 shadow-lg">
          <AvatarImage src={previewUrl || undefined} />
          <AvatarFallback className="text-4xl bg-green-100 text-green-700">
            {getInitials(displayName)}
          </AvatarFallback>
        </Avatar>
        
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
             onClick={() => fileInputRef.current?.click()}>
          <Camera className="h-10 w-10 text-white" />
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      <Button
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="gap-2"
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Camera className="h-4 w-4" />
        )}
        {uploading ? 'Subiendo...' : 'Cambiar foto'}
      </Button>

      {previewUrl && currentAvatarUrl && (
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 gap-2"
          onClick={() => {
            setPreviewUrl(null);
            // Opcional: eliminar la imagen de storage
          }}
        >
          <X className="h-4 w-4" />
          Eliminar
        </Button>
      )}
    </div>
  );
}