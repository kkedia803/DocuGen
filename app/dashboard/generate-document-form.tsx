"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { RepositorySelector } from "./repository-selector"
import { DocumentTypeSelector } from "./document-type-selector"

interface GenerateDocumentFormProps {
  initialRepo?: string
}

export function GenerateDocumentForm({ initialRepo }: GenerateDocumentFormProps) {
  const [selectedRepo, setSelectedRepo] = useState(initialRepo || "")
  const [documentType, setDocumentType] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Update selectedRepo if initialRepo changes
  useEffect(() => {
    if (initialRepo) {
      setSelectedRepo(initialRepo)
    }
  }, [initialRepo])

  const handleGenerate = async () => {
    if (!selectedRepo || !documentType) {
      toast({
        title: "Missing information",
        description: "Please select a repository and document type",
        variant: "destructive",
      })
      return
    }

    try {
      setIsGenerating(true)

      toast({
        title: "Document generation started",
        description: "Your document is being generated...",
      })

      // Fetch repository content
      const repoContentResponse = await axios.get(`/api/github/repo-content?repo=${selectedRepo}`)

      // Generate document
      const generateResponse = await axios.post("/api/generate", {
        repo: selectedRepo,
        documentType,
        repoContent: repoContentResponse.data,
      })

      // Navigate to the document view page
      router.push(`/dashboard/documents/preview?id=${generateResponse.data.documentId}`)
    } catch (error) {
      console.error("Error generating document:", error)
      toast({
        title: "Error",
        description: "Failed to generate document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Document</CardTitle>
        <CardDescription>Select a repository and document type to generate a document</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RepositorySelector selectedRepo={selectedRepo} onSelectRepo={setSelectedRepo} />
        <DocumentTypeSelector selectedType={documentType} onSelectType={setDocumentType} />
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-primary hover:bg-secondary"
          onClick={handleGenerate}
          disabled={isGenerating || !selectedRepo || !documentType}
        >
          {isGenerating ? "Generating..." : "Generate Document"}
        </Button>
      </CardFooter>
    </Card>
  )
}

