'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ManagementPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Management</h1>
      <p className="mb-4">Select a resource to manage:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/management/classes" passHref>
          <Button className="w-full">Manage Classes</Button>
        </Link>
        <Link href="/management/chapters" passHref>
          <Button className="w-full">Manage Chapters</Button>
        </Link>
        <Link href="/management/lessons" passHref>
          <Button className="w-full">Manage Lessons</Button>
        </Link>
      </div>
    </div>
  );
} 