"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { createClassService } from "@/services/create_class_service";
import { Layout } from "@/components/layout";

export default function CreateClassPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createClassService.createClass({
        title: name,
        description: description,
      });
      toast({ title: "Tạo lớp học thành công!" });
      setName("");
      setDescription("");
    } catch (error: any) {
      toast({ title: "Tạo lớp học thất bại", description: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Tạo lớp học mới</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Tên lớp học</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="desc">Mô tả</Label>
          <Input
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Đang tạo..." : "Tạo lớp học"}
        </Button>
      </form>
    </div>
    </Layout>
  );
}
