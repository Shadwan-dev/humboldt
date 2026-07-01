import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'Monitoreo de Carbono en Manglares del Parque Humboldt',
    description: 'Estudio a largo plazo para cuantificar el almacenamiento de carbono azul en los ecosistemas de manglar y su papel en la mitigación del cambio climático.',
    type: 'investigacion',
    status: 'activo',
    researchArea: ['carbono14', 'manglares', 'cambio_climatico'],
    imageUrl: 'https://images.pexels.com/photos/2131824/pexels-photo-2131824.jpeg?auto=compress&cs=tinysrgb&w=800',
    startDate: '2024-01-15',
    coordinator: 'Dra. María Elena Rodríguez',
    institution: 'Instituto de Ecología y Sistemática',
    collaborators: [
      'Universidad de La Habana',
      'Centro de Investigaciones del Medio Ambiente',
      'Agencia de Medio Ambiente'
    ],
    objectives: [
      'Establecer parcelas permanentes de monitoreo en 5 sitios de manglar',
      'Cuantificar biomasa aérea y subterránea',
      'Determinar tasas de secuestro de carbono',
      'Evaluar el impacto del cambio climático en la salud del manglar'
    ],
    achievements: [
      '3 parcelas establecidas',
      'Primeros datos de biomasa publicados',
      'Capacitación de 5 técnicos locales'
    ],
    publications: [
      {
        title: 'Carbono azul en manglares del Caribe insular',
        year: 2025
      }
    ],
    funding: 'Fondo para el Medio Ambiente Mundial (FMAM)',
    speciesInvolved: ['2', '6'],
    location: 'Costa norte, Parque Nacional Alejandro de Humboldt',
    progress: 65,
    tags: ['manglares', 'carbono', 'cambio climático', 'investigación']
  },
  {
    id: '2',
    title: 'Conservación del Tocororo y Especies Endémicas',
    description: 'Programa integral para la protección del Tocororo (Priotelus temnurus) y otras aves endémicas mediante monitoreo poblacional y restauración de hábitat.',
    type: 'conservacion',
    status: 'activo',
    researchArea: ['especies_amenazadas', 'biodiversidad'],
    imageUrl: 'https://images.pexels.com/photos/36717/parrot-bird-animal-nature.jpg?auto=compress&cs=tinysrgb&w=800',
    startDate: '2023-06-01',
    coordinator: 'Dr. Alejandro Pérez',
    institution: 'Sociedad Cubana de Zoología',
    collaborators: [
      'Museo Nacional de Historia Natural',
      'Universidad de Oriente',
      'Grupo de Aves del Caribe'
    ],
    objectives: [
      'Monitorear poblaciones de Tocororo y otras 10 especies endémicas',
      'Identificar amenazas principales',
      'Implementar medidas de conservación participativas',
      'Establecer corredores biológicos'
    ],
    achievements: [
      'Censo poblacional completado en 60% del área',
      '3 nidos artificiales instalados',
      'Talleres comunitarios realizados en 5 comunidades'
    ],
    publications: [
      {
        title: 'Estado poblacional del Tocororo en el Parque Humboldt',
        year: 2024
      }
    ],
    funding: 'BirdLife International',
    speciesInvolved: ['7'],
    location: 'Todo el parque',
    progress: 45,
    tags: ['aves', 'endémicas', 'conservación', 'monitoreo']
  },
  {
    id: '3',
    title: 'Datación por Carbono 14: Historia Climática de la Región',
    description: 'Investigación paleoecológica usando técnicas de carbono 14 para reconstruir la historia de la vegetación y el clima en los últimos 10,000 años.',
    type: 'investigacion',
    status: 'activo',
    researchArea: ['carbono14', 'cambio_climatico'],
    imageUrl: 'https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800',
    startDate: '2024-09-10',
    coordinator: 'Dr. Roberto Méndez',
    institution: 'Laboratorio de Datación, Universidad de La Habana',
    collaborators: [
      'Instituto de Geofísica',
      'Universidad Autónoma de México',
      'CSIC España'
    ],
    objectives: [
      'Obtener núcleos de sedimento en turberas y lagunas',
      'Realizar dataciones por carbono 14',
      'Reconstruir cambios en la vegetación mediante análisis de polen',
      'Correlacionar con eventos climáticos globales'
    ],
    achievements: [
      '4 núcleos de sedimento extraídos',
      'Primeras 10 dataciones completadas'
    ],
    funding: 'Programa Iberoamericano de Ciencia',
    location: 'Zonas de turbera, cabezadas del río Toa',
    progress: 30,
    tags: ['paleoecología', 'carbono14', 'clima', 'investigación']
  },
  {
    id: '4',
    title: 'Restauración de Ecosistemas Degradados',
    description: 'Proyecto de restauración ecológica en áreas afectadas por actividades humanas previas a la creación del parque.',
    type: 'restauracion',
    status: 'activo',
    researchArea: ['biodiversidad'],
    imageUrl: 'https://images.pexels.com/photos/939731/pexels-photo-939731.jpeg?auto=compress&cs=tinysrgb&w=800',
    startDate: '2023-01-20',
    endDate: '2026-12-31',
    coordinator: 'Ing. Carlos Alberto Fernández',
    institution: 'Parque Nacional Alejandro de Humboldt',
    collaborators: [
      'Empresa Forestal Integral',
      'Comunidades locales',
      'Grupos de voluntarios'
    ],
    objectives: [
      'Restaurar 500 hectáreas de bosque degradado',
      'Producir 50,000 plántulas de especies nativas',
      'Involucrar a comunidades locales en la restauración',
      'Monitorear la recuperación de la biodiversidad'
    ],
    achievements: [
      '300 hectáreas restauradas',
      '35,000 plántulas producidas',
      '12 viveros comunitarios establecidos',
      '20 familias participando activamente'
    ],
    funding: 'PNUD - Fondo Verde',
    speciesInvolved: ['2', '4', '6', '8'],
    location: 'Zonas buffer y áreas degradadas',
    progress: 75,
    tags: ['restauración', 'comunidades', 'viveros', 'bosque']
  }
];