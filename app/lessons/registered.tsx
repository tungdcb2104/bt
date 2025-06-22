import RegisteredLessonsList from "@/components/RegisteredLessonsList";

export default function RegisteredLessonsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Bài học đã đăng ký</h1>
      <RegisteredLessonsList />
    </div>
  );
} 