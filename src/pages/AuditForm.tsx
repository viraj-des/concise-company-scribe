
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "@/components/common/Stepper";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import AuditFormStep1 from "@/components/forms/audit/AuditFormStep1";
import AuditFormStep2 from "@/components/forms/audit/AuditFormStep2";
import { database } from "@/services/database";

const steps = [
  "Auditor Information",
  "Financial Information"
];

interface AuditData {
  auditorType?: string;
  auditorName?: string;
  address?: string;
  pinCode?: string;
  country?: string;
  state?: string;
  city?: string;
  appointmentDate?: string;
  cessationDate?: string;
  cessationType?: string;
  firmRegistrationNumber?: string;
  membershipNumber?: string;
  durationOfAppointment?: string;
  panOfFirm?: string;
  panOfSigningPartner?: string;
  emailId?: string;
  phoneNumber?: string;
  srnOfAdt?: string;
  modeOfAppointment?: string;
  attendedAgm?: boolean;
  branchOfficeAddress?: string;
  startDate?: string;
  endDate?: string;
  paidUpCapital?: string;
  reservesAndSurplus?: string;
  netWorth?: string;
  netProfit?: string;
  amountOfBorrowing?: string;
  turnover?: string;
}

const AuditForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AuditData>({});

  const handleNext = (data: Partial<AuditData>) => {
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

  const handleSubmit = (data: AuditData) => {
    console.log("Submitting audit data:", data);
    // Save to database
    database.createAudit(data);
    navigate("/audits");
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Add Audit Information</h1>

      <Card className="p-6 mb-6">
        <Stepper steps={steps} currentStep={currentStep} />
      </Card>

      {currentStep === 1 && (
        <AuditFormStep1 onNext={handleNext} defaultValues={formData} />
      )}

      {currentStep === 2 && (
        <AuditFormStep2 
          onNext={handleNext}
          onBack={handleBack}
          defaultValues={formData} 
        />
      )}
    </DashboardLayout>
  );
};

export default AuditForm;
