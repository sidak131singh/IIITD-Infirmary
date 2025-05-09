"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

export default function LoginPage({ params }: { params: { role: string } }) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const roleInfo = {
    student: {
      title: "Patient Login",
      description: "Access your appointments and prescriptions",
      color: "blue",
      redirect: "/student/dashboard",
    },
    doctor: {
      title: "Doctor Login",
      description: "Manage your appointments and patient prescriptions",
      color: "green",
      redirect: "/doctor/dashboard",
    },
    admin: {
      title: "Admin Login",
      description: "Manage infirmary records and pharmacy inventory",
      color: "purple",
      redirect: "/admin/dashboard",
    },
  }[params.role] || {
    title: "Login",
    description: "Access your account",
    color: "gray",
    redirect: "/",
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate credentials here
    router.push(roleInfo.redirect)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-${roleInfo.color}-50 to-white`}
    >
      <Card className="w-full max-w-md">
        <CardHeader className={`bg-${roleInfo.color}-50 rounded-t-lg`}>
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="IIIT Delhi Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
          </div>
          <CardTitle className="text-center mt-4">{roleInfo.title}</CardTitle>
          <CardDescription className="text-center">{roleInfo.description}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className={`w-full bg-${roleInfo.color}-600 hover:bg-${roleInfo.color}-700`}>
              Login
            </Button>
            <p className="text-sm text-center text-gray-500">
              Forgot your password? Contact the infirmary administrator.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
