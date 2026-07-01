import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Términos y Condiciones - Humboldt Atlas',
  description: 'Lee los términos y condiciones de uso de Humboldt Atlas',
};

export default function TerminosPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Términos y Condiciones</CardTitle>
          <CardDescription>Última actualización: 1 de julio de 2026</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Al utilizar Humboldt Atlas, aceptas estos términos y condiciones...
          </p>
          {/* Puedes agregar más contenido aquí */}
        </CardContent>
      </Card>
    </div>
  );
}