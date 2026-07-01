'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Bird, Users } from "lucide-react";

interface HeroSectionProps {
  onExploreClick?: () => void;
  onEventsClick?: () => void;
}

export function HeroSection({ onExploreClick, onEventsClick }: HeroSectionProps) {
  const router = useRouter();

  const handleExploreClick = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      router.push('/especies');
    }
  };

  const handleEventsClick = () => {
    if (onEventsClick) {
      onEventsClick();
    } else {
      router.push('/eventos');
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay - usando next/image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg"
          alt="Parque Nacional Alejandro de Humboldt - Bosque húmedo tropical"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-600/20 backdrop-blur-sm text-green-300 px-4 py-2 rounded-full mb-6 border border-green-500/30">
            <Leaf className="h-4 w-4" />
            <span className="text-sm font-medium">Patrimonio de la Humanidad - UNESCO</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Parque Nacional
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              Alejandro de Humboldt
            </span>            
          </h1>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Baracoa                     
          </h1>

          {/* Description */}
          <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            El santuario de biodiversidad más importante del Caribe, donde la ciencia, 
            la conservación y las comunidades trabajan juntos para proteger nuestro 
            patrimonio natural.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mb-10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                <Leaf className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">+900</div>
                <div className="text-sm text-white/70">Especies endémicas</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                <Bird className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">+200</div>
                <div className="text-sm text-white/70">Aves migratorias</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">15</div>
                <div className="text-sm text-white/70">Comunidades locales</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8"
              onClick={handleExploreClick}
            >
              Explorar especies
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              onClick={handleEventsClick}
            >
              Actividades comunitarias
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}