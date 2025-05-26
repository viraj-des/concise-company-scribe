
import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCompany } from "@/contexts/CompanyContext";
import { database } from "@/services/database";

interface HierarchyData {
  directors: any[];
  audits: any[];
  shareCapitalMembers: any[];
}

const HierarchyView = () => {
  const { selectedCompany } = useCompany();
  const [hierarchyData, setHierarchyData] = useState<HierarchyData>({
    directors: [],
    audits: [],
    shareCapitalMembers: []
  });
  const [loading, setLoading] = useState(false);
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      loadHierarchyData();
    }
  }, [selectedCompany]);

  const loadHierarchyData = async () => {
    if (!selectedCompany) return;
    
    setLoading(true);
    try {
      const [directors, audits, shareCapitalMembers] = await Promise.all([
        database.getDirectors(selectedCompany.id),
        database.getAudits(selectedCompany.id),
        database.getShareCapitalMembers(selectedCompany.id)
      ]);

      setHierarchyData({ directors, audits, shareCapitalMembers });
    } catch (error) {
      console.error('Error loading hierarchy data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMermaidDiagram = () => {
    if (!selectedCompany) return '';

    const companyName = selectedCompany.name.replace(/[^a-zA-Z0-9]/g, '');
    let diagram = `graph TD\n    ${companyName}["${selectedCompany.name}"]\n`;

    // Add directors
    hierarchyData.directors.forEach((director, index) => {
      const directorId = `director${index}`;
      const directorName = `${director.first_name || ''} ${director.last_name || ''}`.trim();
      diagram += `    ${directorId}["👤 ${directorName}"]\n`;
      diagram += `    ${companyName} --> ${directorId}\n`;
    });

    // Add audits
    hierarchyData.audits.forEach((audit, index) => {
      const auditId = `audit${index}`;
      const auditorName = audit.auditor_name || 'Auditor';
      diagram += `    ${auditId}["📊 ${auditorName}"]\n`;
      diagram += `    ${companyName} --> ${auditId}\n`;
    });

    // Add share capital members
    hierarchyData.shareCapitalMembers.forEach((member, index) => {
      const memberId = `member${index}`;
      const memberName = member.name || 'Member';
      diagram += `    ${memberId}["💰 ${memberName}"]\n`;
      diagram += `    ${companyName} --> ${memberId}\n`;
    });

    return diagram;
  };

  useEffect(() => {
    if (mermaidRef.current && selectedCompany && !loading) {
      const diagram = generateMermaidDiagram();
      mermaidRef.current.innerHTML = `<div class="mermaid">${diagram}</div>`;
      mermaid.init(undefined, mermaidRef.current.querySelector('.mermaid'));
    }
  }, [hierarchyData, selectedCompany, loading]);

  if (!selectedCompany) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Company Hierarchy</CardTitle>
          <CardDescription>Select a company to view its hierarchy</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please select a company from the dropdown to view its organizational hierarchy.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Hierarchy - {selectedCompany.name}</CardTitle>
        <CardDescription>
          Organizational structure showing directors, auditors, and share capital members
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <p>Loading hierarchy...</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <div ref={mermaidRef} className="min-h-[400px]" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HierarchyView;
