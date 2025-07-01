"use client";

import { useLayoutEffect, useState } from "react";
import { Layout } from "@/components/layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { classViewService } from "@/services/class_view_service";
import { ClassModel } from "@/models/class_model";
import { toast } from "@/components/ui/use-toast";
import { ClassCard } from "@/components/ClassCardView";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  useLayoutEffect(() => {
    async function fetchClasses() {
      try {
        const classes = await classViewService.getAllClasses();
        setClasses(classes);
      } catch (error: Error | any) {
        setError(error.message || "Đã xảy ra lỗi khi tải dữ liệu lớp học.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchClasses();
  }, []);

  const handlePin = async (id: number) => {
    try {
      await classViewService.pinClass(id);
      setClasses((prev) =>
        prev.map((c) => (c.id === id ? { ...c, pinned: true } : c))
      );
      toast({ title: "Đã ghim lớp học!" });
    } catch (err: any) {
      toast({ title: "Lỗi xảy ra", description: err });
    }
  };

  const handleUnpin = async (id: number) => {
    try {
      await classViewService.unpinClass(id);
      setClasses((prev) =>
        prev.map((c) => (c.id === id ? { ...c, pinned: false } : c))
      );
      toast({ title: "Đã bỏ ghim lớp học!" });
    } catch (err: any) {
      toast({ title: "Lỗi xảy ra", description: err });
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 text-red-800 p-4 rounded-md">
            <h2 className="text-lg font-semibold">Lỗi</h2>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Lớp học</h1>
          <div className="flex gap-2">
            <Button onClick={() => router.push("/classes/create")}>
            + Tạo lớp mới
          </Button>
          <Button variant={"secondary"} onClick={() => router.push("/classes/pinned")}>
            Lớp đã ghim
          </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-2/3"></div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes.map((clazz) => (
              <ClassCard
                key={clazz.id}
                clazz={clazz}
                handlePin={handlePin}
                handleUnpin={handleUnpin}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
