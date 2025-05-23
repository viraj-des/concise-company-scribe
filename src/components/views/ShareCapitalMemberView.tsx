
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit } from "lucide-react";
import { ShareCapitalMember } from "@/types";
import { format } from "date-fns";

interface ShareCapitalMemberViewProps {
  member: ShareCapitalMember;
  onBack: () => void;
  onEdit: () => void;
}

const ShareCapitalMemberView = ({ member, onBack, onEdit }: ShareCapitalMemberViewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="outline" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
          <h1 className="text-2xl font-bold">
            {member.memberDetails?.prefix} {member.memberDetails?.firstName} {member.memberDetails?.middleName} {member.memberDetails?.lastName}
          </h1>
        </div>
        <Button onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Member Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Status:</strong> {member.memberDetails?.status}</div>
            <div><strong>Email:</strong> {member.memberDetails?.email}</div>
            <div><strong>Phone:</strong> {member.memberDetails?.phoneNumber}</div>
            <div><strong>Address:</strong> {member.memberDetails?.address}</div>
            <div><strong>PAN:</strong> {member.memberDetails?.pan}</div>
            <div><strong>Nationality:</strong> {member.memberDetails?.nationality}</div>
            <div><strong>Occupation:</strong> {member.memberDetails?.occupation}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Authorized Capital</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Capital Type:</strong> {member.authorizedCapital?.capitalType}</div>
            <div><strong>Number of Shares:</strong> {member.authorizedCapital?.numberOfShares}</div>
            <div><strong>Nominal Value:</strong> {member.authorizedCapital?.nominalValuePerShare}</div>
            <div><strong>Nominal Amount:</strong> {member.authorizedCapital?.nominalAmount}</div>
            <div><strong>Date:</strong> {member.authorizedCapital?.date ? format(new Date(member.authorizedCapital.date), "PPP") : "N/A"}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Equity Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Total Shares:</strong> {member.equityDetails?.totalShares || 0}</div>
            <div><strong>Date of Becoming Member:</strong> {member.equityDetails?.dateOfBecomingMember ? format(new Date(member.equityDetails.dateOfBecomingMember), "PPP") : "N/A"}</div>
            <div><strong>Physical Form:</strong> {member.equityDetails?.physicalForm}</div>
            <div><strong>Demat Form:</strong> {member.equityDetails?.dematForm}</div>
            <div><strong>Folio Number:</strong> {member.equityDetails?.folioNumberDpIdClientId}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paid Up Capital</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Capital Type:</strong> {member.paidUpCapital?.capitalType}</div>
            <div><strong>Number of Shares:</strong> {member.paidUpCapital?.numberOfShares}</div>
            <div><strong>Amount Paid Up:</strong> {member.paidUpCapital?.amountPaidUpPerShare}</div>
            <div><strong>SRN of PAS3:</strong> {member.paidUpCapital?.srnOfPas3}</div>
            <div><strong>Date:</strong> {member.paidUpCapital?.date ? format(new Date(member.paidUpCapital.date), "PPP") : "N/A"}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShareCapitalMemberView;
