"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Download, Save, RefreshCw, Edit, Eye } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownPreview } from "@/components/markdown-preview"

interface Document {
  id: string
  title: string
  content: string
  repository: string
  documentType: string
  createdAt: string
  updatedAt: string
}

interface DocumentPreviewProps {
  document: Document
}

export function DocumentPreview({ document }: DocumentPreviewProps) {
  const [content, setContent] = useState(document.content)
  const [isSaving, setIsSaving] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSave = async () => {
    try {
      setIsSaving(true)
      await axios.post("/api/documents/save", {
        id: document.id,
        content,
      })

      toast({
        title: "Document saved",
        description: "Your document has been saved successfully",
      })
    } catch (error) {
      console.error("Error saving document:", error)
      toast({
        title: "Error",
        description: "Failed to save document",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDownload = () => {
    // Create a blob from the content
    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)

    // Create a temporary link and trigger download
    const a = document.createElement("a")
    a.href = url
    a.download = `${document.repository.replace("/", "-")}-${document.documentType}.md`
    document.body.appendChild(a)
    a.click()

    // Clean up
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Document downloaded",
      description: "Your document has been downloaded as Markdown",
    })
  }

  const handleRegenerate = async () => {
    try {
      setIsRegenerating(true)

      toast({
        title: "Regenerating document",
        description: "Your document is being regenerated...",
      })

      // Fetch repository content
      const repoContentResponse = await axios.get(`/api/github/repo-content?repo=${document.repository}`)

      // Generate document
      const generateResponse = await axios.post("/api/generate", {
        repo: document.repository,
        documentType: document.documentType,
        repoContent: repoContentResponse.data,
      })

      // Update content
      setContent(generateResponse.data.content)

      toast({
        title: "Document regenerated",
        description: "Your document has been regenerated successfully",
      })
    } catch (error) {
      console.error("Error regenerating document:", error)
      toast({
        title: "Error",
        description: "Failed to regenerate document",
        variant: "destructive",
      })
    } finally {
      setIsRegenerating(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{document.title}</CardTitle>
        <CardDescription>Review and edit your generated document</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[500px] font-mono text-sm"
            />
          </TabsContent>
          <TabsContent value="preview">
            <div className="border rounded-md p-4 min-h-[500px] overflow-auto">
              <MarkdownPreview content={content} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleRegenerate} disabled={isRegenerating}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {isRegenerating ? "Regenerating..." : "Regenerate"}
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button className="bg-primary hover:bg-secondary" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

