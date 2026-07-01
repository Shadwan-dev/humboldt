// ============================================
// TIPOS PARA ESPECIES
// ============================================

export type SpeciesStatus = 'endémica' | 'migratoria' | 'nativa';
export type SpeciesType = 'fauna' | 'flora';

export interface Species {
  id: string;
  name: string;  // ✅ Mantener name (coincide con tu data)
  scientificName: string;  // ✅ Mantener scientificName
  category: SpeciesType;  // ✅ Mantener category
  status: SpeciesStatus;  // ✅ Mantener status
  description: string;
  imageUrl: string;
  conservationStatus: 'preocupación menor' | 'casi amenazada' | 'vulnerable' | 'en peligro' | 'crítico';
  location: string;
  autorId?: string;
  autorNombre?: string;
  createdAt?: any;
}