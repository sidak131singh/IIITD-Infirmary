import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, FileText, Plus } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Welcome, John</h1>
          <p className="text-muted-foreground">
            Here's an overview of your health information and upcoming appointments.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Appointment</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">April 25, 2024</div>
              <p className="text-xs text-muted-foreground">10:30 AM with Dr. Sarah Johnson</p>
              <div className="mt-4">
                <Link href="/student/appointments">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Prescriptions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Last prescription: April 10, 2024</p>
              <div className="mt-4">
                <Link href="/student/prescriptions">
                  <Button variant="outline" size="sm" className="w-full">
                    View Prescriptions
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
                    Update Profile
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
                      Your annual health checkup is due next month. Consider scheduling an appointment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg border p-3">
                  <div className="rounded-full bg-green-100 p-2">
                    <FileText className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Vaccination Reminder</h3>
                    <p className="text-sm text-muted-foreground">
                      Flu vaccination drive is scheduled for next week. Check infirmary notices for details.
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
  )
}
