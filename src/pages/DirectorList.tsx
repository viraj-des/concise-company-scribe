
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { database } from "@/services/database";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { toast } from "sonner";
import DirectorView from "@/components/views/DirectorView";
import DirectorEdit from "@/components/views/DirectorEdit";
import { Database } from "@/integrations/supabase/types";
import { Director, EntityInterest } from "@/types";

type DirectorRow = Database['public']['Tables']['directors']['Row'];

const DirectorList = () => {
  const [directors, setDirectors] = useState<DirectorRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewingDirector, setViewingDirector] = useState<Director | null>(null);
  const [editingDirector, setEditingDirector] = useState<Director | null>(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [directorToDeleteId, setDirectorToDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadDirectors();
  }, []);

  const loadDirectors = async () => {
    setIsLoading(true);
    try {
      const data = await database.getDirectors();
      setDirectors(data);
    } catch (error) {
      console.error("Error loading directors:", error);
      toast.error("Failed to load directors");
      setDirectors([]);
    } finally {
      setIsLoading(false);
    }
  };

  const transformDirectorRowToDirector = (directorRow: DirectorRow): Director => {
    // Safely parse JSON arrays and provide proper typing
    const other_entities: EntityInterest[] = Array.isArray(directorRow.other_entities) 
      ? (directorRow.other_entities as any[]).map((entity: any) => ({
          id: entity.id || '',
          entity_name: entity.entity_name || '',
          registration_number: entity.registration_number || '',
          designation: entity.designation || '',
          date_of_appointment: entity.date_of_appointment || '',
          date_of_cessation: entity.date_of_cessation,
          shareholding_percentage: entity.shareholding_percentage || 0,
          shareholding_amount: entity.shareholding_amount || 0,
        }))
      : [];

    const companies = Array.isArray(directorRow.companies) 
      ? (directorRow.companies as any[]).map((company: any) => ({
          id: company.id || '',
          name: company.name || '',
          cin: company.cin || '',
          category: company.category || '',
          class: company.class || '',
          subcategory: company.subcategory || '',
          incorpDate: company.incorpDate || '',
          fyStart: company.fyStart || '',
          fyEnd: company.fyEnd || '',
          country: company.country || '',
          state: company.state || '',
          city: company.city || '',
          pinCode: company.pinCode || '',
          rocJurisdiction: company.rocJurisdiction || '',
          branches: company.branches || [],
          corporateRelations: company.corporateRelations || [],
          registrations: company.registrations || { pan: '', tan: '' }
        }))
      : [];

    return {
      id: directorRow.id,
      prefix: directorRow.prefix,
      first_name: directorRow.first_name,
      middle_name: directorRow.middle_name,
      last_name: directorRow.last_name,
      din: directorRow.din,
      email: directorRow.email,
      phone_number: directorRow.phone_number,
      designation: directorRow.designation,
      designation_category: undefined,
      designation_subcategory: undefined,
      nationality: directorRow.nationality,
      occupation: directorRow.occupation,
      date_of_birth: directorRow.date_of_birth,
      date_of_appointment: directorRow.date_of_appointment,
      date_of_cessation: directorRow.date_of_cessation,
      present_address: directorRow.address,
      present_city: directorRow.city,
      present_state: directorRow.state,
      present_country: directorRow.country,
      present_pin_code: directorRow.pin_code,
      has_interest_in_other_entities: directorRow.has_interest_in_other_entities || false,
      other_entities,
      companies,
      // Include all DirectorRow fields to ensure compatibility
      address: directorRow.address,
      city: directorRow.city,
      state: directorRow.state,
      country: directorRow.country,
      pin_code: directorRow.pin_code,
      company_id: directorRow.company_id,
      qualification: directorRow.qualification,
      experience: directorRow.experience,
      other_directorships: directorRow.other_directorships,
      created_at: directorRow.created_at,
      updated_at: directorRow.updated_at,
    } as Director;
  };

  const handleView = (director: DirectorRow) => {
    setViewingDirector(transformDirectorRowToDirector(director));
  };

  const handleEdit = (director: DirectorRow) => {
    setEditingDirector(transformDirectorRowToDirector(director));
  };

  const handleDelete = (id: string) => {
    setDirectorToDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (directorToDeleteId) {
      try {
        await database.deleteDirector(directorToDeleteId);
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

  const getDirectorDisplayName = (director: DirectorRow) => {
    return `${director.prefix || ''} ${director.first_name} ${director.middle_name || ''} ${director.last_name}`.trim();
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
                const originalDirector = directors.find(d => d.id === viewingDirector.id);
                if (originalDirector) {
                  handleEdit(originalDirector);
                }
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
