"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { Package, Check, Copy, Edit, RefreshCw, FileText } from "lucide-react"

interface ProductDescriptionOutputProps {
  generatedDescription: string
  isLoading: boolean
  onRegenerate?: () => void
}

export function ProductDescriptionOutput({ 
  generatedDescription, 
  isLoading, 
  onRegenerate 
}: ProductDescriptionOutputProps) {
  const [isCopied, setIsCopied] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState(false)
  const [editedDescription, setEditedDescription] = React.useState("")

  React.useEffect(() => {
    if (generatedDescription) {
      setEditedDescription(generatedDescription)
      setIsEditing(false)
    }
  }, [generatedDescription])

  const handleCopy = () => {
    const textToCopy = isEditing ? editedDescription : generatedDescription
    navigator.clipboard.writeText(textToCopy)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const formatDescriptionText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="border rounded-lg p-4 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    )
  }

  if (!generatedDescription) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          Your product description will appear here
        </h3>
        <p className="text-muted-foreground">
          Fill in the product details and let the AI create compelling copy for you.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">Generated Product Description</h3>
        <div className="flex gap-2">
          {onRegenerate && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRegenerate}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleEditToggle}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? "Preview" : "Edit"}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleCopy}
            className={isCopied ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy to Clipboard
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="border border-border rounded-lg overflow-hidden">
        {isEditing ? (
          <Textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full min-h-[200px] resize-y rounded-none border-none focus:ring-0"
            placeholder="Edit your product description..."
          />
        ) : (
          <div className="p-4 bg-card">
            <div className="prose prose-sm max-w-none text-foreground">
              {formatDescriptionText(isEditing ? editedDescription : generatedDescription)}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
        <div className="flex items-center">
          <FileText className="h-4 w-4 mr-2" />
          <span>
            {(isEditing ? editedDescription : generatedDescription).length} characters
          </span>
        </div>
        <span>
          AI-generated content • Please review before using
        </span>
      </div>
    </div>
  )
}
