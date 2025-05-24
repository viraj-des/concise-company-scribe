
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "@/components/common/Stepper";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import CompanyFormStep1 from "@/components/forms/company/CompanyFormStep1";
import CompanyFormStep2 from "@/components/forms/company/CompanyFormStep2";
import CompanyFormStep3Statutory from "@/components/forms/company/CompanyFormStep3Statutory";
import CompanyFormStep4Financial from "@/components/forms/company/CompanyFormStep4Financial";
import CompanyFormStep3 from "@/components/forms/company/CompanyFormStep3";
import CompanyFormStep4 from "@/components/forms/company/CompanyFormStep4";
import CompanyFormStep5 from "@/components/forms/company/CompanyFormStep5";
import { Card } from "@/components/ui/card";
import { CompanyFormData } from "@/types/company";
import { database } from "@/services/database";

const steps = [
  "Basic Info",
  "Address & Contact", 
  "Statutory IDs",
  "Financial Info",
  "Branches",
  "Corporate Relations",
  "Registrations",
];

const CompanyForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CompanyFormData>>({});

  const handleNext = (data: Partial<CompanyFormData>) => {
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

  const handleSubmit = (data: Partial<CompanyFormData>) => {
    console.log("Submitting company data:", data);
    
    // Transform the comprehensive form data to match the existing Company interface
    const companyData = {
      cin: data.cin || "",
      coiUrl: data.coiUrl || "",
      website: data.website || "",
      name: data.name || "",
      incorpDate: data.incorpDate || "",
      category: data.category || "",
      class: data.class || "",
      subcategory: data.subcategory || "",
      phoneNumber: data.phoneNumber || "",
      email: data.email || "",
      fyStart: data.fyStart || "",
      fyEnd: data.fyEnd || "",
      regAddress: data.regAddress || "",
      addressProofUrl: data.addressProofUrl || "",
      country: data.country || "",
      state: data.state || "",
      city: data.city || "",
      pinCode: data.pinCode || "",
      rocJurisdiction: data.rocJurisdiction || "",
      branches: data.branches || [],
      corporateRelations: data.corporateRelations || [],
      registrations: {
        pan: data.pan || "",
        tan: data.tan || "",
        // Add other registration fields as needed
      },
      actualBusinessActivity: data.actualBusinessActivity || "",
      alternateBooksAddress: data.alternateBooksAddress || "",
    };
    
    // Save to database
    database.createCompany(companyData);
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
        <CompanyFormStep3Statutory
          onNext={handleNext}
          onBack={handleBack}
          defaultValues={formData}
        />
      )}

      {currentStep === 4 && (
        <CompanyFormStep4Financial
          onNext={handleNext}
          onBack={handleBack}
          defaultValues={formData}
        />
      )}

      {currentStep === 5 && (
        <CompanyFormStep3
          onNext={handleNext}
          onBack={handleBack}
          defaultValues={formData}
        />
      )}

      {currentStep === 6 && (
        <CompanyFormStep4
          onNext={handleNext}
          onBack={handleBack} 
          defaultValues={formData}
        />
      )}

      {currentStep === 7 && (
        <CompanyFormStep5
          onNext={(formStepData) => {
            const registrationData = {
              registrations: {
                pan: formStepData.pan,
                panFileUrl: formStepData.panFileUrl,
                tan: formStepData.tan,
                tanFileUrl: formStepData.tanFileUrl,
                esic: formStepData.esic,
                esicFileUrl: formStepData.esicFileUrl,
                epf: formStepData.epf,
                epfFileUrl: formStepData.epfFileUrl,
                pt: formStepData.pt,
                ptFileUrl: formStepData.ptFileUrl,
                gst: formStepData.gst,
                gstFileUrl: formStepData.gstFileUrl,
                isin: formStepData.isin,
                isinFileUrl: formStepData.isinFileUrl,
              }
            };
            handleNext(registrationData);
          }}
          onBack={handleBack}
          defaultValues={{
            pan: formData.pan || "",
            panFileUrl: formData.registrations?.panFileUrl || "",
            tan: formData.tan || "",
            tanFileUrl: formData.registrations?.tanFileUrl || "",
            esic: formData.registrations?.esic || "",
            esicFileUrl: formData.registrations?.esicFileUrl || "",
            epf: formData.registrations?.epf || "",
            epfFileUrl: formData.registrations?.epfFileUrl || "",
            pt: formData.registrations?.pt || "",
            ptFileUrl: formData.registrations?.ptFileUrl || "",
            gst: formData.registrations?.gst || "",
            gstFileUrl: formData.registrations?.gstFileUrl || "",
            isin: formData.registrations?.isin || "",
            isinFileUrl: formData.registrations?.isinFileUrl || "",
          }}
        />
      )}
    </DashboardLayout>
  );
};

export default CompanyForm;
