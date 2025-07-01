import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

export default function DeleteClassAction({ onDeleted }: { onDeleted?: () => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    // TODO: Gọi API xóa lớp học
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      toast({ title: 'Xóa lớp học thành công!' });
      onDeleted?.();
    }, 1000);
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Xóa lớp học
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogDescription>Bạn có chắc chắn muốn xóa lớp học này không?</DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>Hủy</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading ? 'Đang xóa...' : 'Xóa'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 