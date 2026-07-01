'use client';

import Link from "next/link";  // ← Cambio clave
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-green-900 to-green-950 text-white overflow-hidden">
      {/* Fondo decorativo con patrones de hojas */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leaf-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 10 Q40 10 40 20 Q40 30 30 30 Q20 30 20 20 Q20 10 30 10" 
                    fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
        </svg>
      </div>

      {/* Línea divisoria superior con gradiente */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent" />

      <div className="relative container mx-auto px-4 py-12">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Columna 1: Logo y descripción */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-600 rounded-lg">
                <span className="text-2xl font-bold text-white">🌿</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                Humboldt Atlas
              </span>
            </div>
            <p className="text-green-100/80 leading-relaxed">
              Conectando personas con la biodiversidad del Parque Nacional Alejandro de Humboldt, 
              Patrimonio de la Humanidad.
            </p>
            
            {/* Stats rápidas */}
            <div className="flex gap-4 pt-2">
              <div>
                <div className="text-2xl font-bold text-green-400">22+</div>
                <div className="text-xs text-green-100/60">Especies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">15+</div>
                <div className="text-xs text-green-100/60">Proyectos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">5</div>
                <div className="text-xs text-green-100/60">Comunidades</div>
              </div>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold relative inline-block">
              Explorar
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-green-500 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Inicio", href: "#" },
                { name: "Especies", href: "#especies" },
                { name: "Eventos", href: "#eventos" },
                { name: "Proyectos", href: "#proyectos" },
                { name: "Galería", href: "#galeria" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-green-100/70 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-green-500 rounded-full group-hover:w-2 transition-all" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold relative inline-block">
              Contacto
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-green-500 rounded-full" />
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-green-100/70">
                  Parque Nacional Alejandro de Humboldt, Cuba
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-400 shrink-0" />
                <a href="mailto:info@humboldtpark.eco" className="text-green-100/70 hover:text-green-400 transition-colors">
                  info@humboldtpark.eco
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-400 shrink-0" />
                <a href="tel:+5352112345" className="text-green-100/70 hover:text-green-400 transition-colors">
                  +53 52 112345
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold relative inline-block">
              Newsletter
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-green-500 rounded-full" />
            </h3>
            <p className="text-green-100/70 text-sm">
              Recibe las últimas noticias sobre eventos y descubrimientos.
            </p>
            <div className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-green-500 focus:ring-green-500"
              />
              <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
                Suscribirme
              </Button>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-white/10 my-8" />

        {/* Fila inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-green-100/60 flex items-center gap-1">
            <span>© {currentYear} Humboldt Atlas.</span>
            <span className="flex items-center gap-1">
              Hecho con <Heart className="h-3 w-3 text-red-400 fill-red-400" /> en Cuba
            </span>
          </div>

          {/* Redes sociales */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="p-2 bg-white/10 rounded-lg hover:bg-green-600 transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-lg hover:bg-green-600 transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-lg hover:bg-green-600 transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-lg hover:bg-green-600 transition-colors duration-200"
              aria-label="YouTube"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-lg hover:bg-green-600 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>

         {/* Enlaces legales */}
<div className="flex gap-4 text-sm">
        <Link 
          href="/privacidad" 
          className="text-green-100/60 hover:text-green-400 transition-colors"
        >
          Privacidad
        </Link>
        <Link 
          href="/terminos" 
          className="text-green-100/60 hover:text-green-400 transition-colors"
        >
          Términos
        </Link>
      </div>
        </div>

        {/* Badge de reconocimiento */}
        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs text-green-100/60">
            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
            Reconocido por la UNESCO como Reserva de la Biosfera
          </span>
        </div>
      </div>
    </footer>
  );
}