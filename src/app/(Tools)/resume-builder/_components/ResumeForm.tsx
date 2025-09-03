// _components/ResumeForm.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ResumeValues } from "@/lib/resume/validation";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";
import { useResume } from "@/contexts/resume-context";
import ProjectForm from "./forms/ProjectForm";

const steps = [
  { id: "personal", title: "Personal" },
  { id: "project", title: "Project" },
  { id: "experience", title: "Experience" },
  { id: "education", title: "Education" },
  { id: "skills", title: "Skills" },
  { id: "summary", title: "Summary" },
];


export default function ResumeForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const {resumeData, setResumeData}= useResume()

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-2">
          {/* Breadcrumbs */}
          <div className="flex justify-between items-center overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-1">
                <button
                  className={`text-[10px] sm:text-xs md:text-sm ${
                    currentStep === index
                      ? "text-xs font-bold text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  {step.title}
                </button>
                {index < steps.length - 1 && (
                  <ChevronRight className="h-4 w-4 whitespace-nowrap text-muted-foreground" />
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <Progress value={(currentStep + 1) * (100 / steps.length)} />
        </div>
      </CardHeader>

      <CardContent>
        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 0 && (
            <PersonalInfoForm
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          )}
          {currentStep === 1 && (
            <ProjectForm
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          )}
          {currentStep === 2 && (
            <WorkExperienceForm
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          )}
          {currentStep === 3 && (
            <EducationForm
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          )}
          {currentStep === 4 && (
            <SkillsForm resumeData={resumeData} setResumeData={setResumeData} />
          )}
          {currentStep === 5 && (
            <SummaryForm
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          )}
          {/* Other steps will go here */}
        </div>
          <div className="text-gray-400 pt-8">
        <p className="text-right text-sm">
          Go to the preview section to Print**
          </p>
      </div>
        {/* Navigation Buttons */}
        <div className="mt-2 flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button onClick={nextStep} className="gap-1">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button>Finish</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
