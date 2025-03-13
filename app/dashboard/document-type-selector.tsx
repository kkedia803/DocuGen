"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronsUpDown, FileText, FileCode, BookOpen, FileQuestion, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DocumentType {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

const documentTypes: DocumentType[] = [
  {
    id: "report",
    name: "Technical Report",
    icon: FileText,
    description: "Comprehensive analysis of your codebase",
  },
  {
    id: "research",
    name: "Research Paper",
    icon: BookOpen,
    description: "Academic-style paper about your project",
  },
  {
    id: "readme",
    name: "README",
    icon: FileQuestion,
    description: "Detailed README for your repository",
  },
  {
    id: "documentation",
    name: "API Documentation",
    icon: FileCode,
    description: "Documentation for your API endpoints",
  },
  {
    id: "thesis",
    name: "Thesis",
    icon: FileSpreadsheet,
    description: "In-depth academic document about your project",
  },
]

interface DocumentTypeSelectorProps {
  selectedType: string
  onSelectType: (type: string) => void
}

export function DocumentTypeSelector({ selectedType, onSelectType }: DocumentTypeSelectorProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Select Document Type
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selectedType ? documentTypes.find((type) => type.id === selectedType)?.name : "Select document type..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search document types..." />
            <CommandList>
              <CommandEmpty>No document type found.</CommandEmpty>
              <CommandGroup>
                {documentTypes.map((type) => (
                  <CommandItem
                    key={type.id}
                    value={type.id}
                    onSelect={(currentValue) => {
                      onSelectType(currentValue === selectedType ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", selectedType === type.id ? "opacity-100" : "opacity-0")} />
                    <type.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span>{type.name}</span>
                      <span className="text-xs text-muted-foreground">{type.description}</span>
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

