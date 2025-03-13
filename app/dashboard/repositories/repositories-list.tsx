"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Github, ExternalLink, FileText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Repository {
  id: string
  name: string
  full_name: string
  description: string
  language: string
  updated_at: string
  html_url: string
  visibility: string
}

export function RepositoriesList() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get("/api/github/repos")
        setRepositories(response.data)
      } catch (error) {
        console.error("Error fetching repositories:", error)
        toast({
          title: "Error",
          description: "Failed to fetch repositories. Please try again.",
          variant: "destructive",
        })
        // Fallback to mock data for development
        const mockRepos = [
          {
            id: "1",
            name: "project-one",
            full_name: "username/project-one",
            description: "A sample project",
            language: "JavaScript",
            updated_at: "2023-01-01T00:00:00Z",
            html_url: "https://github.com/username/project-one",
            visibility: "public",
          },
          {
            id: "2",
            name: "awesome-app",
            full_name: "username/awesome-app",
            description: "An awesome application",
            language: "TypeScript",
            updated_at: "2023-01-02T00:00:00Z",
            html_url: "https://github.com/username/awesome-app",
            visibility: "public",
          },
          {
            id: "3",
            name: "my-website",
            full_name: "username/my-website",
            description: "Personal website",
            language: "HTML",
            updated_at: "2023-01-03T00:00:00Z",
            html_url: "https://github.com/username/my-website",
            visibility: "public",
          },
          {
            id: "4",
            name: "data-analysis",
            full_name: "username/data-analysis",
            description: "Data analysis tools",
            language: "Python",
            updated_at: "2023-01-04T00:00:00Z",
            html_url: "https://github.com/username/data-analysis",
            visibility: "private",
          },
          {
            id: "5",
            name: "mobile-app",
            full_name: "username/mobile-app",
            description: "Mobile application",
            language: "React Native",
            updated_at: "2023-01-05T00:00:00Z",
            html_url: "https://github.com/username/mobile-app",
            visibility: "private",
          },
        ]
        setRepositories(mockRepos)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepositories()
  }, [toast])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleGenerateDocument = (repo: Repository) => {
    router.push(`/dashboard?repo=${repo.full_name}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your GitHub Repositories</CardTitle>
        <CardDescription>View and generate documents from your GitHub repositories</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : repositories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Github className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No repositories found</h3>
            <p className="text-muted-foreground mt-2">Connect your GitHub account to see your repositories</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Repository</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repositories.map((repo) => (
                  <TableRow key={repo.id}>
                    <TableCell className="font-medium">{repo.full_name}</TableCell>
                    <TableCell className="max-w-xs truncate">{repo.description || "No description"}</TableCell>
                    <TableCell>{repo.language || "Unknown"}</TableCell>
                    <TableCell>{formatDate(repo.updated_at)}</TableCell>
                    <TableCell>
                      <Badge variant={repo.visibility === "public" ? "outline" : "secondary"}>{repo.visibility}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => window.open(repo.html_url, "_blank")}>
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View on GitHub</span>
                        </Button>
                        <Button
                          className="bg-primary hover:bg-secondary"
                          size="sm"
                          onClick={() => handleGenerateDocument(repo)}
                        >
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">Generate Document</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

