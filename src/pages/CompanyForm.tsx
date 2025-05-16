
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "@/components/common/Stepper";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import CompanyFormStep1 from "@/components/forms/company/CompanyFormStep1";
import CompanyFormStep2 from "@/components/forms/company/CompanyFormStep2";
import CompanyFormStep3 from "@/components/forms/company/CompanyFormStep3";
import CompanyFormStep4 from "@/components/forms/company/CompanyFormStep4";
import CompanyFormStep5 from "@/components/forms/company/CompanyFormStep5";
import { Card } from "@/components/ui/card";
import { Company } from "@/types";
import { database } from "@/services/database";

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
    // Save to database
    database.createCompany(data);
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

      {currentStep === 2 && (
        <CompanyFormStep2 
          onNext={handleNext}
          onBack={handleBack}
          defaultValues={formData} 
        />
      )}

      {currentStep === 3 && (
        <CompanyFormStep3
          onNext={handleNext}
          onBack={handleBack}
          defaultValues={formData}
        />
      )}

      {currentStep === 4 && (
        <CompanyFormStep4
          onNext={handleNext}
          onBack={handleBack} 
          defaultValues={formData}
        />
      )}

      {currentStep === 5 && (
        <CompanyFormStep5
          onNext={handleNext}
          onBack={handleBack}
          defaultValues={formData}
        />
      )}
    </DashboardLayout>
  );
};

export default CompanyForm;
