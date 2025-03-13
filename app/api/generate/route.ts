import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { repo, documentType, repoContent } = await request.json()

    if (!repo || !documentType || !repoContent) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Create a prompt based on document type and repository content
    const prompt = createPromptForDocumentType(documentType, repo, repoContent)

    // Generate content with Gemini AI
    const result = await model.generateContent(prompt)
    const response = await result.response
    const generatedText = response.text()

    console.log(result)
    // Save the document to the database
    const document = await prisma.document.create({
      data: {
        title: `${documentType} for ${repo}`,
        content: generatedText,
        repository: repo,
        documentType,
        userId: session.user.id,
      },
    })

    return NextResponse.json({
      documentId: document.id,
      content: generatedText,
    })
  } catch (error) {
    console.error("Error generating document:", error)
    return NextResponse.json({ error: "Failed to generate document" }, { status: 500 })
  }
}

function createPromptForDocumentType(documentType: string, repo: string, repoContent: any) {
  const { readme, repoInfo } = repoContent

  const baseContext = `
Repository: ${repo}
Description: ${repoInfo.description || "No description provided"}
Language: ${repoInfo.language || "Unknown"}
README: ${readme?.content || "No README found"}
  `

  switch (documentType) {
    case "report":
      return `
You are a technical writer creating a comprehensive technical report for the GitHub repository ${repo}.

${baseContext}

Create a detailed technical report that includes:
1. Executive Summary
2. Project Overview
3. Architecture Analysis
4. Code Quality Assessment
5. Performance Considerations
6. Security Analysis
7. Recommendations for Improvement
8. Conclusion

Format the report in Markdown with proper headings, lists, and code examples where appropriate.
      `

    case "research":
      return `
You are an academic researcher writing a research paper about the GitHub repository ${repo}.

${baseContext}

Create a research paper that includes:
1. Abstract
2. Introduction
3. Background and Related Work
4. Methodology
5. Implementation Details
6. Evaluation
7. Discussion
8. Future Work
9. Conclusion
10. References

Format the paper in Markdown with proper academic structure, citations, and technical details.
      `

    case "readme":
      return `
You are a documentation expert creating a comprehensive README for the GitHub repository ${repo}.

${baseContext}

Create a detailed README that includes:
1. Project Title and Description
2. Features
3. Installation Instructions
4. Usage Examples
5. API Documentation (if applicable)
6. Configuration
7. Contributing Guidelines
8. License Information
9. Acknowledgments

Format the README in Markdown with proper headings, code blocks, and examples.
      `

    case "documentation":
      return `
You are a technical documentation specialist creating API documentation for the GitHub repository ${repo}.

${baseContext}

Create comprehensive API documentation that includes:
1. Introduction
2. Getting Started
3. Authentication (if applicable)
4. Endpoints
5. Request/Response Examples
6. Error Handling
7. Rate Limiting (if applicable)
8. SDK Examples (if applicable)
9. Versioning Information

Format the documentation in Markdown with proper headings, code blocks, and examples.
      `

    case "thesis":
      return `
You are an academic researcher writing a thesis about the GitHub repository ${repo}.

${baseContext}

Create a detailed thesis that includes:
1. Abstract
2. Introduction
3. Literature Review
4. Theoretical Framework
5. Methodology
6. Implementation
7. Results and Analysis
8. Discussion
9. Conclusion
10. Future Work
11. References

Format the thesis in Markdown with proper academic structure, citations, and technical details.
      `

    default:
      return `
You are a technical writer creating documentation for the GitHub repository ${repo}.

${baseContext}

Create a detailed document that includes:
1. Introduction
2. Project Overview
3. Features
4. Implementation Details
5. Usage Examples
6. Conclusion

Format the document in Markdown with proper headings, lists, and code examples where appropriate.
      `
  }
}

