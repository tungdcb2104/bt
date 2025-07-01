"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface MathVisualizerProps {
  title: string
  description?: string
}

export function MathVisualizer({ title, description }: MathVisualizerProps) {
  const [circleRadius, setCircleRadius] = useState(50)
  const [rectangleWidth, setRectangleWidth] = useState(100)
  const [rectangleHeight, setRectangleHeight] = useState(60)
  const [triangleBase, setTriangleBase] = useState(100)
  const [triangleHeight, setTriangleHeight] = useState(80)

  // Tính toán các giá trị
  const circleArea = Math.PI * circleRadius * circleRadius
  const circleCircumference = 2 * Math.PI * circleRadius

  const rectangleArea = rectangleWidth * rectangleHeight
  const rectanglePerimeter = 2 * (rectangleWidth + rectangleHeight)

  const triangleArea = 0.5 * triangleBase * triangleHeight
  const trianglePerimeter = triangleBase + 2 * Math.sqrt((triangleBase / 2) ** 2 + triangleHeight ** 2)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="circle">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="circle">Hình tròn</TabsTrigger>
            <TabsTrigger value="rectangle">Hình chữ nhật</TabsTrigger>
            <TabsTrigger value="triangle">Tam giác</TabsTrigger>
          </TabsList>

          <TabsContent value="circle" className="space-y-4 pt-4">
            <div className="flex justify-center mb-6">
              <div
                className="rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center"
                style={{
                  width: `${circleRadius * 2}px`,
                  height: `${circleRadius * 2}px`,
                }}
              >
                <div className="text-xs text-center">r = {circleRadius}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label>Bán kính (r): {circleRadius}</Label>
                <Slider
                  value={[circleRadius]}
                  min={10}
                  max={100}
                  step={1}
                  onValueChange={(value) => setCircleRadius(value[0])}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-md">
                  <div className="text-sm font-medium">Diện tích</div>
                  <div className="mt-1">
                    <span className="text-lg font-bold">{circleArea.toFixed(2)}</span> đơn vị<sup>2</sup>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    S = πr² = π × {circleRadius}² = {circleArea.toFixed(2)}
                  </div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-md">
                  <div className="text-sm font-medium">Chu vi</div>
                  <div className="mt-1">
                    <span className="text-lg font-bold">{circleCircumference.toFixed(2)}</span> đơn vị
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    C = 2πr = 2π × {circleRadius} = {circleCircumference.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rectangle" className="space-y-4 pt-4">
            <div className="flex justify-center mb-6">
              <div
                className="bg-green-500/20 border-2 border-green-500 flex items-center justify-center"
                style={{
                  width: `${rectangleWidth}px`,
                  height: `${rectangleHeight}px`,
                }}
              >
                <div className="text-xs text-center">
                  {rectangleWidth} × {rectangleHeight}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label>Chiều rộng: {rectangleWidth}</Label>
                <Slider
                  value={[rectangleWidth]}
                  min={20}
                  max={200}
                  step={1}
                  onValueChange={(value) => setRectangleWidth(value[0])}
                />
              </div>

              <div>
                <Label>Chiều cao: {rectangleHeight}</Label>
                <Slider
                  value={[rectangleHeight]}
                  min={20}
                  max={150}
                  step={1}
                  onValueChange={(value) => setRectangleHeight(value[0])}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-green-50 dark:bg-green-950 rounded-md">
                  <div className="text-sm font-medium">Diện tích</div>
                  <div className="mt-1">
                    <span className="text-lg font-bold">{rectangleArea}</span> đơn vị<sup>2</sup>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    S = a × b = {rectangleWidth} × {rectangleHeight} = {rectangleArea}
                  </div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950 rounded-md">
                  <div className="text-sm font-medium">Chu vi</div>
                  <div className="mt-1">
                    <span className="text-lg font-bold">{rectanglePerimeter}</span> đơn vị
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    P = 2(a + b) = 2({rectangleWidth} + {rectangleHeight}) = {rectanglePerimeter}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="triangle" className="space-y-4 pt-4">
            <div className="flex justify-center mb-6 h-[150px]">
              <svg
                width={triangleBase + 20}
                height={triangleHeight + 20}
                viewBox={`0 0 ${triangleBase + 20} ${triangleHeight + 20}`}
              >
                <polygon
                  points={`10,${triangleHeight + 10} ${triangleBase / 2 + 10},10 ${triangleBase + 10},${triangleHeight + 10}`}
                  fill="rgba(249, 115, 22, 0.2)"
                  stroke="#f97316"
                  strokeWidth="2"
                />
                <text x={triangleBase / 2 + 10} y={triangleHeight / 2 + 20} textAnchor="middle" fontSize="12">
                  Đáy: {triangleBase}
                </text>
                <text x={triangleBase / 2 + 30} y={triangleHeight / 2 - 10} textAnchor="middle" fontSize="12">
                  Cao: {triangleHeight}
                </text>
              </svg>
            </div>

            <div className="space-y-3">
              <div>
                <Label>Đáy: {triangleBase}</Label>
                <Slider
                  value={[triangleBase]}
                  min={20}
                  max={200}
                  step={1}
                  onValueChange={(value) => setTriangleBase(value[0])}
                />
              </div>

              <div>
                <Label>Chiều cao: {triangleHeight}</Label>
                <Slider
                  value={[triangleHeight]}
                  min={20}
                  max={150}
                  step={1}
                  onValueChange={(value) => setTriangleHeight(value[0])}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-md">
                  <div className="text-sm font-medium">Diện tích</div>
                  <div className="mt-1">
                    <span className="text-lg font-bold">{triangleArea}</span> đơn vị<sup>2</sup>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    S = (a × h)/2 = ({triangleBase} × {triangleHeight})/2 = {triangleArea}
                  </div>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-md">
                  <div className="text-sm font-medium">Chu vi</div>
                  <div className="mt-1">
                    <span className="text-lg font-bold">{trianglePerimeter.toFixed(2)}</span> đơn vị
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">P ≈ {trianglePerimeter.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
