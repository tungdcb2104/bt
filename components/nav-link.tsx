import type React from "react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface NavLinkProps {
  href: string
  children: React.ReactNode
  icon?: LucideIcon
}

export function NavLink({ href, children, icon: Icon }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center px-4 py-2 mx-2 text-sm font-medium text-gray-700 hover:text-blue-600"
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </Link>
  )
}
