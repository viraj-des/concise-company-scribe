
import React, { createContext, useContext, useState, useEffect } from 'react';
import { database } from '@/services/database';

type CompanyRow = {
  id: string;
  name: string;
  cin: string | null;
  // Add other company fields as needed
};

interface CompanyContextType {
  selectedCompany: CompanyRow | null;
  setSelectedCompany: (company: CompanyRow | null) => void;
  companies: CompanyRow[];
  loading: boolean;
  refreshCompanies: () => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCompany, setSelectedCompany] = useState<CompanyRow | null>(null);
  const [companies, setCompanies] = useState<CompanyRow[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshCompanies = async () => {
    setLoading(true);
    try {
      const companiesData = await database.getCompanies();
      setCompanies(companiesData);
      
      // If no company is selected and we have companies, select the first one
      if (!selectedCompany && companiesData.length > 0) {
        setSelectedCompany(companiesData[0]);
      }
    } catch (error) {
      console.error('Error loading companies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCompanies();
  }, []);

  return (
    <CompanyContext.Provider value={{
      selectedCompany,
      setSelectedCompany,
      companies,
      loading,
      refreshCompanies
    }}>
      {children}
    </CompanyContext.Provider>
  );
};
