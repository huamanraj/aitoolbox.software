"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Sparkles, Zap, Users, Shield, Award, Download, Loader2, Info, Lightbulb } from "lucide-react";
import Image from 'next/image';
import NativeBannerAd from "@/components/NativeBannerAd";
export default function LogoGeneratorClient() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [ratio, setRatio] = useState("1:1");
  const [slogan, setSlogan] = useState("");
  const [model, setModel] = useState("flux");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Please enter a logo description");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedLogo(null);

    try {
      const response = await fetch('/api/logo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, ratio, slogan, model }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      setGeneratedLogo(result.image);
    } catch (err) {
      console.error('Logo generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate logo. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadLogo = () => {
    if (!generatedLogo) return;
    
    const link = document.createElement('a');
    link.href = generatedLogo;
    link.download = 'generated-logo.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-8 lg:mb-12">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-gray-100 text-gray-800 px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1" />
                Free Forever
              </Badge>
              <Badge variant="secondary" className="bg-gray-100 text-gray-800 px-3 py-1">
                <Zap className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
              Free AI Logo Generator
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Create professional logos for your business in seconds using AI. 
              Just describe what you want and let our AI do the work.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>50k+ logos created</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Commercial use</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span>No watermarks</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Describe Your Logo
              </CardTitle>
              <CardDescription>
                Tell us what kind of logo you want. Be specific about style, colors, and elements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Logo Description *</Label>
                  <textarea
                    id="prompt"
                    placeholder="e.g., Modern tech company logo with blue colors and geometric shapes"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full min-h-[100px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isGenerating}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="slogan">Slogan/Tagline (Optional)</Label>
                    <Input
                      id="slogan"
                      placeholder="e.g., Innovation at its best"
                      value={slogan}
                      onChange={(e) => setSlogan(e.target.value)}
                      disabled={isGenerating}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ratio">Aspect Ratio</Label>
                    <Select value={ratio} onValueChange={setRatio} disabled={isGenerating}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1:1">Square (1:1)</SelectItem>
                        <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                        <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                        <SelectItem value="4:3">Classic (4:3)</SelectItem>
                        <SelectItem value="3:4">Vertical (3:4)</SelectItem>
                        <SelectItem value="2:1">Wide (2:1)</SelectItem>
                        <SelectItem value="1:2">Tall (1:2)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">AI Model</Label>
                  <Select value={model} onValueChange={setModel} disabled={isGenerating}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flux">Flux (Default)</SelectItem>
                      <SelectItem value="dall-e-3">DALL-E 3</SelectItem>
                      <SelectItem value="stable-diffusion-xl">Stable Diffusion XL</SelectItem>
                      <SelectItem value="gptimage">GPT-4 Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Generate Logo
                    </>
                  )}
                </Button>
              </form>
              {/* Examples */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Example prompts:
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• &quot;Modern tech startup logo with blue gradient and circuit patterns&quot;</p>
                  <p>• &quot;Elegant coffee shop logo with warm brown colors and coffee bean icon&quot;</p>
                  <p>• &quot;Bold fitness gym logo with red and black colors and strong typography&quot;</p>
                  <p>• &quot;Minimalist fashion brand logo with black and white, elegant fonts&quot;</p>
                  <p>• &quot;Creative design agency logo with colorful abstract shapes&quot;</p>
                  <p>• &quot;Professional consulting firm logo with navy blue and gold accents&quot;</p>
                </div>
              </div>

              {/* Tips for better results */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-sm text-blue-800 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Tips for better results:
                </h3>
                <div className="space-y-1 text-sm text-blue-700">
                  <p>• Be specific about colors, style, and industry</p>
                  <p>• Mention desired elements (icons, symbols, patterns)</p>
                  <p>• Specify mood (modern, vintage, playful, professional)</p>
                  <p>• Include typography preferences if needed</p>
                  <p>• Keep it concise but descriptive</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Your Generated Logo
              </CardTitle>
              <CardDescription>
                Your logo will appear here once generated
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[300px] flex items-center justify-center">
                {isGenerating ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-600">Generating your logo...</p>
                  </div>
                ) : generatedLogo ? (
                  <div className="space-y-4 text-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <Image 
                        src={generatedLogo} 
                        alt="Generated Logo"
                        width={500}  
                        height={500}
                        className="w-full h-auto" 
                        unoptimized={generatedLogo.startsWith('data:')}  // Add this for data URLs
                      />
                    </div>
                    <Button onClick={downloadLogo} variant="outline" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Logo
                    </Button>
                  </div>
                ) : error ? (
                  <div className="text-center space-y-2">
                    <p className="text-red-600">{error}</p>
                    <Button onClick={() => setError(null)} variant="outline">
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <Sparkles className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Enter a description and click generate</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      {/* Ad Banner */}
      <NativeBannerAd />

        {/* Comprehensive Guide Section */}
        <div className="mt-16 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Complete Guide to AI Logo Generation
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Learn how to create stunning logos with AI. Follow our expert tips and best practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Writing Effective Prompts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  Writing Effective Prompts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm text-gray-800 mb-1">✅ Good Examples:</h4>
                  <p className="text-sm text-gray-600">&quot;Modern tech company logo with blue gradient, geometric shapes, clean typography&quot;</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-800 mb-1">❌ Avoid:</h4>
                  <p className="text-sm text-gray-600">&quot;Make me a logo&quot; (too vague)</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-800 mb-1">💡 Pro Tip:</h4>
                  <p className="text-sm text-gray-600">Include industry, style, colors, and key elements</p>
                </div>
              </CardContent>
            </Card>

            {/* Color Psychology */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award className="w-5 h-5 text-purple-600" />
                  Color Psychology
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Blue: Trust, reliability, tech</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Red: Energy, passion, food</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Green: Growth, nature, health</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Purple: Luxury, creativity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Orange: Fun, enthusiasm</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                  <span className="text-sm">Black: Elegance, premium</span>
                </div>
              </CardContent>
            </Card>

            {/* Logo Styles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Popular Logo Styles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Minimalist:</span> Clean, simple, less is more
                </div>
                <div>
                  <span className="font-medium">Modern:</span> Contemporary, sleek, geometric
                </div>
                <div>
                  <span className="font-medium">Vintage:</span> Classic, retro, nostalgic
                </div>
                <div>
                  <span className="font-medium">Bold:</span> Strong, impactful, attention-grabbing
                </div>
                <div>
                  <span className="font-medium">Playful:</span> Fun, creative, approachable
                </div>
                <div>
                  <span className="font-medium">Elegant:</span> Sophisticated, refined, premium
                </div>
              </CardContent>
            </Card>

            {/* Industry-Specific Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                  Industry-Specific Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Tech:</span> Blue, geometric, modern, clean
                </div>
                <div>
                  <span className="font-medium">Food:</span> Warm colors, appetizing, friendly
                </div>
                <div>
                  <span className="font-medium">Finance:</span> Blue, green, professional, trustworthy
                </div>
                <div>
                  <span className="font-medium">Health:</span> Green, blue, cross symbols, caring
                </div>
                <div>
                  <span className="font-medium">Fashion:</span> Black, elegant, sophisticated
                </div>
                <div>
                  <span className="font-medium">Sports:</span> Dynamic, bold, energetic colors
                </div>
              </CardContent>
            </Card>

            {/* Ratio Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Info className="w-5 h-5 text-blue-600" />
                  When to Use Each Ratio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">1:1 (Square):</span> Social media, favicons
                </div>
                <div>
                  <span className="font-medium">16:9 (Landscape):</span> Website headers, banners
                </div>
                <div>
                  <span className="font-medium">4:3 (Classic):</span> Traditional print materials
                </div>
                <div>
                  <span className="font-medium">2:1 (Wide):</span> Business cards, letterheads
                </div>
                <div>
                  <span className="font-medium">9:16 (Portrait):</span> Mobile apps, stories
                </div>
              </CardContent>
            </Card>

            {/* Advanced Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  Advanced Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Symbols:</span> Add relevant icons or symbols
                </div>
                <div>
                  <span className="font-medium">Typography:</span> Mention font styles (sans-serif, script)
                </div>
                <div>
                  <span className="font-medium">Composition:</span> Specify layout (circular, horizontal)
                </div>
                <div>
                  <span className="font-medium">Effects:</span> Gradients, shadows, 3D effects
                </div>
                <div>
                  <span className="font-medium">Inspiration:</span> Reference well-known brands
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600">Generate professional logos in seconds</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">100% Free</h3>
              <p className="text-sm text-gray-600">No hidden costs or watermarks</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Commercial Use</h3>
              <p className="text-sm text-gray-600">Use for business and commercial projects</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our AI logo generator
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Is the logo generator really free?</h3>
                <p className="text-sm text-gray-600">Yes! Our AI logo generator is completely free with no hidden costs, watermarks, or subscription fees. You can generate and download as many logos as you need.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Can I use the logos commercially?</h3>
                <p className="text-sm text-gray-600">Absolutely! All generated logos come with full commercial use rights. You can use them for your business, products, services, and any commercial purposes.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What aspect ratios are available?</h3>
                <p className="text-sm text-gray-600">We offer 7 different aspect ratios: Square (1:1), Landscape (16:9), Portrait (9:16), Classic (4:3), Vertical (3:4), Wide (2:1), and Tall (1:2).</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How do I write better prompts?</h3>
                <p className="text-sm text-gray-600">Be specific about your industry, preferred colors, style (modern, vintage, etc.), and any elements you want included. The more descriptive, the better the results.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Can I include text in my logo?</h3>
                <p className="text-sm text-gray-600">Yes! Use the slogan field to add taglines or company names. You can also specify text requirements in your description prompt.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">What file format do I get?</h3>
                <p className="text-sm text-gray-600">Logos are generated as high-quality PNG files with transparent backgrounds, perfect for use across all platforms and media.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
