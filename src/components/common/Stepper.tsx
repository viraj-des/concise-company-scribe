
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        {steps.map((step, i) => (
          <div key={i} className="relative flex flex-col items-center">
            <div 
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full border-2 z-10",
                currentStep > i + 1
                  ? "bg-primary border-primary text-white"
                  : currentStep === i + 1
                  ? "border-primary text-primary"
                  : "border-gray-300 text-gray-300"
              )}
            >
              {currentStep > i + 1 ? (
                <Check className="h-5 w-5" />
              ) : (
                i + 1
              )}
            </div>
            <p 
              className={cn(
                "mt-2 text-xs text-center",
                currentStep === i + 1 ? "text-primary font-medium" : "text-gray-500"
              )}
            >
              {step}
            </p>
            
            {/* Line connecting steps */}
            {i < steps.length - 1 && (
              <div 
                className={cn(
                  "absolute top-4 w-full h-0.5 -right-1/2",
                  currentStep > i + 1 ? "bg-primary" : "bg-gray-300"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
