
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "@/services/database";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import CompanyView from "@/components/views/CompanyView";
import { Database } from "@/integrations/supabase/types";

type CompanyRow = Database['public']['Tables']['companies']['Row'];

const CompanyList = () => {
  const [companies, setCompanies] = useState<CompanyRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewCompany, setViewCompany] = useState<CompanyRow | null>(null);
  const [editCompany, setEditCompany] = useState<CompanyRow | null>(null);
  const [deleteCompanyId, setDeleteCompanyId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    setIsLoading(true);
    try {
      const companiesData = await database.getCompanies();
      setCompanies(companiesData);
    } catch (error) {
      console.error("Error loading companies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (company: CompanyRow) => {
    setViewCompany(company);
  };

  const handleEdit = (company: CompanyRow) => {
    setEditCompany(company);
    navigate(`/companies/edit/${company.id}`); // Navigate to the edit page
  };

  const handleDelete = (id: string) => {
    setDeleteCompanyId(id);
  };

  const confirmDelete = async () => {
    if (deleteCompanyId) {
      try {
        await database.deleteCompany(deleteCompanyId);
        loadCompanies(); // Reload companies after deletion
      } catch (error) {
        console.error("Error deleting company:", error);
      } finally {
        setDeleteCompanyId(null);
      }
    }
  };

  const cancelDelete = () => {
    setDeleteCompanyId(null);
  };

  const closeViewModal = () => {
    setViewCompany(null);
  };

  const closeEditModal = () => {
    setEditCompany(null);
    loadCompanies(); // Reload companies after editing
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Companies</h1>
          <Button onClick={() => navigate("/companies/add")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Company
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Company List</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : companies.length === 0 ? (
              <div className="text-center text-gray-500">
                No companies found. <Button variant="link" onClick={() => navigate("/companies/add")}>Add your first company</Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">CIN</th>
                      <th className="text-left p-2">Category</th>
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((company) => (
                      <tr key={company.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{company.name}</td>
                        <td className="p-2">{company.cin}</td>
                        <td className="p-2">{company.category}</td>
                        <td className="p-2">{company.email}</td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleView(company)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(company)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(company.id!)}
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

      {/* View Company Modal */}
      <Dialog open={!!viewCompany} onOpenChange={() => setViewCompany(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Company Details</DialogTitle>
            <DialogDescription>
              View detailed information about the company.
            </DialogDescription>
          </DialogHeader>
          {viewCompany && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  value={viewCompany.name}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cin" className="text-right">
                  CIN
                </Label>
                <Input
                  type="text"
                  id="cin"
                  value={viewCompany.cin || ''}
                  className="col-span-3"
                  readOnly
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Company Modal */}
      <Dialog open={!!editCompany} onOpenChange={() => setEditCompany(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Company</DialogTitle>
            <DialogDescription>
              Make changes to the company details.
            </DialogDescription>
          </DialogHeader>
          {editCompany && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  defaultValue={editCompany.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cin" className="text-right">
                  CIN
                </Label>
                <Input
                  type="text"
                  id="cin"
                  defaultValue={editCompany.cin || ''}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteCompanyId} onOpenChange={() => setDeleteCompanyId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to delete this company?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default CompanyList;
