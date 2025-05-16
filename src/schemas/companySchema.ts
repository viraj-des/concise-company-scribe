
import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

// Step 1: Basic Company Information
export const companyStep1Schema = z.object({
  cin: z.string().min(21, "CIN must be exactly 21 characters").max(21),
  coiFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "Certificate of Incorporation is required")
    .refine(
      (files) => files[0]?.size <= MAX_FILE_SIZE,
      "File size must be less than 2MB"
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type),
      "Only .jpg, .jpeg, .png and .pdf files are accepted"
    )
    .optional(),
  coiUrl: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional(),
  name: z.string().min(3, "Company name must be at least 3 characters"),
  incorpDate: z.string().min(1, "Date of incorporation is required"),
  category: z.string().min(1, "Category is required"),
  class: z.string().min(1, "Class is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
});

// Step 2: Address Information
export const companyStep2Schema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").optional(),
  email: z.string().email("Please enter a valid email").optional(),
  fyStart: z.string().min(1, "Financial year start date is required"),
  fyEnd: z.string().min(1, "Financial year end date is required"),
  regAddress: z.string().min(1, "Registered office address is required"),
  addressProofFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "Address proof is required")
    .refine(
      (files) => files[0]?.size <= MAX_FILE_SIZE,
      "File size must be less than 2MB"
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type),
      "Only .jpg, .jpeg, .png and .pdf files are accepted"
    )
    .optional(),
  addressProofUrl: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pinCode: z.string().min(6, "PIN code must be 6 digits"),
  rocJurisdiction: z.string().min(1, "ROC jurisdiction is required"),
});

// Step 3: Branch Offices
export const branchSchema = z.object({
  address: z.string().min(1, "Branch address is required"),
  rdJurisdiction: z.string().min(1, "RD jurisdiction is required"),
});

export const companyStep3Schema = z.object({
  branches: z.array(branchSchema).optional(),
  actualBusinessActivity: z.string().optional(),
  alternateBooksAddress: z.string().optional(),
});

// Step 4: Corporate Relations
export const corporateRelationSchema = z.object({
  type: z.enum(["holding", "subsidiary", "associate"]),
  name: z.string().min(1, "Company name is required"),
  cin: z.string().min(21, "CIN must be exactly 21 characters").max(21),
  address: z.string().min(1, "Address is required"),
  shares: z.number().min(0, "Shares must be a positive number"),
  percentage: z.number().min(0, "Percentage must be between 0 and 100").max(100),
  since: z.string().min(1, "Start date is required"),
  end: z.string().optional(),
  section: z.string().min(1, "Section is required"),
});

export const companyStep4Schema = z.object({
  corporateRelations: z.array(corporateRelationSchema).optional(),
});

// Step 5: Registrations
export const companyStep5Schema = z.object({
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
  panFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "PAN file is required")
    .refine(
      (files) => files[0]?.size <= MAX_FILE_SIZE,
      "File size must be less than 2MB"
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type),
      "Only .jpg, .jpeg, .png and .pdf files are accepted"
    )
    .optional(),
  panFileUrl: z.string().optional(),
  
  tan: z.string().regex(/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/, "Invalid TAN format"),
  tanFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "TAN file is required")
    .refine(
      (files) => files[0]?.size <= MAX_FILE_SIZE,
      "File size must be less than 2MB"
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type),
      "Only .jpg, .jpeg, .png and .pdf files are accepted"
    )
    .optional(),
  tanFileUrl: z.string().optional(),
  
  esic: z.string().optional(),
  esicFile: z
    .instanceof(FileList)
    .refine(
      (files) => files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
      "File size must be less than 2MB"
    )
    .refine(
      (files) => files.length === 0 || ACCEPTED_FILE_TYPES.includes(files[0]?.type),
      "Only .jpg, .jpeg, .png and .pdf files are accepted"
    )
    .optional(),
  esicFileUrl: z.string().optional(),
  
  epf: z.string().optional(),
  epfFile: z
    .instanceof(FileList)
    .refine(
      (files) => files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
      "File size must be less than 2MB"
    )
    .refine(
      (files) => files.length === 0 || ACCEPTED_FILE_TYPES.includes(files[0]?.type),
      "Only .jpg, .jpeg, .png and .pdf files are accepted"
    )
    .optional(),
  epfFileUrl: z.string().optional(),
  
  pt: z.string().optional(),
  ptFile: z
    .instanceof(FileList)
    .refine(
      (files) => files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
      "File size must be less than 2MB"
    )
    .refine(
      (files) => files.length === 0 || ACCEPTED_FILE_TYPES.includes(files[0]?.type),
      "Only .jpg, .jpeg, .png and .pdf files are accepted"
    )
    .optional(),
  ptFileUrl: z.string().optional(),
  
  gst: z.string().optional(),
  gstFile: z
    .instanceof(FileList)
    .refine(
      (files) => files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
      "File size must be less than 2MB"
    )
    .refine(
      (files) => files.length === 0 || ACCEPTED_FILE_TYPES.includes(files[0]?.type),
      "Only .jpg, .jpeg, .png and .pdf files are accepted"
    )
    .optional(),
  gstFileUrl: z.string().optional(),
  
  isin: z.string().optional(),
  isinFile: z
    .instanceof(FileList)
    .refine(
      (files) => files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
      "File size must be less than 2MB"
    )
    .refine(
      (files) => files.length === 0 || ACCEPTED_FILE_TYPES.includes(files[0]?.type),
      "Only .jpg, .jpeg, .png and .pdf files are accepted"
    )
    .optional(),
  isinFileUrl: z.string().optional(),
});
