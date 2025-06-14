"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Circle, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface ProgressTrackerProps {
  lessonId: string
  sections: string[]
}

export function ProgressTracker({ lessonId, sections }: ProgressTrackerProps) {
  const [completedSections, setCompletedSections] = useState<string[]>([])

  // Tải tiến độ từ localStorage khi component được mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress-${lessonId}`)
    if (savedProgress) {
      setCompletedSections(JSON.parse(savedProgress))
    }
  }, [lessonId])

  const toggleSection = (section: string) => {
    let newCompletedSections: string[]

    if (completedSections.includes(section)) {
      newCompletedSections = completedSections.filter((s) => s !== section)
    } else {
      newCompletedSections = [...completedSections, section]
    }

    setCompletedSections(newCompletedSections)
    localStorage.setItem(`progress-${lessonId}`, JSON.stringify(newCompletedSections))

    if (!completedSections.includes(section)) {
      toast({
        title: "Tiến độ đã được cập nhật",
        description: `Bạn đã hoàn thành phần "${section}".`,
      })
    }
  }

  const progressPercentage = Math.round((completedSections.length / sections.length) * 100)

  const markAllComplete = () => {
    setCompletedSections([...sections])
    localStorage.setItem(`progress-${lessonId}`, JSON.stringify(sections))
    toast({
      title: "Đã đánh dấu hoàn thành",
      description: "Tất cả các phần đã được đánh dấu là hoàn thành.",
    })
  }

  const resetProgress = () => {
    if (window.confirm("Bạn có chắc chắn muốn đặt lại tiến độ học tập không?")) {
      setCompletedSections([])
      localStorage.setItem(`progress-${lessonId}`, JSON.stringify([]))
      toast({
        title: "Đã đặt lại tiến độ",
        description: "Tiến độ học tập của bạn đã được đặt lại.",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart className="mr-2 h-5 w-5" />
          Tiến độ học tập
        </CardTitle>
        <CardDescription>Theo dõi quá trình học tập của bạn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Tiến độ hoàn thành</span>
            <span className="font-medium">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="space-y-2">
          {sections.map((section, index) => (
            <div
              key={index}
              className="flex items-center p-2 rounded-md hover:bg-accent cursor-pointer"
              onClick={() => toggleSection(section)}
            >
              {completedSections.includes(section) ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
              )}
              <span className={completedSections.includes(section) ? "line-through text-muted-foreground" : ""}>
                {section}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={resetProgress} disabled={completedSections.length === 0}>
          Đặt lại
        </Button>
        <Button size="sm" onClick={markAllComplete} disabled={completedSections.length === sections.length}>
          Đánh dấu tất cả hoàn thành
        </Button>
      </CardFooter>
    </Card>
  )
}
