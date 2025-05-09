import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Pill, Users } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage infirmary operations and monitor key metrics.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">+12 from last month</p>
              <div className="mt-4">
                <Link href="/admin/students">
                  <Button variant="outline" size="sm" className="w-full">
                    View Students
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Doctors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
              <div className="mt-4">
                <Link href="/admin/doctors">
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Doctors
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">8 completed, 16 remaining</p>
              <div className="mt-4">
                <Link href="/admin/appointments">
                  <Button variant="outline" size="sm" className="w-full">
                    View Schedule
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pharmacy Items</CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">12 low stock items</p>
              <div className="mt-4">
                <Link href="/admin/pharmacy">
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Inventory
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Appointments</CardTitle>
              <CardDescription>Overview of today's appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground">
                  <div>Student</div>
                  <div>Doctor</div>
                  <div>Status</div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 text-sm">
                    <div>John Doe</div>
                    <div>Dr. Sarah Johnson</div>
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      Completed
                    </div>
                  </div>
                  <div className="grid grid-cols-3 text-sm">
                    <div>Jane Smith</div>
                    <div>Dr. Sarah Johnson</div>
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      Completed
                    </div>
                  </div>
                  <div className="grid grid-cols-3 text-sm">
                    <div>Alex Johnson</div>
                    <div>Dr. Sarah Johnson</div>
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                      Upcoming
                    </div>
                  </div>
                  <div className="grid grid-cols-3 text-sm">
                    <div>Emily Brown</div>
                    <div>Dr. Michael Chen</div>
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                      Upcoming
                    </div>
                  </div>
                  <div className="grid grid-cols-3 text-sm">
                    <div>Michael Wilson</div>
                    <div>Dr. Michael Chen</div>
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                      Upcoming
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Low Stock Medications</CardTitle>
              <CardDescription>Items that need to be restocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 text-sm font-medium text-muted-foreground">
                  <div>Medication</div>
                  <div className="text-right">Quantity</div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 text-sm">
                    <div>Paracetamol 500mg</div>
                    <div className="text-right text-red-500">5</div>
                  </div>
                  <div className="grid grid-cols-2 text-sm">
                    <div>Ibuprofen 400mg</div>
                    <div className="text-right text-red-500">8</div>
                  </div>
                  <div className="grid grid-cols-2 text-sm">
                    <div>Cetirizine 10mg</div>
                    <div className="text-right text-red-500">10</div>
                  </div>
                  <div className="grid grid-cols-2 text-sm">
                    <div>Amoxicillin 500mg</div>
                    <div className="text-right text-yellow-500">15</div>
                  </div>
                  <div className="grid grid-cols-2 text-sm">
                    <div>Omeprazole 20mg</div>
                    <div className="text-right text-yellow-500">18</div>
                  </div>
                </div>
                <div className="pt-2">
                  <Link href="/admin/pharmacy">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Restock Inventory</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Doctor Availability</CardTitle>
              <CardDescription>Current status of infirmary doctors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <h3 className="font-medium">Dr. Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">General Physician</p>
                  </div>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-sm">Available</span>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <h3 className="font-medium">Dr. Michael Chen</h3>
                    <p className="text-sm text-muted-foreground">General Physician</p>
                  </div>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-sm">Available</span>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <h3 className="font-medium">Dr. Emily Rodriguez</h3>
                    <p className="text-sm text-muted-foreground">General Physician</p>
                  </div>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                    <span className="text-sm">On Leave</span>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <h3 className="font-medium">Dr. David Kim</h3>
                    <p className="text-sm text-muted-foreground">General Physician</p>
                  </div>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                    <span className="text-sm">Busy</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Prescriptions</CardTitle>
              <CardDescription>Latest prescriptions issued</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground">
                  <div>Student</div>
                  <div>Doctor</div>
                  <div>Date</div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 text-sm">
                    <div>John Doe</div>
                    <div>Dr. Sarah Johnson</div>
                    <div>Apr 23, 2024</div>
                  </div>
                  <div className="grid grid-cols-3 text-sm">
                    <div>Jane Smith</div>
                    <div>Dr. Sarah Johnson</div>
                    <div>Apr 23, 2024</div>
                  </div>
                  <div className="grid grid-cols-3 text-sm">
                    <div>Michael Wilson</div>
                    <div>Dr. Michael Chen</div>
                    <div>Apr 22, 2024</div>
                  </div>
                  <div className="grid grid-cols-3 text-sm">
                    <div>Emily Brown</div>
                    <div>Dr. Michael Chen</div>
                    <div>Apr 22, 2024</div>
                  </div>
                  <div className="grid grid-cols-3 text-sm">
                    <div>Alex Johnson</div>
                    <div>Dr. David Kim</div>
                    <div>Apr 21, 2024</div>
                  </div>
                </div>
                <div className="pt-2">
                  <Link href="/admin/prescriptions">
                    <Button variant="outline" className="w-full">
                      View All Prescriptions
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
