"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Plus, Search } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for medications
const medications = [
  { id: 1, name: "Paracetamol 500mg", category: "Analgesic", quantity: 5, threshold: 20 },
  { id: 2, name: "Ibuprofen 400mg", category: "NSAID", quantity: 8, threshold: 20 },
  { id: 3, name: "Cetirizine 10mg", category: "Antihistamine", quantity: 10, threshold: 15 },
  { id: 4, name: "Amoxicillin 500mg", category: "Antibiotic", quantity: 15, threshold: 20 },
  { id: 5, name: "Omeprazole 20mg", category: "Proton Pump Inhibitor", quantity: 18, threshold: 20 },
  { id: 6, name: "Loratadine 10mg", category: "Antihistamine", quantity: 25, threshold: 15 },
  { id: 7, name: "Azithromycin 250mg", category: "Antibiotic", quantity: 30, threshold: 20 },
  { id: 8, name: "Fluticasone Nasal Spray 50mcg", category: "Corticosteroid", quantity: 12, threshold: 10 },
  { id: 9, name: "Salbutamol Inhaler", category: "Bronchodilator", quantity: 8, threshold: 10 },
  { id: 10, name: "Metformin 500mg", category: "Antidiabetic", quantity: 40, threshold: 20 },
  { id: 11, name: "Atorvastatin 10mg", category: "Statin", quantity: 35, threshold: 20 },
  { id: 12, name: "Losartan 50mg", category: "Antihypertensive", quantity: 28, threshold: 20 },
]

export default function AdminPharmacy() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newMedication, setNewMedication] = useState({
    name: "",
    category: "",
    quantity: "",
    threshold: "",
  })

  const filteredMedications = medications.filter(
    (medication) =>
      medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medication.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const lowStockMedications = filteredMedications.filter((medication) => medication.quantity < medication.threshold)

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would add the medication to the database
    setIsAddDialogOpen(false)
    setNewMedication({
      name: "",
      category: "",
      quantity: "",
      threshold: "",
    })
    alert("Medication added successfully!")
  }

  const handleRestock = (id: number) => {
    // In a real app, you would update the medication quantity in the database
    alert(`Medication ${id} restocked.`)
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pharmacy Inventory</h1>
            <p className="text-muted-foreground">Manage medications and monitor stock levels.</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" /> Add Medication
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleAddMedication}>
                <DialogHeader>
                  <DialogTitle>Add New Medication</DialogTitle>
                  <DialogDescription>Enter the details of the new medication to add to inventory.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Medication Name</Label>
                    <Input
                      id="name"
                      value={newMedication.name}
                      onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                      placeholder="Enter medication name and dosage"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newMedication.category}
                      onValueChange={(value) => setNewMedication({ ...newMedication, category: value })}
                      required
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Analgesic">Analgesic</SelectItem>
                        <SelectItem value="NSAID">NSAID</SelectItem>
                        <SelectItem value="Antibiotic">Antibiotic</SelectItem>
                        <SelectItem value="Antihistamine">Antihistamine</SelectItem>
                        <SelectItem value="Antihypertensive">Antihypertensive</SelectItem>
                        <SelectItem value="Proton Pump Inhibitor">Proton Pump Inhibitor</SelectItem>
                        <SelectItem value="Corticosteroid">Corticosteroid</SelectItem>
                        <SelectItem value="Bronchodilator">Bronchodilator</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Initial Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="0"
                        value={newMedication.quantity}
                        onChange={(e) => setNewMedication({ ...newMedication, quantity: e.target.value })}
                        placeholder="Enter quantity"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="threshold">Low Stock Threshold</Label>
                      <Input
                        id="threshold"
                        type="number"
                        min="1"
                        value={newMedication.threshold}
                        onChange={(e) => setNewMedication({ ...newMedication, threshold: e.target.value })}
                        placeholder="Enter threshold"
                        required
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                    Add Medication
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {lowStockMedications.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Low Stock Alert</AlertTitle>
            <AlertDescription>
              {lowStockMedications.length} medications are below the recommended stock level and need to be restocked.
            </AlertDescription>
          </Alert>
        )}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search medications by name or category..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="all">All Medications</TabsTrigger>
            <TabsTrigger value="low">Low Stock</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>All Medications</CardTitle>
                <CardDescription>{filteredMedications.length} medications in inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-3">Category</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredMedications.length > 0 ? (
                      filteredMedications.map((medication) => (
                        <div key={medication.id} className="grid grid-cols-12 gap-2 p-4 items-center">
                          <div className="col-span-5">{medication.name}</div>
                          <div className="col-span-3">{medication.category}</div>
                          <div
                            className={`col-span-2 text-center font-medium ${
                              medication.quantity < medication.threshold ? "text-red-500" : ""
                            }`}
                          >
                            {medication.quantity}
                          </div>
                          <div className="col-span-2 flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleRestock(medication.id)}>
                              Restock
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        No medications found matching your search.
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="low" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Medications</CardTitle>
                <CardDescription>{lowStockMedications.length} medications below threshold</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-3">Category</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {lowStockMedications.length > 0 ? (
                      lowStockMedications.map((medication) => (
                        <div key={medication.id} className="grid grid-cols-12 gap-2 p-4 items-center">
                          <div className="col-span-5">{medication.name}</div>
                          <div className="col-span-3">{medication.category}</div>
                          <div className="col-span-2 text-center font-medium text-red-500">{medication.quantity}</div>
                          <div className="col-span-2 flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleRestock(medication.id)}>
                              Restock
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">No low stock medications found.</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Medications by Category</CardTitle>
                <CardDescription>View medications grouped by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Array.from(new Set(filteredMedications.map((med) => med.category))).map((category) => (
                    <div key={category}>
                      <h3 className="font-medium mb-2">{category}</h3>
                      <div className="rounded-md border">
                        <div className="grid grid-cols-12 gap-2 p-3 font-medium border-b">
                          <div className="col-span-6">Name</div>
                          <div className="col-span-3 text-center">Quantity</div>
                          <div className="col-span-3 text-right">Actions</div>
                        </div>
                        <div className="divide-y">
                          {filteredMedications
                            .filter((med) => med.category === category)
                            .map((medication) => (
                              <div key={medication.id} className="grid grid-cols-12 gap-2 p-3 items-center">
                                <div className="col-span-6">{medication.name}</div>
                                <div
                                  className={`col-span-3 text-center font-medium ${
                                    medication.quantity < medication.threshold ? "text-red-500" : ""
                                  }`}
                                >
                                  {medication.quantity}
                                </div>
                                <div className="col-span-3 flex justify-end gap-2">
                                  <Button variant="outline" size="sm" onClick={() => handleRestock(medication.id)}>
                                    Restock
                                  </Button>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
