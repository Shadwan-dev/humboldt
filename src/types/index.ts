// ============================================
// TIPOS PARA EL PERFIL DE USUARIO (NUEVOS)
// ============================================

/**
 * Publicación del usuario en el perfil
 */
export interface ProfilePublication {
  id: string;
  title: string;
  content?: string;
  type: string;
  authorId: string;
  authorName: string;
  status: 'published' | 'pending' | 'approved' | 'rejected';
  publishedAt?: any;
  submittedAt?: any;
}

/**
 * Comentario del usuario en el perfil
 */
export interface ProfileComment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: any;
  likes?: number;
  replies?: ProfileComment[];
}

/**
 * Proyecto seguido por el usuario
 */
export interface ProfileFollowedProject {
  projectId: string;
  projectTitle: string;
  followedAt: any;
  notifications?: boolean;
}

/**
 * Insignia/logro del usuario
 */
export interface ProfileBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: any;
}

// ============================================
// TIPOS PARA EL PANEL DE ADMINISTRACIÓN (NUEVOS)
// ============================================

/**
 * Solicitud de investigador para el panel de admin
 */
export interface AdminSolicitud {
  id: string;
  userId: string;
  userEmail: string;
  userDisplayName: string;
  institucion: string;
  especialidad: string;
  motivacion: string;
  identificacion?: {
    tipo: string;
    numero: string;
  };
  status: 'pendiente' | 'aprobado' | 'rechazado';
  createdAt: any;
  reviewedAt?: any;
}

/**
 * Publicación pendiente para el panel de admin
 */
export interface AdminPublicacionPendiente {
  id: string;
  title: string;
  content: string;
  type: string;
  authorId: string;
  authorName: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: any;
  images?: string[];
  tags?: string[];
  reviewedAt?: any;
  reviewerComment?: string;
}

/**
 * Usuario para el panel de admin
 */
export interface AdminUsuario {
  id: string;
  uid: string;
  email: string;
  displayName?: string;
  role: string;
  verificationStatus: string;
  bio?: string;
  institution?: string;
  specialty?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    googleScholar?: string;
  };
  stats?: {
    contributions: number;
    publications: number;
    comments: number;
    projectsFollowed: number;
  };
  badges?: any[];
  createdAt: any;
  lastLogin: any;
}

// ============================================
// TIPOS PARA LA GALERÍA DE ESPECIES (NUEVOS)
// ============================================

/**
 * Especie para la galería con campos adicionales
 */
export interface GallerySpecies {
  id: string;
  nombreComun: string;
  nombreCientifico: string;
  categoria: SpeciesType;
  estatus: SpeciesStatus;
  habitat: string;
  descripcion: string;
  imageUrl: string;
  estadoConservacion: 'preocupación menor' | 'casi amenazada' | 'vulnerable' | 'en peligro' | 'crítico';
  autorId?: string;
  autorNombre?: string;
  createdAt: any;
  status: 'published';
}

/**
 * Estadísticas del dashboard del admin
 */
export interface AdminStats {
  totalUsuarios: number;
  totalPublicaciones: number;
  solicitudesPendientes: number;
  publicacionesPendientes: number;
  investigadores: number;
  admins: number;
  verificados: number;
}

// ✅ Asegúrate de que Event esté exportado
export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  audience: EventAudience[];
  date: string;
  endDate?: string;
  time: string;
  location: string;
  imageUrl: string;
  capacity: number;
  registered: number;
  status: EventStatus;
  organizer: string;
  contactEmail?: string;
  contactPhone?: string;
  requirements?: string[];
  tags: string[];
}
// ============================================
// TIPOS PARA ESPECIES
// ============================================

export type SpeciesStatus = 'endémica' | 'migratoria' | 'nativa';
export type SpeciesType = 'fauna' | 'flora';

export interface Species {
  id: string;
  nombreComun: string;
  nombreCientifico: string;
  categoria: SpeciesType;
  estatus: SpeciesStatus;
  habitat: string;
  descripcion: string;
  imageUrl: string;
  estadoConservacion: 'preocupación menor' | 'casi amenazada' | 'vulnerable' | 'en peligro' | 'crítico';
  autorId?: string;
  autorNombre?: string;
  createdAt: any;
  status: 'published';
}

// ============================================
// TIPOS PARA EVENTOS (✅ Asegurar que estén aquí)
// ============================================

export type EventType = 'taller' | 'circulo_interes' | 'charla' | 'excursion' | 'voluntariado';
export type EventAudience = 'niños' | 'jovenes' | 'adultos' | 'comunidad' | 'familiar';
export type EventStatus = 'proximo' | 'en_curso' | 'finalizado' | 'cancelado';

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  audience: EventAudience[];
  date: string;
  endDate?: string;
  time: string;
  location: string;
  imageUrl: string;
  capacity: number;
  registered: number;
  status: EventStatus;
  organizer: string;
  contactEmail?: string;
  contactPhone?: string;
  requirements?: string[];
  tags: string[];
}

// ============================================
// TIPOS PARA PROYECTOS
// ============================================

export type ProjectType = 'investigacion' | 'conservacion' | 'restauracion' | 'educacion' | 'monitoreo';
export type ProjectStatus = 'activo' | 'finalizado' | 'en_planeacion';
export type ResearchArea = 'carbono14' | 'manglares' | 'especies_amenazadas' | 'cambio_climatico' | 'biodiversidad';

export interface Project {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  researchArea?: ResearchArea[];
  imageUrl: string;
  startDate: string;
  endDate?: string;
  coordinator: string;
  institution: string;
  collaborators: string[];
  objectives: string[];
  achievements?: string[];
  publications?: {
    title: string;
    url?: string;
    year: number;
  }[];
  funding?: string;
  speciesInvolved?: string[];
  location: string;
  progress: number;
  tags: string[];
}

// ============================================
// TIPOS PARA USUARIOS
// ============================================

export type UserRole = 'basic' | 'validado' | 'investigador' | 'admin' | 'super_admin';
export type VerificationStatus = 'pendiente' | 'aprobado' | 'rechazado';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verifiedAt?: Date;
  institution?: string;
  specialty?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    googleScholar?: string;
  };
  stats: {
    contributions: number;
    publications: number;
    comments: number;
    projectsFollowed: number;
  };
  badges: Badge[];
  createdAt: Date;
  lastLogin: Date;
}

// ============================================
// TIPOS PARA SOLICITUDES Y PUBLICACIONES
// ============================================

export interface InvestigadorSolicitud {
  id: string;
  userId: string;
  userEmail: string;
  userDisplayName: string;
  identificacion: {
    tipo: 'ci' | 'pasaporte' | 'carnet';
    numero: string;
    archivoUrl: string;
  };
  institucion: string;
  especialidad: string;
  cvUrl: string;
  motivacion: string;
  status: VerificationStatus;
  createdAt: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
  comentario?: string;
}

export interface PublicacionPendiente {
  id: string;
  title: string;
  content: string;
  type: 'articulo' | 'foto' | 'especie' | 'evento';
  authorId: string;
  authorName: string;
  images: string[];
  tags: string[];
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: Date;
  reviewerComment?: string;
}

export interface Articulo {
  id: string;
  title: string;
  abstract: string;
  content: string;
  authors: string[];
  institution: string;
  keywords: string[];
  pdfUrl?: string;
  citations: number;
  publishedAt: Date;
  authorId: string;
  status: 'published' | 'archived';
}

// ============================================
// TIPOS PARA COMENTARIOS Y BADGES
// ============================================

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  entityType: 'species' | 'event' | 'project' | 'article';
  entityId: string;
  createdAt: Date;
  likes: number;
  replies: Comment[];
}

// ============================================
// TIPOS PARA PROYECTOS SEGUIDOS
// ============================================

export interface FollowedProject {
  projectId: string;
  projectTitle: string;
  followedAt: Date;
  notifications: boolean;
}

export interface Contribution {
  id: string;
  type: 'publication' | 'sighting' | 'comment' | 'badge';
  title: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  approvedAt?: Date;
}

// ============================================
// TIPOS PARA EL PERFIL DE USUARIO (NUEVOS)
// ============================================

export interface ProfilePublication {
  id: string;
  title: string;
  content?: string;
  type: string;
  authorId: string;
  authorName: string;
  status: 'published' | 'pending' | 'approved' | 'rejected';
  publishedAt?: any;
  submittedAt?: any;
}

export interface ProfileComment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: any;
  likes?: number;
  replies?: ProfileComment[];
}

export interface ProfileFollowedProject {
  projectId: string;
  projectTitle: string;
  followedAt: any;
  notifications?: boolean;
}

export interface ProfileBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: any;
}

// ============================================
// TIPOS PARA EL PANEL DE ADMINISTRACIÓN
// ============================================

export interface AdminSolicitud {
  id: string;
  userId: string;
  userEmail: string;
  userDisplayName: string;
  institucion: string;
  especialidad: string;
  motivacion: string;
  identificacion?: {
    tipo: string;
    numero: string;
  };
  status: 'pendiente' | 'aprobado' | 'rechazado';
  createdAt: any;
  reviewedAt?: any;
}

export interface AdminPublicacionPendiente {
  id: string;
  title: string;
  content: string;
  type: string;
  authorId: string;
  authorName: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: any;
  images?: string[];
  tags?: string[];
  reviewedAt?: any;
  reviewerComment?: string;
}

export interface AdminUsuario {
  id: string;
  uid: string;
  email: string;
  displayName?: string;
  role: string;
  verificationStatus: string;
  bio?: string;
  institution?: string;
  specialty?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    googleScholar?: string;
  };
  stats?: {
    contributions: number;
    publications: number;
    comments: number;
    projectsFollowed: number;
  };
  badges?: any[];
  createdAt: any;
  lastLogin: any;
}

export interface AdminStats {
  totalUsuarios: number;
  totalPublicaciones: number;
  solicitudesPendientes: number;
  publicacionesPendientes: number;
  investigadores: number;
  admins: number;
  verificados: number;
}

// ============================================
// TIPOS PARA LA GALERÍA DE ESPECIES
// ============================================

export interface GallerySpecies {
  id: string;
  nombreComun: string;
  nombreCientifico: string;
  categoria: SpeciesType;
  estatus: SpeciesStatus;
  habitat: string;
  descripcion: string;
  imageUrl: string;
  conservationStatus: 'preocupación menor' | 'casi amenazada' | 'vulnerable' | 'en peligro' | 'crítico';
  autorId?: string;
  autorNombre?: string;
  createdAt: any;
  status: 'published';
}