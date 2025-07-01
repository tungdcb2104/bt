import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

export default function CreateClassPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Gọi API tạo lớp học
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Tạo lớp học thành công!' });
      setName('');
      setDescription('');
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Tạo lớp học mới</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Tên lớp học</Label>
          <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="desc">Mô tả</Label>
          <Input id="desc" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Đang tạo...' : 'Tạo lớp học'}
        </Button>
      </form>
    </div>
  );
} 