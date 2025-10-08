"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, FileText, User } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { format, isToday, isTomorrow } from "date-fns"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Appointment {
  id: string
  date: string
  timeSlot: string
  reason: string
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  notes?: string
  student: {
    id: string
    name: string
    studentId: string
    email: string
  }
  prescription?: {
    id: string
    diagnosis: string
  }
}

export default function DoctorAppointments() {
  const { data: session } = useSession()
  const { toast } = useToast()
  // Initialize to tomorrow (Oct 9) since that's where we have appointments in the seed data
  const [date, setDate] = useState<Date>(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
  })
  const [view, setView] = useState<"day" | "week">("day")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      fetchAppointments()
    }
  }, [session, mounted])

  const fetchAppointments = async () => {
    if (!session?.user?.id) return
    
    try {
      const response = await fetch(`/api/appointments?doctorId=${session.user.id}`)
      if (response.ok) {
        const result = await response.json()
        console.log('API Response:', result) // Debug log
        
        // Handle the API response format: { success: true, data: [...], count: n }
        const appointmentsData = result.data || result
        
        // Ensure data is always an array
        setAppointments(Array.isArray(appointmentsData) ? appointmentsData : [])
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch appointments",
          variant: "destructive"
        })
        setAppointments([]) // Set to empty array on error
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
      toast({
        title: "Error",
        description: "Failed to fetch appointments",
        variant: "destructive"
      })
      setAppointments([]) // Set to empty array on error
    } finally {
      setLoading(false)
    }
  }

  // Only perform date operations after component is mounted
  const formattedDate = mounted ? format(date, "yyyy-MM-dd") : ""
  const selectedDayAppointments = mounted && Array.isArray(appointments) 
    ? appointments.filter(appointment => {
        try {
          const appointmentDate = format(new Date(appointment.date), "yyyy-MM-dd")
          console.log('Filtering appointment:', {
            appointmentId: appointment.id,
            appointmentDate,
            selectedDate: formattedDate,
            matches: appointmentDate === formattedDate
          })
          return appointmentDate === formattedDate
        } catch (error) {
          console.error('Error formatting appointment date:', error)
          return false
        }
      })
    : []

  console.log('Appointments state:', {
    totalAppointments: appointments.length,
    selectedDate: formattedDate,
    filteredAppointments: selectedDayAppointments.length,
    mounted
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getDateLabel = (date: Date) => {
    if (!mounted) return format(date, "MMMM d, yyyy") // Fallback for SSR
    if (isToday(date)) {
      return "Today"
    } else if (isTomorrow(date)) {
      return "Tomorrow"
    } else {
      return format(date, "MMMM d, yyyy")
    }
  }

  if (!mounted) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
            <p className="text-muted-foreground">Manage your appointments and schedule.</p>
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
                  <span suppressHydrationWarning>
                    {getDateLabel(date)}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar 
                  mode="single" 
                  selected={date} 
                  onSelect={(selectedDate: Date | undefined) => selectedDate && setDate(selectedDate)} 
                  initialFocus 
                />
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

        <Tabs value={view} onValueChange={(v) => setView(v as "day" | "week")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[200px]">
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
          </TabsList>

          <TabsContent value="day" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle suppressHydrationWarning>{getDateLabel(date)}</CardTitle>
                <CardDescription suppressHydrationWarning>
                  {selectedDayAppointments.length > 0
                    ? `You have ${selectedDayAppointments.length} appointments scheduled.`
                    : "You have no appointments scheduled for this day."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-2 text-muted-foreground">Loading appointments...</p>
                    </div>
                  </div>
                ) : selectedDayAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDayAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-start gap-4 rounded-lg border p-4">
                        <div className="rounded-full bg-green-100 p-2">
                          <User className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium">
                                  {appointment.student.name} (ID: {appointment.student.studentId})
                                </h3>
                                <Badge className={getStatusColor(appointment.status)}>
                                  {appointment.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {appointment.timeSlot} - {appointment.reason}
                              </p>
                              {appointment.notes && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  Notes: {appointment.notes}
                                </p>
                              )}
                              {appointment.prescription && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-2 mt-2">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-green-600" />
                                    <span className="text-sm font-medium text-green-800">
                                      Prescription Available
                                    </span>
                                  </div>
                                  <p className="text-sm text-green-700 mt-1">
                                    Diagnosis: {appointment.prescription.diagnosis}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Link href={`/doctor/appointments/${appointment.id}`}>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </Link>
                              {appointment.status !== 'COMPLETED' && !appointment.prescription && (
                                <Link href={`/doctor/prescriptions/new?appointment=${appointment.id}`}>
                                  <Button className="bg-green-600 hover:bg-green-700" size="sm">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Write Prescription
                                  </Button>
                                </Link>
                              )}
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

          <TabsContent value="week" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Week View</CardTitle>
                <CardDescription>Your appointments for the week of {mounted ? format(date, "MMMM d, yyyy") : ""}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">Week View Coming Soon</h3>
                  <p className="mt-2 text-sm text-gray-500">This feature is currently under development.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
