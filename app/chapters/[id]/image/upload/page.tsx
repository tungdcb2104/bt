import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

export default function UploadChapterImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    // TODO: Gọi API upload ảnh
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Upload ảnh thành công!' });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Upload ảnh cho chương học</h1>
      <form onSubmit={handleUpload} className="space-y-4">
        <Input type="file" accept="image/*" ref={fileInputRef} onChange={e => setFile(e.target.files?.[0] || null)} />
        <Button type="submit" disabled={loading || !file}>
          {loading ? 'Đang upload...' : 'Upload ảnh'}
        </Button>
      </form>
      {file && (
        <div className="mt-4">
          <img src={URL.createObjectURL(file)} alt="Preview" className="max-h-48 rounded" />
        </div>
      )}
    </div>
  );
} 