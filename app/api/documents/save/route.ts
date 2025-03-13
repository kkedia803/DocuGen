import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, content } = await request.json()

    if (!id || !content) {
      return NextResponse.json({ error: "Document ID and content are required" }, { status: 400 })
    }

    // Update the document
    const document = await prisma.document.update({
      where: {
        id,
        userId: session.user.id, // Ensure the document belongs to the user
      },
      data: {
        content,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(document)
  } catch (error) {
    console.error("Error saving document:", error)
    return NextResponse.json({ error: "Failed to save document" }, { status: 500 })
  }
}

