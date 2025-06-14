"use client"

import { useState, useEffect } from "react"
import { Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface NoteEditorProps {
  lessonId: string
}

export function NoteEditor({ lessonId }: NoteEditorProps) {
  const [note, setNote] = useState("")
  const [isSaved, setIsSaved] = useState(true)

  // Tải ghi chú từ localStorage khi component được mount
  useEffect(() => {
    const savedNote = localStorage.getItem(`note-${lessonId}`)
    if (savedNote) {
      setNote(savedNote)
    }
  }, [lessonId])

  // Cập nhật trạng thái đã lưu khi note thay đổi
  useEffect(() => {
    const savedNote = localStorage.getItem(`note-${lessonId}`)
    setIsSaved(savedNote === note)
  }, [note, lessonId])

  const handleSave = () => {
    localStorage.setItem(`note-${lessonId}`, note)
    setIsSaved(true)
    toast({
      title: "Đã lưu ghi chú",
      description: "Ghi chú của bạn đã được lưu thành công.",
    })
  }

  const handleClear = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ghi chú này không?")) {
      setNote("")
      localStorage.removeItem(`note-${lessonId}`)
      setIsSaved(true)
      toast({
        title: "Đã xóa ghi chú",
        description: "Ghi chú của bạn đã được xóa.",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ghi chú cá nhân</CardTitle>
        <CardDescription>Ghi lại những điểm quan trọng để ôn tập sau này</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Nhập ghi chú của bạn ở đây..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-[150px]"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={handleClear} disabled={!note}>
          <Trash2 className="mr-2 h-4 w-4" />
          Xóa
        </Button>
        <Button size="sm" onClick={handleSave} disabled={isSaved}>
          <Save className="mr-2 h-4 w-4" />
          Lưu ghi chú
        </Button>
      </CardFooter>
    </Card>
  )
}
