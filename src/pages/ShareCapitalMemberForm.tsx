
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "@/components/common/Stepper";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { database } from "@/services/database";
import { useCompany } from "@/contexts/CompanyContext";
import { toast } from "sonner";
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

interface ShareCapitalMemberFormData {
  name?: string;
  category?: string;
  pan?: string;
  din?: string;
  aadhar?: string;
  nationality?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pin_code?: string;
  email?: string;
  phone_number?: string;
  folio_number?: string;
  shares_held?: number;
  share_type?: string;
  face_value?: number;
  holding_percentage?: number;
  // Additional fields for the form steps
  authorizedCapital?: any;
  issuedCapital?: any;
  subscribedCapital?: any;
  calledUpCapital?: any;
  paidUpCapital?: any;
  memberDetails?: any;
  equityDetails?: any;
  preferenceDetails?: any;
}

const ShareCapitalMemberForm = () => {
  const navigate = useNavigate();
  const { selectedCompany } = useCompany();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ShareCapitalMemberFormData>({});

  const handleNext = (data: Partial<ShareCapitalMemberFormData>) => {
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

  const handleSubmit = async (data: ShareCapitalMemberFormData) => {
    console.log("Submitting share capital member data:", data);
    
    if (!selectedCompany) {
      toast.error("Please select a company first");
      return;
    }

    try {
      // Transform data to match database schema - extract member details
      const memberData = {
        company_id: selectedCompany.id,
        name: data.memberDetails?.name || data.name || '',
        category: data.memberDetails?.category || data.category,
        pan: data.memberDetails?.pan || data.pan,
        din: data.memberDetails?.din || data.din,
        aadhar: data.memberDetails?.aadhar || data.aadhar,
        nationality: data.memberDetails?.nationality || data.nationality,
        address: data.memberDetails?.address || data.address,
        city: data.memberDetails?.city || data.city,
        state: data.memberDetails?.state || data.state,
        country: data.memberDetails?.country || data.country,
        pin_code: data.memberDetails?.pinCode || data.pin_code,
        email: data.memberDetails?.email || data.email,
        phone_number: data.memberDetails?.phoneNumber || data.phone_number,
        folio_number: data.memberDetails?.folioNumber || data.folio_number,
        shares_held: data.equityDetails?.sharesHeld || data.shares_held || 0,
        share_type: data.equityDetails?.shareType || data.share_type,
        face_value: data.equityDetails?.faceValue || data.face_value,
        holding_percentage: data.equityDetails?.holdingPercentage || data.holding_percentage,
      };

      await database.createShareCapitalMember(memberData);
      navigate("/share-capital-members");
    } catch (error) {
      console.error("Error creating share capital member:", error);
      toast.error("Failed to create share capital member");
    }
  };

  if (!selectedCompany) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold mb-4">No Company Selected</h1>
          <p className="text-muted-foreground">Please select a company from the header dropdown to add a share capital member.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-2">Add Share Capital Member</h1>
      <p className="text-muted-foreground mb-6">Adding member to: {selectedCompany.name}</p>

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
