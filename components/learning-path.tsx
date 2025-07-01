"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, CheckCircle, Lock, BookOpen, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface LearningModule {
  id: string
  title: string
  description: string
  duration: string
  lessonsCount: number
  completedLessons: number
  isLocked: boolean
  href: string
  requiredModules?: string[]
  badge?: {
    text: string
    variant: "default" | "secondary" | "destructive" | "outline"
  }
}

interface LearningPathProps {
  modules: LearningModule[]
  title: string
  description?: string
}

export function LearningPath({ modules, title, description }: LearningPathProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null)

  const toggleModule = (moduleId: string) => {
    if (expandedModule === moduleId) {
      setExpandedModule(null)
    } else {
      setExpandedModule(moduleId)
    }
  }

  // Tính toán tổng tiến độ
  const totalLessons = modules.reduce((acc, module) => acc + module.lessonsCount, 0)
  const completedLessons = modules.reduce((acc, module) => acc + module.completedLessons, 0)
  const overallProgress = Math.round((completedLessons / totalLessons) * 100)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Tiến độ tổng thể: {completedLessons}/{totalLessons} bài học
            </div>
            <Badge variant="outline">{overallProgress}%</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Progress value={overallProgress} className="h-2" />

        <div className="space-y-4">
          {modules.map((module) => {
            const progress = Math.round((module.completedLessons / module.lessonsCount) * 100)
            const isExpanded = expandedModule === module.id

            return (
              <Card
                key={module.id}
                className={cn(
                  "overflow-hidden transition-all",
                  module.isLocked ? "opacity-70" : "",
                  isExpanded ? "border-blue-200 dark:border-blue-800" : "",
                )}
              >
                <div
                  className={cn(
                    "p-4 cursor-pointer",
                    module.isLocked ? "" : "hover:bg-muted/50",
                    isExpanded ? "bg-blue-50 dark:bg-blue-950" : "",
                  )}
                  onClick={() => !module.isLocked && toggleModule(module.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          module.isLocked
                            ? "bg-muted"
                            : progress === 100
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
                        )}
                      >
                        {module.isLocked ? (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        ) : progress === 100 ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <BookOpen className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium flex items-center">
                          {module.title}
                          {module.badge && (
                            <Badge variant={module.badge.variant} className="ml-2">
                              {module.badge.text}
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{module.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground hidden sm:block">{module.duration}</div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground">
                          {module.completedLessons}/{module.lessonsCount}
                        </div>
                        <ChevronRight
                          className={cn(
                            "h-5 w-5 transition-transform",
                            isExpanded ? "rotate-90" : "",
                            module.isLocked ? "text-muted-foreground" : "",
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4">
                    <div className="pt-2 pb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tiến độ</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    {module.requiredModules && module.requiredModules.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm font-medium mb-2">Yêu cầu trước:</div>
                        <div className="flex flex-wrap gap-2">
                          {module.requiredModules.map((reqModule, index) => (
                            <Badge key={index} variant="outline">
                              {reqModule}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button asChild className="w-full">
                      <Link href={module.href}>
                        {progress === 0 ? "Bắt đầu học" : progress === 100 ? "Xem lại bài học" : "Tiếp tục học"}
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {modules.filter((m) => !m.isLocked).length} mô-đun có sẵn, {modules.filter((m) => m.isLocked).length} mô-đun
          bị khóa
        </div>
        {completedLessons === totalLessons && (
          <div className="flex items-center text-green-600">
            <Award className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Hoàn thành khóa học</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
