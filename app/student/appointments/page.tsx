"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Plus } from "lucide-react"
import Link from "next/link"

// Mock data for appointments
const upcomingAppointments = [
  {
    id: 1,
    date: "April 25, 2024",
    time: "10:30 AM",
    doctor: "Dr. Sarah Johnson",
    reason: "Regular Checkup",
    status: "Confirmed",
  },
  {
    id: 2,
    date: "May 10, 2024",
    time: "2:00 PM",
    doctor: "Dr. Michael Chen",
    reason: "Follow-up",
    status: "Pending",
  },
]

const pastAppointments = [
  {
    id: 3,
    date: "April 10, 2024",
    time: "11:00 AM",
    doctor: "Dr. Sarah Johnson",
    reason: "Fever",
    status: "Completed",
  },
  {
    id: 4,
    date: "March 15, 2024",
    time: "3:30 PM",
    doctor: "Dr. Michael Chen",
    reason: "Headache",
    status: "Completed",
  },
  {
    id: 5,
    date: "February 22, 2024",
    time: "9:15 AM",
    doctor: "Dr. Sarah Johnson",
    reason: "Seasonal Allergies",
    status: "Completed",
  },
]

export default function StudentAppointments() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Appointments</h1>
            <p className="text-muted-foreground">View and manage your appointments with infirmary doctors.</p>
          </div>
          <Link href="/student/appointments/book">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Book Appointment
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-4">
            {upcomingAppointments.length > 0 ? (
              <div className="grid gap-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-blue-100 p-3">
                            <Calendar className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{appointment.reason}</h3>
                            <p className="text-sm text-muted-foreground">
                              {appointment.date} at {appointment.time}
                            </p>
                            <p className="text-sm font-medium mt-1">{appointment.doctor}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 md:items-end">
                          <span
                            className={`text-sm px-2 py-1 rounded-full ${
                              appointment.status === "Confirmed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {appointment.status}
                          </span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No Upcoming Appointments</h3>
                <p className="mt-2 text-sm text-gray-500">You don't have any upcoming appointments scheduled.</p>
                <Link href="/student/appointments/book">
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Book an Appointment</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-4">
            {pastAppointments.length > 0 ? (
              <div className="grid gap-4">
                {pastAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-gray-100 p-3">
                            <Calendar className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{appointment.reason}</h3>
                            <p className="text-sm text-muted-foreground">
                              {appointment.date} at {appointment.time}
                            </p>
                            <p className="text-sm font-medium mt-1">{appointment.doctor}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 md:items-end">
                          <span className="text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                            {appointment.status}
                          </span>
                          <div className="flex gap-2">
                            <Link href={`/student/prescriptions?appointment=${appointment.id}`}>
                              <Button variant="outline" size="sm">
                                View Prescription
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm">
                              Book Follow-up
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No Past Appointments</h3>
                <p className="mt-2 text-sm text-gray-500">You don't have any past appointment records.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
