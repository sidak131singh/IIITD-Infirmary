import type React from "react"
import { Header } from "@/components/header"

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header userType="doctor" userName="Dr. Sarah Johnson" />
      <main className="flex-1">{children}</main>
    </div>
  )
}
