
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
  Trash,
  Network,
  Database
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { database } from "@/services/database";
import ShareCapitalMemberView from "@/components/views/ShareCapitalMemberView";
import ShareCapitalMemberEdit from "@/components/views/ShareCapitalMemberEdit";
import HierarchyView from "@/components/views/HierarchyView";
import { Database as SupabaseDatabase } from "@/integrations/supabase/types";

type ShareCapitalMemberRow = SupabaseDatabase['public']['Tables']['share_capital_members']['Row'];

const ShareCapitalMemberList = () => {
  const [members, setMembers] = useState<ShareCapitalMemberRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<ShareCapitalMemberRow | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'view' | 'edit' | 'hierarchy'>('list');

  useEffect(() => {
    // Load share capital members from database
    const loadMembers = async () => {
      try {
        const data = await database.getShareCapitalMembers();
        setMembers(data);
      } catch (error) {
        console.error("Error loading share capital members:", error);
      }
    };

    loadMembers();
  }, []);

  // Filter members based on search term
  const filteredMembers = members.filter(
    (member) => 
      member.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteMember = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this share capital member?")) {
      try {
        await database.deleteShareCapitalMember(id);
        const updatedMembers = await database.getShareCapitalMembers();
        setMembers(updatedMembers);
      } catch (error) {
        console.error("Error deleting share capital member:", error);
      }
    }
  };

  const handleViewMember = (member: ShareCapitalMemberRow) => {
    setSelectedMember(member);
    setViewMode('view');
  };

  const handleEditMember = (member: ShareCapitalMemberRow) => {
    setSelectedMember(member);
    setViewMode('edit');
  };

  const handleBackToList = async () => {
    setViewMode('list');
    setSelectedMember(null);
    // Reload members to get any updates
    try {
      const updatedMembers = await database.getShareCapitalMembers();
      setMembers(updatedMembers);
    } catch (error) {
      console.error("Error reloading share capital members:", error);
    }
  };

  const handleShowHierarchy = () => {
    setViewMode('hierarchy');
  };

  const handleLoadSampleData = async () => {
    try {
      await database.loadSampleData();
      // Reload members to get sample data
      const updatedMembers = await database.getShareCapitalMembers();
      setMembers(updatedMembers);
    } catch (error) {
      console.error("Error loading sample data:", error);
    }
  };

  if (viewMode === 'view' && selectedMember) {
    return (
      <DashboardLayout>
        <ShareCapitalMemberView 
          member={selectedMember} 
          onBack={handleBackToList}
          onEdit={() => handleEditMember(selectedMember)}
        />
      </DashboardLayout>
    );
  }

  if (viewMode === 'edit' && selectedMember) {
    return (
      <DashboardLayout>
        <ShareCapitalMemberEdit 
          member={selectedMember} 
          onBack={handleBackToList}
          onSave={handleBackToList}
        />
      </DashboardLayout>
    );
  }

  if (viewMode === 'hierarchy') {
    return (
      <DashboardLayout>
        <HierarchyView onBack={handleBackToList} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Share Capital Members</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleLoadSampleData} className="flex items-center">
            <Database className="mr-2 h-4 w-4" /> Load Sample Data
          </Button>
          <Button variant="outline" onClick={handleShowHierarchy} className="flex items-center">
            <Network className="mr-2 h-4 w-4" /> Hierarchy View
          </Button>
          <Link to="/share-capital-members/add">
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" /> Add Member
            </Button>
          </Link>
        </div>
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
                <TableHead>Share Type</TableHead>
                <TableHead>Shares Held</TableHead>
                <TableHead>Holding %</TableHead>
                <TableHead>Category</TableHead>
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
                        {member.name}
                      </div>
                    </TableCell>
                    <TableCell>{member.share_type}</TableCell>
                    <TableCell>{member.shares_held || 0}</TableCell>
                    <TableCell>{member.holding_percentage || 0}%</TableCell>
                    <TableCell>{member.category}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleViewMember(member)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleEditMember(member)}
                        >
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
