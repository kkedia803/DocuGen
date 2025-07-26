import type { Metadata } from "next"
import Link from "next/link"
import { FileText } from "lucide-react"
import { LoginForm } from "./login-form"

export const metadata: Metadata = {
  title: "Login - DocuGen",
  description: "Login to your DocuGen account",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-col items-center justify-center px-6 py-12">
          <Link href="/" className="mb-8 flex items-center gap-2 text-2xl font-bold">
            <FileText className="h-8 w-8 text-primary" />
            <span>DocuGen</span>
          </Link>
          <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-sm">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-black">Login</h1>
              <p className="text-gray-500 dark:text-gray-400">Sign in to your account to continue</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

