
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Edit, 
  Eye, 
  Plus, 
  Search,
  Trash,
  User
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Director } from "@/types";
import { Badge } from "@/components/ui/badge";

// Mock directors data
const mockDirectors: Director[] = [
  {
    id: "1",
    designation: "Managing Director",
    designationCategory: "Professional",
    designationSubcategory: "Executive Director",
    din: "00123456",
    prefix: "Mr",
    firstName: "Rajesh",
    lastName: "Kumar",
    fatherName: "Ramesh Kumar",
    presentAddress: "123 Main Street, Mumbai",
    presentCountry: "India",
    presentState: "Maharashtra",
    presentCity: "Mumbai",
    presentPinCode: "400001",
    isPermanentSameAsPresent: true,
    email: "rajesh.kumar@example.com",
    phoneNumber: "9876543210",
    pan: "ABCPK1234D",
    occupation: "Business",
    dateOfBirth: "1980-05-15",
    nationality: "Indian",
    dateOfAppointment: "2020-01-01",
    hasInterestInOtherEntities: false
  },
  {
    id: "2",
    designation: "Chief Financial Officer",
    designationCategory: "Professional",
    designationSubcategory: "Executive Director",
    din: "00789012",
    prefix: "Mrs",
    firstName: "Priya",
    lastName: "Sharma",
    fatherName: "Vikram Sharma",
    presentAddress: "456 Park Avenue, Delhi",
    presentCountry: "India",
    presentState: "Delhi",
    presentCity: "New Delhi",
    presentPinCode: "110001",
    isPermanentSameAsPresent: true,
    email: "priya.sharma@example.com",
    phoneNumber: "8765432109",
    pan: "DEFPS5678E",
    occupation: "Chartered Accountant",
    dateOfBirth: "1985-08-22",
    nationality: "Indian",
    dateOfAppointment: "2020-02-15",
    hasInterestInOtherEntities: false
  },
  {
    id: "3",
    designation: "Independent Director",
    designationCategory: "Independent",
    designationSubcategory: "Non-Executive Director",
    din: "00345678",
    prefix: "Mr",
    firstName: "Arun",
    lastName: "Patel",
    fatherName: "Suresh Patel",
    presentAddress: "789 Corporate Park, Bangalore",
    presentCountry: "India",
    presentState: "Karnataka",
    presentCity: "Bangalore",
    presentPinCode: "560001",
    isPermanentSameAsPresent: false,
    permanentAddress: "101 Residence Colony, Chennai",
    permanentCountry: "India",
    permanentState: "Tamil Nadu",
    permanentCity: "Chennai",
    permanentPinCode: "600001",
    email: "arun.patel@example.com",
    phoneNumber: "7654321098",
    pan: "GHIAP9012F",
    occupation: "Professor",
    dateOfBirth: "1975-12-10",
    nationality: "Indian",
    dateOfAppointment: "2020-03-20",
    hasInterestInOtherEntities: true,
    otherEntities: [
      {
        entityName: "XYZ Consultants Ltd",
        registrationNumber: "U98765KA2015PTC654321",
        designation: "Director",
        dateOfAppointment: "2018-05-10",
        shareholdingPercentage: 5,
        shareholdingAmount: 500000
      }
    ]
  }
];

const DirectorList = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Directors</h1>
        <Link to="/directors/add">
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Add Director
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Director Registry</CardTitle>
          <div className="flex items-center mt-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search directors..." 
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>DIN</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Appointment Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDirectors.map((director) => (
                <TableRow key={director.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-primary" />
                      {director.prefix} {director.firstName} {director.lastName}
                    </div>
                  </TableCell>
                  <TableCell>{director.din}</TableCell>
                  <TableCell>{director.designation}</TableCell>
                  <TableCell>
                    <Badge variant={
                      director.designationCategory === 'Independent' 
                        ? 'default' 
                        : director.designationCategory === 'Promoter'
                          ? 'secondary'
                          : 'outline'
                    }>
                      {director.designationCategory}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(director.dateOfAppointment).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DirectorList;
