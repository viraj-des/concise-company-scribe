
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

// Form data interface that matches the form step schemas (strings for input fields)
interface AuditFormData {
  auditor_name?: string;
  auditor_type?: string;
  firm_registration_number?: string;
  membership_number?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pin_code?: string;
  phone_number?: string;
  email_id?: string;
  pan_of_firm?: string;
  pan_of_signing_partner?: string;
  branch_office_address?: string;
  mode_of_appointment?: string;
  appointment_date?: string;
  duration_of_appointment?: string;
  start_date?: string;
  end_date?: string;
  cessation_date?: string;
  cessation_type?: string;
  srn_of_adt?: string;
  attended_agm?: boolean;
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
        company_id: selectedCompany.id,
        auditor_name: data.auditor_name || null,
        auditor_type: data.auditor_type || null,
        firm_registration_number: data.firm_registration_number || null,
        membership_number: data.membership_number || null,
        address: data.address || null,
        city: data.city || null,
        state: data.state || null,
        country: data.country || null,
        pin_code: data.pin_code || null,
        phone_number: data.phone_number || null,
        email_id: data.email_id || null,
        pan_of_firm: data.pan_of_firm || null,
        pan_of_signing_partner: data.pan_of_signing_partner || null,
        branch_office_address: data.branch_office_address || null,
        mode_of_appointment: data.mode_of_appointment || null,
        appointment_date: data.appointment_date || null,
        duration_of_appointment: data.duration_of_appointment || null,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        cessation_date: data.cessation_date || null,
        cessation_type: data.cessation_type || null,
        srn_of_adt: data.srn_of_adt || null,
        attended_agm: data.attended_agm || null,
        paid_up_capital: data.paid_up_capital ? Number(data.paid_up_capital) : null,
        reserves_and_surplus: data.reserves_and_surplus ? Number(data.reserves_and_surplus) : null,
        net_worth: data.net_worth ? Number(data.net_worth) : null,
        net_profit: data.net_profit ? Number(data.net_profit) : null,
        amount_of_borrowing: data.amount_of_borrowing ? Number(data.amount_of_borrowing) : null,
        turnover: data.turnover ? Number(data.turnover) : null,
      };

      await database.createAudit(auditData);
      toast.success("Audit information created successfully");
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
