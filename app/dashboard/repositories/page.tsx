import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DashboardHeader } from "../dashboard-header"
import { DashboardShell } from "../dashboard-shell"
import { RepositoriesList } from "./repositories-list"

export default async function RepositoriesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Repositories" text="View and manage your GitHub repositories" />
      <div >
        <RepositoriesList />
      </div>
    </DashboardShell>
  )
}

