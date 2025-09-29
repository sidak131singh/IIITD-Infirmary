import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  // Create Admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@iiitd.ac.in' },
    update: {},
    create: {
      email: 'admin@iiitd.ac.in',
      name: 'Admin User',
      password: await bcrypt.hash('admin123', 12),
      role: 'ADMIN',
      phone: '+91-9876543210'
    }
  })

  // Create Doctor users
  const doctor1 = await prisma.user.upsert({
    where: { email: 'dr.smith@iiitd.ac.in' },
    update: {},
    create: {
      email: 'dr.smith@iiitd.ac.in',
      name: 'Dr. Sarah Smith',
      password: await bcrypt.hash('doctor123', 12),
      role: 'DOCTOR',
      phone: '+91-9876543211'
    }
  })

  const doctor2 = await prisma.user.upsert({
    where: { email: 'dr.johnson@iiitd.ac.in' },
    update: {},
    create: {
      email: 'dr.johnson@iiitd.ac.in',
      name: 'Dr. Michael Johnson',
      password: await bcrypt.hash('doctor123', 12),
      role: 'DOCTOR',
      phone: '+91-9876543212'
    }
  })

  // Create Student users
  const student1 = await prisma.user.upsert({
    where: { email: 'john.doe@iiitd.ac.in' },
    update: {},
    create: {
      email: 'john.doe@iiitd.ac.in',
      name: 'John Doe',
      password: await bcrypt.hash('student123', 12),
      role: 'STUDENT',
      studentId: '2023001',
      phone: '+91-9876543213',
      height: 175.5,
      weight: 68.2,
      bloodGroup: 'O+',
      pastMedicalHistory: 'No significant past medical history. Had chickenpox at age 8. No known allergies.',
      currentMedications: 'None'
    }
  })

  const student2 = await prisma.user.upsert({
    where: { email: 'jane.smith@iiitd.ac.in' },
    update: {},
    create: {
      email: 'jane.smith@iiitd.ac.in',
      name: 'Jane Smith',
      password: await bcrypt.hash('student123', 12),
      role: 'STUDENT',
      studentId: '2023002',
      phone: '+91-9876543214',
      height: 162.0,
      weight: 55.8,
      bloodGroup: 'A+',
      pastMedicalHistory: 'Mild asthma since childhood. Allergic to shellfish. Had appendectomy in 2020.',
      currentMedications: 'Albuterol inhaler as needed for asthma'
    }
  })

  // Create Medicines
  const medicines = [
    {
      name: 'Paracetamol',
      category: 'Analgesic',
      quantity: 100,
      threshold: 20,
      dosage: '500mg',
      price: 5.0
    },
    {
      name: 'Ibuprofen',
      category: 'Anti-inflammatory',
      quantity: 75,
      threshold: 15,
      dosage: '400mg',
      price: 8.0
    },
    {
      name: 'Amoxicillin',
      category: 'Antibiotic',
      quantity: 50,
      threshold: 10,
      dosage: '250mg',
      price: 12.0
    },
    {
      name: 'Cetirizine',
      category: 'Antihistamine',
      quantity: 60,
      threshold: 12,
      dosage: '10mg',
      price: 6.0
    },
    {
      name: 'Omeprazole',
      category: 'Proton Pump Inhibitor',
      quantity: 40,
      threshold: 8,
      dosage: '20mg',
      price: 15.0
    }
  ]

  for (const medicine of medicines) {
    await prisma.medicine.upsert({
      where: { name: medicine.name },
      update: {},
      create: medicine
    })
  }

  // Create some sample appointments
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)

  const appointment1 = await prisma.appointment.create({
    data: {
      date: tomorrow,
      timeSlot: '10:00 AM',
      reason: 'Regular checkup',
      status: 'CONFIRMED',
      notes: 'Annual health checkup',
      studentId: student1.id,
      doctorId: doctor1.id
    }
  })

  const appointment2 = await prisma.appointment.create({
    data: {
      date: nextWeek,
      timeSlot: '2:00 PM',
      reason: 'Headache and fever',
      status: 'PENDING',
      studentId: student2.id,
      doctorId: doctor2.id
    }
  })

  // Create a sample prescription for completed appointment
  const pastDate = new Date()
  pastDate.setDate(pastDate.getDate() - 2)

  const completedAppointment = await prisma.appointment.create({
    data: {
      date: pastDate,
      timeSlot: '11:00 AM',
      reason: 'Cold and cough',
      status: 'COMPLETED',
      notes: 'Patient recovered well',
      studentId: student1.id,
      doctorId: doctor1.id
    }
  })

  const prescription = await prisma.prescription.create({
    data: {
      diagnosis: 'Common cold with mild fever',
      notes: 'Rest and take medication as prescribed',
      appointmentId: completedAppointment.id,
      doctorId: doctor1.id,
      studentId: student1.id
    }
  })

  // Add medications to prescription
  const paracetamol = await prisma.medicine.findFirst({
    where: { name: 'Paracetamol' }
  })

  const cetirizine = await prisma.medicine.findFirst({
    where: { name: 'Cetirizine' }
  })

  if (paracetamol) {
    await prisma.prescriptionMedication.create({
      data: {
        prescriptionId: prescription.id,
        medicineId: paracetamol.id,
        dosage: '500mg',
        frequency: 'Three times a day',
        duration: '5 days',
        instructions: 'Take after meals'
      }
    })
  }

  if (cetirizine) {
    await prisma.prescriptionMedication.create({
      data: {
        prescriptionId: prescription.id,
        medicineId: cetirizine.id,
        dosage: '10mg',
        frequency: 'Once a day',
        duration: '2 days',
        instructions: 'Take before bedtime'
      }
    })
  }

  // Create some audit logs
  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'SYSTEM_SEED',
      details: { message: 'Database seeded with initial data' },
      ipAddress: '127.0.0.1',
      userAgent: 'Seeding Script'
    }
  })

  console.log('Database seeding completed successfully!')
  console.log('\nCreated users:')
  console.log('Admin: admin@iiitd.ac.in / admin123')
  console.log('Doctor 1: dr.smith@iiitd.ac.in / doctor123')
  console.log('Doctor 2: dr.johnson@iiitd.ac.in / doctor123')
  console.log('Student 1: john.doe@iiitd.ac.in / student123')
  console.log('Student 2: jane.smith@iiitd.ac.in / student123')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })