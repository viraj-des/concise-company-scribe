
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "@/components/common/Stepper";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Director } from "@/types";
import { toast } from "sonner";
import DirectorFormStep1 from "@/components/forms/director/DirectorFormStep1";
import DirectorFormStep2 from "@/components/forms/director/DirectorFormStep2";
import DirectorFormStep3 from "@/components/forms/director/DirectorFormStep3";
import DirectorFormStep4 from "@/components/forms/director/DirectorFormStep4";

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
        <Card className="p-6 mt-6">
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold mb-4">Almost Done!</h2>
            <p className="mb-6 text-gray-600">
              Review all the information and submit to create the director.
            </p>
            <div className="flex justify-between mt-6">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700"
                onClick={() => handleSubmit(formData)}
              >
                Submit
              </button>
            </div>
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default DirectorForm;
