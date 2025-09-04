import { NextResponse } from "next/server"
import { withAuth } from "@/lib/rbac"
import { prisma } from "@/lib/prisma"
import { createAuditLog } from "@/lib/audit"

export const GET = withAuth(["ADMIN"])(async (req: Request, session: any) => {
  try {
    const totalMedicines = await prisma.medicine.count()

    const lowStockItems = await prisma.medicine.count({
      where: {
        quantity: {
          lte: prisma.medicine.fields.threshold
        }
      }
    })

    await createAuditLog(session.user.id, "VIEW_PHARMACY_STATS", { total: totalMedicines, lowStock: lowStockItems }, req)

    return NextResponse.json({
      success: true,
      data: {
        totalMedicines,
        lowStockItems,
        summary: `${lowStockItems} low stock items`
      }
    })
  } catch (error) {
    console.error("Error fetching pharmacy stats:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch pharmacy stats" },
      { status: 500 }
    )
  }
})