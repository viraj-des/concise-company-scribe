
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "@/components/common/Stepper";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import DirectorFormStep1 from "@/components/forms/director/DirectorFormStep1";
import DirectorFormStep2 from "@/components/forms/director/DirectorFormStep2";
import DirectorFormStep3 from "@/components/forms/director/DirectorFormStep3";
import DirectorFormStep4 from "@/components/forms/director/DirectorFormStep4";
import DirectorFormStep5 from "@/components/forms/director/DirectorFormStep5";
import { database } from "@/services/database";
import { useCompany } from "@/contexts/CompanyContext";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

const steps = [
  "Personal Details",
  "Address",
  "Identification",
  "Entity Interests",
  "Company Associations",
];

type DirectorInsert = Database['public']['Tables']['directors']['Insert'];

interface DirectorFormData {
  // Personal Details
  prefix?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  din?: string;
  email?: string;
  phone_number?: string;
  designation?: string;
  nationality?: string;
  occupation?: string;
  date_of_birth?: string;
  date_of_appointment?: string;
  date_of_cessation?: string;
  
  // Address
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pin_code?: string;
  
  // Additional fields
  qualification?: string;
  experience?: string;
  other_directorships?: string;
  has_interest_in_other_entities?: boolean;
  other_entities?: any[];
  companies?: any[];
}

const DirectorForm = () => {
  const navigate = useNavigate();
  const { selectedCompany } = useCompany();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DirectorFormData>({});

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

  const handleSubmit = async (data: DirectorFormData) => {
    console.log("Submitting director data:", data);
    
    if (!selectedCompany) {
      toast.error("Please select a company first");
      return;
    }

    try {
      // Transform data to match database schema
      const directorData: DirectorInsert = {
        ...data,
        company_id: selectedCompany.id,
        // Ensure required fields
        first_name: data.first_name || '',
        last_name: data.last_name || '',
      };

      await database.createDirector(directorData);
      navigate("/directors");
    } catch (error) {
      console.error("Error creating director:", error);
      toast.error("Failed to create director");
    }
  };

  if (!selectedCompany) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold mb-4">No Company Selected</h1>
          <p className="text-muted-foreground">Please select a company from the header dropdown to add a director.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-2">Add New Director</h1>
      <p className="text-muted-foreground mb-6">Adding director to: {selectedCompany.name}</p>

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
