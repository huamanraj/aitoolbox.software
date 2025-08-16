"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Bot, Check, Copy, Edit, RefreshCw, FileText, Download } from "lucide-react"

interface CoverLetterOutputProps {
  generatedLetter: string
  isLoading: boolean
  onRegenerate?: () => void
}

export function CoverLetterOutput({ generatedLetter, isLoading, onRegenerate }: CoverLetterOutputProps) {
  const [isCopied, setIsCopied] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState(false)
  const [editedLetter, setEditedLetter] = React.useState("")

  React.useEffect(() => {
    if (generatedLetter) {
      setEditedLetter(generatedLetter)
      setIsEditing(false)
    }
  }, [generatedLetter])

  const handleCopy = () => {
    const textToCopy = isEditing ? editedLetter : generatedLetter
    navigator.clipboard.writeText(textToCopy)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleDownload = () => {
    const textToDownload = isEditing ? editedLetter : generatedLetter
    const element = document.createElement('a')
    const file = new Blob([textToDownload], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `Cover_Letter_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Save the edited content
      setEditedLetter(editedLetter)
    }
    setIsEditing(!isEditing)
  }

  // Function to format text with newlines preserved
  const formatLetterText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-8 w-1/4" />
      </div>
    )
  }

  if (!generatedLetter) {
    return (
      <div className="flex flex-col items-center justify-center h-52 text-center p-6 border bg-zinc-50 rounded-lg">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-primary/10 rounded-full mb-4">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium mb-1">Your cover letter will appear here</h3>
        <p className="text-zinc-500 text-sm">
          Fill in the details and let the AI work its magic.
        </p>
      </div>
    )
  }

  const displayText = isEditing ? editedLetter : generatedLetter

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between pb-3 mb-3 border-b">
        <h3 className="text-base font-medium flex items-center gap-2">
          <FileText className="h-4 w-4 text-zinc-600" />
          Generated Cover Letter
        </h3>
        <div className="flex gap-2">
          {onRegenerate && (
            <Button
              variant="outline"
              size="icon"
              onClick={onRegenerate}
              title="Regenerate"
              className="h-8 w-8"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={handleEditToggle}
            title={isEditing ? "Save" : "Edit"}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleDownload}
            title="Download"
            className="h-8 w-8"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            title="Copy"
            className="h-8 w-8"
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={editedLetter}
            onChange={e => setEditedLetter(e.target.value)}
            className="w-full min-h-[400px] p-4 border rounded-md text-base resize-y font-sans"
            placeholder="Edit your cover letter here..."
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="whitespace-pre-wrap text-base p-4 border rounded-md min-h-[400px] font-sans leading-relaxed">
            {formatLetterText(displayText)}
          </div>
        </div>
      )}

      {/* Word Count and Stats */}
      {!isLoading && displayText && (
        <div className="flex justify-between items-center text-sm text-gray-500 pt-2 border-t border-gray-200 mt-4">
          <span>Words: {displayText.split(' ').length}</span>
          <span>Characters: {displayText.length}</span>
        </div>
      )}
    </div>
  )
}