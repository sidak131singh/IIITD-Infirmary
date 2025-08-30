import { NextResponse } from "next/server"
import { withAuth } from "@/lib/rbac"
import { prisma } from "@/lib/prisma"
import { createAuditLog } from "@/lib/audit"
import bcrypt from "bcryptjs"

export const GET = withAuth(async (req: Request, context: any, session: any) => {
  try {
    const { searchParams } = new URL(req.url)
    const role = searchParams.get("role")
    
    const where: any = {}
    if (role) where.role = role

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        studentId: true,
        phone: true,
        createdAt: true,
        // Don't return password
      },
      orderBy: { createdAt: "desc" }
    })
    
    await createAuditLog(session.user.id, "VIEW_USERS", { role }, req)
    
    return NextResponse.json({
      success: true,
      data: users,
      count: users.length
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch users" },
      { status: 500 }
    )
  }
}, ["ADMIN"])

export const POST = withAuth(async (req: Request, context: any, session: any) => {
  try {
    const data = await req.json()
    
    // Validate required fields
    if (!data.email || !data.name || !data.password || !data.role) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User with this email already exists" },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12)
    
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: data.role,
        studentId: data.studentId,
        phone: data.phone
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        studentId: true,
        phone: true,
        createdAt: true
      }
    })
    
    await createAuditLog(
      session.user.id, 
      "CREATE_USER", 
      { 
        userId: user.id, 
        role: user.role,
        email: user.email 
      }, 
      req
    )
    
    return NextResponse.json({
      success: true,
      data: user,
      message: "User created successfully"
    })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create user" },
      { status: 500 }
    )
  }
}, ["ADMIN"])
