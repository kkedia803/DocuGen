import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"
import { DashboardHeader } from "../dashboard-header"
import { DashboardShell } from "../dashboard-shell"
import { DocumentsList } from "./documents-list"

const prisma = new PrismaClient()

export default async function DocumentsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  // Fetch the user's documents
  const documents = await prisma.document.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Documents" text="Manage your generated documents" />
      <div >
        <DocumentsList documents={documents} />
      </div>
    </DashboardShell>
  )
}

