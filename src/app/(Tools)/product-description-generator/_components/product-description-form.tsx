"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Package, Users, Palette, Target, Sparkles } from "lucide-react"

const tones = [
  "Persuasive",
  "Technical",
  "Playful",
  "Luxurious",
  "Professional",
  "Casual",
]

const formSchema = z.object({
  productName: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters." })
    .max(100, { message: "Product name must be less than 100 characters." }),
  keyFeatures: z
    .string()
    .min(10, { message: "Key features must be at least 10 characters." })
    .max(1000, { message: "Key features must be less than 1000 characters." }),
  targetAudience: z.string().optional(),
  tone: z.string().min(1, { message: "Please select a tone of voice." }),
})

export type ProductFormValues = z.infer<typeof formSchema>

interface ProductDescriptionFormProps {
  onSubmit: (data: ProductFormValues) => void
  isLoading: boolean
}

export function ProductDescriptionForm({
  onSubmit,
  isLoading,
}: ProductDescriptionFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      keyFeatures: "",
      targetAudience: "",
      tone: "Persuasive",
    },
  })

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Package className="mr-2 h-4 w-4" />
                      Product Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Wireless Bluetooth Headphones"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the name or title of your product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      Target Audience (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. fitness enthusiasts, students, professionals"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Who is your ideal customer for this product?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="keyFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Key Features & Specifications
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. 40-hour battery life, noise cancellation, wireless charging case, IPX4 water resistance, comfortable over-ear design, compatible with iOS and Android"
                      className="min-h-[120px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    List the main features, specifications, and benefits of your product. 
                    Include technical details, materials, dimensions, or any unique selling points.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Palette className="mr-2 h-4 w-4" />
                    Tone of Voice
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select desired tone" />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map(tone => (
                          <SelectItem key={tone} value={tone}>
                            {tone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Choose the tone that best matches your brand and target audience
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Description...
                </>
              ) : (
                <>
                  <Target className="mr-2 h-4 w-4" />
                  Generate Product Description
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
