'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  addDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye,
  Loader2,
  TrendingUp,
  Calendar,
  BookOpen,
  Award,
  Activity,
  UserCheck,
  PenTool,
  CalendarPlus,
  PlusCircle
} from 'lucide-react';
import { toast } from 'sonner';
import type { 
  InvestigadorSolicitud, 
  PublicacionPendiente, 
  UserProfile,
  Event,
  Project
} from '@/types';

// Interfaces locales
interface LocalSolicitud {
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
  status: string;
  createdAt: any;
  reviewedAt?: any;
}

interface LocalPublicacion {
  id: string;
  title: string;
  content: string;
  type: string;
  authorId: string;
  authorName: string;
  status: string;
  submittedAt: any;
  images?: string[];
  tags?: string[];
  reviewedAt?: any;
  reviewerComment?: string;
}

interface LocalUsuario {
  id: string;
  uid: string;
  email: string;
  displayName?: string;
  role: string;
  verificationStatus: string;
  bio?: string;
  institution?: string;
  specialty?: string;
  socialLinks?: any;
  stats?: any;
  badges?: any[];
  createdAt: any;
  lastLogin: any;
}

export default function AdminPage() {
  const { user, userRole, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Estados
  const [solicitudes, setSolicitudes] = useState<LocalSolicitud[]>([]);
  const [publicacionesPendientes, setPublicacionesPendientes] = useState<LocalPublicacion[]>([]);
  const [eventosPendientes, setEventosPendientes] = useState<Event[]>([]);
  const [proyectosPendientes, setProyectosPendientes] = useState<Project[]>([]);
  const [usuarios, setUsuarios] = useState<LocalUsuario[]>([]);
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    totalPublicaciones: 0,
    solicitudesPendientes: 0,
    publicacionesPendientes: 0,
    eventosPendientes: 0,
    proyectosPendientes: 0,
    investigadores: 0,
    admins: 0,
    verificados: 0
  });
  
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || (userRole !== 'admin' && userRole !== 'super_admin'))) {
      router.push('/');
    }
  }, [user, userRole, authLoading, router]);

  useEffect(() => {
    if (user && (userRole === 'admin' || userRole === 'super_admin')) {
      loadAllData();
    }
  }, [user, userRole]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      // Solicitudes
      const solicitudesQuery = query(
        collection(db, 'investigador_solicitudes'),
        where('status', '==', 'pendiente')
      );
      const solicitudesSnap = await getDocs(solicitudesQuery);
      const solicitudesData = solicitudesSnap.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as LocalSolicitud[];
      setSolicitudes(solicitudesData);

      // Publicaciones pendientes
      const publicacionesQuery = query(
        collection(db, 'publicaciones_pendientes'),
        where('status', '==', 'pending'),
        orderBy('submittedAt', 'desc')
      );
      const publicacionesSnap = await getDocs(publicacionesQuery);
      const publicacionesData = publicacionesSnap.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as LocalPublicacion[];
      setPublicacionesPendientes(publicacionesData);

      // Eventos pendientes
      const eventosQuery = query(
        collection(db, 'eventos'),
        where('approvalStatus', '==', 'pending'),
        orderBy('createdAt', 'desc')
      );
      const eventosSnap = await getDocs(eventosQuery);
      const eventosData = eventosSnap.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as Event[];
      setEventosPendientes(eventosData);

      // ✅ Proyectos pendientes
      const proyectosQuery = query(
        collection(db, 'proyectos'),
        where('approvalStatus', '==', 'pending'),
        orderBy('createdAt', 'desc')
      );
      const proyectosSnap = await getDocs(proyectosQuery);
      const proyectosData = proyectosSnap.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as Project[];
      setProyectosPendientes(proyectosData);

      // Usuarios
      const usuariosSnap = await getDocs(collection(db, 'users'));
      const usuariosData = usuariosSnap.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as LocalUsuario[];
      setUsuarios(usuariosData);
      
      // Estadísticas
      const investigadores = usuariosData.filter(u => u.role === 'investigador').length;
      const admins = usuariosData.filter(u => u.role === 'admin' || u.role === 'super_admin').length;
      const verificados = usuariosData.filter(u => u.verificationStatus === 'verified').length;
      
      setStats({
        totalUsuarios: usuariosData.length,
        totalPublicaciones: 0,
        solicitudesPendientes: solicitudesData.length,
        publicacionesPendientes: publicacionesData.length,
        eventosPendientes: eventosData.length,
        proyectosPendientes: proyectosData.length,
        investigadores,
        admins,
        verificados
      });
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Aprobar proyecto
  const aprobarProyecto = async (proyectoId: string) => {
    try {
      await updateDoc(doc(db, 'proyectos', proyectoId), {
        approvalStatus: 'approved',
        publishedAt: new Date(),
        reviewedBy: user?.uid
      });
      
      toast.success('Proyecto aprobado y publicado');
      loadAllData();
    } catch (error) {
      toast.error('Error al aprobar proyecto');
    }
  };

  // ✅ Rechazar proyecto
  const rechazarProyecto = async (proyectoId: string) => {
    try {
      await updateDoc(doc(db, 'proyectos', proyectoId), {
        approvalStatus: 'rejected',
        rejectedAt: new Date(),
        reviewedBy: user?.uid
      });
      
      toast.success('Proyecto rechazado');
      loadAllData();
    } catch (error) {
      toast.error('Error al rechazar proyecto');
    }
  };

  // ✅ Eliminar proyecto (solo super_admin)
  const eliminarProyecto = async (proyectoId: string) => {
    if (!confirm('¿Estás seguro de eliminar este proyecto permanentemente?')) return;
    
    try {
      await deleteDoc(doc(db, 'proyectos', proyectoId));
      toast.success('Proyecto eliminado');
      loadAllData();
    } catch (error) {
      toast.error('Error al eliminar proyecto');
    }
  };

  // ✅ Aprobar evento
  const aprobarEvento = async (eventoId: string) => {
    try {
      await updateDoc(doc(db, 'eventos', eventoId), {
        approvalStatus: 'approved',
        publishedAt: new Date(),
        reviewedBy: user?.uid
      });
      
      toast.success('Evento aprobado y publicado');
      loadAllData();
    } catch (error) {
      toast.error('Error al aprobar evento');
    }
  };

  // ✅ Rechazar evento
  const rechazarEvento = async (eventoId: string) => {
    try {
      await updateDoc(doc(db, 'eventos', eventoId), {
        approvalStatus: 'rejected',
        rejectedAt: new Date(),
        reviewedBy: user?.uid
      });
      
      toast.success('Evento rechazado');
      loadAllData();
    } catch (error) {
      toast.error('Error al rechazar evento');
    }
  };

  // ✅ Eliminar evento (solo super_admin)
  const eliminarEvento = async (eventoId: string) => {
    if (!confirm('¿Estás seguro de eliminar este evento permanentemente?')) return;
    
    try {
      await deleteDoc(doc(db, 'eventos', eventoId));
      toast.success('Evento eliminado');
      loadAllData();
    } catch (error) {
      toast.error('Error al eliminar evento');
    }
  };

  const aprobarSolicitud = async (solicitudId: string, userId: string) => {
    try {
      await updateDoc(doc(db, 'investigador_solicitudes', solicitudId), {
        status: 'aprobado',
        reviewedAt: new Date()
      });
      
      await updateDoc(doc(db, 'users', userId), {
        role: 'investigador',
        verificationStatus: 'verified',
        verifiedAt: new Date()
      });
      
      toast.success('Solicitud aprobada. Usuario ahora es investigador.');
      loadAllData();
    } catch (error) {
      toast.error('Error al aprobar solicitud');
    }
  };

  const rechazarSolicitud = async (solicitudId: string) => {
    try {
      await updateDoc(doc(db, 'investigador_solicitudes', solicitudId), {
        status: 'rechazado',
        reviewedAt: new Date()
      });
      
      toast.success('Solicitud rechazada');
      loadAllData();
    } catch (error) {
      toast.error('Error al rechazar solicitud');
    }
  };

  const aprobarPublicacion = async (publicacionId: string) => {
    try {
      const publicacion = publicacionesPendientes.find(p => p.id === publicacionId);
      
      await updateDoc(doc(db, 'publicaciones_pendientes', publicacionId), {
        status: 'approved',
        reviewedAt: new Date(),
        reviewedBy: user?.uid
      });
      
      if (publicacion) {
        const { id, ...publicacionData } = publicacion;
        await addDoc(collection(db, 'publicaciones'), {
          ...publicacionData,
          publishedAt: new Date(),
          approvedBy: user?.uid
        });
      }
      
      toast.success('Publicación aprobada');
      loadAllData();
    } catch (error) {
      toast.error('Error al aprobar publicación');
    }
  };

  const cambiarRolUsuario = async (userId: string, newRole: string) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        role: newRole,
        updatedAt: new Date()
      });
      
      toast.success(`Rol actualizado a ${newRole}`);
      loadAllData();
    } catch (error) {
      toast.error('Error al actualizar rol');
    }
  };

  const porcentajeInvestigadores = stats.totalUsuarios > 0 
    ? (stats.investigadores / stats.totalUsuarios) * 100 
    : 0;
  const porcentajeAdmins = stats.totalUsuarios > 0 
    ? (stats.admins / stats.totalUsuarios) * 100 
    : 0;
  const porcentajeMiembros = stats.totalUsuarios > 0 
    ? ((stats.totalUsuarios - stats.investigadores - stats.admins) / stats.totalUsuarios) * 100 
    : 0;
  const porcentajeVerificados = stats.totalUsuarios > 0 
    ? (stats.verificados / stats.totalUsuarios) * 100 
    : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <p className="text-muted-foreground">Gestiona usuarios, solicitudes y contenido del Humboldt Atlas</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-7">
          <TabsTrigger value="dashboard">
            <Activity className="h-4 w-4 mr-2" /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="solicitudes">
            Solicitudes ({stats.solicitudesPendientes})
          </TabsTrigger>
          <TabsTrigger value="publicaciones">
            Publicaciones ({stats.publicacionesPendientes})
          </TabsTrigger>
          <TabsTrigger value="eventos">
            <CalendarPlus className="h-4 w-4 mr-2" /> Eventos ({stats.eventosPendientes})
          </TabsTrigger>
          <TabsTrigger value="proyectos">
            <PlusCircle className="h-4 w-4 mr-2" /> Proyectos ({stats.proyectosPendientes})
          </TabsTrigger>
          <TabsTrigger value="usuarios">
            <Users className="h-4 w-4 mr-2" /> Usuarios
          </TabsTrigger>
          <TabsTrigger value="contenido">
            <BookOpen className="h-4 w-4 mr-2" /> Contenido
          </TabsTrigger>
        </TabsList>

        {/* Dashboard */}
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Usuarios</p>
                    <p className="text-2xl font-bold">{stats.totalUsuarios}</p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Investigadores</p>
                    <p className="text-2xl font-bold">{stats.investigadores}</p>
                  </div>
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Proyectos Pendientes</p>
                    <p className="text-2xl font-bold">{stats.proyectosPendientes}</p>
                  </div>
                  <PlusCircle className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Eventos Pendientes</p>
                    <p className="text-2xl font-bold">{stats.eventosPendientes}</p>
                  </div>
                  <CalendarPlus className="h-8 w-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Usuarios</CardTitle>
                <CardDescription>Por rol en la plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Investigadores</span>
                    <span>{porcentajeInvestigadores.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${porcentajeInvestigadores}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Administradores</span>
                    <span>{porcentajeAdmins.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${porcentajeAdmins}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Miembros</span>
                    <span>{porcentajeMiembros.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-500 rounded-full" style={{ width: `${porcentajeMiembros}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Usuarios Verificados</span>
                    <span>{porcentajeVerificados.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${porcentajeVerificados}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Resumen de actividad en la plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Solicitudes pendientes</p>
                      <p className="text-2xl font-bold text-green-600">{stats.solicitudesPendientes}</p>
                    </div>
                    <UserCheck className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Proyectos pendientes</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.proyectosPendientes}</p>
                    </div>
                    <PlusCircle className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Eventos pendientes</p>
                      <p className="text-2xl font-bold text-amber-600">{stats.eventosPendientes}</p>
                    </div>
                    <CalendarPlus className="h-8 w-8 text-amber-600" />
                  </div>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Usuarios registrados</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.totalUsuarios}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Solicitudes */}
        <TabsContent value="solicitudes">
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes de Investigador</CardTitle>
              <CardDescription>Revisa y aprueba las solicitudes para nuevos investigadores</CardDescription>
            </CardHeader>
            <CardContent>
              {solicitudes.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No hay solicitudes pendientes</p>
              ) : (
                <div className="space-y-4">
                  {solicitudes.map((solicitud) => (
                    <Card key={solicitud.id} className="p-4">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{solicitud.userDisplayName}</h3>
                            <Badge className="bg-yellow-500">Pendiente</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{solicitud.userEmail}</p>
                          <p className="text-sm mt-2"><span className="font-medium">Institución:</span> {solicitud.institucion}</p>
                          <p className="text-sm"><span className="font-medium">Especialidad:</span> {solicitud.especialidad}</p>
                          <p className="text-sm mt-2 text-muted-foreground">{solicitud.motivacion}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedItem(solicitud);
                              setDialogType('solicitud');
                              setDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" /> Ver
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-green-600"
                            onClick={() => aprobarSolicitud(solicitud.id, solicitud.userId)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" /> Aprobar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => rechazarSolicitud(solicitud.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" /> Rechazar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Publicaciones Pendientes */}
        <TabsContent value="publicaciones">
          <Card>
            <CardHeader>
              <CardTitle>Publicaciones Pendientes</CardTitle>
              <CardDescription>Revisa y aprueba los artículos enviados por investigadores</CardDescription>
            </CardHeader>
            <CardContent>
              {publicacionesPendientes.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No hay publicaciones pendientes</p>
              ) : (
                <div className="space-y-4">
                  {publicacionesPendientes.map((pub) => (
                    <Card key={pub.id} className="p-4">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold">{pub.title}</h3>
                          <p className="text-sm text-muted-foreground">Autor: {pub.authorName}</p>
                          <Badge className="mt-1">{pub.type}</Badge>
                          <p className="text-sm mt-2 line-clamp-2">{pub.content}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedItem(pub);
                              setDialogType('publicacion');
                              setDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" /> Leer
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-green-600"
                            onClick={() => aprobarPublicacion(pub.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" /> Aprobar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Eventos Pendientes */}
        <TabsContent value="eventos">
          <Card>
            <CardHeader>
              <CardTitle>Eventos Pendientes de Aprobación</CardTitle>
              <CardDescription>Revisa y aprueba los eventos creados por investigadores</CardDescription>
            </CardHeader>
            <CardContent>
              {eventosPendientes.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No hay eventos pendientes de aprobación</p>
              ) : (
                <div className="space-y-4">
                  {eventosPendientes.map((evento) => (
                    <Card key={evento.id} className="p-4 border-yellow-200 dark:border-yellow-800/50">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{evento.title}</h3>
                            <Badge className="bg-yellow-500">Pendiente</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Organizador: {evento.organizer} • {evento.type}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            📅 {evento.date} {evento.time} • 📍 {evento.location}
                          </p>
                          <p className="text-sm mt-2 line-clamp-2">{evento.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {evento.audience.map((a) => (
                              <Badge key={a} variant="secondary" className="text-xs">
                                {a}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Capacidad: {evento.capacity} • Registrados: {evento.registered}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedItem(evento);
                              setDialogType('evento');
                              setDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" /> Ver
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-green-600"
                            onClick={() => aprobarEvento(evento.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" /> Aprobar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => rechazarEvento(evento.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" /> Rechazar
                          </Button>
                          {userRole === 'super_admin' && (
                            <Button 
                              size="sm" 
                              variant="destructive"
                              className="bg-red-800 hover:bg-red-900"
                              onClick={() => eliminarEvento(evento.id)}
                            >
                              🗑️
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ✅ Proyectos Pendientes */}
        <TabsContent value="proyectos">
          <Card>
            <CardHeader>
              <CardTitle>Proyectos Pendientes de Aprobación</CardTitle>
              <CardDescription>Revisa y aprueba los proyectos creados por investigadores</CardDescription>
            </CardHeader>
            <CardContent>
              {proyectosPendientes.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No hay proyectos pendientes de aprobación</p>
              ) : (
                <div className="space-y-4">
                  {proyectosPendientes.map((proyecto) => (
                    <Card key={proyecto.id} className="p-4 border-purple-200 dark:border-purple-800/50">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{proyecto.title}</h3>
                            <Badge className="bg-yellow-500">Pendiente</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Tipo: {proyecto.type} • Estado: {proyecto.status}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Coordinador: {proyecto.coordinator} • Institución: {proyecto.institution}
                          </p>
                          <p className="text-sm mt-2 line-clamp-2">{proyecto.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {proyecto.researchArea?.map((area) => (
                              <Badge key={area} variant="secondary" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            📅 Inicio: {proyecto.startDate} • Progreso: {proyecto.progress}%
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedItem(proyecto);
                              setDialogType('proyecto');
                              setDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" /> Ver
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-green-600"
                            onClick={() => aprobarProyecto(proyecto.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" /> Aprobar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => rechazarProyecto(proyecto.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" /> Rechazar
                          </Button>
                          {userRole === 'super_admin' && (
                            <Button 
                              size="sm" 
                              variant="destructive"
                              className="bg-red-800 hover:bg-red-900"
                              onClick={() => eliminarProyecto(proyecto.id)}
                            >
                              🗑️
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usuarios */}
        <TabsContent value="usuarios">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>Administra los roles y estados de los usuarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Usuario</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Rol</th>
                      <th className="text-left py-3 px-4">Estado</th>
                      <th className="text-left py-3 px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((usuario) => (
                      <tr key={usuario.id} className="border-b">
                        <td className="py-3 px-4">{usuario.displayName || '—'}</td>
                        <td className="py-3 px-4">{usuario.email}</td>
                        <td className="py-3 px-4">
                          <Badge className={
                            usuario.role === 'admin' || usuario.role === 'super_admin' ? 'bg-purple-500' :
                            usuario.role === 'investigador' ? 'bg-green-500' :
                            'bg-gray-500'
                          }>
                            {usuario.role || 'basic'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">
                            {usuario.verificationStatus === 'verified' ? 'Verificado' : 'Pendiente'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Select 
                            defaultValue={usuario.role || 'basic'}
                            onValueChange={(value) => cambiarRolUsuario(usuario.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">Miembro</SelectItem>
                              <SelectItem value="investigador">Investigador</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="super_admin">Super Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contenido */}
        <TabsContent value="contenido">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Contenido</CardTitle>
              <CardDescription>Crea y gestiona especies, eventos y proyectos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-12 w-12 mx-auto text-green-600 mb-3" />
                    <h3 className="font-semibold">Especies</h3>
                    <p className="text-sm text-muted-foreground">Gestionar catálogo de especies</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <a href="/especies">Administrar</a>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-12 w-12 mx-auto text-blue-600 mb-3" />
                    <h3 className="font-semibold">Eventos</h3>
                    <p className="text-sm text-muted-foreground">Gestionar eventos y actividades</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <a href="/eventos">Administrar</a>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-12 w-12 mx-auto text-purple-600 mb-3" />
                    <h3 className="font-semibold">Proyectos</h3>
                    <p className="text-sm text-muted-foreground">Gestionar proyectos de investigación</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <a href="/proyectos">Administrar</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo de detalle */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'solicitud' && 'Detalle de Solicitud'}
              {dialogType === 'publicacion' && 'Detalle de Publicación'}
              {dialogType === 'evento' && 'Detalle de Evento'}
              {dialogType === 'proyecto' && 'Detalle de Proyecto'}
            </DialogTitle>
            <DialogDescription>
              {dialogType === 'solicitud' && 'Revisa la información del solicitante'}
              {dialogType === 'publicacion' && 'Revisa el contenido de la publicación'}
              {dialogType === 'evento' && 'Revisa la información del evento'}
              {dialogType === 'proyecto' && 'Revisa la información del proyecto'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {dialogType === 'solicitud' && selectedItem && (
              <div className="space-y-3">
                <p><strong>Nombre:</strong> {selectedItem.userDisplayName}</p>
                <p><strong>Email:</strong> {selectedItem.userEmail}</p>
                <p><strong>Institución:</strong> {selectedItem.institucion}</p>
                <p><strong>Especialidad:</strong> {selectedItem.especialidad}</p>
                <p><strong>Motivación:</strong> {selectedItem.motivacion}</p>
              </div>
            )}
            {dialogType === 'publicacion' && selectedItem && (
              <div className="space-y-3">
                <p><strong>Título:</strong> {selectedItem.title}</p>
                <p><strong>Autor:</strong> {selectedItem.authorName}</p>
                <p><strong>Tipo:</strong> {selectedItem.type}</p>
                <p><strong>Contenido:</strong></p>
                <p className="text-muted-foreground whitespace-pre-wrap">{selectedItem.content}</p>
              </div>
            )}
            {dialogType === 'evento' && selectedItem && (
              <div className="space-y-3">
                <p><strong>Título:</strong> {selectedItem.title}</p>
                <p><strong>Organizador:</strong> {selectedItem.organizer}</p>
                <p><strong>Fecha:</strong> {selectedItem.date} {selectedItem.time}</p>
                <p><strong>Ubicación:</strong> {selectedItem.location}</p>
                <p><strong>Capacidad:</strong> {selectedItem.capacity}</p>
                <p><strong>Audiencia:</strong> {selectedItem.audience?.join(', ')}</p>
                <p><strong>Descripción:</strong></p>
                <p className="text-muted-foreground whitespace-pre-wrap">{selectedItem.description}</p>
                {selectedItem.requirements?.length > 0 && (
                  <p><strong>Requisitos:</strong> {selectedItem.requirements.join(', ')}</p>
                )}
              </div>
            )}
            {dialogType === 'proyecto' && selectedItem && (
              <div className="space-y-3">
                <p><strong>Título:</strong> {selectedItem.title}</p>
                <p><strong>Coordinador:</strong> {selectedItem.coordinator}</p>
                <p><strong>Institución:</strong> {selectedItem.institution}</p>
                <p><strong>Tipo:</strong> {selectedItem.type}</p>
                <p><strong>Estado:</strong> {selectedItem.status}</p>
                <p><strong>Ubicación:</strong> {selectedItem.location}</p>
                <p><strong>Progreso:</strong> {selectedItem.progress}%</p>
                <p><strong>Descripción:</strong></p>
                <p className="text-muted-foreground whitespace-pre-wrap">{selectedItem.description}</p>
                {selectedItem.objectives && (
                  <>
                    <p><strong>Objetivos:</strong></p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {selectedItem.objectives.map((obj: string, i: number) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}