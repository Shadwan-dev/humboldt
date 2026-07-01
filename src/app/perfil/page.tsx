'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, getDoc, updateDoc, collection, query, where, getDocs, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Star, 
  Award, 
  Edit2,
  Save,
  CheckCircle,
  Clock,
  XCircle,
  ExternalLink,
  Heart,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
// ✅ Importar los tipos del perfil
import { 
  ProfilePublication, 
  ProfileComment, 
  ProfileFollowedProject,
  ProfileBadge 
} from '@/types';
// Función auxiliar para manejar fechas de Firestore
function safeToDate(value: any): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === 'object' && value !== null && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate();
  }
  const date = new Date(value);
  if (!isNaN(date.getTime())) return date;
  return null;
}

export default function PerfilPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: '',
    bio: '',
    institution: '',
    specialty: '',
    twitter: '',
    linkedin: '',
    googleScholar: ''
  });

  const [publications, setPublications] = useState<any[]>([]);
  const [pendingPublications, setPendingPublications] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [followedProjects, setFollowedProjects] = useState<any[]>([]);

  const [solicitud, setSolicitud] = useState({
    tipoIdentificacion: 'ci',
    numeroIdentificacion: '',
    institucion: '',
    especialidad: '',
    motivacion: ''
  });
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);

  // Redirigir si no hay usuario
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  // Cargar datos del usuario
  useEffect(() => {
    if (user) {
      loadUserData();
      verificarSolicitudExistente();
    }
  }, [user]);

  const verificarSolicitudExistente = async () => {
    if (!user) return;
    try {
      const solicitudDoc = await getDoc(doc(db, 'investigador_solicitudes', user.uid));
      if (solicitudDoc.exists()) {
        const data = solicitudDoc.data();
        if (data.status === 'pendiente') {
          setSolicitudEnviada(true);
        }
      }
    } catch (error) {
      console.log('Error verificando solicitud:', error);
    }
  };

  const loadUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      let userData: any;
      
      if (!userDoc.exists()) {
        const newUserData = {
          uid: user.uid,
          email: user.email,
          displayName: user.email?.split('@')[0] || '',
          role: 'basic',
          verificationStatus: 'pending',
          bio: '',
          institution: '',
          specialty: '',
          socialLinks: {},
          stats: { contributions: 0, publications: 0, comments: 0, projectsFollowed: 0 },
          badges: [],
          createdAt: new Date(),
          lastLogin: new Date(),
          followedProjects: []
        };
        
        await setDoc(userDocRef, newUserData);
        userData = newUserData;
      } else {
        userData = userDoc.data() as any;
      }
      
      setProfile(userData);
      setEditForm({
        displayName: userData.displayName || user.email?.split('@')[0] || '',
        bio: userData.bio || '',
        institution: userData.institution || '',
        specialty: userData.specialty || '',
        twitter: userData.socialLinks?.twitter || '',
        linkedin: userData.socialLinks?.linkedin || '',
        googleScholar: userData.socialLinks?.googleScholar || ''
      });

      // Cargar publicaciones
      try {
        const publicationsQuery = query(
          collection(db, 'publicaciones'),
          where('authorId', '==', user.uid),
          where('status', '==', 'published')
        );
        const publicationsSnap = await getDocs(publicationsQuery);
        const pubsData = publicationsSnap.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        })) as any[];
        setPublications(pubsData);
      } catch (error) {
        setPublications([]);
      }

      try {
        const pendingQuery = query(
          collection(db, 'publicaciones_pendientes'),
          where('authorId', '==', user.uid)
        );
        const pendingSnap = await getDocs(pendingQuery);
        const pendingData = pendingSnap.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        })) as any[];
        setPendingPublications(pendingData);
      } catch (error) {
        setPendingPublications([]);
      }

      try {
        const commentsQuery = query(
          collection(db, 'comentarios'),
          where('authorId', '==', user.uid)
        );
        const commentsSnap = await getDocs(commentsQuery);
        const commentsData = commentsSnap.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        })) as any[];
        setComments(commentsData);
      } catch (error) {
        setComments([]);
      }

      // Cargar proyectos seguidos con acceso seguro
      const followedProjectsData = userData?.followedProjects;
      if (followedProjectsData && Array.isArray(followedProjectsData)) {
        setFollowedProjects(followedProjectsData);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Error al cargar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleSolicitudInvestigador = async () => {
    if (!user) return;
    
    // Validar campos
    if (!solicitud.numeroIdentificacion) {
      toast.error('Por favor, ingresa tu número de identificación');
      return;
    }
    if (!solicitud.institucion) {
      toast.error('Por favor, ingresa tu institución');
      return;
    }
    if (!solicitud.especialidad) {
      toast.error('Por favor, ingresa tu especialidad');
      return;
    }
    if (!solicitud.motivacion) {
      toast.error('Por favor, explica tu motivación');
      return;
    }

    setLoading(true);
    try {
      await setDoc(doc(db, 'investigador_solicitudes', user.uid), {
        userId: user.uid,
        userEmail: user.email,
        userDisplayName: profile?.displayName || user.email?.split('@')[0],
        identificacion: {
          tipo: solicitud.tipoIdentificacion,
          numero: solicitud.numeroIdentificacion,
        },
        institucion: solicitud.institucion,
        especialidad: solicitud.especialidad,
        motivacion: solicitud.motivacion,
        status: 'pendiente',
        createdAt: new Date(),
      });
      
      toast.success('Solicitud enviada. Espera revisión del administrador.');
      setSolicitudEnviada(true);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: editForm.displayName,
        bio: editForm.bio,
        institution: editForm.institution,
        specialty: editForm.specialty,
        socialLinks: {
          twitter: editForm.twitter,
          linkedin: editForm.linkedin,
          googleScholar: editForm.googleScholar
        },
        updatedAt: new Date()
      });
      
      setProfile({ ...profile, ...editForm });
      setEditing(false);
      toast.success('Perfil actualizado correctamente');
    } catch (error) {
      toast.error('Error al actualizar el perfil');
    }
  };

  const getRoleBadge = (role: string) => {
    const roles: Record<string, { label: string; color: string }> = {
      basic: { label: 'Miembro', color: 'bg-gray-500' },
      validado: { label: 'Verificado', color: 'bg-blue-500' },
      investigador: { label: 'Investigador', color: 'bg-green-500' },
      admin: { label: 'Administrador', color: 'bg-purple-500' },
      super_admin: { label: 'Super Admin', color: 'bg-amber-500' }
    };
    const r = roles[role] || roles.basic;
    return <Badge className={`${r.color} text-white`}>{r.label}</Badge>;
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500 text-white"><CheckCircle className="h-3 w-3 mr-1" /> Verificado</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 text-white"><Clock className="h-3 w-3 mr-1" /> Pendiente</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 text-white"><XCircle className="h-3 w-3 mr-1" /> Rechazado</Badge>;
      default:
        return <Badge variant="outline">No verificado</Badge>;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stats = [
    { label: 'Publicaciones', value: publications.length, icon: FileText },
    { label: 'Pendientes', value: pendingPublications.length, icon: Clock },
    { label: 'Comentarios', value: comments.length, icon: MessageSquare },
    { label: 'Proyectos', value: followedProjects.length, icon: Star },
    { label: 'Logros', value: profile?.badges?.length || 0, icon: Award }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header del Perfil */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl opacity-10" />
          <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 bg-card rounded-2xl shadow-lg">
            <Avatar className="h-24 w-24 border-4 border-green-500">
              <AvatarFallback className="text-2xl bg-green-100 text-green-700">
                {profile?.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{profile?.displayName || user.email?.split('@')[0]}</h1>
                {getRoleBadge(profile?.role || 'basic')}
                {getVerificationBadge(profile?.verificationStatus || 'pending')}
              </div>
              <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {user.email}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <Calendar className="h-4 w-4 inline mr-2" />
                Miembro desde {(() => {
                  const date = safeToDate(profile?.createdAt);
                  return date ? date.toLocaleDateString('es') : 'recientemente';
                })()}
              </p>
              {profile?.bio && <p className="mt-3 text-sm">{profile.bio}</p>}
            </div>
            
            <Button variant="outline" onClick={() => setEditing(!editing)}>
              <Edit2 className="h-4 w-4 mr-2" />
              {editing ? 'Cancelar' : 'Editar Perfil'}
            </Button>
          </div>
        </div>

        {/* Editar Perfil */}
        {editing && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Editar Perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input value={editForm.displayName} onChange={(e) => setEditForm({...editForm, displayName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Institución</Label>
                  <Input value={editForm.institution} onChange={(e) => setEditForm({...editForm, institution: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Especialidad</Label>
                  <Input value={editForm.specialty} onChange={(e) => setEditForm({...editForm, specialty: e.target.value})} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Biografía</Label>
                  <Textarea rows={3} value={editForm.bio} onChange={(e) => setEditForm({...editForm, bio: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Twitter</Label>
                  <Input placeholder="@usuario" value={editForm.twitter} onChange={(e) => setEditForm({...editForm, twitter: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>LinkedIn</Label>
                  <Input placeholder="URL" value={editForm.linkedin} onChange={(e) => setEditForm({...editForm, linkedin: e.target.value})} />
                </div>
              </div>
              <Button onClick={handleSaveProfile} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="text-center p-4">
                <Icon className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="publicaciones" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="publicaciones">Publicaciones</TabsTrigger>
            <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
            <TabsTrigger value="comentarios">Comentarios</TabsTrigger>
            <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
            <TabsTrigger value="solicitudes">Ser Investigador</TabsTrigger>
            <TabsTrigger value="logros">Logros</TabsTrigger>
          </TabsList>

          {/* Publicaciones Aprobadas */}
          <TabsContent value="publicaciones">
            <Card>
              <CardHeader>
                <CardTitle>Mis Publicaciones</CardTitle>
                <CardDescription>Artículos y contenido aprobado</CardDescription>
              </CardHeader>
              <CardContent>
                {publications.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Aún no tienes publicaciones aprobadas</p>
                ) : (
                  <div className="space-y-4">
                    {publications.map((pub: any) => (
                      <Card key={pub.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{pub.title}</h3>
                            <Badge className="mt-2">{pub.type}</Badge>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/publicaciones/${pub.id}`}>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Publicaciones Pendientes */}
          <TabsContent value="pendientes">
            <Card>
              <CardHeader>
                <CardTitle>Publicaciones Pendientes</CardTitle>
                <CardDescription>Contenido en espera de revisión</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingPublications.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No tienes publicaciones pendientes</p>
                ) : (
                  <div className="space-y-4">
                    {pendingPublications.map((pub: any) => (
                      <Card key={pub.id} className="p-4 border-yellow-200 bg-yellow-50/30">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{pub.title}</h3>
                            <Badge variant="outline" className="mt-2 bg-yellow-100">Pendiente</Badge>
                          </div>
                          <Clock className="h-5 w-5 text-yellow-600" />
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comentarios */}
          <TabsContent value="comentarios">
            <Card>
              <CardHeader>
                <CardTitle>Mis Comentarios</CardTitle>
                <CardDescription>Historial de participación en la comunidad</CardDescription>
              </CardHeader>
              <CardContent>
                {comments.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No has realizado comentarios</p>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment: any) => (
                      <Card key={comment.id} className="p-4">
                        <p className="text-sm">{comment.content}</p>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Proyectos Seguidos */}
          <TabsContent value="proyectos">
            <Card>
              <CardHeader>
                <CardTitle>Proyectos que Sigo</CardTitle>
                <CardDescription>Investigaciones que me interesan</CardDescription>
              </CardHeader>
              <CardContent>
                {followedProjects.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No sigues ningún proyecto aún</p>
                ) : (
                  <div className="space-y-4">
                    {followedProjects.map((project: any) => (
                      <Card key={project.projectId} className="p-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{project.projectTitle}</h3>
                          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Solicitud Investigador */}
          <TabsContent value="solicitudes">
            <Card>
              <CardHeader>
                <CardTitle>Solicitar ser Investigador</CardTitle>
                <CardDescription>
                  Completa el formulario para solicitar permisos de investigador y poder publicar contenido
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {solicitudEnviada ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Solicitud Enviada</h3>
                    <p className="text-muted-foreground">
                      Tu solicitud está siendo revisada por el administrador.
                      Recibirás una notificación cuando sea aprobada.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label>Tipo de Identificación</Label>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={solicitud.tipoIdentificacion}
                        onChange={(e) => setSolicitud({...solicitud, tipoIdentificacion: e.target.value})}
                      >
                        <option value="ci">Carnet de Identidad</option>
                        <option value="pasaporte">Pasaporte</option>
                        <option value="carnet">Carnet Universitario</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>Número de Identificación</Label>
                      <Input 
                        placeholder="Ej: 123456789" 
                        value={solicitud.numeroIdentificacion}
                        onChange={(e) => setSolicitud({...solicitud, numeroIdentificacion: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Institución</Label>
                      <Input 
                        placeholder="Universidad / Centro de Investigación" 
                        value={solicitud.institucion}
                        onChange={(e) => setSolicitud({...solicitud, institucion: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Especialidad</Label>
                      <Input 
                        placeholder="Ej: Biología Marina, Botánica, Ornitología" 
                        value={solicitud.especialidad}
                        onChange={(e) => setSolicitud({...solicitud, especialidad: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Motivación</Label>
                      <Textarea 
                        rows={4}
                        placeholder="¿Por qué quieres ser investigador en Humboldt Atlas?" 
                        value={solicitud.motivacion}
                        onChange={(e) => setSolicitud({...solicitud, motivacion: e.target.value})}
                      />
                    </div>

                    <Button 
                      onClick={handleSolicitudInvestigador} 
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? 'Enviando...' : 'Solicitar acceso como Investigador'}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logros */}
          <TabsContent value="logros">
            <Card>
              <CardHeader>
                <CardTitle>Mis Logros</CardTitle>
                <CardDescription>Insignias y reconocimientos obtenidos</CardDescription>
              </CardHeader>
              <CardContent>
                {!profile?.badges || profile.badges.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Aún no tienes insignias. ¡Participa más!</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {profile.badges.map((badge: any) => (
                      <Card key={badge.id} className="p-4 text-center">
                        <div className="text-4xl mb-2">{badge.icon}</div>
                        <h3 className="font-semibold text-sm">{badge.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}