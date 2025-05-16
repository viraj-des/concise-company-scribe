
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "@/components/common/Stepper";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Director } from "@/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const steps = [
  "Personal Details",
  "Address",
  "Identification",
  "Entity Interests",
  "Company Associations",
];

const DirectorForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Director>>({});

  const handleNext = (data: Partial<Director>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Final submission
      handleSubmit({ ...formData, ...data });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (data: Partial<Director>) => {
    console.log("Submitting director data:", data);
    // In a real application, you would send this data to the backend
    toast.success("Director created successfully!");
    navigate("/directors");
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Add New Director</h1>

      <Card className="p-6 mb-6">
        <Stepper steps={steps} currentStep={currentStep} />
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Coming Soon</h2>
        <p className="mb-6 text-gray-600">
          The director form implementation is in progress. In the final application, this form will include all the required fields for director management as per the specification.
        </p>
        
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <div className="ml-auto">
            <Button onClick={() => navigate("/directors")}>
              Return to Directors
            </Button>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default DirectorForm;
