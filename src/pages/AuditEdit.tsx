
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import { database } from "@/services/database";
import { toast } from "sonner";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const AuditEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadAudit();
    }
  }, [id]);

  const loadAudit = async () => {
    if (!id) return;
    
    try {
      const audit = await database.getAuditById(id);
      if (audit) {
        setFormData(audit);
      } else {
        toast.error("Audit not found");
        navigate("/audits");
      }
    } catch (error) {
      console.error("Error loading audit:", error);
      toast.error("Failed to load audit");
      navigate("/audits");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!id) return;
    
    try {
      await database.updateAudit(id, formData);
      toast.success("Audit updated successfully");
      navigate("/audits");
    } catch (error) {
      console.error("Error updating audit:", error);
      toast.error("Failed to update audit");
    }
  };

  const handleBack = () => {
    navigate("/audits");
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-center">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="outline" onClick={handleBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Edit Audit</h1>
          </div>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Auditor Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="auditorName">Auditor Name</Label>
                <Input
                  id="auditorName"
                  value={formData.auditor_name || ''}
                  onChange={(e) => handleInputChange('auditor_name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="auditorType">Auditor Type</Label>
                <Input
                  id="auditorType"
                  value={formData.auditor_type || ''}
                  onChange={(e) => handleInputChange('auditor_type', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="firmRegistrationNumber">Firm Registration Number</Label>
                <Input
                  id="firmRegistrationNumber"
                  value={formData.firm_registration_number || ''}
                  onChange={(e) => handleInputChange('firm_registration_number', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="emailId">Email</Label>
                <Input
                  id="emailId"
                  type="email"
                  value={formData.email_id || ''}
                  onChange={(e) => handleInputChange('email_id', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phone_number || ''}
                  onChange={(e) => handleInputChange('phone_number', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city || ''}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state || ''}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AuditEdit;
