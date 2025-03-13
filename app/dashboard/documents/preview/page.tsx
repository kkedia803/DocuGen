import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"
import { DashboardHeader } from "../../dashboard-header"
import { DashboardShell } from "../../dashboard-shell"
import { DocumentPreview } from "./document-preview"

const prisma = new PrismaClient()

interface PreviewPageProps {
  searchParams: {
    id?: string
  }
}

export default async function PreviewPage({ searchParams }: PreviewPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const { id } = searchParams

  if (!id) {
    redirect("/dashboard")
  }

  // Fetch the document
  const document = await prisma.document.findUnique({
    where: {
      id,
      userId: session.user.id, // Ensure the document belongs to the user
    },
  })

  if (!document) {
    redirect("/dashboard")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Document Preview" text="Review and edit your generated document" />
      <div className="grid gap-8">
        <DocumentPreview document={document} />
      </div>
    </DashboardShell>
  )
}

