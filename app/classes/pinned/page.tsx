"use client";

import React, { useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ClassModel } from "@/models/class_model";
import { pinnedClassViewService } from "@/services/pinned_class_view_service";
import { toast } from "@/components/ui/use-toast";
import { Layout } from "@/components/layout";

export default function PinnedClassesPage() {
  const [classes, setClasses] = useState<ClassModel[] | null>(null);

  useLayoutEffect(() => {
    async function fetchClasses() {
      try {
        const classes = await pinnedClassViewService.getClasses();
        setClasses(classes);
      } catch {}
    }
    fetchClasses();
  }, []);

  const handleUnpin = async (id: number) => {
    try {
      await pinnedClassViewService.unpinClass(id);
      setClasses(
        (prev) =>
          prev?.filter((clazz) => clazz.id != id) ?? null
      );
      toast({ title: "Đã bỏ ghim lớp học!" });
    } catch (err: any) {
      toast({ title: "Lỗi xảy ra", description: err });
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Lớp học đã ghim</h1>
        {classes !== null &&
          (classes.length === 0 ? (
            <p>Không có lớp học nào được ghim.</p>
          ) : (
            <ul className="space-y-4">
              {classes.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <div className="font-semibold">{c.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {c.description}
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => handleUnpin(c.id)}>
                    Bỏ ghim
                  </Button>
                </li>
              ))}
            </ul>
          ))}
      </div>
    </Layout>
  );
}
