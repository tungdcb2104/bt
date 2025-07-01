import RegisteredCoursesList from "@/components/RegisteredCoursesList";

export default function RegisteredCoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Khóa học đã đăng ký</h1>
      <RegisteredCoursesList />
    </div>
  );
} 