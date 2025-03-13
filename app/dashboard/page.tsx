import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { DashboardHeader } from "./dashboard-header"
import { DashboardShell } from "./dashboard-shell"
import { GenerateDocumentForm } from "./generate-document-form"

interface DashboardPageProps {
  searchParams: {
    repo?: string
  }
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const { repo } = await searchParams

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Generate documents from your GitHub repositories" />
      <div className="grid gap-8">
        <div className="space-y-4">
          <div className="grid gap-6">
            <GenerateDocumentForm initialRepo={repo} />
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

