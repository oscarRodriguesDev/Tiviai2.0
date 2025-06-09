import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Brain } from "lucide-react"

export default function RecuperarSenhaLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">Dating</h1>
                <p className="text-sm text-gray-600">Recuperação de Senha</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="text-center mb-8">
          <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6" />
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-80 mx-auto" />
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="space-y-6">
              <Skeleton className="h-16 w-full rounded-lg" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-4 w-48" />
              </div>

              <Skeleton className="h-12 w-full rounded-xl" />
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="w-5 h-5 rounded mt-0.5" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-1" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
      </div>
    </div>
  )
}
