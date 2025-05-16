
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
import { database } from "@/services/database";

const DirectorList = () => {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load directors from database
    const loadDirectors = () => {
      const data = database.getDirectors();
      setDirectors(data);
    };

    loadDirectors();
  }, []);

  // Filter directors based on search term
  const filteredDirectors = directors.filter(
    (director) => 
      director.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      director.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      director.din.includes(searchTerm)
  );

  const handleDeleteDirector = (id: string) => {
    if (window.confirm("Are you sure you want to delete this director?")) {
      database.deleteDirector(id);
      setDirectors(database.getDirectors());
    }
  };

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
                <TableHead>Name</TableHead>
                <TableHead>DIN</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Appointment Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDirectors.length > 0 ? (
                filteredDirectors.map((director) => (
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
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleDeleteDirector(director.id || "")}
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
                    No directors found. Add a new director to get started.
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

export default DirectorList;
