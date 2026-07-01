'use client';

import { Species } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin, AlertCircle } from "lucide-react";

interface SpeciesModalProps {
  species: Species | null;
  onClose: () => void;
}

const conservationColors: Record<string, string> = {
  'preocupación menor': 'bg-green-500',
  'casi amenazada': 'bg-yellow-500',
  'vulnerable': 'bg-orange-500',
  'en peligro': 'bg-red-500',
  'crítico': 'bg-purple-500'
};

export function SpeciesModal({ species, onClose }: SpeciesModalProps) {
  if (!species) return null;

  return (
    <Dialog open={!!species} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image section */}
          <div className="relative h-[300px] md:h-full">
            <img
              src={species.imageUrl}
              alt={species.nombreComun}  // ✅ Usar nombreComun
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-black/50 text-white backdrop-blur-sm border-0">
                {species.categoria}  {/* ✅ Usar categoria */}
              </Badge>
              <Badge className="bg-black/50 text-white backdrop-blur-sm border-0">
                {species.estatus}  {/* ✅ Usar estatus */}
              </Badge>
            </div>
          </div>

          {/* Content section */}
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold mb-2">
                {species.nombreComun}  {/* ✅ Usar nombreComun */}
              </DialogTitle>
              <p className="text-lg text-muted-foreground italic">
                {species.nombreCientifico}  {/* ✅ Usar nombreCientifico */}
              </p>
            </DialogHeader>

            <div className="mt-6 space-y-4">
              {/* Conservation status */}
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">Estado de conservación:</span>
                <Badge className={`${conservationColors[species.estadoConservacion]} text-white border-0`}>
                  {species.estadoConservacion}
                </Badge>
              </div>

              {/* Habitat */}
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-medium">Hábitat:</span>
                  <p className="text-sm text-muted-foreground">{species.habitat}</p>  {/* ✅ Usar habitat */}
                </div>
              </div>

              {/* Description */}
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Descripción</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {species.descripcion}  {/* ✅ Usar descripcion */}
                </p>
              </div>

              {/* Author */}
              {species.autorNombre && (
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground">
                    📸 Foto por: {species.autorNombre}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}