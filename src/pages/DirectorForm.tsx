
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "@/components/common/Stepper";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Director } from "@/types";
import DirectorFormStep1 from "@/components/forms/director/DirectorFormStep1";
import DirectorFormStep2 from "@/components/forms/director/DirectorFormStep2";
import DirectorFormStep3 from "@/components/forms/director/DirectorFormStep3";
import DirectorFormStep4 from "@/components/forms/director/DirectorFormStep4";
import DirectorFormStep5 from "@/components/forms/director/DirectorFormStep5";
import { database } from "@/services/database";

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
    // Save to database
    database.createDirector(data);
    navigate("/directors");
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Add New Director</h1>

      <Card className="p-6 mb-6">
        <Stepper steps={steps} currentStep={currentStep} />
      </Card>

      {currentStep === 1 && (
        <DirectorFormStep1 onNext={handleNext} defaultValues={formData} />
      )}

      {currentStep === 2 && (
        <DirectorFormStep2 
          onNext={handleNext}
          onBack={handleBack}
          defaultValues={formData} 
        />
      )}

      {currentStep === 3 && (
        <DirectorFormStep3
          onNext={handleNext}
          onBack={handleBack}
          defaultValues={formData}
        />
      )}

      {currentStep === 4 && (
        <DirectorFormStep4
          onNext={handleNext}
          onBack={handleBack} 
          defaultValues={formData}
        />
      )}

      {currentStep === 5 && (
        <DirectorFormStep5
          onNext={handleNext}
          onBack={handleBack}
          defaultValues={formData}
        />
      )}
    </DashboardLayout>
  );
};

export default DirectorForm;
