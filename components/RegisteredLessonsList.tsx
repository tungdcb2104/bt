import React from "react";

// Dữ liệu mẫu cho các bài học đã đăng ký
const registeredLessons = [
  {
    id: 1,
    title: "Phép cộng phân số",
    course: "Toán lớp 6 cơ bản",
    progress: 100,
  },
  {
    id: 2,
    title: "Giải phương trình bậc nhất",
    course: "Luyện đề thi Toán 7",
    progress: 60,
  },
];

export default function RegisteredLessonsList() {
  if (registeredLessons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <img src="/empty-state.svg" alt="empty" className="w-40 h-40 mb-4 opacity-70" />
        <p className="text-lg text-gray-500 font-semibold">Bạn chưa đăng ký bài học nào</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {registeredLessons.map((lesson) => (
        <div
          key={lesson.id}
          className="border rounded-lg p-4 bg-white shadow hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer relative"
        >
          <h3 className="font-bold text-lg mb-1">{lesson.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{lesson.course}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${lesson.progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">Tiến độ: {lesson.progress}%</p>
        </div>
      ))}
    </div>
  );
} 