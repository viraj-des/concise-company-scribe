
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="flex justify-between">
      {steps.map((step, i) => (
        <div 
          key={i} 
          className={cn(
            "step-item",
            currentStep === i + 1 && "active",
            currentStep > i + 1 && "complete"
          )}
        >
          <div className="step">
            {currentStep > i + 1 ? (
              <Check className="h-5 w-5" />
            ) : (
              i + 1
            )}
          </div>
          <p className="text-xs mt-1 text-center">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
