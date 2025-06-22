import React, { useState } from "react";
import { Thumbtack } from "lucide-react";

// Dữ liệu mẫu cho các khóa học đã đăng ký
const initialCourses = [
  {
    id: 1,
    title: "Toán lớp 6 cơ bản",
    instructor: "Nguyễn Văn A",
    progress: 40,
    image: "/placeholder.svg",
    pinned: false,
  },
  {
    id: 2,
    title: "Luyện đề thi Toán 7",
    instructor: "Trần Thị B",
    progress: 80,
    image: "/placeholder.svg",
    pinned: false,
  },
];

export default function RegisteredCoursesList() {
  const [courses, setCourses] = useState(initialCourses);

  const handleTogglePin = (id: number) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id ? { ...course, pinned: !course.pinned } : course
      )
    );
  };

  const sortedCourses = [
    ...courses.filter((c) => c.pinned),
    ...courses.filter((c) => !c.pinned),
  ];

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <img src="/empty-state.svg" alt="empty" className="w-40 h-40 mb-4 opacity-70" />
        <p className="text-lg text-gray-500 font-semibold">Bạn chưa đăng ký khóa học nào</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedCourses.map((course) => (
        <div
          key={course.id}
          className="border rounded-lg p-4 bg-white shadow hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer relative"
        >
          <button
            className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${course.pinned ? 'bg-yellow-200 text-yellow-600' : 'bg-gray-100 text-gray-400 hover:bg-yellow-100 hover:text-yellow-600'}`}
            title={course.pinned ? 'Bỏ ghim' : 'Ghim khóa học'}
            onClick={e => { e.stopPropagation(); handleTogglePin(course.id); }}
          >
            <Thumbtack size={18} fill={course.pinned ? '#facc15' : 'none'} />
          </button>
          <img src={course.image} alt={course.title} className="w-full h-32 object-cover rounded mb-2" />
          <h3 className="font-bold text-lg mb-1">{course.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{course.instructor}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">Tiến độ: {course.progress}%</p>
        </div>
      ))}
    </div>
  );
} 