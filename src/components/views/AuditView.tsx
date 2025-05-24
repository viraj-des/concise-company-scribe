
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit } from "lucide-react";
import { format } from "date-fns";

interface AuditViewProps {
  audit: any;
  onBack: () => void;
  onEdit: () => void;
}

const AuditView = ({ audit, onBack, onEdit }: AuditViewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="outline" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
          <h1 className="text-2xl font-bold">{audit.auditorName || "Audit Record"}</h1>
        </div>
        <Button onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Audit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Auditor Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Auditor Type:</strong> {audit.auditorType}</div>
            <div><strong>Name:</strong> {audit.auditorName}</div>
            <div><strong>Firm Registration:</strong> {audit.firmRegistrationNumber}</div>
            <div><strong>Membership Number:</strong> {audit.membershipNumber}</div>
            <div><strong>Email:</strong> {audit.emailId}</div>
            <div><strong>Phone:</strong> {audit.phoneNumber}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Appointment Date:</strong> {audit.appointmentDate ? format(new Date(audit.appointmentDate), "PPP") : "N/A"}</div>
            {audit.cessationDate && (
              <div><strong>Cessation Date:</strong> {format(new Date(audit.cessationDate), "PPP")}</div>
            )}
            <div><strong>Duration:</strong> {audit.duration}</div>
            <div><strong>Mode of Appointment:</strong> {audit.modeOfAppointment}</div>
            <div><strong>SRN of ADT:</strong> {audit.srnOfAdt}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Address & Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Address:</strong> {audit.address}</div>
            <div><strong>City:</strong> {audit.city}</div>
            <div><strong>State:</strong> {audit.state}</div>
            <div><strong>Country:</strong> {audit.country}</div>
            <div><strong>PIN Code:</strong> {audit.pinCode}</div>
            <div><strong>PAN of Firm:</strong> {audit.panOfFirm}</div>
            <div><strong>PAN of Signing Partner:</strong> {audit.panOfSigningPartner}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Paid-Up Capital:</strong> ₹{audit.paidUpCapital?.toLocaleString()}</div>
            <div><strong>Reserves & Surplus:</strong> ₹{audit.reservesAndSurplus?.toLocaleString()}</div>
            <div><strong>Net Worth:</strong> ₹{audit.netWorth?.toLocaleString()}</div>
            <div><strong>Net Profit/Loss:</strong> ₹{audit.netProfitLoss?.toLocaleString()}</div>
            <div><strong>Borrowing Amount:</strong> ₹{audit.amountOfBorrowing?.toLocaleString()}</div>
            <div><strong>Turnover:</strong> ₹{audit.turnover?.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuditView;
