
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "@/components/common/Stepper";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { ShareCapitalMember } from "@/types";
import { database } from "@/services/database";
import ShareCapitalFormStep1 from "@/components/forms/shareCapital/ShareCapitalFormStep1";
import ShareCapitalFormStep2 from "@/components/forms/shareCapital/ShareCapitalFormStep2";
import ShareCapitalFormStep3 from "@/components/forms/shareCapital/ShareCapitalFormStep3";
import ShareCapitalFormStep4 from "@/components/forms/shareCapital/ShareCapitalFormStep4";
import ShareCapitalFormStep5 from "@/components/forms/shareCapital/ShareCapitalFormStep5";
import ShareCapitalFormStep6 from "@/components/forms/shareCapital/ShareCapitalFormStep6";

const steps = [
  "Authorized Capital",
  "Issued Capital",
  "Subscribed Capital",
  "Called Up Capital",
  "Paid Up Capital",
  "Member Details"
];

const ShareCapitalMemberForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ShareCapitalMember>>({});

  const handleNext = (data: Partial<ShareCapitalMember>) => {
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

  const handleSubmit = (data: Partial<ShareCapitalMember>) => {
    console.log("Submitting share capital member data:", data);
    // Save to database
    database.createShareCapitalMember(data);
    navigate("/share-capital-members");
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Add Share Capital Member</h1>

      <Card className="p-6 mb-6">
        <Stepper steps={steps} currentStep={currentStep} />
      </Card>

      {currentStep === 1 && (
        <ShareCapitalFormStep1 onNext={handleNext} defaultValues={formData.authorizedCapital} />
      )}

      {currentStep === 2 && (
        <ShareCapitalFormStep2 
          onNext={handleNext}
          onBack={handleBack}
          defaultValues={formData.issuedCapital} 
        />
      )}

      {currentStep === 3 && (
        <ShareCapitalFormStep3
          onNext={handleNext}
          onBack={handleBack}
          defaultValues={formData.subscribedCapital}
          previousData={formData}
        />
      )}

      {currentStep === 4 && (
        <ShareCapitalFormStep4
          onNext={handleNext}
          onBack={handleBack} 
          defaultValues={formData.calledUpCapital}
          previousData={formData}
        />
      )}

      {currentStep === 5 && (
        <ShareCapitalFormStep5
          onNext={handleNext}
          onBack={handleBack} 
          defaultValues={formData.paidUpCapital}
          previousData={formData}
        />
      )}

      {currentStep === 6 && (
        <ShareCapitalFormStep6
          onNext={handleNext}
          onBack={handleBack} 
          defaultValues={{
            memberDetails: formData.memberDetails || {},
            equityDetails: formData.equityDetails || {},
            preferenceDetails: formData.preferenceDetails || {},
          }}
        />
      )}
    </DashboardLayout>
  );
};

export default ShareCapitalMemberForm;
