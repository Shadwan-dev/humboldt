const { Storage } = require('@google-cloud/storage');

// Configuración CORS
const cors = [
  {
    origin: ['*'],
    method: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'],
    maxAgeSeconds: 3600,
    responseHeader: ['Content-Type', 'Content-Disposition', 'x-goog-meta-*']
  }
];

// Inicializar Storage
const storage = new Storage({
  projectId: 'humboldt-atlas',
});

// Aplicar CORS al bucket
async function setCors() {
  const bucket = storage.bucket('humboldt-atlas.firebasestorage.app');
  
  try {
    await bucket.setCorsConfiguration(cors);
    console.log('✅ CORS configurado correctamente');
  } catch (error) {
    console.error('❌ Error configurando CORS:', error);
  }
}

setCors();