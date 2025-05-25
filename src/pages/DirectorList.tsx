
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  ArrowLeft,
  Save,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Director } from "@/types";
import { database } from "@/services/database";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { toast } from "sonner";
import DirectorView from "@/components/views/DirectorView";
import DirectorEdit from "@/components/views/DirectorEdit";

const DirectorList = () => {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewingDirector, setViewingDirector] = useState<Director | null>(null);
  const [editingDirector, setEditingDirector] = useState<Director | null>(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [directorToDeleteId, setDirectorToDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadDirectors();
  }, []);

  const loadDirectors = () => {
    setIsLoading(true);
    try {
      const data = database.getDirectors();
      setDirectors(data);
    } catch (error) {
      console.error("Error loading directors:", error);
      toast.error("Failed to load directors");
      setDirectors([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (director: Director) => {
    setViewingDirector(director);
  };

  const handleEdit = (director: Director) => {
    setEditingDirector(director);
  };

  const handleDelete = (id: string) => {
    setDirectorToDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (directorToDeleteId) {
      try {
        database.deleteDirector(directorToDeleteId);
        loadDirectors();
        toast.success("Director deleted successfully");
      } catch (error) {
        console.error("Error deleting director:", error);
        toast.error("Failed to delete director");
      } finally {
        setDeleteDialogOpen(false);
        setDirectorToDeleteId(null);
      }
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setDirectorToDeleteId(null);
  };

  const closeModal = () => {
    setViewingDirector(null);
    setEditingDirector(null);
  };

  const getDirectorDisplayName = (director: Director) => {
    return `${director.prefix} ${director.firstName} ${director.middleName || ''} ${director.lastName}`.trim();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Directors</h1>
          <Button onClick={() => navigate("/directors/add")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Director
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Director List</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : directors.length === 0 ? (
              <div className="text-center text-gray-500">
                No directors found. <Button variant="link" onClick={() => navigate("/directors/add")}>Add your first director</Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">DIN</th>
                      <th className="text-left p-2">Designation</th>
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {directors.map((director) => (
                      <tr key={director.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{getDirectorDisplayName(director)}</td>
                        <td className="p-2">{director.din}</td>
                        <td className="p-2">{director.designation}</td>
                        <td className="p-2">{director.email}</td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleView(director)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(director)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(director.id!)}
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

      <Dialog open={viewingDirector !== null} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>View Director</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4"
              onClick={closeModal}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          {viewingDirector && (
            <DirectorView
              director={viewingDirector}
              onBack={closeModal}
              onEdit={() => {
                closeModal();
                handleEdit(viewingDirector);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={editingDirector !== null} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Director</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4"
              onClick={closeModal}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          {editingDirector && (
            <DirectorEdit
              director={editingDirector}
              onBack={closeModal}
              onSave={() => {
                closeModal();
                loadDirectors();
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Director</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this director? This action cannot be undone.
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

export default DirectorList;
