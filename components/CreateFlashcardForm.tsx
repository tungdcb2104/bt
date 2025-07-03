import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FlashCardModel } from "@/models/learning_model";

export default function CreateFlashcardForm({ onFlashcardCreated }: { onFlashcardCreated: (data: FlashCardModel) => void }) {
  const [frontContent, setFrontContent] = useState("");
  const [backContent, setBackContent] = useState("");
  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFlashcardCreated({
      frontContent, backContent, frontImage, backImage,
      type: "flashcard"
    });
    setFrontContent(""); setBackContent(""); setFrontImage(""); setBackImage("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <Label>Mặt trước</Label>
        <Input value={frontContent} onChange={e => setFrontContent(e.target.value)} required />
      </div>
      <div>
        <Label>Mặt sau</Label>
        <Input value={backContent} onChange={e => setBackContent(e.target.value)} required />
      </div>
      <div>
        <Label>Ảnh mặt trước (link URL)</Label>
        <Input value={frontImage} onChange={e => setFrontImage(e.target.value)} />
      </div>
      <div>
        <Label>Ảnh mặt sau (link URL)</Label>
        <Input value={backImage} onChange={e => setBackImage(e.target.value)} />
      </div>
      <Button type="submit">Tạo flashcard</Button>
    </form>
  );
}
