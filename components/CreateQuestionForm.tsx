import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Props {
  onCreated: (content: { question: string; description?: string }) => void;
}

export default function CreateQuestionForm({ onCreated }: Props) {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreated({ question, description });
    setQuestion("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <Label htmlFor="question">Câu hỏi</Label>
        <Input
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Nhập nội dung câu hỏi"
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Mô tả (tuỳ chọn)</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Thêm mô tả nếu có"
        />
      </div>
      <Button type="submit">Tạo câu hỏi</Button>
    </form>
  );
}
