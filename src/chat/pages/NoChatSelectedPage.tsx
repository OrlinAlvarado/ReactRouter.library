import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle, Users, Clock, Shield } from 'lucide-react'

export const NoChatSelectedPage = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-6">
        {/* Welcome Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            ¡Bienvenido al Chat de Soporte!
          </h1>
          <p className="text-lg text-muted-foreground">
            Selecciona una conversación existente o inicia una nueva para comenzar
          </p>
        </div>

        {/* Main Content Card */}
        <Card className="border-2 border-dashed border-muted-foreground/20">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              No hay conversación seleccionada
            </CardTitle>
            <CardDescription>
              Elige una conversación del panel izquierdo o crea una nueva
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                <Users className="w-5 h-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-medium">Soporte en Tiempo Real</h3>
                  <p className="text-sm text-muted-foreground">
                    Conecta con agentes especializados 24/7
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-medium">Respuesta Rápida</h3>
                  <p className="text-sm text-muted-foreground">
                    Obtén ayuda en cuestión de minutos
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-medium">Conversaciones Seguras</h3>
                  <p className="text-sm text-muted-foreground">
                    Todas las conversaciones están protegidas
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                <MessageCircle className="w-5 h-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-medium">Historial Completo</h3>
                  <p className="text-sm text-muted-foreground">
                    Accede a conversaciones anteriores
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button variant="outline" className="flex-1 sm:flex-none">
                <MessageCircle className="w-4 h-4 mr-2" />
                Ver Conversaciones
              </Button>
              <Button className="flex-1 sm:flex-none">
                <MessageCircle className="w-4 h-4 mr-2" />
                Nueva Conversación
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            ¿Necesitas ayuda? Consulta nuestra{' '}
            <Button variant="link" className="p-0 h-auto text-sm">
              guía de usuario
            </Button>
            {' '}o contacta con soporte técnico
          </p>
        </div>
      </div>
    </div>
  )
}

export default NoChatSelectedPage