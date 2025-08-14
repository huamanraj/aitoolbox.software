"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import TripPlannerForm from "./trip-planner-form";
import TripPlannerOutput from "./trip-planner-output";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, MapPin, Star, Clock, ThumbsUp, Plane, Settings, AlertCircle, RefreshCw, HelpCircle, FileEdit, User, FileText } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import NativeBannerAd from "@/components/NativeBannerAd";
export interface Activity {
  name: string;
  location: string;
  duration: string;
  cost?: string;
  description: string;
}

export interface Restaurant {
  name: string;
  cuisine: string;
  location: string;
  priceRange?: string;
  description: string;
}

export interface DayItinerary {
  title: string;
  timeOfDay: string;
  activities: Activity[];
  restaurants: Restaurant[];
}

export interface Accommodation {
  name: string;
  type: string;
  location: string;
  priceRange?: string;
  description: string;
}

export interface TripPlannerResult {
  destination: string;
  duration: string;
  budget: string;
  interests: string[];
  dailyItinerary: DayItinerary[];
  accommodation: Accommodation[];
}

export default function TripPlannerClient() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<TripPlannerResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isOutputOpen, setIsOutputOpen] = useState(false);
  const [currentFormData, setCurrentFormData] = useState<any>(null);

  const outputRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleSubmit = async (formData: {
    destination: string;
    duration: string;
    budget: string;
    interests: string[];
    additionalInfo: string;
  }) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    setProgress(0);
    setIsOutputOpen(true);
    setCurrentFormData(formData);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 200);

    try {
      const prompt = `
        Create a detailed ${formData.duration}-day trip itinerary for ${formData.destination}.
        
        Trip Details:
        - Destination: ${formData.destination}
        - Duration: ${formData.duration} days
        - Budget: ${formData.budget}
        - Interests: ${formData.interests.join(", ")}
        - Additional Information: ${formData.additionalInfo || "None"}
        
        Please create a comprehensive trip plan with:
        1. Daily itinerary with specific activities and timeframes
        2. Restaurant recommendations for each day
        3. Accommodation suggestions
        4. Estimated costs where relevant
        5. Practical tips and transportation suggestions
        
        Return your response as a JSON object with the following structure:
        {
          "destination": "${formData.destination}",
          "duration": "${formData.duration}",
          "budget": "${formData.budget}",
          "interests": ${JSON.stringify(formData.interests)},
          "dailyItinerary": [
            {
              "title": "Arrival & City Center Exploration",
              "timeOfDay": "Full Day (9 AM - 8 PM)",
              "activities": [
                {
                  "name": "Activity name",
                  "location": "Specific location/address",
                  "duration": "2-3 hours",
                  "cost": "€20-30 (optional)",
                  "description": "Detailed description of the activity"
                }
              ],
              "restaurants": [
                {
                  "name": "Restaurant name",
                  "cuisine": "Type of cuisine",
                  "location": "Address or area",
                  "priceRange": "€15-25 per person (optional)",
                  "description": "Why this restaurant is recommended"
                }
              ]
            }
          ],
          "accommodation": [
            {
              "name": "Hotel/Accommodation name",
              "type": "Hotel/Hostel/Apartment",
              "location": "Area/District",
              "priceRange": "€80-120 per night (optional)",
              "description": "Why this accommodation is recommended"
            }
          ]
        }
        
        Make sure each day has 3-5 activities and 2-3 restaurant recommendations. Consider the specified interests and budget level.
      `;
      
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "chat",
          prompt,
          options: {
            model: "openai",
            response_format: { type: "json_object" }
          }
        }),
      });

      clearInterval(interval);
      setProgress(100);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (_) {
          errorData = { error: "An unexpected error occurred. Please try again." }
        }
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Parse the JSON string response
      const parsedResult = JSON.parse(data.data);
      setResult(parsedResult);
      toast.success("Trip Plan Generated!", {
        description: "Your AI-powered travel itinerary is ready.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error generating trip plan:", error);
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleRegenerate = () => {
    if (currentFormData) {
      handleSubmit(currentFormData);
    }
  };

  useEffect(() => {
    if ((result || error) && isMobile && outputRef.current) {
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [result, error, isMobile]);

  return (
    <>
    <div className="w-full max-w-4xl mx-auto">
      <section>
        <h2 className="sr-only">Trip Planning Form</h2>
        <TripPlannerForm onSubmit={handleSubmit} isLoading={isLoading} />
      </section>

      <div ref={outputRef} className="mt-6">
        <Collapsible
          open={isOutputOpen}
          onOpenChange={setIsOutputOpen}
          className="w-full"
        >
          {(isLoading || result || error) && (
            <div className="flex items-center justify-between border bg-zinc-50 px-4 py-3 rounded-none">
              <h4 className="font-medium flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-zinc-600" />
                <span>Generated Trip Plan</span>
              </h4>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-9 p-0 rounded-none"
                >
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
          )}

          <CollapsibleContent className="border border-t-0 p-4 data-[state=closed]:hidden rounded-none">
            <div className="space-y-4">
              {isLoading && (
                <div className="w-full space-y-2">
                  <div className="flex items-center gap-2 text-base text-zinc-600 font-medium">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating your trip plan with AI...
                  </div>
                  <Progress value={progress} className="h-2 rounded-none" />
                </div>
              )}
              {error && !isLoading && (
                <div className="text-destructive p-4 bg-destructive/10 border border-destructive/20 rounded-none">
                  <div className="flex items-center gap-2 font-medium">
                    <AlertCircle className="h-4 w-4" />
                    Error
                  </div>
                  <p className="mt-1 text-base">{error}</p>
                </div>
              )}
              <TripPlannerOutput
                result={result}
                isLoading={isLoading}
                onRegenerate={handleRegenerate}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
          
      
    </div>
    {/* Ad Banner */}
<NativeBannerAd />
    </>

  );
}
