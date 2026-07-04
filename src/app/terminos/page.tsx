import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Términos y Condiciones - Humboldt Atlas',
  description: 'Lee los términos y condiciones de uso de Humboldt Atlas',
};

export default function TerminosPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">📜 Términos y Condiciones de Uso</CardTitle>
          <CardDescription>Última actualización: 1 de julio de 2026</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Introducción y Aceptación</h2>
            <p className="text-muted-foreground">
              Bienvenido a <span className="font-semibold">Humboldt Atlas</span> (en adelante, "la Plataforma"), un proyecto gestionado por una unidad de asesores e investigadores apasionados por la divulgación científica y la conservación de la biodiversidad del <span className="font-semibold">Parque Nacional Alejandro de Humboldt</span>.
            </p>
            <p className="text-muted-foreground mt-2">
              Al acceder, navegar o registrarse en esta Plataforma, usted (el "Usuario") acepta cumplir y quedar vinculado por los presentes Términos y Condiciones. Si no está de acuerdo con alguna de estas disposiciones, le rogamos no utilice nuestros servicios.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Propósito de la Plataforma</h2>
            <p className="text-muted-foreground">Humboldt Atlas tiene como objetivos:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
              <li>Exponer y divulgar los frutos de nuestras investigaciones, proyectos científicos y eventos comunitarios.</li>
              <li>Mostrar evidencia del apoyo recibido de proyectos con asociaciones y organizaciones nacionales e internacionales.</li>
              <li>Fomentar la participación de la comunidad en actividades de ciencia ciudadana, reporte de avistamientos y eventos educativos.</li>
              <li>Gestionar donaciones que serán destinadas íntegramente al apoyo de proyectos de investigación y conservación en curso o futuros.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Registro y Cuenta de Usuario</h2>
            <p className="text-muted-foreground">
              Para acceder a funcionalidades como reportar avistamientos, solicitar ser investigador o gestionar contenido, el Usuario debe registrarse proporcionando información veraz y completa. El Usuario es responsable de la confidencialidad de sus credenciales y de todas las actividades realizadas en su cuenta. Humboldt Atlas se reserva el derecho a suspender cuentas que incumplan estos términos.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Política de Donaciones</h2>
            <p className="text-muted-foreground">
              Las donaciones realizadas a través de la Plataforma se destinarán exclusivamente a:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
              <li>Financiar proyectos activos de investigación y conservación.</li>
              <li>Apoyar el desarrollo de nuevos programas y actividades futuras.</li>
              <li>Cubrir costos operativos directamente relacionados con los fines científicos y educativos del proyecto.</li>
            </ul>
            <p className="text-muted-foreground mt-2 font-semibold text-amber-600 dark:text-amber-400">
              ⚠️ Estas donaciones no son reembolsables, a menos que la ley aplicable disponga lo contrario.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Propiedad Intelectual</h2>
            <p className="text-muted-foreground">
              Todo el contenido publicado en Humboldt Atlas (textos, investigaciones, gráficos, logotipos, imágenes) es propiedad de sus autores o de los colaboradores que lo han cedido para su publicación. Se prohíbe la reproducción, distribución o uso comercial sin el consentimiento expreso de los titulares de los derechos.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Conducta del Usuario</h2>
            <p className="text-muted-foreground">El Usuario se compromete a:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
              <li>No utilizar la Plataforma para fines ilegales o que atenten contra la integridad del proyecto o sus colaboradores.</li>
              <li>No publicar contenido falso, difamatorio o que infrinja derechos de terceros.</li>
              <li>Respetar la propiedad intelectual y los datos de privacidad de los demás.</li>
              <li>Utilizar la información de investigación y avistamientos de manera ética y responsable.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Limitación de Responsabilidad</h2>
            <p className="text-muted-foreground">
              La información proporcionada en la Plataforma tiene fines educativos y de divulgación científica. Humboldt Atlas no garantiza la exactitud absoluta de los datos y no se hace responsable del uso que los Usuarios hagan de la información. La Plataforma se proporciona "tal cual" y no asumimos responsabilidad por daños directos o indirectos derivados de su uso.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Modificaciones</h2>
            <p className="text-muted-foreground">
              Nos reservamos el derecho a modificar estos Términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en la Plataforma. El uso continuado del sitio tras dichos cambios constituirá la aceptación de los nuevos términos.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Legislación Aplicable</h2>
            <p className="text-muted-foreground">
              Estos Términos se rigen por las leyes de la <span className="font-semibold">República de Cuba</span>. Cualquier disputa será sometida a los tribunales competentes de la jurisdicción correspondiente.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">10. Contacto</h2>
            <p className="text-muted-foreground">
              Para cualquier consulta sobre estos términos, puede contactarnos a través de nuestro correo electrónico:{' '}
              <a href="mailto:legal@humboldtpark.eco" className="text-green-600 hover:underline">
                legal@humboldtpark.eco
              </a>
            </p>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}