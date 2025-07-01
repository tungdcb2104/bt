import { BookOpen, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import Link from "next/link";

export function ClassCard({ clazz, handlePin, handleUnpin}: { clazz: any, handlePin: any, handleUnpin: any }) {

  return (
    <Card key={clazz.id} className="relative group">
      <button
        onClick={() => {
            (clazz.pinned ? handleUnpin : handlePin)(clazz.id)
        }}
        className={`
          absolute top-2 right-2 z-10
          p-1 rounded-md
          text-muted-foreground
          transition-colors
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
          hover:bg-accent
          ${clazz.pinned ? '' : 'opacity-0 group-hover:opacity-100'}
        `}
        aria-label={clazz.pinned ? "Bỏ ghim lớp học" : "Ghim lớp học"}
      >
        <Pin
          className="h-4 w-4"
          strokeWidth={clazz.pinned ? 2 : 1.5}
          fill={clazz.pinned ? "currentColor" : "none"}
        />
      </button>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{clazz.title}</CardTitle>
      </CardHeader>

      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {clazz.description}
        </p>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>{clazz.categories?.join(', ') ?? "Không có phân loại"}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/classes/${clazz.id}`}>Xem chi tiết</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
