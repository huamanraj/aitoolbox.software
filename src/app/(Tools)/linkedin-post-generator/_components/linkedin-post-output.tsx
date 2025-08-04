"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Copy, RefreshCw, Check, Linkedin, ExternalLink } from "lucide-react"
import { toast } from "sonner"

interface LinkedInPostOutputProps {
  generatedPost: string
  isLoading: boolean
  onRegenerate: () => void
}

export function LinkedInPostOutput({ generatedPost, isLoading, onRegenerate }: LinkedInPostOutputProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPost)
      setCopied(true)
      toast.success("LinkedIn post copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy to clipboard")
    }
  }

  const handleLinkedInShare = () => {
    const encodedText = encodeURIComponent(generatedPost)
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent("Check out this LinkedIn post")}&summary=${encodedText}`
    window.open(linkedinUrl, '_blank')
  }

  if (!generatedPost && !isLoading) {
    return null
  }

  return (
    <div className="space-y-4">
      {generatedPost && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Linkedin className="h-5 w-5 text-blue-600" />
              Generated LinkedIn Post
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Your Post</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLinkedInShare}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
              <Textarea
                value={generatedPost}
                readOnly
                className="min-h-[200px] resize-none font-mono text-sm"
                placeholder="Your generated LinkedIn post will appear here..."
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                <p>Ready to post? Copy the content above and paste it directly into LinkedIn.</p>
              </div>
              <Button
                variant="outline"
                onClick={onRegenerate}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posting Tips */}
      {generatedPost && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 text-lg">Ready to Post!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-green-700">
                  <strong>Review the content:</strong> Make sure it aligns with your personal brand and voice
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-green-700">
                  <strong>Add media if relevant:</strong> Consider including an image, video, or article link
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-green-700">
                  <strong>Engage with comments:</strong> Respond to comments to boost your post's visibility
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-green-700">
                  <strong>Post at optimal times:</strong> Tuesday-Thursday, 8-10 AM or 5-6 PM typically perform best
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 