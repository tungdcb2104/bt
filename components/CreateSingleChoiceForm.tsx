import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LearningModel, SingleChoiceQuestionModel } from "@/models/learning_model";

export default function CreateSingleChoiceForm({ onCreated }: { onCreated: (data: LearningModel) => void }) {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [choices, setChoices] = useState(["", ""]);
  const [correctChoice, setCorrectChoice] = useState(0);

  const updateChoice = (idx: number, value: string) => {
    setChoices(prev => prev.map((c, i) => (i === idx ? value : c)));
  };

  const addChoice = () => setChoices(prev => [...prev, ""]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const single_choice_question: SingleChoiceQuestionModel = {
      question, description, choices, correctChoice,
      type: "single_choice_question",
      questionType: "single_choice"
    }
    onCreated(single_choice_question);
    setQuestion(""); setDescription(""); setChoices(["", ""]); setCorrectChoice(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <Label>Câu hỏi</Label>
        <Input value={question} onChange={e => setQuestion(e.target.value)} required />
      </div>
      <div>
        <Label>Mô tả (tuỳ chọn)</Label>
        <Input value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      {choices.map((c, i) => (
        <div key={i} className="flex gap-2 items-center">
          <Input value={c} onChange={e => updateChoice(i, e.target.value)} placeholder={`Lựa chọn ${i + 1}`} required />
          <input type="radio" name="correct" checked={correctChoice === i} onChange={() => setCorrectChoice(i)} />
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addChoice}>+ Thêm lựa chọn</Button>
      <Button type="submit">Tạo câu hỏi</Button>
    </form>
  );
}
