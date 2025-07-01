import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

export default function EditLessonPage() {
  // TODO: Lấy dữ liệu bài học từ API
  const [title, setTitle] = useState('Tiêu đề mẫu');
  const [description, setDescription] = useState('Mô tả mẫu');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Gọi API cập nhật bài học
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Cập nhật bài học thành công!' });
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa bài học</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Tiêu đề bài học</Label>
          <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="desc">Mô tả</Label>
          <Input id="desc" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
        </Button>
      </form>
    </div>
  );
} 