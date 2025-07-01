import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

export default function EditChapterPage() {
  // TODO: Lấy dữ liệu chương học từ API
  const [name, setName] = useState('Tên chương mẫu');
  const [description, setDescription] = useState('Mô tả chương mẫu');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Gọi API cập nhật chương học
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Cập nhật chương học thành công!' });
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa chương học</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Tên chương học</Label>
          <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
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