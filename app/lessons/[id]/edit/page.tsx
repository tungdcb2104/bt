import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import CreateQuestionForm from '@/components/CreateQuestionForm';
import CreateFlashcardForm from '@/components/CreateFlashcardForm';
import CreateQuizVideoForm from '@/components/CreateQuizVideoForm';

export default function EditLessonPage() {
  // TODO: Lấy dữ liệu bài học từ API
  const [title, setTitle] = useState('Tiêu đề mẫu');
  const [description, setDescription] = useState('Mô tả mẫu');
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState<'question' | 'flashcard' | 'quiz_video'>('question');
  const [contents, setContents] = useState<any[]>([]); // Giả lập danh sách nội dung

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Gọi API cập nhật bài học
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Cập nhật bài học thành công!' });
    }, 1000);
  };

  // Xử lý thêm nội dung mới vào bài học
  const handleAddContent = (content: any) => {
    setContents(prev => [...prev, content]);
    toast({ title: 'Thêm nội dung thành công!' });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa bài học</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
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

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Thêm nội dung mới vào bài học</h2>
        <div className="flex gap-2 mb-4">
          <Button variant={contentType === 'question' ? 'default' : 'outline'} onClick={() => setContentType('question')}>Câu hỏi</Button>
          <Button variant={contentType === 'flashcard' ? 'default' : 'outline'} onClick={() => setContentType('flashcard')}>Flashcard</Button>
          <Button variant={contentType === 'quiz_video' ? 'default' : 'outline'} onClick={() => setContentType('quiz_video')}>Quiz Video</Button>
        </div>
        {contentType === 'question' && <CreateQuestionForm onQuestionCreated={handleAddContent} />}
        {contentType === 'flashcard' && <CreateFlashcardForm onFlashcardCreated={handleAddContent} />}
        {contentType === 'quiz_video' && <CreateQuizVideoForm onQuizVideoCreated={handleAddContent} />}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Danh sách nội dung đã thêm</h2>
        {contents.length === 0 ? (
          <p className="text-muted-foreground">Chưa có nội dung nào.</p>
        ) : (
          <ul className="space-y-2">
            {contents.map((c, idx) => (
              <li key={idx} className="border rounded p-2">
                {c.type === 'question' && <div><b>Câu hỏi:</b> {c.question}</div>}
                {c.type === 'flashcard' && <div><b>Flashcard:</b> {c.frontContent} - {c.backContent}</div>}
                {c.type === 'quiz_video' && <div><b>Quiz Video:</b> {c.title}</div>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 