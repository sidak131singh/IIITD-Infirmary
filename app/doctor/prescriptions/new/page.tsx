"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock data for medications
const availableMedications = [
  { id: 1, name: "Paracetamol", dosages: ["500mg", "650mg"] },
  { id: 2, name: "Ibuprofen", dosages: ["200mg", "400mg"] },
  { id: 3, name: "Cetirizine", dosages: ["5mg", "10mg"] },
  { id: 4, name: "Amoxicillin", dosages: ["250mg", "500mg"] },
  { id: 5, name: "Loratadine", dosages: ["10mg"] },
  { id: 6, name: "Omeprazole", dosages: ["20mg", "40mg"] },
  { id: 7, name: "Azithromycin", dosages: ["250mg", "500mg"] },
  { id: 8, name: "Fluticasone Nasal Spray", dosages: ["50mcg"] },
]

// Mock data for appointment details
const getAppointmentDetails = (id: string) => {
  return {
    id,
    student: "John Doe",
    studentId: "2021001",
    date: "April 23, 2024",
    time: "10:30 AM",
    reason: "Regular Checkup",
  }
}

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
}

export default function NewPrescription() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get("appointment") || ""

  const appointmentDetails = getAppointmentDetails(appointmentId)

  const [diagnosis, setDiagnosis] = useState("")
  const [notes, setNotes] = useState("")
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: crypto.randomUUID(),
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    },
  ])

  const handleAddMedication = () => {
    setMedications([
      ...medications,
      {
        id: crypto.randomUUID(),
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ])
  }

  const handleRemoveMedication = (id: string) => {
    if (medications.length > 1) {
      setMedications(medications.filter((med) => med.id !== id))
    }
  }

  const handleMedicationChange = (id: string, field: keyof Medication, value: string) => {
    setMedications(medications.map((med) => (med.id === id ? { ...med, [field]: value } : med)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the prescription data to the server
    // For now, we'll just navigate back to the appointments page
    router.push("/doctor/appointments")
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/doctor/appointments">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">New Prescription</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>Writing prescription for the following appointment.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Student</p>
                <p className="text-sm text-muted-foreground">
                  {appointmentDetails.student} (ID: {appointmentDetails.studentId})
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Date & Time</p>
                <p className="text-sm text-muted-foreground">
                  {appointmentDetails.date} at {appointmentDetails.time}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium">Reason for Visit</p>
                <p className="text-sm text-muted-foreground">{appointmentDetails.reason}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Diagnosis & Treatment</CardTitle>
              <CardDescription>Enter the diagnosis and prescribed medications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Input
                  id="diagnosis"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="Enter diagnosis"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Medications</Label>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddMedication}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Medication
                  </Button>
                </div>

                <div className="space-y-4">
                  {medications.map((medication, index) => (
                    <div key={medication.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">Medication {index + 1}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMedication(medication.id)}
                          disabled={medications.length === 1}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`medication-${medication.id}`}>Medication Name</Label>
                          <Select
                            value={medication.name}
                            onValueChange={(value) => handleMedicationChange(medication.id, "name", value)}
                          >
                            <SelectTrigger id={`medication-${medication.id}`}>
                              <SelectValue placeholder="Select medication" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableMedications.map((med) => (
                                <SelectItem key={med.id} value={med.name}>
                                  {med.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`dosage-${medication.id}`}>Dosage</Label>
                          <Select
                            value={medication.dosage}
                            onValueChange={(value) => handleMedicationChange(medication.id, "dosage", value)}
                            disabled={!medication.name}
                          >
                            <SelectTrigger id={`dosage-${medication.id}`}>
                              <SelectValue placeholder="Select dosage" />
                            </SelectTrigger>
                            <SelectContent>
                              {medication.name &&
                                availableMedications
                                  .find((med) => med.name === medication.name)
                                  ?.dosages.map((dosage) => (
                                    <SelectItem key={dosage} value={dosage}>
                                      {dosage}
                                    </SelectItem>
                                  ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`frequency-${medication.id}`}>Frequency</Label>
                          <Select
                            value={medication.frequency}
                            onValueChange={(value) => handleMedicationChange(medication.id, "frequency", value)}
                          >
                            <SelectTrigger id={`frequency-${medication.id}`}>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Once daily">Once daily</SelectItem>
                              <SelectItem value="Twice daily">Twice daily</SelectItem>
                              <SelectItem value="Three times a day">Three times a day</SelectItem>
                              <SelectItem value="Four times a day">Four times a day</SelectItem>
                              <SelectItem value="Every 4 hours">Every 4 hours</SelectItem>
                              <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>
                              <SelectItem value="Every 8 hours">Every 8 hours</SelectItem>
                              <SelectItem value="As needed">As needed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`duration-${medication.id}`}>Duration</Label>
                          <Select
                            value={medication.duration}
                            onValueChange={(value) => handleMedicationChange(medication.id, "duration", value)}
                          >
                            <SelectTrigger id={`duration-${medication.id}`}>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3 days">3 days</SelectItem>
                              <SelectItem value="5 days">5 days</SelectItem>
                              <SelectItem value="7 days">7 days</SelectItem>
                              <SelectItem value="10 days">10 days</SelectItem>
                              <SelectItem value="14 days">14 days</SelectItem>
                              <SelectItem value="30 days">30 days</SelectItem>
                              <SelectItem value="PRN">PRN (as needed)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor={`instructions-${medication.id}`}>Special Instructions</Label>
                          <Input
                            id={`instructions-${medication.id}`}
                            value={medication.instructions}
                            onChange={(e) => handleMedicationChange(medication.id, "instructions", e.target.value)}
                            placeholder="E.g., Take with food, Avoid alcohol, etc."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes or instructions for the patient"
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/doctor/appointments">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Save Prescription
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}
