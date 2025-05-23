
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
  Users,
  Calendar, 
  Edit, 
  Eye, 
  Plus, 
  Search,
  Trash
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShareCapitalMember } from "@/types";
import { database } from "@/services/database";
import { format } from "date-fns";

const ShareCapitalMemberList = () => {
  const [members, setMembers] = useState<ShareCapitalMember[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load share capital members from database
    const loadMembers = () => {
      const data = database.getShareCapitalMembers();
      setMembers(data);
    };

    loadMembers();
  }, []);

  // Filter members based on search term
  const filteredMembers = members.filter(
    (member) => 
      member.memberDetails?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.memberDetails?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${member.memberDetails?.firstName || ""} ${member.memberDetails?.lastName || ""}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteMember = (id: string) => {
    if (window.confirm("Are you sure you want to delete this share capital member?")) {
      database.deleteShareCapitalMember(id);
      setMembers(database.getShareCapitalMembers());
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Share Capital Members</h1>
        <Link to="/share-capital-members/add">
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Add Member
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Share Capital Member Registry</CardTitle>
          <div className="flex items-center mt-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search members..." 
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
                <TableHead>Member Name</TableHead>
                <TableHead>Type of Capital</TableHead>
                <TableHead>Number of Shares</TableHead>
                <TableHead>Member Since</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-primary" />
                        {member.memberDetails?.prefix} {member.memberDetails?.firstName} {member.memberDetails?.middleName} {member.memberDetails?.lastName}
                      </div>
                    </TableCell>
                    <TableCell>{member.authorizedCapital?.capitalType}</TableCell>
                    <TableCell>{member.equityDetails?.totalShares || 0}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        {member.equityDetails?.dateOfBecomingMember ? 
                          format(new Date(member.equityDetails.dateOfBecomingMember), "PPP") : 
                          "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>{member.memberDetails?.status}</TableCell>
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
                          onClick={() => handleDeleteMember(member.id || "")}
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
                    No share capital members found. Add a new member to get started.
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

export default ShareCapitalMemberList;
