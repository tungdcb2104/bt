"use client";

import type React from "react";
import Link from "next/link";
import { Search, Menu, Bell, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { userService } from "@/services/user_service";
import { ClipLoader } from "react-spinners";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isLogin, setIsLogin] = useState(null as boolean | null);

  const checkLoginListener = useCallback(
    () => {
      userService.getSession().then((session) => {
      if (session) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      }).catch((error) => {
        setIsLogin(false);
      });
    }, []
  );

  function handleLogin() {
    userService.login();
  }

  function handleLogout() {
    userService.logout();
  }

  useLayoutEffect (() => {
    checkLoginListener(); // Initial check
    setTimeout(() => {
      setIsLogin((state) => state ?? false);
    }, 5000); // Simulate delay for initial loading
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-xl">MathEdu</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="hidden md:flex items-center gap-1"
                >
                  Danh mục
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>
                  <Link href="/classes" className="w-full">
                    Lớp học
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/lessons" className="w-full">
                    Tất cả bài học
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Lớp 6</DropdownMenuLabel>
                <DropdownMenuItem>Số học</DropdownMenuItem>
                <DropdownMenuItem>Hình học</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Lớp 7</DropdownMenuLabel>
                <DropdownMenuItem>Đại số</DropdownMenuItem>
                <DropdownMenuItem>Hình học</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Lớp 8</DropdownMenuLabel>
                <DropdownMenuItem>Đại số</DropdownMenuItem>
                <DropdownMenuItem>Hình học</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Lớp 9</DropdownMenuLabel>
                <DropdownMenuItem>Đại số</DropdownMenuItem>
                <DropdownMenuItem>Hình học</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden md:flex items-center relative flex-1 max-w-md mx-4">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm bài học..."
              className="w-full pl-10 pr-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-5 w-5" />
            </Button>
            {isLogin === null ? <ClipLoader size={16}></ClipLoader>: <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {isLogin ? (
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                ) : (
                  <Button variant="default" size="default" className="rounded-full" onClick={handleLogin}>
                    <p>Đăng nhập</p>
                  </Button>
                )}
              </DropdownMenuTrigger>
              {isLogin && <DropdownMenuContent align="end">
      
                    <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/courses/registered">Khóa học đã đăng ký</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/lessons/registered">Bài học đã đăng ký</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Bài học của tôi</DropdownMenuItem>
                    <DropdownMenuItem>Thẻ ghi nhớ</DropdownMenuItem>
                    <DropdownMenuItem>Cài đặt</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
 
              </DropdownMenuContent>}
            </DropdownMenu>}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-gray-50">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">MathEdu</h3>
              <p className="text-sm text-muted-foreground">
                Nền tảng học tập toán học trực tuyến hàng đầu cho học sinh cấp
                2.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Liên kết</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lessons"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Bài học
                  </Link>
                </li>
                <li>
                  <Link
                    href="/flashcards"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Thẻ ghi nhớ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/exams"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Đề thi
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/faq"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Điều khoản sử dụng
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Kết nối</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2023 MathEdu. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
