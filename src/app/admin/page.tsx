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
  addDoc
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
  PenTool
} from 'lucide-react';
import { toast } from 'sonner';
// ✅ Importar los tipos del panel de admin
import { 
  AdminSolicitud, 
  AdminPublicacionPendiente, 
  AdminUsuario,
  AdminStats
} from '@/types';

// Interfaces locales para el panel (evitan conflictos con tipos complejos)
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
  
  // Estados con interfaces locales
  const [solicitudes, setSolicitudes] = useState<LocalSolicitud[]>([]);
  const [publicacionesPendientes, setPublicacionesPendientes] = useState<LocalPublicacion[]>([]);
  const [usuarios, setUsuarios] = useState<LocalUsuario[]>([]);
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    totalPublicaciones: 0,
    solicitudesPendientes: 0,
    publicacionesPendientes: 0,
    investigadores: 0,
    admins: 0,
    verificados: 0
  });
  
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');

  // Verificar permisos de admin
  useEffect(() => {
    if (!authLoading && (!user || (userRole !== 'admin' && userRole !== 'super_admin'))) {
      router.push('/');
    }
  }, [user, userRole, authLoading, router]);

  // Cargar datos
  useEffect(() => {
    if (user && (userRole === 'admin' || userRole === 'super_admin')) {
      loadAllData();
    }
  }, [user, userRole]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      // 1. Cargar solicitudes de investigadores
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

      // 2. Cargar publicaciones pendientes
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

      // 3. Cargar usuarios
      const usuariosSnap = await getDocs(collection(db, 'users'));
      const usuariosData = usuariosSnap.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as LocalUsuario[];
      setUsuarios(usuariosData);
      
      // 4. Calcular estadísticas
      const investigadores = usuariosData.filter(u => u.role === 'investigador').length;
      const admins = usuariosData.filter(u => u.role === 'admin' || u.role === 'super_admin').length;
      const verificados = usuariosData.filter(u => u.verificationStatus === 'verified').length;
      
      setStats({
        totalUsuarios: usuariosData.length,
        totalPublicaciones: 0,
        solicitudesPendientes: solicitudesData.length,
        publicacionesPendientes: publicacionesData.length,
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

  // Calcular porcentajes
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
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="dashboard">
            <Activity className="h-4 w-4 mr-2" /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="solicitudes">
            Solicitudes ({stats.solicitudesPendientes})
          </TabsTrigger>
          <TabsTrigger value="publicaciones">
            Publicaciones ({stats.publicacionesPendientes})
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
                    <p className="text-sm text-muted-foreground">Solicitudes Pendientes</p>
                    <p className="text-2xl font-bold">{stats.solicitudesPendientes}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Publicaciones Pendientes</p>
                    <p className="text-2xl font-bold">{stats.publicacionesPendientes}</p>
                  </div>
                  <FileText className="h-8 w-8 text-purple-600" />
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
                      <p className="text-sm text-muted-foreground">Publicaciones pendientes</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.publicacionesPendientes}</p>
                    </div>
                    <PenTool className="h-8 w-8 text-purple-600" />
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
                    <Button variant="outline" className="mt-4">Administrar</Button>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-12 w-12 mx-auto text-purple-600 mb-3" />
                    <h3 className="font-semibold">Proyectos</h3>
                    <p className="text-sm text-muted-foreground">Gestionar proyectos de investigación</p>
                    <Button variant="outline" className="mt-4">Administrar</Button>
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
              {dialogType === 'solicitud' ? 'Detalle de Solicitud' : 'Detalle de Publicación'}
            </DialogTitle>
            <DialogDescription>
              {dialogType === 'solicitud' 
                ? 'Revisa la información del solicitante' 
                : 'Revisa el contenido de la publicación'}
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}