import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { Octokit } from "@octokit/rest"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the GitHub access token from the session
    const token = session.accessToken as string
    // const token = "";

    if (!token) {
      return NextResponse.json({ error: "GitHub token not found" }, { status: 401 })
    }

    // Initialize Octokit with the access token
    const octokit = new Octokit({
      auth: token,
    })

    // Fetch the user's repositories
    const { data: repos } = await octokit.repos.listForAuthenticatedUser({
      sort: "updated",
      per_page: 100,
      visibility: "all",
    })

    // Format the repositories
    const formattedRepos = repos.map((repo) => ({
      id: repo.id.toString(),
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      language: repo.language,
      updated_at: repo.updated_at,
      html_url: repo.html_url,
      visibility: repo.visibility,
    }))

    return NextResponse.json(formattedRepos)
  } catch (error) {
    console.error("Error fetching repositories:", error)
    return NextResponse.json({ error: "Failed to fetch repositories" }, { status: 500 })
  }
}

