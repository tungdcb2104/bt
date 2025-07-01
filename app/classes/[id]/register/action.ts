import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function RegisterClassAction({ onRegistered }: { onRegistered?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    // TODO: Gọi API đăng ký lớp học
    setTimeout(() => {
      setLoading(false);
      setRegistered(true);
      toast({ title: 'Đăng ký lớp học thành công!' });
      onRegistered?.();
    }, 1000);
  };

  return (
    <Button onClick={handleRegister} disabled={loading || registered}>
      {loading ? 'Đang đăng ký...' : registered ? 'Đã đăng ký' : 'Đăng ký lớp học'}
    </Button>
  );
} 