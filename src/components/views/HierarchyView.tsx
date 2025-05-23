
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building, Users, FileText, Banknote } from "lucide-react";
import { database } from "@/services/database";
import { Company, Director, ShareCapitalMember } from "@/types";

interface HierarchyViewProps {
  onBack: () => void;
}

const HierarchyView = ({ onBack }: HierarchyViewProps) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [directors, setDirectors] = useState<Director[]>([]);
  const [shareCapitalMembers, setShareCapitalMembers] = useState<ShareCapitalMember[]>([]);
  const [audits, setAudits] = useState<any[]>([]);

  useEffect(() => {
    setCompanies(database.getCompanies());
    setDirectors(database.getDirectors());
    setShareCapitalMembers(database.getShareCapitalMembers());
    setAudits(database.getAudits());
  }, []);

  // Create relationships mapping
  const getDirectorsByCompany = (companyId: string) => {
    return directors.filter(director => 
      director.companies?.some(company => company.companyId === companyId)
    );
  };

  const getAuditsByCompany = (companyId: string) => {
    return audits.filter(audit => audit.companyId === companyId);
  };

  const getCompaniesForDirector = (directorId: string) => {
    const director = directors.find(d => d.id === directorId);
    return director?.companies?.map(dc => {
      const company = companies.find(c => c.id === dc.companyId);
      return company ? { ...company, designation: dc.designation } : null;
    }).filter(Boolean) || [];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="outline" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to List
        </Button>
        <h1 className="text-2xl font-bold">Entity Hierarchy View</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Companies and their relationships */}
        {companies.map((company) => {
          const companyDirectors = getDirectorsByCompany(company.id!);
          const companyAudits = getAuditsByCompany(company.id!);
          
          return (
            <Card key={company.id} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2 text-blue-500" />
                  {company.basicDetails?.companyName || "Unnamed Company"}
                  <span className="ml-2 text-sm text-gray-500">
                    (CIN: {company.basicDetails?.cin})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Directors */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Directors ({companyDirectors.length})
                    </h4>
                    {companyDirectors.length > 0 ? (
                      <ul className="space-y-1 text-sm">
                        {companyDirectors.map((director) => {
                          const designation = director.companies?.find(dc => dc.companyId === company.id)?.designation;
                          return (
                            <li key={director.id} className="p-2 bg-gray-50 rounded">
                              {director.personalDetails?.firstName} {director.personalDetails?.lastName}
                              {designation && <span className="text-gray-600"> ({designation})</span>}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">No directors assigned</p>
                    )}
                  </div>

                  {/* Audits */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      Audits ({companyAudits.length})
                    </h4>
                    {companyAudits.length > 0 ? (
                      <ul className="space-y-1 text-sm">
                        {companyAudits.map((audit) => (
                          <li key={audit.id} className="p-2 bg-gray-50 rounded">
                            {audit.auditDetails?.auditType || "Unknown Type"}
                            <span className="text-gray-600 block">
                              {audit.auditDetails?.financialYear}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">No audits recorded</p>
                    )}
                  </div>

                  {/* Share Capital */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Banknote className="h-4 w-4 mr-1" />
                      Share Capital Members
                    </h4>
                    <p className="text-sm text-gray-600">
                      Total Members: {shareCapitalMembers.length}
                    </p>
                    <p className="text-sm text-gray-600">
                      Total Shares: {shareCapitalMembers.reduce((sum, member) => sum + (member.equityDetails?.totalShares || 0), 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Directors with multiple company affiliations */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-500" />
              Directors with Multiple Company Affiliations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {directors.filter(director => (director.companies?.length || 0) > 1).length > 0 ? (
              <div className="space-y-4">
                {directors
                  .filter(director => (director.companies?.length || 0) > 1)
                  .map((director) => {
                    const directorCompanies = getCompaniesForDirector(director.id!);
                    return (
                      <div key={director.id} className="p-4 bg-gray-50 rounded">
                        <h4 className="font-semibold">
                          {director.personalDetails?.firstName} {director.personalDetails?.lastName}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Affiliated with {directorCompanies.length} companies:
                        </p>
                        <ul className="text-sm space-y-1">
                          {directorCompanies.map((company: any) => (
                            <li key={company.id} className="flex justify-between">
                              <span>{company.basicDetails?.companyName}</span>
                              <span className="text-gray-600">({company.designation})</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p className="text-gray-500">No directors with multiple company affiliations found.</p>
            )}
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-purple-500" />
              System Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded">
                <div className="text-2xl font-bold text-blue-600">{companies.length}</div>
                <div className="text-sm text-gray-600">Companies</div>
              </div>
              <div className="p-4 bg-green-50 rounded">
                <div className="text-2xl font-bold text-green-600">{directors.length}</div>
                <div className="text-sm text-gray-600">Directors</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded">
                <div className="text-2xl font-bold text-yellow-600">{audits.length}</div>
                <div className="text-sm text-gray-600">Audits</div>
              </div>
              <div className="p-4 bg-purple-50 rounded">
                <div className="text-2xl font-bold text-purple-600">{shareCapitalMembers.length}</div>
                <div className="text-sm text-gray-600">Share Members</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HierarchyView;
