import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Política de Privacidad - Humboldt Atlas',
  description: 'Conoce cómo protegemos tus datos en Humboldt Atlas',
};

export default function PrivacidadPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">🔒 Política de Privacidad</CardTitle>
          <CardDescription>Última actualización: 1 de julio de 2026</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Nuestro Compromiso</h2>
            <p className="text-muted-foreground">
              En Humboldt Atlas, nos tomamos muy en serio la privacidad de nuestros Usuarios. Esta Política explica cómo recopilamos, usamos, almacenamos y protegemos su información personal en cumplimiento de las normativas aplicables y las mejores prácticas en seguridad de datos.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Datos que Recopilamos</h2>
            
            <h3 className="font-medium mt-4 mb-1">2.1. Datos proporcionados directamente por el Usuario:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><span className="font-medium">Datos de registro:</span> Correo electrónico, nombre de usuario, contraseña.</li>
              <li><span className="font-medium">Perfil de investigador:</span> Nombre completo, afiliación institucional, especialidad, documentos de identificación (cuando se solicite para verificación).</li>
              <li><span className="font-medium">Información de contacto:</span> Número de teléfono, dirección de correo electrónico adicional para eventos.</li>
              <li><span className="font-medium">Contenido generado por el Usuario:</span> Reportes de avistamientos, fotos, comentarios, publicaciones y cualquier otra información compartida en la Plataforma.</li>
            </ul>

            <h3 className="font-medium mt-4 mb-1">2.2. Datos recopilados automáticamente:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><span className="font-medium">Cookies y tecnologías similares:</span> Utilizamos cookies esenciales para el funcionamiento de la Plataforma (recordar preferencias, mantener la sesión activa). No utilizamos cookies de rastreo de terceros sin su consentimiento explícito.</li>
              <li><span className="font-medium">Datos de uso:</span> Dirección IP, tipo de navegador, páginas visitadas, tiempo de navegación, para mejorar la experiencia del usuario y la seguridad.</li>
              <li><span className="font-medium">Datos de rendimiento:</span> Información sobre errores y rendimiento para mantener la estabilidad del sitio.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Uso de la Información</h2>
            <p className="text-muted-foreground">Sus datos serán utilizados para:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
              <li>Gestionar su cuenta y proporcionar acceso a las funcionalidades del sitio.</li>
              <li>Procesar solicitudes de investigador y gestionar contribuciones científicas.</li>
              <li>Enviar notificaciones sobre eventos, aprobaciones de contenido y novedades del proyecto (solo con su consentimiento).</li>
              <li>Mejorar la Plataforma y personalizar su experiencia.</li>
              <li>Cumplir con obligaciones legales y de seguridad.</li>
              <li>Procesar donaciones y gestionar el apoyo a proyectos.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Seguridad de los Datos</h2>
            <p className="text-muted-foreground">Implementamos medidas técnicas y organizativas para proteger su información, incluyendo:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
              <li><span className="font-medium">Cifrado SSL/TLS</span> para todas las transmisiones de datos.</li>
              <li><span className="font-medium">Almacenamiento seguro</span> en Firebase con controles de acceso estrictos.</li>
              <li><span className="font-medium">Autenticación robusta</span> y gestión de sesiones.</li>
              <li><span className="font-medium">Políticas de acceso interno</span> que limitan quién puede acceder a los datos.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Compartir Datos con Terceros</h2>
            <p className="text-muted-foreground">No compartimos sus datos personales con terceros, excepto:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
              <li><span className="font-medium">Proveedores de servicios</span> (Firebase, Netlify) que procesan datos en nuestro nombre, bajo estrictos acuerdos de confidencialidad.</li>
              <li><span className="font-medium">Cuando la ley lo exija</span> o para proteger los derechos y la seguridad de Humboldt Atlas o terceros.</li>
              <li><span className="font-medium">Con su consentimiento explícito</span>, por ejemplo, para colaboraciones específicas con socios de investigación.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Sus Derechos</h2>
            <p className="text-muted-foreground">Usted tiene derecho a:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
              <li>Acceder, rectificar o eliminar sus datos personales.</li>
              <li>Oponerse al procesamiento de sus datos para fines de marketing.</li>
              <li>Solicitar la portabilidad de sus datos.</li>
            </ul>
            <p className="text-muted-foreground mt-2">
              Para ejercer estos derechos, contacte a nuestro Delegado de Protección de Datos en{' '}
              <a href="mailto:dpo@humboldtpark.eco" className="text-green-600 hover:underline">
                dpo@humboldtpark.eco
              </a>
              . Responderemos a su solicitud en un plazo máximo de <span className="font-medium">48 horas</span>.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Cookies</h2>
            <p className="text-muted-foreground">
              Utilizamos cookies esenciales que son necesarias para la funcionalidad de la Plataforma (ej. recordar su sesión y preferencias de tema). No utilizamos cookies de terceros sin su consentimiento. Puede gestionar sus preferencias de cookies desde la configuración de su navegador.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Cambios en la Política de Privacidad</h2>
            <p className="text-muted-foreground">
              Actualizaremos esta política ocasionalmente. Notificaremos cambios significativos a través de la Plataforma o por correo electrónico. Le recomendamos revisar esta página periódicamente.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Contacto</h2>
            <p className="text-muted-foreground">
              <span className="font-medium">Delegado de Protección de Datos (DPO):</span>
            </p>
            <ul className="list-none space-y-1 text-muted-foreground mt-2">
              <li>📧 Email:{' '}
                <a href="mailto:humboldt.baracoa@gmail.com" className="text-green-600 hover:underline">
                  humboldt.baracoa@gmail.com
                </a>
              </li>
              <li>📞 Teléfono: <span className="font-medium">+53 21 654 3211</span></li>
              <li>⏱️ Tiempo de respuesta: Máx. 48 horas.</li>
            </ul>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}