
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, Edit, Trash } from "lucide-react";
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

const AuditList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const audits = database.getAudits() || [];

  const filteredAudits = audits.filter((audit) => {
    const searchable = (audit.auditorName || "") + (audit.firmRegistrationNumber || "");
    return searchable.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this audit record?")) {
      database.deleteAudit(id);
      // Refresh the component to show updated data
      navigate("/audits");
    }
  };

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
                      <TableCell>{audit.auditorName}</TableCell>
                      <TableCell>{audit.firmRegistrationNumber}</TableCell>
                      <TableCell>{audit.appointmentDate ? new Date(audit.appointmentDate).toLocaleDateString() : "N/A"}</TableCell>
                      <TableCell>{audit.emailId}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/audits/edit/${audit.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
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
