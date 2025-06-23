import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreateFlashcardForm() {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Xử lý lưu flashcard
    alert(`Đã tạo flashcard: ${front} - ${back}`);
    setFront("");
    setBack("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <Label htmlFor="front">Mặt trước</Label>
        <Input
          id="front"
          value={front}
          onChange={e => setFront(e.target.value)}
          placeholder="Nhập mặt trước"
          required
        />
      </div>
      <div>
        <Label htmlFor="back">Mặt sau</Label>
        <Input
          id="back"
          value={back}
          onChange={e => setBack(e.target.value)}
          placeholder="Nhập mặt sau"
          required
        />
      </div>
      <Button type="submit">Tạo flashcard</Button>
    </form>
  );
} 