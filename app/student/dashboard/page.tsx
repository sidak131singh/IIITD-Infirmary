"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, FileText, Plus, User } from "lucide-react"
import Link from "next/link"
import { RoleGuard } from "@/components/auth/RoleGuard"

interface Appointment {
  id: string
  date: string
  timeSlot: string
  reason: string
  status: string
  doctor: {
    name: string
  }
}

export default function StudentDashboard() {
  const { data: session } = useSession()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/appointments")
        if (response.ok) {
          const data = await response.json()
          setAppointments(data.data || [])
        }
      } catch (error) {
        console.error("Failed to fetch appointments:", error)
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      fetchAppointments()
    }
  }, [session])

  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.date) > new Date() && apt.status !== "CANCELLED"
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const recentAppointments = appointments.filter(apt => 
    new Date(apt.date) <= new Date()
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <RoleGuard allowedRoles={["STUDENT"]}>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome, {session?.user?.name || "Student"}
            </h1>
            <p className="text-muted-foreground">
              Here's an overview of your health information and upcoming appointments.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                ) : upcomingAppointments.length > 0 ? (
                  <>
                    <div className="text-2xl font-bold">
                      {new Date(upcomingAppointments[0].date).toLocaleDateString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {upcomingAppointments[0].timeSlot} with {upcomingAppointments[0].doctor.name}
                    </p>
                    <div className="mt-4">
                      <Link href="/student/appointments">
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-lg font-medium text-muted-foreground">
                      No upcoming appointments
                    </div>
                    <div className="mt-4">
                      <Link href="/student/appointments/book">
                        <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                          Book Appointment
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{appointments.length}</div>
                <p className="text-xs text-muted-foreground">
                  {recentAppointments.length > 0 
                    ? `Last visit: ${new Date(recentAppointments[0].date).toLocaleDateString()}`
                    : "No previous appointments"
                  }
                </p>
                <div className="mt-4">
                  <Link href="/student/appointments">
                    <Button variant="outline" size="sm" className="w-full">
                      View History
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/student/appointments/book">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Plus className="mr-2 h-4 w-4" /> Book Appointment
                    </Button>
                  </Link>
                  <Link href="/student/profile">
                    <Button variant="outline" size="sm" className="w-full">
                      <User className="mr-2 h-4 w-4" /> Update Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Health Reminders</CardTitle>
                <CardDescription>Important health information and reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-lg border p-3">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Annual Health Checkup</h3>
                      <p className="text-sm text-muted-foreground">
                        Schedule your annual health checkup to maintain good health.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-lg border p-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <FileText className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Vaccination Records</h3>
                      <p className="text-sm text-muted-foreground">
                        Keep your vaccination records up to date with the infirmary.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Infirmary Hours</CardTitle>
                <CardDescription>When you can visit the infirmary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday</span>
                    <span>Closed (Emergency Only)</span>
                  </div>
                  <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm">
                    <p className="font-medium text-blue-800">Emergency Contact</p>
                    <p className="text-blue-700">+91 98765 43210</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}
