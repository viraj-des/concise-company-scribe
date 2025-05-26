
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building, Users, FileText, Banknote } from "lucide-react";
import { database } from "@/services/database";

// Use Supabase types directly
type CompanyRow = {
  id: string;
  name: string;
  cin: string | null;
  [key: string]: any;
};

type DirectorRow = {
  id: string;
  first_name: string;
  last_name: string;
  designation: string | null;
  company_id: string | null;
  companies: any;
  [key: string]: any;
};

type ShareCapitalMemberRow = {
  id: string;
  name: string;
  shares_held: number | null;
  company_id: string | null;
  [key: string]: any;
};

type AuditRow = {
  id: string;
  company_id: string | null;
  auditor_name: string | null;
  auditor_type: string | null;
  [key: string]: any;
};

interface HierarchyViewProps {
  onBack: () => void;
}

const HierarchyView = ({ onBack }: HierarchyViewProps) => {
  const [companies, setCompanies] = useState<CompanyRow[]>([]);
  const [directors, setDirectors] = useState<DirectorRow[]>([]);
  const [shareCapitalMembers, setShareCapitalMembers] = useState<ShareCapitalMemberRow[]>([]);
  const [audits, setAudits] = useState<AuditRow[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [companiesData, directorsData, shareCapitalData, auditsData] = await Promise.all([
          database.getCompanies(),
          database.getDirectors(),
          database.getShareCapitalMembers(),
          database.getAudits()
        ]);
        
        setCompanies(companiesData as CompanyRow[]);
        setDirectors(directorsData as DirectorRow[]);
        setShareCapitalMembers(shareCapitalData as ShareCapitalMemberRow[]);
        setAudits(auditsData as AuditRow[]);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  // Create relationships mapping
  const getDirectorsByCompany = (companyId: string) => {
    return directors.filter(director => director.company_id === companyId);
  };

  const getAuditsByCompany = (companyId: string) => {
    return audits.filter(audit => audit.company_id === companyId);
  };

  const getShareCapitalMembersByCompany = (companyId: string) => {
    return shareCapitalMembers.filter(member => member.company_id === companyId);
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
          const companyDirectors = getDirectorsByCompany(company.id);
          const companyAudits = getAuditsByCompany(company.id);
          const companyShareMembers = getShareCapitalMembersByCompany(company.id);
          
          return (
            <Card key={company.id} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2 text-blue-500" />
                  {company.name || "Unnamed Company"}
                  {company.cin && (
                    <span className="ml-2 text-sm text-gray-500">
                      (CIN: {company.cin})
                    </span>
                  )}
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
                        {companyDirectors.map((director) => (
                          <li key={director.id} className="p-2 bg-gray-50 rounded">
                            {director.first_name} {director.last_name}
                            {director.designation && (
                              <span className="text-gray-600"> ({director.designation})</span>
                            )}
                          </li>
                        ))}
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
                            {audit.auditor_name || "Unknown Auditor"}
                            {audit.auditor_type && (
                              <span className="text-gray-600 block">
                                Type: {audit.auditor_type}
                              </span>
                            )}
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
                      Share Capital Members ({companyShareMembers.length})
                    </h4>
                    {companyShareMembers.length > 0 ? (
                      <ul className="space-y-1 text-sm">
                        {companyShareMembers.map((member) => (
                          <li key={member.id} className="p-2 bg-gray-50 rounded">
                            {member.name}
                            {member.shares_held && (
                              <span className="text-gray-600 block">
                                Shares: {member.shares_held}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">No share capital members</p>
                    )}
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
            {directors.filter(director => {
              const directorCompanies = companies.filter(company => 
                directors.some(d => d.id === director.id && d.company_id === company.id)
              );
              return directorCompanies.length > 1;
            }).length > 0 ? (
              <div className="space-y-4">
                {directors
                  .filter(director => {
                    const directorCompanies = companies.filter(company => 
                      directors.some(d => d.id === director.id && d.company_id === company.id)
                    );
                    return directorCompanies.length > 1;
                  })
                  .map((director) => {
                    const directorCompanies = companies.filter(company => 
                      directors.some(d => d.id === director.id && d.company_id === company.id)
                    );
                    return (
                      <div key={director.id} className="p-4 bg-gray-50 rounded">
                        <h4 className="font-semibold">
                          {director.first_name} {director.last_name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Affiliated with {directorCompanies.length} companies:
                        </p>
                        <ul className="text-sm space-y-1">
                          {directorCompanies.map((company) => (
                            <li key={company.id} className="flex justify-between">
                              <span>{company.name}</span>
                              <span className="text-gray-600">({director.designation || 'Director'})</span>
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
