"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleGitHubLogin = async () => {
    try {
      setIsLoading(true)
      await signIn("github", { callbackUrl: "/dashboard" })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button variant="outline" className="w-full" onClick={handleGitHubLogin} disabled={isLoading}>
        <Github className="mr-2 h-4 w-4" />
        {isLoading ? "Signing in..." : "Sign in with GitHub"}
      </Button>
    </div>
  )
}

