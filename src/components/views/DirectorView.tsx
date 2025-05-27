
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit } from "lucide-react";
import { Director } from "@/types";
import { format } from "date-fns";

interface DirectorViewProps {
  director: Director;
  onBack: () => void;
  onEdit: () => void;
}

const DirectorView = ({ director, onBack, onEdit }: DirectorViewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="outline" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
          <h1 className="text-2xl font-bold">
            {director.prefix} {director.first_name} {director.middle_name} {director.last_name}
          </h1>
        </div>
        <Button onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Director
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>DIN:</strong> {director.din}</div>
            <div><strong>Father's Name:</strong> {director.father_name}</div>
            <div><strong>Date of Birth:</strong> {director.date_of_birth ? format(new Date(director.date_of_birth), "PPP") : "N/A"}</div>
            <div><strong>Nationality:</strong> {director.nationality}</div>
            <div><strong>Occupation:</strong> {director.occupation}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Email:</strong> {director.email}</div>
            <div><strong>Phone:</strong> {director.phone_number}</div>
            <div><strong>Present Address:</strong> {director.present_address}</div>
            {!director.is_permanent_same_as_present && director.permanent_address && (
              <div><strong>Permanent Address:</strong> {director.permanent_address}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Identification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>PAN:</strong> {director.pan}</div>
            <div><strong>Driving License:</strong> {director.driving_license}</div>
            <div><strong>Passport:</strong> {director.passport}</div>
            <div><strong>Aadhar:</strong> {director.aadhar}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Designation:</strong> {director.designation}</div>
            <div><strong>Category:</strong> {director.designation_category}</div>
            <div><strong>Subcategory:</strong> {director.designation_subcategory}</div>
            <div><strong>Date of Appointment:</strong> {director.date_of_appointment ? format(new Date(director.date_of_appointment), "PPP") : "N/A"}</div>
            {director.date_of_cessation && (
              <div><strong>Date of Cessation:</strong> {format(new Date(director.date_of_cessation), "PPP")}</div>
            )}
          </CardContent>
        </Card>

        {director.companies && director.companies.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Company Associations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {director.companies.map((company, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded">
                    <div><strong>Company:</strong> {company.name}</div>
                    <div><strong>CIN:</strong> {company.cin}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {director.has_interest_in_other_entities && director.other_entities && director.other_entities.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Other Entity Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {director.other_entities.map((entity, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded">
                    <div><strong>Entity:</strong> {entity.entity_name}</div>
                    <div><strong>Registration Number:</strong> {entity.registration_number}</div>
                    <div><strong>Designation:</strong> {entity.designation}</div>
                    <div><strong>Shareholding:</strong> {entity.shareholding_percentage}%</div>
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

export default DirectorView;
