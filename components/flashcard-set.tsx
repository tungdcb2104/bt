"use client"

import { useState } from "react"
import { BookOpen, Search, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flashcard, type FlashcardItem } from "./flashcard"

interface FlashcardSetProps {
  title: string
  description?: string
  categories?: string[]
  cards: FlashcardItem[]
}

export function FlashcardSet({ title, description, categories = [], cards }: FlashcardSetProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [studyMode, setStudyMode] = useState<"all" | "review">("all")

  // Lọc thẻ dựa trên tìm kiếm và danh mục
  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      searchTerm === "" ||
      card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.back.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === null || card.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Lấy danh sách các danh mục duy nhất từ thẻ
  const uniqueCategories = Array.from(new Set(cards.map((card) => card.category).filter(Boolean) as string[]))

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              {title}
            </CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{cards.length} thẻ</Badge>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Tạo thẻ mới
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm thẻ ghi nhớ..."
              className="w-full rounded-md pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Lọc
          </Button>
        </div>

        {uniqueCategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              Tất cả
            </Badge>
            {uniqueCategories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        )}

        <Tabs defaultValue="cards" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cards" onClick={() => setStudyMode("all")}>
              Tất cả thẻ
            </TabsTrigger>
            <TabsTrigger value="study" onClick={() => setStudyMode("review")}>
              Học tập
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCards.map((card) => (
                <Card key={card.id} className="overflow-hidden h-40">
                  <CardContent className="p-4 h-full flex flex-col">
                    {card.category && (
                      <Badge variant="outline" className="self-start mb-2">
                        {card.category}
                      </Badge>
                    )}
                    <div className="flex-grow flex items-center justify-center text-center">
                      <div className="font-medium">{card.front}</div>
                    </div>
                    <div className="text-xs text-muted-foreground text-center mt-2">Nhấp để xem đáp án</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="study" className="mt-4">
            <Flashcard cards={filteredCards} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Hiển thị {filteredCards.length} trong tổng số {cards.length} thẻ
        </div>
      </CardFooter>
    </Card>
  )
}
