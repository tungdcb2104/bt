import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LearningModel, MultiChoiceQuestionModel } from "@/models/learning_model";

type ChoiceEntry = { label: string; correct: boolean };

export default function CreateMultiChoiceForm({ onCreated }: { onCreated: (data: LearningModel) => void }) {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [choices, setChoices] = useState<ChoiceEntry[]>([{ label: "", correct: false }, { label: "", correct: false }]);

  const updateChoice = (idx: number, data: Partial<ChoiceEntry>) => {
    setChoices(prev =>
      prev.map((c, i) => (i === idx ? { ...c, ...data } : c))
    );
  };

  const addChoice = () => setChoices(prev => [...prev, { label: "", correct: false }]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const choiceMap: Record<string, boolean> = {};
    choices.forEach(({ label, correct }) => {
      if (label.trim()) choiceMap[label.trim()] = correct;
    });

    const multi_choice_question: MultiChoiceQuestionModel = {
      question, description, choices: choiceMap,
      type: "multi_choice_question",
      questionType: "multi_choice"
    }

    onCreated(multi_choice_question);
    setQuestion(""); setDescription(""); setChoices([{ label: "", correct: false }, { label: "", correct: false }]);
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
          <Input value={c.label} onChange={e => updateChoice(i, { label: e.target.value })} placeholder={`Lựa chọn ${i + 1}`} required />
          <input type="checkbox" checked={c.correct} onChange={e => updateChoice(i, { correct: e.target.checked })} />
          <span className="text-sm">Đúng</span>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addChoice}>+ Thêm lựa chọn</Button>
      <Button type="submit">Tạo câu hỏi</Button>
    </form>
  );
}
