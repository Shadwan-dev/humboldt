'use client';

import { Species } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GalleryCardProps {
  species: Species;
  onClick: (species: Species) => void;
  onEdit?: (species: Species) => void;
  onDelete?: (id: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

const statusColors = {
  endémica: "bg-emerald-500",
  migratoria: "bg-amber-500",
  nativa: "bg-blue-500",
};

const categoryColors = {
  fauna: "bg-rose-500",
  flora: "bg-green-500",
};

export function GalleryCard({ 
  species, 
  onClick, 
  onEdit, 
  onDelete,
  canEdit = false,
  canDelete = false
}: GalleryCardProps) {
  return (
    <Card
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-0"
      onClick={() => onClick(species)}
    >
      <div className="aspect-[4/5] relative">
        <img
          src={species.imageUrl}
          alt={species.nombreComun}  // ✅ Usar nombreComun
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
        
        <div className="absolute inset-x-0 bottom-0 p-4 text-white transform translate-y-0 transition-transform">
          <h3 className="text-xl font-bold mb-1 line-clamp-1">
            {species.nombreComun}  {/* ✅ Usar nombreComun */}
          </h3>
          <p className="text-sm text-white/80 italic mb-2 line-clamp-1">
            {species.nombreCientifico}  {/* ✅ Usar nombreCientifico */}
          </p>
          
          <div className="flex gap-2 flex-wrap">
            <Badge className={`${categoryColors[species.categoria]} text-white border-0`}>  {/* ✅ Usar categoria */}
              {species.categoria}  {/* ✅ Usar categoria */}
            </Badge>
            <Badge className={`${statusColors[species.estatus]} text-white border-0`}>  {/* ✅ Usar estatus */}
              {species.estatus}  {/* ✅ Usar estatus */}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}