"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { CalendarIcon, ChevronLeft } from "lucide-react"
import Link from "next/link"

// Mock data for doctors
const doctors = [
  { id: 1, name: "Dr. Sarah Johnson", specialization: "General Physician" },
  { id: 2, name: "Dr. Michael Chen", specialization: "General Physician" },
]

// Mock data for available time slots
const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
]

export default function BookAppointment() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [doctor, setDoctor] = useState<string>("")
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [reason, setReason] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the appointment data to the server
    // For now, we'll just navigate back to the appointments page
    router.push("/student/appointments")
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/student/appointments">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Book an Appointment</h1>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>Select your preferred doctor, date, and time for your appointment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Doctor</label>
                <Select value={doctor} onValueChange={setDoctor} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doc) => (
                      <SelectItem key={doc.id} value={doc.id.toString()}>
                        {doc.name} ({doc.specialization})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => {
                        // Disable past dates, Sundays, and dates more than 30 days in the future
                        const now = new Date()
                        now.setHours(0, 0, 0, 0)
                        const thirtyDaysFromNow = new Date(now)
                        thirtyDaysFromNow.setDate(now.getDate() + 30)
                        return (
                          date < now || date > thirtyDaysFromNow || date.getDay() === 0 // Sunday
                        )
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Time Slot</label>
                <Select value={timeSlot} onValueChange={setTimeSlot} disabled={!date} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Reason for Visit</label>
                <Textarea
                  placeholder="Briefly describe your symptoms or reason for the appointment"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/student/appointments">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!date || !doctor || !timeSlot || !reason}
              >
                Book Appointment
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
