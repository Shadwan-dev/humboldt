import { Lock, Eye, Database, Trash2, Mail, Shield, Cookie, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4">
            <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
            Política de Privacidad
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tu privacidad es nuestra prioridad. Conoce cómo protegemos tus datos.
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4" />
        </div>

        {/* Badge de certificación */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          <Badge variant="outline" className="text-sm py-1 px-3">
            <Shield className="h-3 w-3 mr-1" />
            GDPR Compliant
          </Badge>
          <Badge variant="outline" className="text-sm py-1 px-3">
            <Eye className="h-3 w-3 mr-1" />
            Transparencia Total
          </Badge>
          <Badge variant="outline" className="text-sm py-1 px-3">
            <Bell className="h-3 w-3 mr-1" />
            Notificación 48h
          </Badge>
        </div>

        {/* Contenido principal */}
        <Card className="p-8 shadow-xl border-blue-100 dark:border-blue-900">
          <div className="space-y-8">
            
            {/* Introducción */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-semibold">1. Nuestro Compromiso</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed pl-12">
                En <span className="font-semibold text-blue-600 dark:text-blue-400">Humboldt Atlas</span>, 
                estamos comprometidos con proteger tu privacidad. Esta política explica cómo recopilamos, 
                usamos y protegemos tu información personal cuando utilizas nuestra plataforma.
              </p>
            </section>

            {/* Datos que recopilamos */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold">2. Datos que Recopilamos</h2>
              </div>
              <div className="pl-12 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Información que nos proporcionas:</h3>
                  <ul className="space-y-2">
                    {[
                      "Nombre y correo electrónico (al suscribirte al newsletter)",
                      "Datos de contacto (al inscribirte en eventos)",
                      "Fotografías y observaciones (al participar en ciencia ciudadana)",
                      "Preferencias de conservación"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Información automática:</h3>
                  <ul className="space-y-2">
                    {[
                      "Dirección IP y tipo de navegador",
                      "Páginas visitadas y tiempo de navegación",
                      "Preferencias de idioma y tema (claro/oscuro)",
                      "Interacciones con el mapa y contenido"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Uso de la información */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Cómo Usamos tu Información</h2>
              <div className="pl-0 space-y-3">
                <p className="text-muted-foreground">Utilizamos tus datos para:</p>
                <ul className="space-y-2">
                  {[
                    "Personalizar tu experiencia en la plataforma",
                    "Enviar boletines y notificaciones de eventos (solo con tu consentimiento)",
                    "Mejorar nuestros servicios y contenido",
                    "Validar contribuciones de ciencia ciudadana",
                    "Cumplir con obligaciones legales"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Protección de datos */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Lock className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-semibold">4. Cómo Protegemos tus Datos</h2>
              </div>
              <div className="pl-12">
                <p className="text-muted-foreground mb-3">
                  Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
                </p>
                <ul className="space-y-2">
                  {[
                    "Cifrado SSL/TLS para todas las transmisiones",
                    "Almacenamiento seguro con acceso restringido",
                    "Autenticación de dos factores (próximamente)",
                    "Auditorías de seguridad periódicas"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-green-500 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Cookies */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Cookie className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-2xl font-semibold">5. Uso de Cookies</h2>
              </div>
              <div className="pl-12">
                <p className="text-muted-foreground">
                  Utilizamos cookies esenciales para el funcionamiento de la plataforma, como recordar tu 
                  preferencia de tema (claro/oscuro) y mantener tu sesión. No utilizamos cookies de 
                  rastreo de terceros sin tu consentimiento explícito.
                </p>
                <div className="mt-4 bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">🍪 Preferencias de cookies:</span> Puedes gestionar 
                    tus preferencias en cualquier momento desde la configuración de tu navegador.
                  </p>
                </div>
              </div>
            </section>

            {/* Tus derechos */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                  <Trash2 className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                </div>
                <h2 className="text-2xl font-semibold">6. Tus Derechos</h2>
              </div>
              <div className="pl-12">
                <p className="text-muted-foreground mb-3">Tienes derecho a:</p>
                <ul className="space-y-2">
                  {[
                    "Acceder a tus datos personales",
                    "Rectificar información incorrecta",
                    "Solicitar la eliminación de tus datos",
                    "Oponerte al procesamiento",
                    "Exportar tus datos en formato portable"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Contacto DPO */}
            <Separator className="my-6" />
            
            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                Delegado de Protección de Datos (DPO)
              </h3>
              <p className="text-muted-foreground mb-4">
                Para ejercer tus derechos o resolver dudas sobre privacidad, contacta a nuestro DPO:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><span className="font-medium">Email DPO:</span> dpo@humboldtpark.eco</p>
                  <p><span className="font-medium">Teléfono:</span> +53 21 654 3211</p>
                </div>
                <div>
                  <p><span className="font-medium">Tiempo de respuesta:</span> Máx. 48h</p>
                  <p><span className="font-medium">Idiomas:</span> Español, English, Kriolu</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Consentimiento */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Al continuar usando nuestra plataforma, confirmas que has leído y aceptas esta 
            Política de Privacidad. Puedes retirar tu consentimiento en cualquier momento.
          </p>
        </div>
      </div>
    </div>
  );
}