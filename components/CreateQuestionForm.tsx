import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreateQuestionForm(props : {lessonId: number, onQuestionCreated?: () => void}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Xử lý lưu câu hỏi
    alert(`Đã tạo câu hỏi: ${question} - Đáp án: ${answer}`);
    setQuestion("");
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <Label htmlFor="question">Nội dung câu hỏi</Label>
        <Input
          id="question"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Nhập nội dung câu hỏi"
          required
        />
      </div>
      <div>
        <Label htmlFor="answer">Đáp án</Label>
        <Input
          id="answer"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Nhập đáp án"
          required
        />
      </div>
      <Button type="submit">Tạo câu hỏi</Button>
    </form>
  );
} 