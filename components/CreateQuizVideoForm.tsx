import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreateQuizVideoForm() {
  const [videoUrl, setVideoUrl] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Xử lý lưu quiz video
    alert(`Đã tạo quiz video: ${videoUrl} - Câu hỏi: ${question}`);
    setVideoUrl("");
    setQuestion("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <Label htmlFor="videoUrl">Link video</Label>
        <Input
          id="videoUrl"
          value={videoUrl}
          onChange={e => setVideoUrl(e.target.value)}
          placeholder="Dán link video"
          required
        />
      </div>
      <div>
        <Label htmlFor="question">Câu hỏi liên quan</Label>
        <Input
          id="question"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Nhập câu hỏi liên quan đến video"
          required
        />
      </div>
      <Button type="submit">Tạo quiz video</Button>
    </form>
  );
} 