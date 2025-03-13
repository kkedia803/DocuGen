"use client"

import { useEffect, useState } from "react"
import { Check, ChevronsUpDown, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"

interface Repository {
  id: string
  name: string
  full_name: string
  description: string
  language: string
}

interface RepositorySelectorProps {
  selectedRepo: string
  onSelectRepo: (repo: string) => void
}

export function RepositorySelector({ selectedRepo, onSelectRepo }: RepositorySelectorProps) {
  const [open, setOpen] = useState(false)
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get("/api/github/repos")
        setRepositories(response.data)
      } catch (error) {
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
          },
          {
            id: "2",
            name: "awesome-app",
            full_name: "username/awesome-app",
            description: "An awesome application",
            language: "TypeScript",
          },
          {
            id: "3",
            name: "my-website",
            full_name: "username/my-website",
            description: "Personal website",
            language: "HTML",
          },
          {
            id: "4",
            name: "data-analysis",
            full_name: "username/data-analysis",
            description: "Data analysis tools",
            language: "Python",
          },
          {
            id: "5",
            name: "mobile-app",
            full_name: "username/mobile-app",
            description: "Mobile application",
            language: "React Native",
          },
        ]
        setRepositories(mockRepos)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepositories()
  }, [toast])

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Select Repository
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={isLoading}
          >
            {selectedRepo
              ? repositories.find((repo) => repo.full_name === selectedRepo)?.full_name
              : "Select repository..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search repositories..." />
            <CommandList>
              <CommandEmpty>{isLoading ? "Loading..." : "No repositories found."}</CommandEmpty>
              <CommandGroup>
                {repositories.map((repo) => (
                  <CommandItem
                    key={repo.id}
                    value={repo.full_name}
                    onSelect={(currentValue) => {
                      onSelectRepo(currentValue === selectedRepo ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", selectedRepo === repo.full_name ? "opacity-100" : "opacity-0")}
                    />
                    <Github className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span>{repo.full_name}</span>
                      <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {repo.description || "No description"} • {repo.language || "Unknown"}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

