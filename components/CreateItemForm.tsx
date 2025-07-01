import { useState } from "react";
import CreateQuestionForm from "./CreateQuestionForm";
import CreateFlashcardForm from "./CreateFlashcardForm";
import CreateQuizVideoForm from "./CreateQuizVideoForm";

export default function CreateItemForm() {
  const [type, setType] = useState("question");

  return (
    <div className="p-4 bg-white rounded shadow mt-8">
      <select
        className="mb-4 border p-2"
        value={type}
        onChange={e => setType(e.target.value)}
      >
        <option value="question">Câu hỏi</option>
        <option value="flashcard">Flashcard</option>
        <option value="quiz_video">Quiz Video</option>
      </select>
      {type === "question" && <CreateQuestionForm />}
      {type === "flashcard" && <CreateFlashcardForm />}
      {type === "quiz_video" && <CreateQuizVideoForm />}
    </div>
  );
} 