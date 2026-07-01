🌿 Humboldt Atlas

Explorando la biodiversidad del Parque Nacional Alejandro de Humboldt

https://img.shields.io/badge/React-19-61DAFB?logo=react
https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript
https://img.shields.io/badge/Next.js-15-000000?logo=next.js
https://img.shields.io/badge/Firebase-10-FFCA28?logo=firebase
https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css
https://img.shields.io/badge/shadcn%252Fui-latest-000000
https://img.shields.io/badge/license-MIT-green
📋 Tabla de Contenidos

    Descripción

    Fase 1: Proyecto Base (Completada ✅)

    Fase 2: Next.js + Firebase Roadmap (En Progreso 🚀)

    Stack Tecnológico

    Estructura del Proyecto

    Instalación y Configuración

    Uso

    Estado del Proyecto

    Próximos Pasos

    Contribuir

    Licencia

    Contacto

🌎 Descripción

Humboldt Atlas es una plataforma digital interactiva dedicada a la divulgación científica, educación ambiental y ciencia ciudadana del Parque Nacional Alejandro de Humboldt, declarado Patrimonio de la Humanidad por la UNESCO.

El proyecto surge de la necesidad de conectar a investigadores, comunidades locales, estudiantes y visitantes con la increíble biodiversidad de este santuario caribeño, promoviendo su conservación a través de la tecnología y la participación ciudadana.
Misión

    Democratizar el conocimiento sobre la biodiversidad del Parque Humboldt y fomentar la participación comunitaria en su conservación.

Visión

    Ser la plataforma de referencia para la investigación, educación y turismo sostenible en el Caribe insular.

✅ Fase 1: Proyecto Base (Completada)
🏠 Página de Inicio

    Hero section con imagen espectacular del bosque tropical

    Estadísticas de impacto en tarjetas con glassmorphism

    Llamadas a la acción para explorar especies y eventos

    StatsSection con fondo inmersivo

🦋 Galería de Especies

    22 especies documentadas (8 originales + 14 nuevas endémicas cubanas)

    Grid con efecto masonry para presentación dinámica

    Tarjetas interactivas con:

        Imagen de la especie (cargada localmente desde /public/img/especies/)

        Nombre común y científico

        Badges de categoría (fauna/flora) y estatus (endémica/migratoria/nativa)

        Overlay con información al hacer hover

    Filtros avanzados:

        Por tipo (fauna/flora)

        Por estatus (endémica/migratoria/nativa)

        Búsqueda por nombre o descripción

    Modal de detalle con:

        Imagen ampliada

        Descripción completa

        Estado de conservación (con códigos de color)

        Ubicación/hábitat

📅 Sección de Eventos

    Tarjetas de eventos comunitarios y círculos de interés

    Badges visuales por tipo (taller, círculo, charla, excursión, voluntariado)

    Indicadores de capacidad y disponibilidad

    Información de contacto y requisitos

    Filtros por tipo de evento

    Modal de detalle con toda la información

🔬 Sección de Proyectos Científicos

    Proyectos de investigación en:

        Carbono 14 y cambio climático

        Manglares y carbono azul

        Conservación de especies endémicas

        Restauración de ecosistemas

    Tarjetas con:

        Barra de progreso

        Institución líder

        Áreas de investigación

        Colaboradores

    Modal con tabs para:

        Información general

        Objetivos y logros

        Equipo colaborador

        Publicaciones científicas

📄 Páginas Legales

    Términos y Condiciones con diseño profesional

    Política de Privacidad con certificaciones GDPR

    Sistema de rutas con React Router DOM

🎨 Diseño y UX

    Tema claro/oscuro con persistencia

    Diseño responsivo para todos los dispositivos

    Glassmorphism y efectos visuales modernos

    Animaciones suaves en hover y transiciones

    Navegación por tabs entre secciones

    Footer completo con:

        Enlaces de navegación

        Información de contacto

        Newsletter

        Redes sociales

        Enlaces legales funcionales

    Botón "volver arriba" flotante

    Sistema de imágenes local con 22+ imágenes optimizadas

📊 Datos y Contenido

    22 especies endémicas cubanas documentadas

    5 eventos comunitarios registrados

    4 proyectos científicos activos

    Cobertura taxonómica: Aves, mamíferos, reptiles, anfibios, flora

    Especies emblemáticas: Tocororo, Zunzuncito, Cocodrilo Cubano, Manatí, Almiquí, Palma Corcho

🚀 Fase 2: Next.js + Firebase Roadmap (En Progreso)
Sprint 1: Migración a Next.js (Semanas 1-2)

    Plan de migración definido

    Crear nuevo proyecto Next.js con App Router

    Migrar componentes existentes (gallery, events, projects)

    Adaptar imágenes al componente next/image

    Configurar shadcn/ui en Next.js

    Implementar sistema de rutas con App Router

    Pruebas de renderizado y rendimiento

Sprint 2: Integración con Firebase (Semanas 3-4)

    Configurar proyecto en Firebase Console

    Instalar y configurar Firebase Client SDK

    Instalar y configurar Firebase Admin SDK

    Crear estructura de colecciones en Firestore

    Migrar datos existentes (22 especies, 5 eventos, 4 proyectos)

    Implementar autenticación básica (Google Sign-In)

Sprint 3: API Routes y Server Components (Semanas 5-6)

    Crear API Routes para especies (/api/especies)

    Crear API Routes para eventos (/api/eventos)

    Crear API Routes para proyectos (/api/proyectos)

    Implementar Server Components para páginas públicas

    Crear páginas dinámicas con [id] para cada entidad

    Implementar ISR (Incremental Static Regeneration)

Sprint 4: Mapa Interactivo (Semanas 7-8)

    Integrar Mapbox + react-map-gl

    Añadir marcadores de proyectos activos

    Añadir puntos de avistamiento de especies

    Implementar popups con información

    Capas toggle (proyectos/avistamientos/comunidades)

    Añadir senderos (polilíneas)

    Heatmaps de biodiversidad

Sprint 5: Sistema de Usuarios (Semanas 9-10)

    Implementar autenticación completa con Firebase Auth

    Crear perfiles de usuario (voluntarios, investigadores)

    Roles y permisos (admin, editor, viewer)

    Panel de administración básico

    Gestión de contenido desde el panel

Sprint 6: Ciencia Ciudadana (Semanas 11-12)

    Formulario de reportes de avistamiento

    Subida de fotos a Firebase Storage

    Geolocalización automática

    Validación por expertos

    Mapa de calor de biodiversidad en tiempo real

    Sistema de badges y logros

Sprint 7: Calendario de Eventos (Semanas 13-14)

    Integrar react-big-calendar

    Conectar con Firestore en tiempo real

    Vistas mensual/semanal/diaria

    Inscripción online a eventos

    Recordatorios por email

    Exportar a Google Calendar

Sprint 8: Biblioteca Digital (Semanas 15-16)

    Subida y gestión de archivos (PDF, imágenes)

    Guías de identificación descargables

    Infografías educativas

    Material didáctico para maestros

    Videos del parque (embebidos)

Sprint 9: Internacionalización (Semanas 17-18)

    Configurar next-intl o next-i18next

    Traducir contenido al inglés

    Traducir contenido al criollo haitiano

    Selector de idioma en UI

    Rutas internacionalizadas (/es, /en, /ht)

Sprint 10: Despliegue y Optimización (Semanas 19-20)

    Configurar despliegue en Firebase Hosting

    Configurar Cloud Functions para SSR

    Optimizar imágenes con next/image

    Implementar análisis con Google Analytics

    Pruebas de carga y estrés

    Documentación final y preparación para lanzamiento

🛠 Stack Tecnológico
Frontend
Tecnología	Versión	Propósito
Next.js	15.2.0	Framework React con SSR y App Router
React	19.2.0	Biblioteca UI
TypeScript	5.9.3	Tipado estático
Tailwind CSS	4.2.0	Estilos utilitarios
shadcn/ui	latest	Componentes accesibles
Radix UI	latest	Primitivos de UI
Framer Motion	12.34.3	Animaciones
Lucide React	latest	Iconografía
Backend y Base de Datos
Tecnología	Versión	Propósito
Firebase	10.0.0	Plataforma backend
Firestore	latest	Base de datos NoSQL en tiempo real
Firebase Auth	latest	Autenticación de usuarios
Firebase Storage	latest	Almacenamiento de imágenes y archivos
Firebase Admin	12.0.0	Acceso server-side
Mapbox GL	3.0.0	Mapas interactivos
deck.gl	9.0.0	Visualizaciones geoespaciales
Estado y Datos
Tecnología	Versión	Propósito
Zustand	5.0.11	Estado global cliente
TanStack Query	5.90.21	Cache y sincronización
React Hook Form	7.71.2	Formularios
Zod	4.3.6	Validaciones
date-fns	latest	Manejo de fechas
Testing
Tecnología	Versión	Propósito
Vitest	4.0.18	Testing unitario
Testing Library	latest	Testing de componentes
MSW	2.12.10	Mock de APIs
JSDOM	28.1.0	Entorno DOM para tests
📁 Estructura del Proyecto
text

humboldt-atlas-next/
├── public/                      # Archivos estáticos
│   └── img/
│       ├── especies/            # 22+ fotos de especies (JPG)
│       ├── eventos/             # Imágenes de eventos
│       ├── proyectos/           # Imágenes de proyectos
│       └── home/                # Imágenes de la página principal
│
├── src/
│   ├── app/                      # App Router (Next.js)
│   │   ├── page.tsx              # Página principal
│   │   ├── layout.tsx            # Layout principal
│   │   ├── especies/             # Rutas de especies
│   │   │   ├── page.tsx          # Listado de especies (SSR)
│   │   │   └── [id]/             # Página dinámica de especie
│   │   │       └── page.tsx      # Detalle de especie (SSG)
│   │   ├── eventos/              # Rutas de eventos
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── proyectos/            # Rutas de proyectos
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── terminos/             # Páginas legales
│   │   │   └── page.tsx
│   │   ├── privacidad/
│   │   │   └── page.tsx
│   │   └── api/                   # API Routes (Backend)
│   │       ├── especies/
│   │       │   ├── route.ts       # GET / POST
│   │       │   └── [id]/
│   │       │       └── route.ts   # GET / PUT / DELETE
│   │       ├── eventos/
│   │       │   └── route.ts
│   │       └── proyectos/
│   │           └── route.ts
│   │
│   ├── components/                 # Componentes reutilizables
│   │   ├── ui/                     # shadcn/ui
│   │   ├── gallery/                 # Componentes de galería
│   │   │   ├── GalleryGrid.tsx
│   │   │   └── GalleryCard.tsx
│   │   ├── events/                  # Componentes de eventos
│   │   │   ├── EventsSection.tsx
│   │   │   ├── EventCard.tsx
│   │   │   └── EventModal.tsx
│   │   ├── projects/                # Componentes de proyectos
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectModal.tsx
│   │   ├── filters/                 # Sistema de filtros
│   │   │   └── FilterBar.tsx
│   │   ├── layout/                  # Componentes de layout
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── home/                    # Página de inicio
│   │   │   ├── HeroSection.tsx
│   │   │   └── StatsSection.tsx
│   │   └── map/                      # Mapa interactivo
│   │       ├── MapView.tsx
│   │       └── MapLayers.tsx
│   │
│   ├── lib/                           # Utilidades y configuraciones
│   │   ├── firebase/
│   │   │   ├── client.ts              # Firebase cliente
│   │   │   └── admin.ts               # Firebase Admin
│   │   └── utils.ts                    # Utilidades generales
│   │
│   ├── store/                          # Estado global (Zustand)
│   │   ├── filtersStore.ts
│   │   ├── eventsStore.ts
│   │   ├── projectsStore.ts
│   │   └── userStore.ts                # Store de autenticación
│   │
│   ├── types/                          # Definiciones TypeScript
│   │   └── index.ts
│   │
│   ├── hooks/                           # Custom hooks
│   │   ├── useAuth.ts
│   │   └── useFirestore.ts
│   │
│   └── middleware.ts                    # Middleware de autenticación
│
├── scripts/                             # Scripts de utilidad
│   └── migrateToFirebase.ts              # Migración de datos
│
├── .env.local                            # Variables de entorno
├── .env.example
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── components.json                       # shadcn/ui config
├── firebase.json                         # Configuración Firebase Hosting
├── package.json
└── README.md

🔧 Instalación y Configuración
Prerrequisitos

    Node.js 18+

    npm 9+ o yarn 1.22+

    Cuenta en Firebase Console

    Cuenta en Mapbox (para fase de mapa)

Pasos de instalación

    Clonar el repositorio

bash

git clone https://github.com/tu-organizacion/humboldt-atlas-next.git
cd humboldt-atlas-next

    Instalar dependencias

bash

npm install

    Configurar variables de entorno

bash

cp .env.example .env.local
# Edita .env.local con tus credenciales de Firebase

    Configurar Firebase

        Ve a Firebase Console

        Crea un nuevo proyecto: humboldt-atlas

        Registra una aplicación web

        Copia las credenciales a .env.local

    Configurar Firebase Admin

        En Firebase Console, ve a "Configuración del proyecto" → "Cuentas de servicio"

        Genera una nueva clave privada

        Copia client_email y private_key a .env.local

    Inicializar shadcn/ui

bash

npx shadcn@latest init

    Migrar datos a Firestore

bash

npm run migrate

    Iniciar servidor de desarrollo

bash

npm run dev

    Abrir en el navegador

text

http://localhost:3000

Scripts disponibles
Comando	Descripción
npm run dev	Inicia servidor de desarrollo Next.js
npm run build	Construye para producción
npm run start	Inicia servidor de producción
npm run lint	Ejecuta linter
npm run migrate	Migra datos locales a Firestore
npm run deploy	Despliega a Firebase Hosting
🚀 Uso
Navegación

    Inicio: Vista general con estadísticas y acceso rápido

    Especies: Explora las 22+ especies con filtros

    Eventos: Actividades comunitarias y círculos de interés

    Proyectos: Investigaciones científicas en curso

Filtros

    Usa la barra de búsqueda para encontrar especies por nombre

    Filtra por tipo (fauna/flora)

    Filtra por estatus (endémica/migratoria/nativa)

    Limpia filtros con un clic

Páginas de detalle

    Haz clic en cualquier tarjeta para ver la página de detalle

    URLs amigables: /especies/tocororo

    Contenido pre-renderizado para mejor SEO

Autenticación (próximamente)

    Inicia sesión con Google

    Perfil de usuario con contribuciones

    Panel para investigadores y administradores

📊 Estado del Proyecto
Versión Actual: 1.0.0 (Fase 1 Completada)
Métricas Fase 1

    Componentes: 42+

    Especies documentadas: 22

    Eventos registrados: 5

    Proyectos activos: 4

    Líneas de código: ~12,500

    Cobertura de features planificadas: 100% (Fase 1)

    PRs cerrados: 0

    Issues conocidos: 0

Especies Endémicas Cubanas Destacadas
ID	Especie	Categoría	Estado Conservación
1	Colibrí Esmeralda	Fauna	🟢 Preocupación menor
4	Helecho Gigante	Flora	🟡 Vulnerable
7	Tocororo	Fauna	🟢 Preocupación menor
10	Zunzuncito	Fauna	🟡 Casi amenazada
11	Cocodrilo Cubano	Fauna	🔴 Peligro crítico
12	Manatí Antillano	Fauna	🔴 En peligro
17	Almiquí	Fauna	🔴 En peligro
20	Palma Corcho	Flora	🔴 Crítico
📅 Próximos Pasos (Sprint Actual)
Sprint 1: Migración a Next.js (Semana 1-2)

    Plan de migración definido

    Hoy: Crear proyecto Next.js con App Router

    Mañana: Migrar componentes de galería

    Día 3: Migrar componentes de eventos y proyectos

    Día 4: Adaptar imágenes a next/image

    Día 5: Configurar shadcn/ui en Next.js

    Día 6: Implementar sistema de rutas

    Día 7: Pruebas de renderizado

Sprint 2: Firebase (Semana 3-4)

    Configurar proyecto Firebase

    Implementar Firebase Client SDK

    Implementar Firebase Admin SDK

    Crear colecciones en Firestore

    Migrar datos existentes

    Probar conexión en desarrollo

🤝 Contribuir

¡Las contribuciones son bienvenidas! Si deseas contribuir al proyecto:

    Fork el repositorio

    Crea una rama para tu feature (git checkout -b feature/AmazingFeature)

    Commit tus cambios (git commit -m 'Add: nueva funcionalidad')

    Push a la rama (git push origin feature/AmazingFeature)

    Abre un Pull Request

Guía de estilo

    Sigue la estructura de carpetas establecida

    Usa TypeScript estricto

    Documenta componentes complejos

    Sigue las convenciones de Next.js App Router

    Usa Server Components por defecto, Client Components cuando sea necesario

Reporte de bugs

Usa el template de issues en GitHub incluyendo:

    Descripción del bug

    Pasos para reproducir

    Comportamiento esperado

    Screenshots (si aplica)

    Entorno (navegador, OS)

📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.
📞 Contacto
Equipo Humboldt Atlas

    Coordinación General: equipo@humboldtpark.eco

    Desarrollo Técnico: dev@humboldtpark.eco

    Educación Ambiental: educacion@humboldtpark.eco

Redes Sociales

    🌐 Web Oficial

    📘 Facebook

    📷 Instagram

    🐦 Twitter/X

🙏 Agradecimientos

    Parque Nacional Alejandro de Humboldt - Por su invaluable labor de conservación

    Comunidades locales - Guardianes de la biodiversidad

    Cuerpo de investigadores - Por compartir su conocimiento

    UNESCO - Por reconocer y proteger este patrimonio

    Contribuidores - Voluntarios que hacen posible este proyecto

<div align="center"> <img src="/public/img/home/logo-humboldt.png" alt="Humboldt Atlas" width="100" style="border-radius: 50%;"/> <br /> <strong>Humboldt Atlas</strong> <br /> <em>Conectando personas con la biodiversidad</em> <br /> <br /> <p>Hecho con ❤️ para el Parque Nacional Alejandro de Humboldt</p> <p>© 2026 Humboldt Atlas. Todos los derechos reservados.</p> <p>Versión 1.0.0 - Fase 1 Completada | Próximo: Fase 2 - Next.js + Firebase</p> </div> ```
🎯 Resumen de la Fase 1 Completada
Área	Logros
Especies	22 endémicas cubanas documentadas
Eventos	5 actividades comunitarias
Proyectos	4 investigaciones científicas
UI/UX	Diseño premium, tema oscuro/claro, responsivo
Páginas	Inicio, especies, eventos, proyectos, términos, privacidad
Componentes	42+ componentes reutilizables
Rendimiento	Optimizado con imágenes locales
🚀 Inicio de la Fase 2

¿Listo para comenzar con el Sprint 1: Migración a Next.js?

Ejecuta este comando para crear el nuevo proyecto:
bash

npx create-next-app@latest humboldt-atlas-next --typescript --tailwind --app

¿Te parece bien? Una vez creado, comenzamos a migrar los componentes uno por uno.