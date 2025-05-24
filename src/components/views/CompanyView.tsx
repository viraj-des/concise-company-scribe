
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit } from "lucide-react";
import { Company } from "@/types";
import { format } from "date-fns";

interface CompanyViewProps {
  company: Company;
  onBack: () => void;
  onEdit: () => void;
}

const CompanyView = ({ company, onBack, onEdit }: CompanyViewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="outline" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
          <h1 className="text-2xl font-bold">{company.name || "Unnamed Company"}</h1>
        </div>
        <Button onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Company
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>CIN:</strong> {company.cin}</div>
            <div><strong>Status:</strong> {company.status}</div>
            <div><strong>Class:</strong> {company.class}</div>
            <div><strong>Category:</strong> {company.category}</div>
            <div><strong>Sub Category:</strong> {company.subCategory}</div>
            <div><strong>Date of Incorporation:</strong> {company.dateOfIncorporation ? format(new Date(company.dateOfIncorporation), "PPP") : "N/A"}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Registered Office:</strong> {company.registeredOfficeAddress}</div>
            <div><strong>Email:</strong> {company.emailId}</div>
            <div><strong>Website:</strong> {company.website}</div>
            <div><strong>Phone:</strong> {company.phoneNumber}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Authorized Capital:</strong> ₹{company.authorizedCapital?.toLocaleString()}</div>
            <div><strong>Paid Up Capital:</strong> ₹{company.paidUpCapital?.toLocaleString()}</div>
            <div><strong>Annual Turnover:</strong> ₹{company.annualTurnover?.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Main Activity:</strong> {company.mainActivity}</div>
            <div><strong>Sub Activity:</strong> {company.subActivity}</div>
            <div><strong>Business Activity:</strong> {company.businessActivity}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyView;
