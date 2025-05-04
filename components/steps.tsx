import React from "react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
}

interface StepsProps {
  steps: Step[];
  currentStep: number;
}

export const Steps: React.FC<StepsProps> = ({ steps, currentStep }) => {
  return (
    <ol className="flex items-center">
      {steps.map((step, index) => (
        <li key={step.id} className="flex-1 flex items-center">
          <div
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full border-2",
              index <= currentStep ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"
            )}
          >
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-0.5 bg-border" />
          )}
        </li>
      ))}
    </ol>
  );
}; 