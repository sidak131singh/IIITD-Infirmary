import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-5xl flex flex-col items-center gap-8">
        <div className="flex items-center gap-4">
          <Image
            src="/placeholder.svg?height=80&width=80"
            alt="IIIT Delhi Logo"
            width={80}
            height={80}
            className="rounded-md"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">IIIT Delhi Infirmary Portal</h1>
            <p className="text-gray-600">College Infirmary Management System</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <Card className="w-full hover:shadow-lg transition-shadow">
            <CardHeader className="bg-blue-50 rounded-t-lg">
              <CardTitle className="text-center text-blue-700">Patient</CardTitle>
              <CardDescription className="text-center">Book appointments & view prescriptions</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 flex justify-center">
              <Image
                src="/placeholder.svg?height=120&width=120"
                alt="Student"
                width={120}
                height={120}
                className="rounded-full bg-blue-100 p-2"
              />
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Link href="/login/student">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Login as Patient</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="w-full hover:shadow-lg transition-shadow">
            <CardHeader className="bg-green-50 rounded-t-lg">
              <CardTitle className="text-center text-green-700">Doctor</CardTitle>
              <CardDescription className="text-center">Manage appointments & prescriptions</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 flex justify-center">
              <Image
                src="/placeholder.svg?height=120&width=120"
                alt="Doctor"
                width={120}
                height={120}
                className="rounded-full bg-green-100 p-2"
              />
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Link href="/login/doctor">
                <Button className="w-full bg-green-600 hover:bg-green-700">Login as Doctor</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="w-full hover:shadow-lg transition-shadow">
            <CardHeader className="bg-purple-50 rounded-t-lg">
              <CardTitle className="text-center text-purple-700">Admin</CardTitle>
              <CardDescription className="text-center">Manage records & pharmacy inventory</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 flex justify-center">
              <Image
                src="/placeholder.svg?height=120&width=120"
                alt="Admin"
                width={120}
                height={120}
                className="rounded-full bg-purple-100 p-2"
              />
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Link href="/login/admin">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Login as Admin</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500">© 2024 IIIT Delhi Infirmary. All rights reserved.</p>
        </div>
      </div>
    </main>
  )
}
