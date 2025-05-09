import type React from "react"
import { Header } from "@/components/header"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header userType="student" userName="John Doe" />
      <main className="flex-1">{children}</main>
    </div>
  )
}
