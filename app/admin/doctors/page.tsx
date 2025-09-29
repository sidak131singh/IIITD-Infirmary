"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RoleGuard } from "@/components/auth/RoleGuard"
import { useToast } from "@/hooks/use-toast"
import { Users, Search, Calendar, CheckCircle, XCircle, Clock, Eye } from "lucide-react"

interface Doctor {
  id: string
  name: string
  email: string
  phone?: string
  isCheckedIn: boolean
  totalAppointments: number
  todayAppointments: number
  pendingAppointments: number
  createdAt: string
}

interface DoctorAppointment {
  id: string
  date: string
  timeSlot: string
  reason: string
  status: string
  student: {
    name: string
    studentId: string
    email: string
  }
}

export default function AdminDoctorsPage() {
  const { toast } = useToast()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [doctorAppointments, setDoctorAppointments] = useState<DoctorAppointment[]>([])
  const [appointmentsLoading, setAppointmentsLoading] = useState(false)

  const fetchDoctors = async () => {
    try {
      const response = await fetch("/api/admin/doctors")
      if (response.ok) {
        const data = await response.json()
        setDoctors(data.data || [])
      }
    } catch (error) {
      console.error("Failed to fetch doctors:", error)
      toast({
        title: "Error",
        description: "Failed to fetch doctors list",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCheckInToggle = async (doctorId: string, isCheckedIn: boolean) => {
    try {
      const response = await fetch("/api/admin/doctors", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId,
          isCheckedIn: !isCheckedIn,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        // Update the doctor in the list
        setDoctors(prev => prev.map(doctor => 
          doctor.id === doctorId 
            ? { ...doctor, isCheckedIn: !isCheckedIn }
            : doctor
        ))
        
        toast({
          title: "Success",
          description: data.message,
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update check-in status")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const fetchDoctorAppointments = async (doctorId: string) => {
    setAppointmentsLoading(true)
    try {
      const response = await fetch(`/api/appointments?doctorId=${doctorId}`)
      if (response.ok) {
        const data = await response.json()
        setDoctorAppointments(data.data || [])
      }
    } catch (error) {
      console.error("Failed to fetch doctor appointments:", error)
      toast({
        title: "Error",
        description: "Failed to fetch doctor's appointments",
        variant: "destructive",
      })
    } finally {
      setAppointmentsLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doctor.phone && doctor.phone.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Doctor Management</h1>
            <p className="text-muted-foreground">
              Manage doctor records, check-in status, and view their appointments
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Doctors Overview
              </CardTitle>
              <CardDescription>
                Total doctors: {doctors.length} | Checked in: {doctors.filter(d => d.isCheckedIn).length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search doctors by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredDoctors.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      {searchTerm ? "No doctors found matching your search." : "No doctors registered yet."}
                    </div>
                  ) : (
                    filteredDoctors.map((doctor) => (
                      <div
                        key={doctor.id}
                        className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">Dr. {doctor.name}</h3>
                              <Badge 
                                variant={doctor.isCheckedIn ? "default" : "secondary"}
                                className={doctor.isCheckedIn ? "bg-green-500" : "bg-gray-500"}
                              >
                                {doctor.isCheckedIn ? (
                                  <><CheckCircle className="h-3 w-3 mr-1" /> Checked In</>
                                ) : (
                                  <><XCircle className="h-3 w-3 mr-1" /> Checked Out</>
                                )}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p>📧 {doctor.email}</p>
                              {doctor.phone && <p>📞 {doctor.phone}</p>}
                              <div className="flex items-center gap-4 mt-3">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  Today: {doctor.todayAppointments}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  Pending: {doctor.pendingAppointments}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  Total: {doctor.totalAppointments}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3 md:items-end">
                            <div className="flex items-center gap-3">
                              <Label htmlFor={`checkin-${doctor.id}`} className="text-sm font-medium">
                                Check-in Status
                              </Label>
                              <Switch
                                id={`checkin-${doctor.id}`}
                                checked={doctor.isCheckedIn}
                                onCheckedChange={() => handleCheckInToggle(doctor.id, doctor.isCheckedIn)}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                      setSelectedDoctor(doctor)
                                      fetchDoctorAppointments(doctor.id)
                                    }}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Appointments
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Dr. {selectedDoctor?.name} - Appointments
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    {appointmentsLoading ? (
                                      <div className="flex justify-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                      </div>
                                    ) : doctorAppointments.length === 0 ? (
                                      <div className="text-center py-8 text-muted-foreground">
                                        No appointments found for this doctor.
                                      </div>
                                    ) : (
                                      <div className="space-y-3">
                                        {doctorAppointments.map((appointment) => (
                                          <div
                                            key={appointment.id}
                                            className="border rounded-lg p-4 hover:bg-gray-50"
                                          >
                                            <div className="flex justify-between items-start">
                                              <div>
                                                <h4 className="font-medium">
                                                  {appointment.student.name} ({appointment.student.studentId})
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                  {appointment.student.email}
                                                </p>
                                                <p className="text-sm mt-1">
                                                  <strong>Reason:</strong> {appointment.reason}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                  {formatDate(appointment.date)} at {appointment.timeSlot}
                                                </p>
                                              </div>
                                              <Badge
                                                variant={
                                                  appointment.status === "COMPLETED" ? "default" :
                                                  appointment.status === "CONFIRMED" ? "secondary" :
                                                  appointment.status === "PENDING" ? "outline" : "destructive"
                                                }
                                              >
                                                {appointment.status}
                                              </Badge>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleGuard>
  )
}
