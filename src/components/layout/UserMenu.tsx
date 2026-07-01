'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, FileText, Camera, Shield, LayoutDashboard, Loader2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export function UserMenu() {
  const { user, userRole, loading, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Sesión cerrada correctamente');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  if (loading) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Loader2 className="h-5 w-5 animate-spin" />
      </Button>
    );
  }

  if (!user) {
    return (
      <Link href="/auth/login">
        <Button variant="outline" className="gap-2">
          <User className="h-4 w-4" />
          Iniciar Sesión
        </Button>
      </Link>
    );
  }

  const initials = user.email?.[0].toUpperCase() || 'U';
  const isAdmin = userRole === 'admin' || userRole === 'super_admin';
  const isInvestigador = userRole === 'investigador';
  const puedeCrearEspecies = isAdmin || isInvestigador; // ✅ Admins e investigadores pueden crear especies

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            {initials}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="truncate">{user.email}</span>
            <span className="text-xs text-muted-foreground">
              {isAdmin ? '👑 Administrador' : 
               isInvestigador ? '🔬 Investigador' : 
               userRole === 'super_admin' ? '⭐ Super Admin' : '🌿 Miembro'}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/perfil" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Mi Perfil
          </Link>
        </DropdownMenuItem>

        {/* Panel de Administración - SOLO para admins */}
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link href="/admin" className="cursor-pointer">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Panel de Administración
            </Link>
          </DropdownMenuItem>
        )}

        {/* ✅ NUEVA ESPECIE - Para admins e investigadores */}
        {puedeCrearEspecies && (
          <DropdownMenuItem asChild>
            <Link href="/investigador/nueva-especie" className="cursor-pointer">
              <ImageIcon className="mr-2 h-4 w-4" />
              Nueva Especie
            </Link>
          </DropdownMenuItem>
        )}

        {/* Nuevo Artículo - Solo para investigadores (no admins) */}
        {isInvestigador && (
          <DropdownMenuItem asChild>
            <Link href="/investigador/nuevo-articulo" className="cursor-pointer">
              <FileText className="mr-2 h-4 w-4" />
              Nuevo Artículo
            </Link>
          </DropdownMenuItem>
        )}

        {/* Para todos los usuarios autenticados */}
        <DropdownMenuItem asChild>
          <Link href="/ciudadano/reportar" className="cursor-pointer">
            <Camera className="mr-2 h-4 w-4" />
            Reportar Avistamiento
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}