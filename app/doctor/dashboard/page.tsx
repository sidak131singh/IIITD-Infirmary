import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, FileText, Users } from "lucide-react"
import Link from "next/link"

// Mock data for today's appointments
const todaysAppointments = [
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
]

export default function DoctorDashboard() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Welcome, Dr. Sarah</h1>
          <p className="text-muted-foreground">Here's your schedule for today: {currentDate}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todaysAppointments.length}</div>
              <p className="text-xs text-muted-foreground">Next appointment at 10:30 AM</p>
              <div className="mt-4">
                <Link href="/doctor/appointments">
                  <Button variant="outline" size="sm" className="w-full">
                    View Schedule
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prescriptions Written</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">This month</p>
              <div className="mt-4">
                <Link href="/doctor/prescriptions">
                  <Button variant="outline" size="sm" className="w-full">
                    View Prescriptions
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students Treated</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">This semester</p>
              <div className="mt-4">
                <Link href="/doctor/leave">
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Leave
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
            <CardDescription>You have {todaysAppointments.length} appointments scheduled for today.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysAppointments.map((appointment) => (
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
                            Write Prescription
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Leave</CardTitle>
              <CardDescription>Your scheduled time off</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-4 text-center">
                <p className="text-sm text-muted-foreground">You have no upcoming leave scheduled.</p>
                <Link href="/doctor/leave">
                  <Button className="mt-4 bg-green-600 hover:bg-green-700">Request Leave</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Infirmary Notices</CardTitle>
              <CardDescription>Important updates from administration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <h3 className="font-medium">Vaccination Drive</h3>
                  <p className="text-sm text-muted-foreground">
                    Flu vaccination drive scheduled for next week. Please inform students during consultations.
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <h3 className="font-medium">New Pharmacy Stock</h3>
                  <p className="text-sm text-muted-foreground">
                    New medications have been added to the pharmacy inventory. Check the updated list.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
