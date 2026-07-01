import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Política de Privacidad - Humboldt Atlas',
  description: 'Conoce cómo protegemos tus datos en Humboldt Atlas',
};

export default function PrivacidadPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Política de Privacidad</CardTitle>
          <CardDescription>Última actualización: 1 de julio de 2026</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            En Humboldt Atlas nos tomamos muy en serio la protección de tus datos...
          </p>
          {/* Puedes agregar más contenido aquí */}
        </CardContent>
      </Card>
    </div>
  );
}