import { Scale, FileText, Shield, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
            <Scale className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
            Términos y Condiciones
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Última actualización: 26 de febrero de 2026
          </p>
          <div className="w-24 h-1 bg-green-500 mx-auto mt-4" />
        </div>

        {/* Badge de versión */}
        <div className="flex justify-center mb-8">
          <Badge variant="outline" className="text-sm py-1 px-3">
            Versión 2.0
          </Badge>
        </div>

        {/* Contenido principal */}
        <Card className="p-8 shadow-xl border-green-100 dark:border-green-900">
          <div className="space-y-8">
            
            {/* Introducción */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-semibold">1. Aceptación de los Términos</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed pl-12">
                Al acceder y utilizar el <span className="font-semibold text-green-600 dark:text-green-400">Humboldt Atlas</span> 
                (en adelante, "la Plataforma"), usted acepta cumplir y estar sujeto a estos Términos y Condiciones. 
                Si no está de acuerdo con alguna parte de estos términos, no podrá acceder ni utilizar nuestros servicios.
              </p>
            </section>

            {/* Uso del Sitio */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-semibold">2. Uso Permitido</h2>
              </div>
              <div className="pl-12 space-y-3">
                <p className="text-muted-foreground">Usted se compromete a utilizar la Plataforma únicamente para fines lícitos y de acuerdo con estos términos. Específicamente, usted puede:</p>
                <ul className="space-y-2">
                  {[
                    "Consultar información sobre especies, eventos y proyectos",
                    "Compartir contenido a través de las funciones habilitadas",
                    "Participar en actividades de ciencia ciudadana",
                    "Descargar material educativo para uso personal"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-green-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Restricciones */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
                  <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                </div>
                <h2 className="text-2xl font-semibold">3. Restricciones</h2>
              </div>
              <div className="pl-12 space-y-3">
                <p className="text-muted-foreground">Queda estrictamente prohibido:</p>
                <ul className="space-y-2">
                  {[
                    "Usar la Plataforma para actividades ilegales",
                    "Intentar acceder sin autorización a áreas restringidas",
                    "Extraer datos de manera automatizada sin consentimiento",
                    "Publicar contenido falso o engañoso",
                    "Infringir derechos de propiedad intelectual"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Propiedad Intelectual */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold">4. Propiedad Intelectual</h2>
              </div>
              <div className="pl-12 space-y-3">
                <p className="text-muted-foreground">
                  Todo el contenido disponible en la Plataforma, incluyendo pero no limitado a textos, 
                  gráficos, logotipos, iconos, imágenes y software, es propiedad del 
                  <span className="font-semibold"> Parque Nacional Alejandro de Humboldt</span> o de sus 
                  licenciantes y está protegido por las leyes de propiedad intelectual.
                </p>
                <p className="text-muted-foreground mt-2">
                  Las fotografías de especies son proporcionadas por colaboradores y voluntarios, 
                  y se utilizan bajo licencias Creative Commons o con permiso expreso de sus autores.
                </p>
              </div>
            </section>

            {/* Limitación de Responsabilidad */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-2xl font-semibold">5. Limitación de Responsabilidad</h2>
              </div>
              <div className="pl-12">
                <p className="text-muted-foreground">
                  El Humboldt Atlas se proporciona "tal cual" y "según disponibilidad". No garantizamos 
                  que la información sea completamente precisa, actualizada o libre de errores. En ningún 
                  caso seremos responsables por daños directos, indirectos, incidentales o consecuentes 
                  derivados del uso de la Plataforma.
                </p>
              </div>
            </section>

            {/* Modificaciones */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Modificaciones</h2>
              <p className="text-muted-foreground pl-0">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios 
                entrarán en vigor inmediatamente después de su publicación en la Plataforma. El uso 
                continuado del sitio constituye la aceptación de los términos modificados.
              </p>
            </section>

            {/* Contacto Legal */}
            <Separator className="my-6" />
            
            <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Scale className="h-5 w-5 text-green-600" />
                Consultas Legales
              </h3>
              <p className="text-muted-foreground mb-4">
                Para cualquier pregunta sobre estos términos, puede contactarnos:
              </p>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Email:</span> legal@humboldtpark.eco</p>
                <p><span className="font-medium">Dirección:</span> Parque Nacional Alejandro de Humboldt, Baracoa, Guantánamo, Cuba</p>
                <p><span className="font-medium">Teléfono:</span> +53 21 654 3210</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Fecha de vigencia */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Al utilizar nuestra plataforma, usted reconoce haber leído y entendido estos términos.
        </p>
      </div>
    </div>
  );
}