
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
  Building, 
  Calendar, 
  Edit, 
  Eye, 
  Plus, 
  Search,
  Trash
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Company } from "@/types";

// Mock companies data
const mockCompanies: Company[] = [
  {
    id: "1",
    name: "ABC Enterprises Pvt Ltd",
    cin: "U12345MH2020PTC123456",
    incorpDate: "2020-01-15",
    category: "Private",
    class: "Limited by Shares",
    subcategory: "Non-Government Company",
    fyStart: "04-01",
    fyEnd: "03-31",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    pinCode: "400001",
    rocJurisdiction: "Mumbai",
    branches: [],
    corporateRelations: [],
    registrations: {
      pan: "ABCDE1234F",
      tan: "MUMA12345B"
    }
  },
  {
    id: "2",
    name: "XYZ Corporation Ltd",
    cin: "L67890DL2015PLC987654",
    incorpDate: "2015-06-22",
    category: "Public",
    class: "Limited by Shares",
    subcategory: "Listed Company",
    fyStart: "04-01",
    fyEnd: "03-31",
    country: "India",
    state: "Delhi",
    city: "New Delhi",
    pinCode: "110001",
    rocJurisdiction: "Delhi",
    branches: [],
    corporateRelations: [],
    registrations: {
      pan: "XYZAB5678G",
      tan: "DELA98765C"
    }
  },
  {
    id: "3",
    name: "Global Innovations Ltd",
    cin: "U98765KA2018PTC654321",
    incorpDate: "2018-11-07",
    category: "Private",
    class: "Limited by Shares",
    subcategory: "Non-Government Company",
    fyStart: "04-01",
    fyEnd: "03-31",
    country: "India",
    state: "Karnataka",
    city: "Bangalore",
    pinCode: "560001",
    rocJurisdiction: "Bangalore",
    branches: [],
    corporateRelations: [],
    registrations: {
      pan: "GLBIN1122H",
      tan: "BNGA12345D"
    }
  }
];

const CompanyList = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Companies</h1>
        <Link to="/companies/add">
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Add Company
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Company Registry</CardTitle>
          <div className="flex items-center mt-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search companies..." 
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>CIN</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Incorporation Date</TableHead>
                <TableHead>ROC</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-primary" />
                      {company.name}
                    </div>
                  </TableCell>
                  <TableCell>{company.cin}</TableCell>
                  <TableCell>{company.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      {new Date(company.incorpDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{company.rocJurisdiction}</TableCell>
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

export default CompanyList;
