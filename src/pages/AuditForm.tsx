
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "@/components/common/Stepper";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import AuditFormStep1 from "@/components/forms/audit/AuditFormStep1";
import AuditFormStep2 from "@/components/forms/audit/AuditFormStep2";
import { database } from "@/services/database";
import { useCompany } from "@/contexts/CompanyContext";
import { toast } from "sonner";

const steps = [
  "Auditor Information",
  "Financial Information"
];

interface AuditFormData {
  auditor_type?: string;
  auditor_name?: string;
  address?: string;
  pin_code?: string;
  country?: string;
  state?: string;
  city?: string;
  appointment_date?: string;
  cessation_date?: string;
  cessation_type?: string;
  firm_registration_number?: string;
  membership_number?: string;
  duration_of_appointment?: string;
  pan_of_firm?: string;
  pan_of_signing_partner?: string;
  email_id?: string;
  phone_number?: string;
  srn_of_adt?: string;
  mode_of_appointment?: string;
  attended_agm?: boolean;
  branch_office_address?: string;
  start_date?: string;
  end_date?: string;
  paid_up_capital?: number;
  reserves_and_surplus?: number;
  net_worth?: number;
  net_profit?: number;
  amount_of_borrowing?: number;
  turnover?: number;
}

const AuditForm = () => {
  const navigate = useNavigate();
  const { selectedCompany } = useCompany();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AuditFormData>({});

  const handleNext = (data: Partial<AuditFormData>) => {
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

  const handleSubmit = async (data: AuditFormData) => {
    console.log("Submitting audit data:", data);
    
    if (!selectedCompany) {
      toast.error("Please select a company first");
      return;
    }

    try {
      const auditData = {
        ...data,
        company_id: selectedCompany.id,
      };

      await database.createAudit(auditData);
      navigate("/audits");
    } catch (error) {
      console.error("Error creating audit:", error);
      toast.error("Failed to create audit");
    }
  };

  if (!selectedCompany) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold mb-4">No Company Selected</h1>
          <p className="text-muted-foreground">Please select a company from the header dropdown to add audit information.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-2">Add Audit Information</h1>
      <p className="text-muted-foreground mb-6">Adding audit for: {selectedCompany.name}</p>

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
