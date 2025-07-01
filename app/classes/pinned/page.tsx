import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

// Giả sử có sẵn danh sách lớp học đã ghim
const pinnedClasses = [
  { id: 1, name: 'Lớp Toán 6A', description: 'Toán nâng cao' },
  { id: 2, name: 'Lớp Văn 7B', description: 'Văn học hiện đại' },
];

export default function PinnedClassesPage() {
  const [classes, setClasses] = useState(pinnedClasses);

  const handleUnpin = (id: number) => {
    setClasses(prev => prev.filter(c => c.id !== id));
    // TODO: Gọi API bỏ ghim lớp học
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Lớp học đã ghim</h1>
      {classes.length === 0 ? (
        <p>Không có lớp học nào được ghim.</p>
      ) : (
        <ul className="space-y-4">
          {classes.map(c => (
            <li key={c.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-muted-foreground">{c.description}</div>
              </div>
              <Button variant="outline" onClick={() => handleUnpin(c.id)}>
                Bỏ ghim
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 