'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFirestore } from '@/hooks/useFirestore';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { GalleryCard } from './GalleryCard';
import { Species } from '@/types';
import { Loader2, MapPin, Plus } from 'lucide-react';
import { db } from '@/lib/firebase/client';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface GalleryGridProps {
  filterType?: string;
  filterStatus?: string;
  searchQuery?: string;
  onRefresh?: () => void;
}

export function GalleryGrid({ filterType, filterStatus, searchQuery, onRefresh }: GalleryGridProps) {
  const { user, userRole } = useAuth();
  const { data: especies, loading, error, refetch } = useFirestore<Species>('especies');
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [speciesToDelete, setSpeciesToDelete] = useState<Species | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editingSpecies, setEditingSpecies] = useState<Species | null>(null);
  const [editForm, setEditForm] = useState<Partial<Species>>({});
  const [editLoading, setEditLoading] = useState(false);

  const isAdmin = userRole === 'admin' || userRole === 'super_admin';
  const isInvestigador = userRole === 'investigador';
  const canManage = isAdmin || isInvestigador;
  const canDelete = isAdmin;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        Error al cargar especies: {error.message}
      </div>
    );
  }

  const filtered = especies.filter(species => {
    if (filterType && filterType !== 'all' && species.categoria !== filterType) return false;
    if (filterStatus && filterStatus !== 'all' && species.estatus !== filterStatus) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        species.nombreComun.toLowerCase().includes(query) ||
        species.nombreCientifico.toLowerCase().includes(query) ||
        species.descripcion.toLowerCase().includes(query) ||
        species.habitat.toLowerCase().includes(query) // ✅ Agregado habitat
      );
    }
    return true;
  });

  const handleDelete = async () => {
    if (!speciesToDelete) return;
    
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'especies', speciesToDelete.id));
      toast.success(`"${speciesToDelete.nombreComun}" eliminada correctamente`);
      setSpeciesToDelete(null);
      if (onRefresh) onRefresh();
      refetch();
    } catch (error) {
      console.error('Error deleting species:', error);
      toast.error('Error al eliminar la especie');
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (species: Species) => {
    setEditingSpecies(species);
    setEditForm({
      nombreComun: species.nombreComun,
      nombreCientifico: species.nombreCientifico,
      descripcion: species.descripcion,
      habitat: species.habitat, // ✅ Corregido: habitat en lugar de location
      categoria: species.categoria,
      estatus: species.estatus,
      estadoConservacion: species.estadoConservacion,
    });
  };

  const saveEdit = async () => {
    if (!editingSpecies) return;
    
    setEditLoading(true);
    try {
      await updateDoc(doc(db, 'especies', editingSpecies.id), {
        ...editForm,
        updatedAt: new Date(),
      });
      toast.success('Especie actualizada correctamente');
      setEditingSpecies(null);
      if (onRefresh) onRefresh();
      refetch();
    } catch (error) {
      console.error('Error updating species:', error);
      toast.error('Error al actualizar la especie');
    } finally {
      setEditLoading(false);
    }
  };

  const conservationColors: Record<string, string> = {
    'preocupación menor': 'bg-green-500',
    'casi amenazada': 'bg-yellow-500',
    'vulnerable': 'bg-orange-500',
    'en peligro': 'bg-red-500',
    'crítico': 'bg-purple-500'
  };

  return (
    <>
      {canManage && (
        <div className="mb-6 flex justify-end">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/investigador/nueva-especie">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Especie
            </Link>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((species) => (
          <GalleryCard
            key={species.id}
            species={species}
            onClick={setSelectedSpecies}
            onEdit={() => handleEdit(species)}
            onDelete={() => setSpeciesToDelete(species)}
            canEdit={canManage}
            canDelete={canDelete}
          />
        ))}
      </div>

      {/* Modal de detalles */}
      <Dialog open={!!selectedSpecies} onOpenChange={() => setSelectedSpecies(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedSpecies && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">{selectedSpecies.nombreComun}</DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <img
                    src={selectedSpecies.imageUrl}
                    alt={selectedSpecies.nombreComun}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Nombre científico</h3>
                    <p className="text-lg italic">{selectedSpecies.nombreCientifico}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> Hábitat
                    </h3>
                    <p>{selectedSpecies.habitat}</p> {/* ✅ Corregido: habitat */}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Estado de conservación</h3>
                    <Badge className={`${conservationColors[selectedSpecies.estadoConservacion]} text-white mt-1`}>
                      {selectedSpecies.estadoConservacion}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Categoría</h3>
                    <Badge className={`${selectedSpecies.categoria === 'fauna' ? 'bg-rose-500' : 'bg-green-500'} text-white`}>
                      {selectedSpecies.categoria}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Estatus</h3>
                    <Badge className={`${
                      selectedSpecies.estatus === 'endémica' ? 'bg-emerald-500' :
                      selectedSpecies.estatus === 'migratoria' ? 'bg-amber-500' :
                      'bg-blue-500'
                    } text-white`}>
                      {selectedSpecies.estatus}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Descripción</h3>
                    <p className="text-sm leading-relaxed">{selectedSpecies.descripcion}</p>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      📸 Foto por: {selectedSpecies.autorNombre || 'Investigador'}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo de edición */}
      <Dialog open={!!editingSpecies} onOpenChange={() => setEditingSpecies(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Especie</DialogTitle>
          </DialogHeader>
          {editingSpecies && (
            <div className="space-y-4 py-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Nombre común</Label>
                  <Input
                    value={editForm.nombreComun || ''}
                    onChange={(e) => setEditForm({...editForm, nombreComun: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Nombre científico</Label>
                  <Input
                    value={editForm.nombreCientifico || ''}
                    onChange={(e) => setEditForm({...editForm, nombreCientifico: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label>Hábitat</Label>
                <Input
                  value={editForm.habitat || ''} // ✅ Corregido: habitat
                  onChange={(e) => setEditForm({...editForm, habitat: e.target.value})}
                />
              </div>
              <div>
                <Label>Descripción</Label>
                <Textarea
                  rows={4}
                  value={editForm.descripcion || ''}
                  onChange={(e) => setEditForm({...editForm, descripcion: e.target.value})}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Categoría</Label>
                  <Select
                    value={editForm.categoria}
                    onValueChange={(value) => setEditForm({...editForm, categoria: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fauna">Fauna</SelectItem>
                      <SelectItem value="flora">Flora</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Estatus</Label>
                  <Select
                    value={editForm.estatus}
                    onValueChange={(value) => setEditForm({...editForm, estatus: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="endémica">Endémica</SelectItem>
                      <SelectItem value="migratoria">Migratoria</SelectItem>
                      <SelectItem value="nativa">Nativa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Estado de conservación</Label>
                <Select
                  value={editForm.estadoConservacion}
                  onValueChange={(value) => setEditForm({...editForm, estadoConservacion: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preocupación menor">Preocupación menor</SelectItem>
                    <SelectItem value="casi amenazada">Casi amenazada</SelectItem>
                    <SelectItem value="vulnerable">Vulnerable</SelectItem>
                    <SelectItem value="en peligro">En peligro</SelectItem>
                    <SelectItem value="crítico">Crítico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditingSpecies(null)}>Cancelar</Button>
            <Button onClick={saveEdit} className="bg-green-600 hover:bg-green-700" disabled={editLoading}>
              {editLoading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación de eliminación */}
      <AlertDialog open={!!speciesToDelete} onOpenChange={() => setSpeciesToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar especie?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres eliminar "{speciesToDelete?.nombreComun}"? 
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting} className="bg-red-600 hover:bg-red-700">
              {deleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}