
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "@/components/common/Stepper";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import CompanyFormStep1 from "@/components/forms/company/CompanyFormStep1";
import { Card } from "@/components/ui/card";
import { Company } from "@/types";
import { toast } from "sonner";

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

  // For now, we'll just render the first step
  // In a complete implementation, you'd add the other steps as well
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Add New Company</h1>

      <Card className="p-6">
        <Stepper steps={steps} currentStep={currentStep} />
      </Card>

      {currentStep === 1 && (
        <CompanyFormStep1 onNext={handleNext} defaultValues={formData} />
      )}

      {/* The other steps would be added here */}
    </DashboardLayout>
  );
};

export default CompanyForm;
