
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import { database } from "@/services/database";
import { toast } from "sonner";

// Use Supabase types
type DirectorRow = {
  id: string;
  first_name: string;
  last_name: string;
  din: string | null;
  email: string | null;
  phone_number: string | null;
  designation: string | null;
  nationality: string | null;
  occupation: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  pin_code: string | null;
  [key: string]: any;
};

interface DirectorEditProps {
  director: DirectorRow;
  onBack: () => void;
  onSave: () => void;
}

const DirectorEdit = ({ director, onBack, onSave }: DirectorEditProps) => {
  const [formData, setFormData] = useState<DirectorRow>(director);

  const handleInputChange = (field: keyof DirectorRow, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      await database.updateDirector(formData.id!, formData);
      toast.success("Director updated successfully");
      onSave();
    } catch (error) {
      console.error("Error updating director:", error);
      toast.error("Failed to update director");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="outline" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Edit Director</h1>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.first_name || ''}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.last_name || ''}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="din">DIN</Label>
              <Input
                id="din"
                value={formData.din || ''}
                onChange={(e) => handleInputChange('din', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                value={formData.designation || ''}
                onChange={(e) => handleInputChange('designation', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={formData.phone_number || ''}
                onChange={(e) => handleInputChange('phone_number', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                value={formData.nationality || ''}
                onChange={(e) => handleInputChange('nationality', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                value={formData.occupation || ''}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DirectorEdit;
