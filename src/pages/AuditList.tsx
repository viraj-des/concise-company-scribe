import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, Edit, Trash, Eye, FileText } from "lucide-react";
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
import AuditView from "@/components/views/AuditView";

const AuditList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAudit, setSelectedAudit] = useState<any | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'view'>('list');
  const [audits, setAudits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAudits();
  }, []);

  const loadAudits = async () => {
    setIsLoading(true);
    try {
      const data = await database.getAudits();
      setAudits(data);
    } catch (error) {
      console.error("Error loading audits:", error);
      setAudits([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAudits = audits.filter((audit) => {
    const searchable = (audit.auditor_name || "") + (audit.firm_registration_number || "");
    return searchable.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this audit record?")) {
      try {
        await database.deleteAudit(id);
        loadAudits();
      } catch (error) {
        console.error("Error deleting audit:", error);
      }
    }
  };

  const handleViewAudit = (audit: any) => {
    setSelectedAudit(audit);
    setViewMode('view');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedAudit(null);
  };

  if (viewMode === 'view' && selectedAudit) {
    return (
      <DashboardLayout>
        <AuditView 
          audit={selectedAudit} 
          onBack={handleBackToList}
          onEdit={() => navigate(`/audits/edit/${selectedAudit.id}`)}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Audits</h1>
        <Button asChild>
          <Link to="/audits/add">
            <Plus className="mr-2 h-4 w-4" /> Add New Audit
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Audit Records</CardTitle>
          <div className="flex">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search audits..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredAudits.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Auditor Name</TableHead>
                    <TableHead>Firm Registration</TableHead>
                    <TableHead>Appointment Date</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAudits.map((audit) => (
                    <TableRow key={audit.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-primary" />
                          {audit.auditor_name}
                        </div>
                      </TableCell>
                      <TableCell>{audit.firm_registration_number}</TableCell>
                      <TableCell>{audit.appointment_date ? new Date(audit.appointment_date).toLocaleDateString() : "N/A"}</TableCell>
                      <TableCell>{audit.email_id}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleViewAudit(audit)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => navigate(`/audits/edit/${audit.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(audit.id!)}
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
              {searchTerm ? "No audits found matching your search" : "No audits found. Add your first audit."}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AuditList;
