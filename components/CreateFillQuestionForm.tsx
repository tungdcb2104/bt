import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FillQuestionModel, LearningModel } from "@/models/learning_model";

export default function CreateFillQuestionForm({ onCreated }: { onCreated: (data: LearningModel) => void }) {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fill_question: FillQuestionModel = {
      question, description, answer,
      type: "fill_question",
      questionType: "fill"
    }
    onCreated(fill_question);
    setQuestion("");
    setDescription("");
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <Label htmlFor="question">Câu hỏi</Label>
        <Input id="question" value={question} onChange={e => setQuestion(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="description">Mô tả (tuỳ chọn)</Label>
        <Input id="description" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="answer">Đáp án chính xác</Label>
        <Input id="answer" value={answer} onChange={e => setAnswer(e.target.value)} required />
      </div>
      <Button type="submit">Tạo câu hỏi</Button>
    </form>
  );
}
