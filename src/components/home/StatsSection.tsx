'use client';

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Leaf, Bird, TreePine, Users, FlaskRound, Target } from "lucide-react";

const stats = [
  {
    icon: Leaf,
    value: "900+",
    label: "Especies endémicas",
    description: "Encontradas solo en esta región",
    color: "text-emerald-500",
    bg: "bg-emerald-500/20"
  },
  {
    icon: Bird,
    value: "200+",
    label: "Aves migratorias",
    description: "Visitantes anuales de Norteamérica",
    color: "text-amber-500",
    bg: "bg-amber-500/20"
  },
  {
    icon: TreePine,
    value: "70,000",
    label: "Hectáreas protegidas",
    description: "Área total del Parque Nacional",
    color: "text-green-600",
    bg: "bg-green-600/20"
  },
  {
    icon: Users,
    value: "2,500+",
    label: "Participantes",
    description: "En actividades educativas anuales",
    color: "text-blue-500",
    bg: "bg-blue-500/20"
  },
  {
    icon: FlaskRound,
    value: "15",
    label: "Proyectos activos",
    description: "Investigación científica en curso",
    color: "text-purple-500",
    bg: "bg-purple-500/20"
  },
  {
    icon: Target,
    value: "2030",
    label: "Meta: Carbono neutral",
    description: "Compromiso de conservación",
    color: "text-rose-500",
    bg: "bg-rose-500/20"
  }
];

export function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Fondo espectacular del bosque con next/image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/home/stats-bosque.jpg"
          alt="Bosque del Parque Humboldt"
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
          priority={false}
        />
        {/* Overlay oscuro con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        
        {/* Efecto de niebla/bruma */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Impacto en Números
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Nuestro compromiso con la conservación y la educación ambiental en cifras
          </p>
          <div className="w-24 h-1 bg-green-500 mx-auto mt-4" />
        </div>

        {/* Grid de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.label} 
                className="p-6 backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${stat.bg} backdrop-blur-sm`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="font-semibold text-white/90 mb-1">{stat.label}</div>
                    <div className="text-sm text-white/70">{stat.description}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Decoración inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}