
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { database } from "@/services/database";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ShareCapitalMemberView from "@/components/views/ShareCapitalMemberView";
import ShareCapitalMemberEdit from "@/components/views/ShareCapitalMemberEdit";
import { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

// Use Supabase types directly
type ShareCapitalMemberRow = Database['public']['Tables']['share_capital_members']['Row'];

const ShareCapitalMemberList = () => {
  const [members, setMembers] = useState<ShareCapitalMemberRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMember, setViewMember] = useState<ShareCapitalMemberRow | null>(null);
  const [editMember, setEditMember] = useState<ShareCapitalMemberRow | null>(null);
  const [deleteMemberId, setDeleteMemberId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    setIsLoading(true);
    try {
      const membersData = await database.getShareCapitalMembers();
      setMembers(membersData);
    } catch (error) {
      console.error("Error loading share capital members:", error);
      toast.error("Failed to load members");
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (member: ShareCapitalMemberRow) => {
    setViewMember(member);
  };

  const handleEdit = (member: ShareCapitalMemberRow) => {
    setEditMember(member);
  };

  const handleDelete = (id: string) => {
    setDeleteMemberId(id);
  };

  const confirmDelete = async () => {
    if (deleteMemberId) {
      try {
        await database.deleteShareCapitalMember(deleteMemberId);
        loadMembers();
        toast.success("Member deleted successfully");
      } catch (error) {
        console.error("Error deleting member:", error);
        toast.error("Failed to delete member");
      } finally {
        setDeleteMemberId(null);
      }
    }
  };

  const cancelDelete = () => {
    setDeleteMemberId(null);
  };

  const closeViewModal = () => {
    setViewMember(null);
  };

  const closeEditModal = () => {
    setEditMember(null);
    loadMembers();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Share Capital Members</h1>
          <Button onClick={() => navigate("/share-capital-members/add")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Member List</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : members.length === 0 ? (
              <div className="text-center text-gray-500">
                No members found. <Button variant="link" onClick={() => navigate("/share-capital-members/add")}>Add your first member</Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Category</th>
                      <th className="text-left p-2">Shares Held</th>
                      <th className="text-left p-2">Holding %</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => (
                      <tr key={member.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{member.name}</td>
                        <td className="p-2">{member.category}</td>
                        <td className="p-2">{member.shares_held}</td>
                        <td className="p-2">{member.holding_percentage}%</td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleView(member)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(member)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(member.id!)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View Member Modal */}
      <Dialog open={!!viewMember} onOpenChange={() => setViewMember(null)}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Member Details</DialogTitle>
          </DialogHeader>
          {viewMember && (
            <ShareCapitalMemberView
              member={viewMember}
              onBack={closeViewModal}
              onEdit={() => {
                closeViewModal();
                handleEdit(viewMember);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Member Modal */}
      <Dialog open={!!editMember} onOpenChange={() => setEditMember(null)}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>
          {editMember && (
            <ShareCapitalMemberEdit
              member={editMember}
              onBack={closeEditModal}
              onSave={closeEditModal}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteMemberId} onOpenChange={() => setDeleteMemberId(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this member? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ShareCapitalMemberList;
