
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
import { Database } from "@/integrations/supabase/types";

const steps = [
  "Auditor Information",
  "Financial Information"
];

type AuditInsert = Database['public']['Tables']['audits']['Insert'];

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
  paid_up_capital?: string;
  reserves_and_surplus?: string;
  net_worth?: string;
  net_profit?: string;
  amount_of_borrowing?: string;
  turnover?: string;
}

const AuditForm = () => {
  const navigate = useNavigate();
  const { selectedCompany } = useCompany();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AuditFormData>({});

  const handleNext = (data: any) => {
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
      // Convert string values to numbers for database
      const auditData: AuditInsert = {
        ...data,
        company_id: selectedCompany.id,
        paid_up_capital: data.paid_up_capital ? Number(data.paid_up_capital) : null,
        reserves_and_surplus: data.reserves_and_surplus ? Number(data.reserves_and_surplus) : null,
        net_worth: data.net_worth ? Number(data.net_worth) : null,
        net_profit: data.net_profit ? Number(data.net_profit) : null,
        amount_of_borrowing: data.amount_of_borrowing ? Number(data.amount_of_borrowing) : null,
        turnover: data.turnover ? Number(data.turnover) : null,
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
