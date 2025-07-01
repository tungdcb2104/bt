import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function UnregisterClassAction({ onUnregistered }: { onUnregistered?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [unregistered, setUnregistered] = useState(false);

  const handleUnregister = async () => {
    setLoading(true);
    // TODO: Gọi API rút khỏi lớp học
    setTimeout(() => {
      setLoading(false);
      setUnregistered(true);
      toast({ title: 'Rút khỏi lớp học thành công!' });
      onUnregistered?.();
    }, 1000);
  };

  return (
    <Button variant="outline" onClick={handleUnregister} disabled={loading || unregistered}>
      {loading ? 'Đang xử lý...' : unregistered ? 'Đã rút khỏi lớp' : 'Rút khỏi lớp học'}
    </Button>
  );
} 