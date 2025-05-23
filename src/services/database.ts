import { Company, Director, ShareCapitalMember } from "@/types";
import { v4 as uuid } from 'uuid';
import { toast } from "sonner";
import { sampleCompanies, sampleDirectors, sampleAudits, sampleShareCapitalMembers } from "./sampleData";

// In a real application, this would be a connection to a real database
// For now, we'll use localStorage for persistence
const COMPANIES_STORAGE_KEY = "corporate-registry-companies";
const DIRECTORS_STORAGE_KEY = "corporate-registry-directors";
const AUDITS_STORAGE_KEY = "corporate-registry-audits";
const SHARE_CAPITAL_MEMBERS_STORAGE_KEY = "corporate-registry-share-capital-members";

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

// Audit CRUD operations
const getAudits = (): any[] => {
  return loadFromStorage(AUDITS_STORAGE_KEY);
};

const getAuditById = (id: string): any | undefined => {
  const audits = getAudits();
  return audits.find(audit => audit.id === id);
};

const createAudit = (auditData: any): any => {
  const audits = getAudits();
  
  const newAudit = {
    ...auditData,
    id: uuid(),
  };
  
  audits.push(newAudit);
  saveToStorage(AUDITS_STORAGE_KEY, audits);
  toast.success("Audit created successfully");
  
  return newAudit;
};

const updateAudit = (id: string, updateData: any): any | undefined => {
  const audits = getAudits();
  const index = audits.findIndex(audit => audit.id === id);
  
  if (index !== -1) {
    const updatedAudit = { ...audits[index], ...updateData };
    audits[index] = updatedAudit;
    saveToStorage(AUDITS_STORAGE_KEY, audits);
    toast.success("Audit updated successfully");
    return updatedAudit;
  }
  
  toast.error("Audit not found");
  return undefined;
};

const deleteAudit = (id: string): boolean => {
  const audits = getAudits();
  const filteredAudits = audits.filter(audit => audit.id !== id);
  
  if (filteredAudits.length < audits.length) {
    saveToStorage(AUDITS_STORAGE_KEY, filteredAudits);
    toast.success("Audit deleted successfully");
    return true;
  }
  
  toast.error("Audit not found");
  return false;
};

// Share Capital Member CRUD operations
const getShareCapitalMembers = (): ShareCapitalMember[] => {
  return loadFromStorage<ShareCapitalMember>(SHARE_CAPITAL_MEMBERS_STORAGE_KEY);
};

const getShareCapitalMemberById = (id: string): ShareCapitalMember | undefined => {
  const members = getShareCapitalMembers();
  return members.find(member => member.id === id);
};

const createShareCapitalMember = (member: Partial<ShareCapitalMember>): ShareCapitalMember => {
  const members = getShareCapitalMembers();
  
  // Create new member with ID
  const newMember: ShareCapitalMember = {
    ...member as ShareCapitalMember,
    id: uuid(),
  };
  
  members.push(newMember);
  saveToStorage(SHARE_CAPITAL_MEMBERS_STORAGE_KEY, members);
  toast.success("Share Capital Member created successfully");
  
  return newMember;
};

const updateShareCapitalMember = (id: string, updateData: Partial<ShareCapitalMember>): ShareCapitalMember | undefined => {
  const members = getShareCapitalMembers();
  const index = members.findIndex(member => member.id === id);
  
  if (index !== -1) {
    // Update member while keeping the same ID
    const updatedMember: ShareCapitalMember = { ...members[index], ...updateData };
    members[index] = updatedMember;
    saveToStorage(SHARE_CAPITAL_MEMBERS_STORAGE_KEY, members);
    toast.success("Share Capital Member updated successfully");
    return updatedMember;
  }
  
  toast.error("Share Capital Member not found");
  return undefined;
};

const deleteShareCapitalMember = (id: string): boolean => {
  const members = getShareCapitalMembers();
  const filteredMembers = members.filter(member => member.id !== id);
  
  if (filteredMembers.length < members.length) {
    saveToStorage(SHARE_CAPITAL_MEMBERS_STORAGE_KEY, filteredMembers);
    toast.success("Share Capital Member deleted successfully");
    return true;
  }
  
  toast.error("Share Capital Member not found");
  return false;
};

// Load sample data function
const loadSampleData = (): void => {
  // Check if data already exists
  const companies = getCompanies();
  const directors = getDirectors();
  const audits = getAudits();
  const shareCapitalMembers = getShareCapitalMembers();
  
  // Only load sample data if no data exists
  if (companies.length === 0) {
    saveToStorage(COMPANIES_STORAGE_KEY, sampleCompanies);
    toast.success("Sample companies loaded");
  }
  
  if (directors.length === 0) {
    saveToStorage(DIRECTORS_STORAGE_KEY, sampleDirectors);
    toast.success("Sample directors loaded");
  }
  
  if (audits.length === 0) {
    saveToStorage(AUDITS_STORAGE_KEY, sampleAudits);
    toast.success("Sample audits loaded");
  }
  
  if (shareCapitalMembers.length === 0) {
    saveToStorage(SHARE_CAPITAL_MEMBERS_STORAGE_KEY, sampleShareCapitalMembers);
    toast.success("Sample share capital members loaded");
  }

  toast.info("Sample data has been loaded successfully");
};

// Clear all data (for testing)
const clearAllData = (): void => {
  localStorage.removeItem(COMPANIES_STORAGE_KEY);
  localStorage.removeItem(DIRECTORS_STORAGE_KEY);
  localStorage.removeItem(AUDITS_STORAGE_KEY);
  localStorage.removeItem(SHARE_CAPITAL_MEMBERS_STORAGE_KEY);
  toast.info("All data cleared");
};

// Define the interface for the database service
interface Database {
  // Company operations
  getCompanies: () => Company[];
  getCompanyById: (id: string) => Company | undefined;
  createCompany: (company: Partial<Company>) => Company;
  updateCompany: (id: string, updateData: Partial<Company>) => Company | undefined;
  deleteCompany: (id: string) => boolean;
  
  // Director operations
  getDirectors: () => Director[];
  getDirectorById: (id: string) => Director | undefined;
  createDirector: (director: Partial<Director>) => Director;
  updateDirector: (id: string, updateData: Partial<Director>) => Director | undefined;
  deleteDirector: (id: string) => boolean;
  
  // Audit operations
  getAudits: () => any[];
  getAuditById: (id: string) => any | undefined;
  createAudit: (auditData: any) => any;
  updateAudit: (id: string, auditData: any) => any | undefined;
  deleteAudit: (id: string) => boolean;
  
  // Share Capital Member operations
  getShareCapitalMembers: () => ShareCapitalMember[];
  getShareCapitalMemberById: (id: string) => ShareCapitalMember | undefined;
  createShareCapitalMember: (member: Partial<ShareCapitalMember>) => ShareCapitalMember;
  updateShareCapitalMember: (id: string, updateData: Partial<ShareCapitalMember>) => ShareCapitalMember | undefined;
  deleteShareCapitalMember: (id: string) => boolean;
  
  // Utility operations
  clearAllData: () => void;
  loadSampleData: () => void;
}

export const database: Database = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  
  getDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
  
  getAudits,
  getAuditById,
  createAudit,
  updateAudit,
  deleteAudit,
  
  getShareCapitalMembers,
  getShareCapitalMemberById,
  createShareCapitalMember,
  updateShareCapitalMember,
  deleteShareCapitalMember,
  
  clearAllData,
  loadSampleData
};
