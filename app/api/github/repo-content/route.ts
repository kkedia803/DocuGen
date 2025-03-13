import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { Octokit } from "@octokit/rest"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const repo = searchParams.get("repo")

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!repo) {
      return NextResponse.json({ error: "Repository name is required" }, { status: 400 })
    }

    // Get the GitHub access token from the session
    // const token = session.accessToken as string
    const token = "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";

    if (!token) {
      return NextResponse.json({ error: "GitHub token not found" }, { status: 401 })
    }

    // Initialize Octokit with the access token
    const octokit = new Octokit({
      auth: token,
    })

    // Parse owner and repo name
    const [owner, repoName] = repo.split("/")

    // Fetch the repository content (root directory)
    const { data: contents } = await octokit.repos.getContent({
      owner,
      repo: repoName,
      path: "",
    })

    // Fetch the README if it exists
    let readme = null
    try {
      const { data: readmeData } = await octokit.repos.getReadme({
        owner,
        repo: repoName,
      })

      // Decode the content from base64
      const content = Buffer.from(readmeData.content, "base64").toString()
      readme = {
        name: readmeData.name,
        path: readmeData.path,
        content,
      }
    } catch (error) {
      console.log("README not found")
    }

    // Get repository info
    const { data: repoInfo } = await octokit.repos.get({
      owner,
      repo: repoName,
    })

    return NextResponse.json({
      contents: Array.isArray(contents) ? contents : [contents],
      readme,
      repoInfo,
    })
  } catch (error) {
    console.error("Error fetching repository content:", error)
    return NextResponse.json({ error: "Failed to fetch repository content" }, { status: 500 })
  }
}

