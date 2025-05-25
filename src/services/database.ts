
import { Company, Director, ShareCapitalMember } from "@/types";
import { toast } from "sonner";
import { supabase } from "./supabase";

// Company CRUD operations
const getCompanies = async (): Promise<Company[]> => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error loading companies:', error);
    toast.error('Failed to load companies');
    return [];
  }
};

const getCompanyById = async (id: string): Promise<Company | undefined> => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error loading company:', error);
    return undefined;
  }
};

const createCompany = async (company: Partial<Company>): Promise<Company> => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .insert(company)
      .select()
      .single();
    
    if (error) throw error;
    toast.success("Company created successfully");
    return data;
  } catch (error) {
    console.error('Error creating company:', error);
    toast.error("Failed to create company");
    throw error;
  }
};

const updateCompany = async (id: string, updateData: Partial<Company>): Promise<Company | undefined> => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    toast.success("Company updated successfully");
    return data;
  } catch (error) {
    console.error('Error updating company:', error);
    toast.error("Failed to update company");
    return undefined;
  }
};

const deleteCompany = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    toast.success("Company deleted successfully");
    return true;
  } catch (error) {
    console.error('Error deleting company:', error);
    toast.error("Failed to delete company");
    return false;
  }
};

// Director CRUD operations
const getDirectors = async (): Promise<Director[]> => {
  try {
    const { data, error } = await supabase
      .from('directors')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error loading directors:', error);
    toast.error('Failed to load directors');
    return [];
  }
};

const getDirectorById = async (id: string): Promise<Director | undefined> => {
  try {
    const { data, error } = await supabase
      .from('directors')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error loading director:', error);
    return undefined;
  }
};

const createDirector = async (director: Partial<Director>): Promise<Director> => {
  try {
    const { data, error } = await supabase
      .from('directors')
      .insert(director)
      .select()
      .single();
    
    if (error) throw error;
    toast.success("Director created successfully");
    return data;
  } catch (error) {
    console.error('Error creating director:', error);
    toast.error("Failed to create director");
    throw error;
  }
};

const updateDirector = async (id: string, updateData: Partial<Director>): Promise<Director | undefined> => {
  try {
    const { data, error } = await supabase
      .from('directors')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    toast.success("Director updated successfully");
    return data;
  } catch (error) {
    console.error('Error updating director:', error);
    toast.error("Failed to update director");
    return undefined;
  }
};

const deleteDirector = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('directors')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    toast.success("Director deleted successfully");
    return true;
  } catch (error) {
    console.error('Error deleting director:', error);
    toast.error("Failed to delete director");
    return false;
  }
};

// Audit CRUD operations
const getAudits = async (): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('audits')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error loading audits:', error);
    toast.error('Failed to load audits');
    return [];
  }
};

const getAuditById = async (id: string): Promise<any | undefined> => {
  try {
    const { data, error } = await supabase
      .from('audits')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error loading audit:', error);
    return undefined;
  }
};

const createAudit = async (auditData: any): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from('audits')
      .insert(auditData)
      .select()
      .single();
    
    if (error) throw error;
    toast.success("Audit created successfully");
    return data;
  } catch (error) {
    console.error('Error creating audit:', error);
    toast.error("Failed to create audit");
    throw error;
  }
};

const updateAudit = async (id: string, updateData: any): Promise<any | undefined> => {
  try {
    const { data, error } = await supabase
      .from('audits')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    toast.success("Audit updated successfully");
    return data;
  } catch (error) {
    console.error('Error updating audit:', error);
    toast.error("Failed to update audit");
    return undefined;
  }
};

const deleteAudit = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('audits')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    toast.success("Audit deleted successfully");
    return true;
  } catch (error) {
    console.error('Error deleting audit:', error);
    toast.error("Failed to delete audit");
    return false;
  }
};

// Share Capital Member CRUD operations
const getShareCapitalMembers = async (): Promise<ShareCapitalMember[]> => {
  try {
    const { data, error } = await supabase
      .from('share_capital_members')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error loading share capital members:', error);
    toast.error('Failed to load share capital members');
    return [];
  }
};

const getShareCapitalMemberById = async (id: string): Promise<ShareCapitalMember | undefined> => {
  try {
    const { data, error } = await supabase
      .from('share_capital_members')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error loading share capital member:', error);
    return undefined;
  }
};

const createShareCapitalMember = async (member: Partial<ShareCapitalMember>): Promise<ShareCapitalMember> => {
  try {
    const { data, error } = await supabase
      .from('share_capital_members')
      .insert(member)
      .select()
      .single();
    
    if (error) throw error;
    toast.success("Share Capital Member created successfully");
    return data;
  } catch (error) {
    console.error('Error creating share capital member:', error);
    toast.error("Failed to create share capital member");
    throw error;
  }
};

const updateShareCapitalMember = async (id: string, updateData: Partial<ShareCapitalMember>): Promise<ShareCapitalMember | undefined> => {
  try {
    const { data, error } = await supabase
      .from('share_capital_members')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    toast.success("Share Capital Member updated successfully");
    return data;
  } catch (error) {
    console.error('Error updating share capital member:', error);
    toast.error("Failed to update share capital member");
    return undefined;
  }
};

const deleteShareCapitalMember = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('share_capital_members')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    toast.success("Share Capital Member deleted successfully");
    return true;
  } catch (error) {
    console.error('Error deleting share capital member:', error);
    toast.error("Failed to delete share capital member");
    return false;
  }
};

// Utility operations
const clearAllData = async (): Promise<void> => {
  try {
    await Promise.all([
      supabase.from('companies').delete().neq('id', ''),
      supabase.from('directors').delete().neq('id', ''),
      supabase.from('audits').delete().neq('id', ''),
      supabase.from('share_capital_members').delete().neq('id', '')
    ]);
    toast.info("All data cleared");
  } catch (error) {
    console.error('Error clearing data:', error);
    toast.error("Failed to clear data");
  }
};

const loadSampleData = async (): Promise<void> => {
  toast.info("Sample data loading is not implemented for Supabase yet");
};

// Define the interface for the database service
interface Database {
  // Company operations
  getCompanies: () => Promise<Company[]>;
  getCompanyById: (id: string) => Promise<Company | undefined>;
  createCompany: (company: Partial<Company>) => Promise<Company>;
  updateCompany: (id: string, updateData: Partial<Company>) => Promise<Company | undefined>;
  deleteCompany: (id: string) => Promise<boolean>;
  
  // Director operations
  getDirectors: () => Promise<Director[]>;
  getDirectorById: (id: string) => Promise<Director | undefined>;
  createDirector: (director: Partial<Director>) => Promise<Director>;
  updateDirector: (id: string, updateData: Partial<Director>) => Promise<Director | undefined>;
  deleteDirector: (id: string) => Promise<boolean>;
  
  // Audit operations
  getAudits: () => Promise<any[]>;
  getAuditById: (id: string) => Promise<any | undefined>;
  createAudit: (auditData: any) => Promise<any>;
  updateAudit: (id: string, auditData: any) => Promise<any | undefined>;
  deleteAudit: (id: string) => Promise<boolean>;
  
  // Share Capital Member operations
  getShareCapitalMembers: () => Promise<ShareCapitalMember[]>;
  getShareCapitalMemberById: (id: string) => Promise<ShareCapitalMember | undefined>;
  createShareCapitalMember: (member: Partial<ShareCapitalMember>) => Promise<ShareCapitalMember>;
  updateShareCapitalMember: (id: string, updateData: Partial<ShareCapitalMember>) => Promise<ShareCapitalMember | undefined>;
  deleteShareCapitalMember: (id: string) => Promise<boolean>;
  
  // Utility operations
  clearAllData: () => Promise<void>;
  loadSampleData: () => Promise<void>;
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
