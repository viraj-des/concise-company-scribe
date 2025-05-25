
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
            <div><strong>Class:</strong> {company.class}</div>
            <div><strong>Category:</strong> {company.category}</div>
            <div><strong>Sub Category:</strong> {company.subcategory}</div>
            <div><strong>Date of Incorporation:</strong> {company.incorpDate ? format(new Date(company.incorpDate), "PPP") : "N/A"}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Registered Office:</strong> {company.regAddress}</div>
            <div><strong>Email:</strong> {company.email}</div>
            <div><strong>Website:</strong> {company.website}</div>
            <div><strong>Phone:</strong> {company.phoneNumber}</div>
            <div><strong>Country:</strong> {company.country}</div>
            <div><strong>State:</strong> {company.state}</div>
            <div><strong>City:</strong> {company.city}</div>
            <div><strong>PIN Code:</strong> {company.pinCode}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Registration Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>PAN:</strong> {company.registrations?.pan}</div>
            <div><strong>TAN:</strong> {company.registrations?.tan}</div>
            <div><strong>GST:</strong> {company.registrations?.gst}</div>
            <div><strong>ROC Jurisdiction:</strong> {company.rocJurisdiction}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Actual Business Activity:</strong> {company.actualBusinessActivity}</div>
            <div><strong>Financial Year Start:</strong> {company.fyStart}</div>
            <div><strong>Financial Year End:</strong> {company.fyEnd}</div>
          </CardContent>
        </Card>

        {company.branches && company.branches.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Branches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {company.branches.map((branch, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded">
                    <div><strong>Address:</strong> {branch.address}</div>
                    <div><strong>RD Jurisdiction:</strong> {branch.rdJurisdiction}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {company.corporateRelations && company.corporateRelations.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Corporate Relations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {company.corporateRelations.map((relation, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded">
                    <div><strong>Type:</strong> {relation.type}</div>
                    <div><strong>Name:</strong> {relation.name}</div>
                    <div><strong>CIN:</strong> {relation.cin}</div>
                    <div><strong>Percentage:</strong> {relation.percentage}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompanyView;
