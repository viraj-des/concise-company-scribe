
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, Edit, Trash, Eye, Building } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { database } from "@/services/database";
import { Company } from "@/types";
import CompanyView from "@/components/views/CompanyView";

const CompanyList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'view'>('list');
  const companies = database.getCompanies() || [];

  const filteredCompanies = companies.filter((company) => {
    const searchable = (company.name || "") + (company.cin || "");
    return searchable.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      database.deleteCompany(id);
      navigate("/companies");
    }
  };

  const handleViewCompany = (company: Company) => {
    setSelectedCompany(company);
    setViewMode('view');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedCompany(null);
  };

  if (viewMode === 'view' && selectedCompany) {
    return (
      <DashboardLayout>
        <CompanyView 
          company={selectedCompany} 
          onBack={handleBackToList}
          onEdit={() => navigate(`/companies/edit/${selectedCompany.id}`)}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Companies</h1>
        <Button asChild>
          <Link to="/companies/add">
            <Plus className="mr-2 h-4 w-4" /> Add New Company
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Registry</CardTitle>
          <div className="flex">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
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
          {filteredCompanies.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>CIN</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-primary" />
                          {company.name}
                        </div>
                      </TableCell>
                      <TableCell>{company.cin}</TableCell>
                      <TableCell>{company.status}</TableCell>
                      <TableCell>{company.category}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleViewCompany(company)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => navigate(`/companies/edit/${company.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(company.id!)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-4">
              {searchTerm ? "No companies found matching your search" : "No companies found. Add your first company."}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default CompanyList;
