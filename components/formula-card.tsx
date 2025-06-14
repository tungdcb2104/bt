import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

interface FormulaCardProps {
  title: string
  description?: string
  formula: string
  example?: string
  tip?: string
}

export function FormulaCard({ title, description, formula, example, tip }: FormulaCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-md">
          <div className="text-center font-mono text-lg">{formula}</div>
        </div>

        {example && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Ví dụ:</h4>
            <div className="p-3 bg-muted rounded-md text-sm">{example}</div>
          </div>
        )}

        {tip && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950 rounded-md">
            <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium">Mẹo:</h4>
              <p className="text-sm text-muted-foreground">{tip}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
