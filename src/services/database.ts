import { Company, Director } from "@/types";
import { v4 as uuid } from 'uuid';
import { toast } from "sonner";

// In a real application, this would be a connection to a real database
// For now, we'll use localStorage for persistence
const COMPANIES_STORAGE_KEY = "corporate-registry-companies";
const DIRECTORS_STORAGE_KEY = "corporate-registry-directors";

const loadFromStorage = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error loading data from localStorage for ${key}:`, error);
    return [];
  }
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to localStorage for ${key}:`, error);
    toast.error(`Failed to save data: ${(error as Error).message}`);
  }
};

// Company CRUD operations
const getCompanies = (): Company[] => {
  return loadFromStorage<Company>(COMPANIES_STORAGE_KEY);
};

const getCompanyById = (id: string): Company | undefined => {
  const companies = getCompanies();
  return companies.find(company => company.id === id);
};

const createCompany = (company: Partial<Company>): Company => {
  const companies = getCompanies();
  
  // Create new company with ID
  const newCompany: Company = {
    ...company as Company,
    id: uuid(),
    branches: company.branches || [],
    corporateRelations: company.corporateRelations || [],
    registrations: company.registrations || { pan: "", tan: "" },
  };
  
  companies.push(newCompany);
  saveToStorage(COMPANIES_STORAGE_KEY, companies);
  toast.success("Company created successfully");
  
  return newCompany;
};

const updateCompany = (id: string, updateData: Partial<Company>): Company | undefined => {
  const companies = getCompanies();
  const index = companies.findIndex(company => company.id === id);
  
  if (index !== -1) {
    // Update company while keeping the same ID
    const updatedCompany: Company = { ...companies[index], ...updateData };
    companies[index] = updatedCompany;
    saveToStorage(COMPANIES_STORAGE_KEY, companies);
    toast.success("Company updated successfully");
    return updatedCompany;
  }
  
  toast.error("Company not found");
  return undefined;
};

const deleteCompany = (id: string): boolean => {
  const companies = getCompanies();
  const filteredCompanies = companies.filter(company => company.id !== id);
  
  if (filteredCompanies.length < companies.length) {
    saveToStorage(COMPANIES_STORAGE_KEY, filteredCompanies);
    toast.success("Company deleted successfully");
    return true;
  }
  
  toast.error("Company not found");
  return false;
};

// Director CRUD operations
const getDirectors = (): Director[] => {
  return loadFromStorage<Director>(DIRECTORS_STORAGE_KEY);
};

const getDirectorById = (id: string): Director | undefined => {
  const directors = getDirectors();
  return directors.find(director => director.id === id);
};

const createDirector = (director: Partial<Director>): Director => {
  const directors = getDirectors();
  
  // Create new director with ID
  const newDirector: Director = {
    ...director as Director,
    id: uuid(),
    hasInterestInOtherEntities: director.hasInterestInOtherEntities || false,
    otherEntities: director.otherEntities || [],
    companies: director.companies || [],
  };
  
  directors.push(newDirector);
  saveToStorage(DIRECTORS_STORAGE_KEY, directors);
  toast.success("Director created successfully");
  
  return newDirector;
};

const updateDirector = (id: string, updateData: Partial<Director>): Director | undefined => {
  const directors = getDirectors();
  const index = directors.findIndex(director => director.id === id);
  
  if (index !== -1) {
    // Update director while keeping the same ID
    const updatedDirector: Director = { ...directors[index], ...updateData };
    directors[index] = updatedDirector;
    saveToStorage(DIRECTORS_STORAGE_KEY, directors);
    toast.success("Director updated successfully");
    return updatedDirector;
  }
  
  toast.error("Director not found");
  return undefined;
};

const deleteDirector = (id: string): boolean => {
  const directors = getDirectors();
  const filteredDirectors = directors.filter(director => director.id !== id);
  
  if (filteredDirectors.length < directors.length) {
    saveToStorage(DIRECTORS_STORAGE_KEY, filteredDirectors);
    toast.success("Director deleted successfully");
    return true;
  }
  
  toast.error("Director not found");
  return false;
};

// Clear all data (for testing)
const clearAllData = (): void => {
  localStorage.removeItem(COMPANIES_STORAGE_KEY);
  localStorage.removeItem(DIRECTORS_STORAGE_KEY);
  toast.info("All data cleared");
};

// Update the database service with audit related methods
interface Database {
  // ... keep existing methods
  createAudit: (auditData: any) => string;
  getAudits: () => any[];
  getAuditById: (id: string) => any;
  updateAudit: (id: string, auditData: any) => void;
  deleteAudit: (id: string) => void;
}

export const database: Database = {
  // ... keep existing methods
  
  createAudit: (auditData) => {
    const audit = { id: crypto.randomUUID(), ...auditData };
    const audits = JSON.parse(localStorage.getItem("audits") || "[]");
    audits.push(audit);
    localStorage.setItem("audits", JSON.stringify(audits));
    return audit.id;
  },
  
  getAudits: () => {
    return JSON.parse(localStorage.getItem("audits") || "[]");
  },
  
  getAuditById: (id) => {
    const audits = JSON.parse(localStorage.getItem("audits") || "[]");
    return audits.find((audit: any) => audit.id === id);
  },
  
  updateAudit: (id, auditData) => {
    const audits = JSON.parse(localStorage.getItem("audits") || "[]");
    const index = audits.findIndex((audit: any) => audit.id === id);
    
    if (index !== -1) {
      audits[index] = { ...audits[index], ...auditData };
      localStorage.setItem("audits", JSON.stringify(audits));
    }
  },
  
  deleteAudit: (id) => {
    const audits = JSON.parse(localStorage.getItem("audits") || "[]");
    const filteredAudits = audits.filter((audit: any) => audit.id !== id);
    localStorage.setItem("audits", JSON.stringify(filteredAudits));
  }
};
