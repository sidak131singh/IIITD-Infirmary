'use client'"use client"



import { useEffect, useState } from 'react'import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'import { useRouter, useSearchParams } from 'next/navigation'

import { useSession } from 'next-auth/react'import { useSession } from 'next-auth/react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"import { Textarea } from "@/components/ui/textarea"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Separator } from "@/components/ui/separator"import { Separator } from "@/components/ui/separator"

import { Badge } from "@/components/ui/badge"import { Badge } from "@/components/ui/badge"

import { import { 

  ArrowLeft,   ArrowLeft, 

  Plus,   Plus, 

  Trash2,   Trash2, 

  FileText,   FileText, 

  User,   User, 

  Calendar,   Calendar, 

  Clock,  Clock,

  Pill  Pill

} from "lucide-react"} from "lucide-react"

import Link from "next/link"import Link from "next/link"

import { useToast } from "@/hooks/use-toast"import { useToast } from "@/hooks/use-toast"



interface Medicine {interface Medicine {

  id: string  id: string

  name: string  name: string

  category: string  category: string

  dosage: string  dosage: string

  quantity: number  quantity: number

}}



interface Medication {interface Medication {

  medicineId: string  medicineId: string

  medicine?: Medicine  medicine?: Medicine

  dosage: string  dosage: string

  frequency: string  frequency: string

  duration: string  duration: string

  instructions: string  instructions: string

}}



interface AppointmentInfo {interface AppointmentInfo {

  id: string  id: string

  date: string  date: string

  timeSlot: string  timeSlot: string

  reason: string  reason: string

  student: {  student: {

    name: string    name: string

    studentId: string    studentId: string

  }  }

}}



export default function WritePrescriptionPage() {export default function NewPrescription() {

  const router = useRouter()  const router = useRouter()

  const searchParams = useSearchParams()  const searchParams = useSearchParams()

  const { data: session } = useSession()  const { data: session } = useSession()

  const { toast } = useToast()  const { toast } = useToast()

    

  const appointmentId = searchParams.get('appointment')  const appointmentId = searchParams.get('appointment')

    

  const [appointment, setAppointment] = useState<AppointmentInfo | null>(null)  const [appointment, setAppointment] = useState<AppointmentInfo | null>(null)

  const [medicines, setMedicines] = useState<Medicine[]>([])  const [medicines, setMedicines] = useState<Medicine[]>([])

  const [diagnosis, setDiagnosis] = useState('')  const [diagnosis, setDiagnosis] = useState('')

  const [notes, setNotes] = useState('')  const [notes, setNotes] = useState('')

  const [medications, setMedications] = useState<Medication[]>([  const [medications, setMedications] = useState<Medication[]>([

    { medicineId: '', dosage: '', frequency: '', duration: '', instructions: '' }    { medicineId: '', dosage: '', frequency: '', duration: '', instructions: '' }

  ])  ])

  const [loading, setLoading] = useState(true)  const [loading, setLoading] = useState(true)

  const [submitting, setSubmitting] = useState(false)  const [submitting, setSubmitting] = useState(false)



  useEffect(() => {  useEffect(() => {

    if (appointmentId && session) {    if (appointmentId && session) {

      fetchData()      fetchData()

    }    }

  }, [appointmentId, session])  }, [appointmentId, session])



  const fetchData = async () => {  const fetchData = async () => {

    try {    try {

      // Fetch appointment details and medicines in parallel      // Fetch appointment details and medicines in parallel

      const [appointmentResponse, medicinesResponse] = await Promise.all([      const [appointmentResponse, medicinesResponse] = await Promise.all([

        fetch(`/api/doctor/appointments/${appointmentId}`),        fetch(`/api/doctor/appointments/${appointmentId}`),

        fetch('/api/doctor/prescriptions')        fetch('/api/doctor/prescriptions')

      ])      ])



      if (appointmentResponse.ok) {      if (appointmentResponse.ok) {

        const appointmentData = await appointmentResponse.json()        const appointmentData = await appointmentResponse.json()

        setAppointment({        setAppointment({

          id: appointmentData.id,          id: appointmentData.id,

          date: appointmentData.date,          date: appointmentData.date,

          timeSlot: appointmentData.timeSlot,          timeSlot: appointmentData.timeSlot,

          reason: appointmentData.reason,          reason: appointmentData.reason,

          student: appointmentData.student          student: appointmentData.student

        })        })

      } else {      } else {

        toast({        toast({

          title: "Error",          title: "Error",

          description: "Failed to fetch appointment details",          description: "Failed to fetch appointment details",

          variant: "destructive"          variant: "destructive"

        })        })

        router.push('/doctor/appointments')        router.push('/doctor/appointments')

        return        return

      }      }



      if (medicinesResponse.ok) {      if (medicinesResponse.ok) {

        const medicinesData = await medicinesResponse.json()        const medicinesData = await medicinesResponse.json()

        setMedicines(medicinesData)        setMedicines(medicinesData)

      } else {      } else {

        toast({        toast({

          title: "Warning",          title: "Warning",

          description: "Failed to fetch medicines list",          description: "Failed to fetch medicines list",

          variant: "destructive"          variant: "destructive"

        })        })

      }      }

    } catch (error) {    } catch (error) {

      console.error('Error fetching data:', error)      console.error('Error fetching data:', error)

      toast({      toast({

        title: "Error",        title: "Error",

        description: "Failed to load prescription form",        description: "Failed to load prescription form",

        variant: "destructive"        variant: "destructive"

      })      })

    } finally {    } finally {

      setLoading(false)      setLoading(false)

    }    }

  }  }



  const handleAddMedication = () => {  const handleAddMedication = () => {

    setMedications([...medications, {     setMedications([...medications, { 

      medicineId: '',       medicineId: '', 

      dosage: '',       dosage: '', 

      frequency: '',       frequency: '', 

      duration: '',       duration: '', 

      instructions: ''       instructions: '' 

    }])    }])

  }  }



  const handleRemoveMedication = (index: number) => {  const handleRemoveMedication = (index: number) => {

    if (medications.length > 1) {    if (medications.length > 1) {

      setMedications(medications.filter((_, i) => i !== index))      setMedications(medications.filter((_, i) => i !== index))

    }    }

  }  }



  const handleMedicationChange = (index: number, field: keyof Medication, value: string) => {  const handleMedicationChange = (index: number, field: keyof Medication, value: string) => {

    const updated = [...medications]    const updated = [...medications]

    updated[index] = { ...updated[index], [field]: value }    updated[index] = { ...updated[index], [field]: value }

        

    // If medicine is selected, populate default dosage    // If medicine is selected, populate default dosage

    if (field === 'medicineId' && value) {    if (field === 'medicineId' && value) {

      const medicine = medicines.find(m => m.id === value)      const medicine = medicines.find(m => m.id === value)

      if (medicine && !updated[index].dosage) {      if (medicine && !updated[index].dosage) {

        updated[index].dosage = medicine.dosage        updated[index].dosage = medicine.dosage

      }      }

    }    }

        

    setMedications(updated)    setMedications(updated)

  }  }



  const handleSubmit = async (e: React.FormEvent) => {  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()    e.preventDefault()

        

    if (!diagnosis.trim()) {    if (!diagnosis.trim()) {

      toast({      toast({

        title: "Error",        title: "Error",

        description: "Diagnosis is required",        description: "Diagnosis is required",

        variant: "destructive"        variant: "destructive"

      })      })

      return      return

    }    }



    // Filter out empty medications    // Filter out empty medications

    const validMedications = medications.filter(med =>     const validMedications = medications.filter(med => 

      med.medicineId && med.dosage && med.frequency && med.duration      med.medicineId && med.dosage && med.frequency && med.duration

    )    )



    setSubmitting(true)    setSubmitting(true)



    try {    try {

      const response = await fetch('/api/doctor/prescriptions', {      const response = await fetch('/api/doctor/prescriptions', {

        method: 'POST',        method: 'POST',

        headers: {        headers: {

          'Content-Type': 'application/json'          'Content-Type': 'application/json'

        },        },

        body: JSON.stringify({        body: JSON.stringify({

          appointmentId,          appointmentId,

          diagnosis: diagnosis.trim(),          diagnosis: diagnosis.trim(),

          notes: notes.trim(),          notes: notes.trim(),

          medications: validMedications          medications: validMedications

        })        })

      })      })



      if (response.ok) {      if (response.ok) {

        toast({        toast({

          title: "Success",          title: "Success",

          description: "Prescription created successfully",          description: "Prescription created successfully",

        })        })

        router.push(`/doctor/appointments/${appointmentId}`)        router.push(`/doctor/appointments/${appointmentId}`)

      } else {      } else {

        const error = await response.json()        const error = await response.json()

        toast({        toast({

          title: "Error",          title: "Error",

          description: error.error || "Failed to create prescription",          description: error.error || "Failed to create prescription",

          variant: "destructive"          variant: "destructive"

        })        })

      }      }

    } catch (error) {    } catch (error) {

      console.error('Error creating prescription:', error)      console.error('Error creating prescription:', error)

      toast({      toast({

        title: "Error",        title: "Error",

        description: "Failed to create prescription",        description: "Failed to create prescription",

        variant: "destructive"        variant: "destructive"

      })      })

    } finally {    } finally {

      setSubmitting(false)      setSubmitting(false)

    }    }

  }  }



  const formatDate = (dateString: string) => {  const formatDate = (dateString: string) => {

    return new Date(dateString).toLocaleDateString('en-US', {    return new Date(dateString).toLocaleDateString('en-US', {

      weekday: 'long',      weekday: 'long',

      year: 'numeric',      year: 'numeric',

      month: 'long',      month: 'long',

      day: 'numeric'      day: 'numeric'

    })    })

  }  }



  if (loading) {  if (loading) {

    return (    return (

      <div className="container py-6">      <div className="container py-6">

        <div className="flex items-center justify-center h-64">        <div className="flex items-center justify-center h-64">

          <div className="text-center">          <div className="text-center">

            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>

            <p className="mt-2 text-muted-foreground">Loading prescription form...</p>            <p className="mt-2 text-muted-foreground">Loading prescription form...</p>

          </div>          </div>

        </div>        </div>

      </div>      </div>

    )    )

  }  }



  if (!appointment) {  if (!appointment) {

    return (    return (

      <div className="container py-6">      <div className="container py-6">

        <div className="text-center">        <div className="text-center">

          <h1 className="text-2xl font-bold">Appointment Not Found</h1>          <h1 className="text-2xl font-bold">Appointment Not Found</h1>

          <p className="text-muted-foreground mt-2">The appointment you're trying to create a prescription for doesn't exist.</p>          <p className="text-muted-foreground mt-2">The appointment you're trying to create a prescription for doesn't exist.</p>

          <Link href="/doctor/appointments">          <Link href="/doctor/appointments">

            <Button className="mt-4">            <Button className="mt-4">

              <ArrowLeft className="mr-2 h-4 w-4" />              <ArrowLeft className="mr-2 h-4 w-4" />

              Back to Appointments              Back to Appointments

            </Button>            </Button>

          </Link>          </Link>

        </div>        </div>

      </div>      </div>

    )    )

  }  }

    // In a real app, you would submit the prescription data to the server

  return (    // For now, we'll just navigate back to the appointments page

    <div className="container py-6">    router.push("/doctor/appointments")

      <div className="flex flex-col gap-6">  }

        <div className="flex items-center gap-4">

          <Link href={`/doctor/appointments/${appointmentId}`}>  return (

            <Button variant="outline" size="sm">    <div className="container py-6">

              <ArrowLeft className="mr-2 h-4 w-4" />      <div className="flex flex-col gap-6 max-w-3xl mx-auto">

              Back to Appointment        <div className="flex items-center gap-2">

            </Button>          <Link href="/doctor/appointments">

          </Link>            <Button variant="ghost" size="icon">

          <div className="flex-1">              <ChevronLeft className="h-4 w-4" />

            <h1 className="text-2xl font-bold tracking-tight">Write Prescription</h1>            </Button>

            <p className="text-muted-foreground">          </Link>

              Create a prescription for this appointment          <h1 className="text-2xl font-bold tracking-tight">New Prescription</h1>

            </p>        </div>

          </div>

        </div>        <Card>

          <CardHeader>

        <div className="grid gap-6 lg:grid-cols-4">            <CardTitle>Appointment Details</CardTitle>

          {/* Appointment Info Sidebar */}            <CardDescription>Writing prescription for the following appointment.</CardDescription>

          <Card className="lg:col-span-1">          </CardHeader>

            <CardHeader>          <CardContent>

              <CardTitle className="flex items-center gap-2">            <div className="grid grid-cols-2 gap-4">

                <Calendar className="h-5 w-5" />              <div>

                Appointment Details                <p className="text-sm font-medium">Student</p>

              </CardTitle>                <p className="text-sm text-muted-foreground">

            </CardHeader>                  {appointmentDetails.student} (ID: {appointmentDetails.studentId})

            <CardContent className="space-y-4">                </p>

              <div className="flex items-center gap-3">              </div>

                <User className="h-4 w-4 text-muted-foreground" />              <div>

                <div>                <p className="text-sm font-medium">Date & Time</p>

                  <p className="text-sm font-medium">{appointment.student.name}</p>                <p className="text-sm text-muted-foreground">

                  <p className="text-xs text-muted-foreground">ID: {appointment.student.studentId}</p>                  {appointmentDetails.date} at {appointmentDetails.time}

                </div>                </p>

              </div>              </div>

              <Separator />              <div className="col-span-2">

              <div className="flex items-center gap-3">                <p className="text-sm font-medium">Reason for Visit</p>

                <Calendar className="h-4 w-4 text-muted-foreground" />                <p className="text-sm text-muted-foreground">{appointmentDetails.reason}</p>

                <div>              </div>

                  <p className="text-sm font-medium">Date</p>            </div>

                  <p className="text-xs text-muted-foreground">{formatDate(appointment.date)}</p>          </CardContent>

                </div>        </Card>

              </div>

              <div className="flex items-center gap-3">        <form onSubmit={handleSubmit}>

                <Clock className="h-4 w-4 text-muted-foreground" />          <Card>

                <div>            <CardHeader>

                  <p className="text-sm font-medium">Time</p>              <CardTitle>Diagnosis & Treatment</CardTitle>

                  <p className="text-xs text-muted-foreground">{appointment.timeSlot}</p>              <CardDescription>Enter the diagnosis and prescribed medications.</CardDescription>

                </div>            </CardHeader>

              </div>            <CardContent className="space-y-6">

              <Separator />              <div className="space-y-2">

              <div>                <Label htmlFor="diagnosis">Diagnosis</Label>

                <p className="text-sm font-medium mb-1">Reason</p>                <Input

                <p className="text-xs text-muted-foreground">{appointment.reason}</p>                  id="diagnosis"

              </div>                  value={diagnosis}

            </CardContent>                  onChange={(e) => setDiagnosis(e.target.value)}

          </Card>                  placeholder="Enter diagnosis"

                  required

          {/* Prescription Form */}                />

          <div className="lg:col-span-3">              </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              <Card>              <div>

                <CardHeader>                <div className="flex items-center justify-between mb-2">

                  <CardTitle className="flex items-center gap-2">                  <Label>Medications</Label>

                    <FileText className="h-5 w-5" />                  <Button type="button" variant="outline" size="sm" onClick={handleAddMedication}>

                    Prescription Information                    <Plus className="mr-2 h-4 w-4" />

                  </CardTitle>                    Add Medication

                  <CardDescription>                  </Button>

                    Provide diagnosis and treatment details                </div>

                  </CardDescription>

                </CardHeader>                <div className="space-y-4">

                <CardContent className="space-y-4">                  {medications.map((medication, index) => (

                  <div>                    <div key={medication.id} className="rounded-lg border p-4">

                    <Label htmlFor="diagnosis">Diagnosis *</Label>                      <div className="flex items-center justify-between mb-4">

                    <Textarea                        <h3 className="font-medium">Medication {index + 1}</h3>

                      id="diagnosis"                        <Button

                      placeholder="Enter the diagnosis..."                          type="button"

                      value={diagnosis}                          variant="ghost"

                      onChange={(e) => setDiagnosis(e.target.value)}                          size="sm"

                      className="mt-1"                          onClick={() => handleRemoveMedication(medication.id)}

                      rows={3}                          disabled={medications.length === 1}

                      required                        >

                    />                          <Trash2 className="h-4 w-4 text-red-500" />

                  </div>                        </Button>

                  <div>                      </div>

                    <Label htmlFor="notes">Additional Notes</Label>

                    <Textarea                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      id="notes"                        <div className="space-y-2">

                      placeholder="Any additional instructions or notes..."                          <Label htmlFor={`medication-${medication.id}`}>Medication Name</Label>

                      value={notes}                          <Select

                      onChange={(e) => setNotes(e.target.value)}                            value={medication.name}

                      className="mt-1"                            onValueChange={(value) => handleMedicationChange(medication.id, "name", value)}

                      rows={2}                          >

                    />                            <SelectTrigger id={`medication-${medication.id}`}>

                  </div>                              <SelectValue placeholder="Select medication" />

                </CardContent>                            </SelectTrigger>

              </Card>                            <SelectContent>

                              {availableMedications.map((med) => (

              <Card>                                <SelectItem key={med.id} value={med.name}>

                <CardHeader>                                  {med.name}

                  <div className="flex items-center justify-between">                                </SelectItem>

                    <div>                              ))}

                      <CardTitle className="flex items-center gap-2">                            </SelectContent>

                        <Pill className="h-5 w-5" />                          </Select>

                        Medications                        </div>

                      </CardTitle>

                      <CardDescription>                        <div className="space-y-2">

                        Add medications and dosage instructions                          <Label htmlFor={`dosage-${medication.id}`}>Dosage</Label>

                      </CardDescription>                          <Select

                    </div>                            value={medication.dosage}

                    <Button type="button" variant="outline" onClick={handleAddMedication}>                            onValueChange={(value) => handleMedicationChange(medication.id, "dosage", value)}

                      <Plus className="mr-2 h-4 w-4" />                            disabled={!medication.name}

                      Add Medication                          >

                    </Button>                            <SelectTrigger id={`dosage-${medication.id}`}>

                  </div>                              <SelectValue placeholder="Select dosage" />

                </CardHeader>                            </SelectTrigger>

                <CardContent className="space-y-4">                            <SelectContent>

                  {medications.map((medication, index) => (                              {medication.name &&

                    <div key={index} className="border rounded-lg p-4 space-y-4">                                availableMedications

                      <div className="flex items-center justify-between">                                  .find((med) => med.name === medication.name)

                        <h4 className="font-medium">Medication {index + 1}</h4>                                  ?.dosages.map((dosage) => (

                        {medications.length > 1 && (                                    <SelectItem key={dosage} value={dosage}>

                          <Button                                      {dosage}

                            type="button"                                    </SelectItem>

                            variant="ghost"                                  ))}

                            size="sm"                            </SelectContent>

                            onClick={() => handleRemoveMedication(index)}                          </Select>

                          >                        </div>

                            <Trash2 className="h-4 w-4" />

                          </Button>                        <div className="space-y-2">

                        )}                          <Label htmlFor={`frequency-${medication.id}`}>Frequency</Label>

                      </div>                          <Select

                                                  value={medication.frequency}

                      <div className="grid gap-4 md:grid-cols-2">                            onValueChange={(value) => handleMedicationChange(medication.id, "frequency", value)}

                        <div>                          >

                          <Label>Medicine *</Label>                            <SelectTrigger id={`frequency-${medication.id}`}>

                          <Select                              <SelectValue placeholder="Select frequency" />

                            value={medication.medicineId}                            </SelectTrigger>

                            onValueChange={(value) => handleMedicationChange(index, 'medicineId', value)}                            <SelectContent>

                          >                              <SelectItem value="Once daily">Once daily</SelectItem>

                            <SelectTrigger className="mt-1">                              <SelectItem value="Twice daily">Twice daily</SelectItem>

                              <SelectValue placeholder="Select medicine" />                              <SelectItem value="Three times a day">Three times a day</SelectItem>

                            </SelectTrigger>                              <SelectItem value="Four times a day">Four times a day</SelectItem>

                            <SelectContent>                              <SelectItem value="Every 4 hours">Every 4 hours</SelectItem>

                              {medicines.map((medicine) => (                              <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>

                                <SelectItem key={medicine.id} value={medicine.id}>                              <SelectItem value="Every 8 hours">Every 8 hours</SelectItem>

                                  <div className="flex items-center gap-2">                              <SelectItem value="As needed">As needed</SelectItem>

                                    <span>{medicine.name}</span>                            </SelectContent>

                                    <Badge variant="outline" className="text-xs">                          </Select>

                                      {medicine.category}                        </div>

                                    </Badge>

                                  </div>                        <div className="space-y-2">

                                </SelectItem>                          <Label htmlFor={`duration-${medication.id}`}>Duration</Label>

                              ))}                          <Select

                            </SelectContent>                            value={medication.duration}

                          </Select>                            onValueChange={(value) => handleMedicationChange(medication.id, "duration", value)}

                        </div>                          >

                                                    <SelectTrigger id={`duration-${medication.id}`}>

                        <div>                              <SelectValue placeholder="Select duration" />

                          <Label>Dosage *</Label>                            </SelectTrigger>

                          <Input                            <SelectContent>

                            placeholder="e.g., 500mg"                              <SelectItem value="3 days">3 days</SelectItem>

                            value={medication.dosage}                              <SelectItem value="5 days">5 days</SelectItem>

                            onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}                              <SelectItem value="7 days">7 days</SelectItem>

                            className="mt-1"                              <SelectItem value="10 days">10 days</SelectItem>

                          />                              <SelectItem value="14 days">14 days</SelectItem>

                        </div>                              <SelectItem value="30 days">30 days</SelectItem>

                                                      <SelectItem value="PRN">PRN (as needed)</SelectItem>

                        <div>                            </SelectContent>

                          <Label>Frequency *</Label>                          </Select>

                          <Select                        </div>

                            value={medication.frequency}

                            onValueChange={(value) => handleMedicationChange(index, 'frequency', value)}                        <div className="space-y-2 md:col-span-2">

                          >                          <Label htmlFor={`instructions-${medication.id}`}>Special Instructions</Label>

                            <SelectTrigger className="mt-1">                          <Input

                              <SelectValue placeholder="Select frequency" />                            id={`instructions-${medication.id}`}

                            </SelectTrigger>                            value={medication.instructions}

                            <SelectContent>                            onChange={(e) => handleMedicationChange(medication.id, "instructions", e.target.value)}

                              <SelectItem value="Once a day">Once a day</SelectItem>                            placeholder="E.g., Take with food, Avoid alcohol, etc."

                              <SelectItem value="Twice a day">Twice a day</SelectItem>                          />

                              <SelectItem value="Three times a day">Three times a day</SelectItem>                        </div>

                              <SelectItem value="Four times a day">Four times a day</SelectItem>                      </div>

                              <SelectItem value="As needed">As needed</SelectItem>                    </div>

                              <SelectItem value="Every 4 hours">Every 4 hours</SelectItem>                  ))}

                              <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>                </div>

                              <SelectItem value="Every 8 hours">Every 8 hours</SelectItem>              </div>

                              <SelectItem value="Before meals">Before meals</SelectItem>

                              <SelectItem value="After meals">After meals</SelectItem>              <div className="space-y-2">

                              <SelectItem value="Before bedtime">Before bedtime</SelectItem>                <Label htmlFor="notes">Additional Notes</Label>

                            </SelectContent>                <Textarea

                          </Select>                  id="notes"

                        </div>                  value={notes}

                                          onChange={(e) => setNotes(e.target.value)}

                        <div>                  placeholder="Any additional notes or instructions for the patient"

                          <Label>Duration *</Label>                  rows={3}

                          <Select                />

                            value={medication.duration}              </div>

                            onValueChange={(value) => handleMedicationChange(index, 'duration', value)}            </CardContent>

                          >            <CardFooter className="flex justify-between">

                            <SelectTrigger className="mt-1">              <Link href="/doctor/appointments">

                              <SelectValue placeholder="Select duration" />                <Button variant="outline">Cancel</Button>

                            </SelectTrigger>              </Link>

                            <SelectContent>              <Button type="submit" className="bg-green-600 hover:bg-green-700">

                              <SelectItem value="1 day">1 day</SelectItem>                Save Prescription

                              <SelectItem value="2 days">2 days</SelectItem>              </Button>

                              <SelectItem value="3 days">3 days</SelectItem>            </CardFooter>

                              <SelectItem value="5 days">5 days</SelectItem>          </Card>

                              <SelectItem value="7 days">7 days</SelectItem>        </form>

                              <SelectItem value="10 days">10 days</SelectItem>      </div>

                              <SelectItem value="14 days">14 days</SelectItem>    </div>

                              <SelectItem value="21 days">21 days</SelectItem>  )

                              <SelectItem value="30 days">30 days</SelectItem>}

                              <SelectItem value="Until finished">Until finished</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Special Instructions</Label>
                        <Textarea
                          placeholder="e.g., Take with food, avoid alcohol..."
                          value={medication.instructions}
                          onChange={(e) => handleMedicationChange(index, 'instructions', e.target.value)}
                          className="mt-1"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Link href={`/doctor/appointments/${appointmentId}`}>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Create Prescription
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}