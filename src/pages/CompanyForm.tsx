
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "@/components/common/Stepper";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import CompanyFormStep1 from "@/components/forms/company/CompanyFormStep1";
import { Card } from "@/components/ui/card";
import { Company } from "@/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const steps = [
  "Company Info",
  "Address",
  "Branches",
  "Corporate Relations",
  "Registrations",
];

const CompanyForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Company>>({});

  const handleNext = (data: Partial<Company>) => {
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

  const handleSubmit = (data: Partial<Company>) => {
    console.log("Submitting company data:", data);
    // In a real application, you would send this data to the backend
    toast.success("Company created successfully!");
    navigate("/companies");
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Add New Company</h1>

      <Card className="p-6 mb-6">
        <Stepper steps={steps} currentStep={currentStep} />
      </Card>

      {currentStep === 1 && (
        <CompanyFormStep1 onNext={handleNext} defaultValues={formData} />
      )}

      {/* For steps 2-5, show placeholder cards for now */}
      {currentStep > 1 && currentStep <= steps.length && (
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">{steps[currentStep - 1]}</h2>
          <p className="mb-6 text-gray-600">
            This step is under development. For now, you can navigate through the form.
          </p>
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            {currentStep < steps.length ? (
              <Button onClick={() => handleNext({})}>
                Next
              </Button>
            ) : (
              <Button onClick={() => handleSubmit(formData)}>
                Submit
              </Button>
            )}
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default CompanyForm;
