
import { useEffect, useState } from "react";
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
import { database } from "@/services/database";

const CompanyList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load companies from database
    const loadCompanies = () => {
      const data = database.getCompanies();
      setCompanies(data);
    };

    loadCompanies();
  }, []);

  // Filter companies based on search term
  const filteredCompanies = companies.filter(
    (company) => 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.cin.includes(searchTerm)
  );

  const handleDeleteCompany = (id: string) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      database.deleteCompany(id);
      setCompanies(database.getCompanies());
    }
  };

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
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
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleDeleteCompany(company.id || "")}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No companies found. Add a new company to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default CompanyList;
