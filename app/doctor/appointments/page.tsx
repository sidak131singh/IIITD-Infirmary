"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, FileText } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, isToday, isTomorrow } from "date-fns"
import Link from "next/link"

// Mock data for appointments
const appointments = {
  "2024-04-23": [
    {
      id: 1,
      time: "10:30 AM",
      student: "John Doe",
      studentId: "2021001",
      reason: "Regular Checkup",
      status: "Upcoming",
    },
    {
      id: 2,
      time: "11:00 AM",
      student: "Jane Smith",
      studentId: "2021002",
      reason: "Fever",
      status: "Upcoming",
    },
    {
      id: 3,
      time: "2:00 PM",
      student: "Alex Johnson",
      studentId: "2021003",
      reason: "Headache",
      status: "Upcoming",
    },
  ],
  "2024-04-24": [
    {
      id: 4,
      time: "9:30 AM",
      student: "Emily Brown",
      studentId: "2021004",
      reason: "Follow-up",
      status: "Upcoming",
    },
    {
      id: 5,
      time: "10:00 AM",
      student: "Michael Wilson",
      studentId: "2021005",
      reason: "Sore Throat",
      status: "Upcoming",
    },
  ],
  "2024-04-25": [
    {
      id: 6,
      time: "11:30 AM",
      student: "Sarah Davis",
      studentId: "2021006",
      reason: "Allergies",
      status: "Upcoming",
    },
  ],
}

export default function DoctorAppointments() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"day" | "week">("day")

  const formattedDate = format(date, "yyyy-MM-dd")
  const selectedDayAppointments = appointments[formattedDate] || []

  const getDateLabel = (date: Date) => {
    if (isToday(date)) {
      return "Today"
    } else if (isTomorrow(date)) {
      return "Tomorrow"
    } else {
      return format(date, "MMMM d, yyyy")
    }
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
            <p className="text-muted-foreground">Manage your appointments and schedule.</p>
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={view} onValueChange={(v) => setView(v as "day" | "week")} className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newDate = new Date(date)
                newDate.setDate(date.getDate() - 1)
                setDate(newDate)
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="min-w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {getDateLabel(date)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
              </PopoverContent>
            </Popover>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newDate = new Date(date)
                newDate.setDate(date.getDate() + 1)
                setDate(newDate)
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="day" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>{getDateLabel(date)}</CardTitle>
              <CardDescription>
                {selectedDayAppointments.length > 0
                  ? `You have ${selectedDayAppointments.length} appointments scheduled.`
                  : "You have no appointments scheduled for this day."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDayAppointments.length > 0 ? (
                <div className="space-y-4">
                  {selectedDayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-green-100 p-2">
                        <Clock className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <h3 className="font-medium">
                              {appointment.student} (ID: {appointment.studentId})
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {appointment.time} - {appointment.reason}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/doctor/appointments/${appointment.id}`}>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </Link>
                            <Link href={`/doctor/prescriptions/new?appointment=${appointment.id}`}>
                              <Button className="bg-green-600 hover:bg-green-700" size="sm">
                                <FileText className="mr-2 h-4 w-4" />
                                Write Prescription
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">No Appointments</h3>
                  <p className="mt-2 text-sm text-gray-500">You have no appointments scheduled for this day.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Week View</CardTitle>
              <CardDescription>Your appointments for the week of {format(date, "MMMM d, yyyy")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Week View Coming Soon</h3>
                <p className="mt-2 text-sm text-gray-500">This feature is currently under development.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </div>
  )
}
