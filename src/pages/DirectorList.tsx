
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, Edit, Trash, Eye, Users } from "lucide-react";
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
import { Director } from "@/types";
import DirectorView from "@/components/views/DirectorView";

const DirectorList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'view'>('list');
  const directors = database.getDirectors() || [];

  const filteredDirectors = directors.filter((director) => {
    const fullName = `${director.firstName || ""} ${director.middleName || ""} ${director.lastName || ""}`.toLowerCase();
    const searchable = fullName + (director.din || "") + (director.emailId || "");
    return searchable.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this director?")) {
      database.deleteDirector(id);
      navigate("/directors");
    }
  };

  const handleViewDirector = (director: Director) => {
    setSelectedDirector(director);
    setViewMode('view');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedDirector(null);
  };

  if (viewMode === 'view' && selectedDirector) {
    return (
      <DashboardLayout>
        <DirectorView 
          director={selectedDirector} 
          onBack={handleBackToList}
          onEdit={() => navigate(`/directors/edit/${selectedDirector.id}`)}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Directors</h1>
        <Button asChild>
          <Link to="/directors/add">
            <Plus className="mr-2 h-4 w-4" /> Add New Director
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Director Registry</CardTitle>
          <div className="flex">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search directors..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredDirectors.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Director Name</TableHead>
                    <TableHead>DIN</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDirectors.map((director) => (
                    <TableRow key={director.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-primary" />
                          {director.prefix} {director.firstName} {director.middleName} {director.lastName}
                        </div>
                      </TableCell>
                      <TableCell>{director.din}</TableCell>
                      <TableCell>{director.designation}</TableCell>
                      <TableCell>{director.emailId}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleViewDirector(director)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => navigate(`/directors/edit/${director.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(director.id!)}
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
              {searchTerm ? "No directors found matching your search" : "No directors found. Add your first director."}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DirectorList;
