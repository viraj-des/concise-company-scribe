
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import { ShareCapitalMember } from "@/types";
import { database } from "@/services/database";
import { toast } from "sonner";

interface ShareCapitalMemberEditProps {
  member: ShareCapitalMember;
  onBack: () => void;
  onSave: () => void;
}

const ShareCapitalMemberEdit = ({ member, onBack, onSave }: ShareCapitalMemberEditProps) => {
  const [editedMember, setEditedMember] = useState<ShareCapitalMember>(member);

  const handleSave = () => {
    try {
      database.updateShareCapitalMember(member.id!, editedMember);
      toast.success("Share capital member updated successfully");
      onSave();
    } catch (error) {
      toast.error("Failed to update share capital member");
    }
  };

  const updateMemberDetails = (field: string, value: string) => {
    setEditedMember(prev => ({
      ...prev,
      memberDetails: {
        ...prev.memberDetails!,
        [field]: value
      }
    }));
  };

  const updateEquityDetails = (field: string, value: string | number) => {
    setEditedMember(prev => ({
      ...prev,
      equityDetails: {
        ...prev.equityDetails!,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="outline" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
          <h1 className="text-2xl font-bold">Edit Share Capital Member</h1>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Member Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={editedMember.memberDetails?.firstName || ""}
                onChange={(e) => updateMemberDetails("firstName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={editedMember.memberDetails?.lastName || ""}
                onChange={(e) => updateMemberDetails("lastName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={editedMember.memberDetails?.email || ""}
                onChange={(e) => updateMemberDetails("email", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={editedMember.memberDetails?.phoneNumber || ""}
                onChange={(e) => updateMemberDetails("phoneNumber", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Equity Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="totalShares">Total Shares</Label>
              <Input
                id="totalShares"
                type="number"
                value={editedMember.equityDetails?.totalShares || 0}
                onChange={(e) => updateEquityDetails("totalShares", parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="physicalForm">Physical Form</Label>
              <Input
                id="physicalForm"
                value={editedMember.equityDetails?.physicalForm || ""}
                onChange={(e) => updateEquityDetails("physicalForm", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dematForm">Demat Form</Label>
              <Input
                id="dematForm"
                value={editedMember.equityDetails?.dematForm || ""}
                onChange={(e) => updateEquityDetails("dematForm", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShareCapitalMemberEdit;
