interface StepsProps {
  steps: { id: number; title: string }[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function Steps({ steps, currentStep, onStepClick }: StepsProps) {
  return (
    <div className="flex justify-between">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`flex items-center ${
            step.id === currentStep
              ? 'text-primary'
              : step.id < currentStep
              ? 'text-gray-500'
              : 'text-gray-300'
          }`}
          onClick={() => step.id <= currentStep && onStepClick(step.id)}
        >
          <div
            className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
              step.id <= currentStep ? 'border-primary' : 'border-gray-300'
            }`}
          >
            {step.id}
          </div>
          <div className="ml-2">{step.title}</div>
          {step.id !== steps.length && (
            <div className="w-24 h-[2px] mx-4 bg-gray-200" />
          )}
        </div>
      ))}
    </div>
  );
}
