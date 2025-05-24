
import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

// Step 1: Basic Company Information & Legal Identity
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

// Step 2: Address & Contact Information
export const companyStep2Schema = z.object({
  regAddress: z.string().min(1, "Registered office address is required"),
  regAddress2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pinCode: z.string().min(6, "PIN code must be 6 digits"),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  faxNumber: z.string().optional(),
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
});

// Step 3: Statutory Identifiers & Compliance
export const companyStep3Schema = z.object({
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
  tan: z.string().regex(/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/, "Invalid TAN format"),
  gstin: z.string().length(15, "GSTIN must be 15 characters").optional(),
  rocEmail: z.string().email("Please enter a valid ROC email"),
  mcaEmail: z.string().email("Please enter a valid MCA email"),
  itEmail: z.string().email("Please enter a valid Income Tax email"),
  shareholderEmail: z.string().email("Please enter a valid shareholder communication email"),
  nicCode: z.string().length(6, "NIC Code must be 6 digits"),
  rocJurisdiction: z.string().min(1, "ROC jurisdiction is required"),
});

// Step 4: Financial Parameters
export const companyStep4Schema = z.object({
  authorizedCapital: z.number().min(0, "Authorized capital must be positive"),
  paidUpCapital: z.number().min(0, "Paid-up capital must be positive"),
  fyStart: z.string().min(1, "Financial year start date is required"),
  fyEnd: z.string().min(1, "Financial year end date is required"),
  agmDate: z.string().optional(),
  firstBoardMeetingDate: z.string().optional(),
  recentResolutionDate: z.string().optional(),
  currency: z.string().default("INR"),
  locale: z.string().default("en-IN"),
});

// Step 5: Management Details
export const companyStep5Schema = z.object({
  numberOfDirectors: z.number().min(1, "Must have at least 1 director"),
  managingDirector: z.string().optional(),
  managingDirectorEmail: z.string().email().optional(),
  cfo: z.string().optional(),
  cfoEmail: z.string().email().optional(),
  companySecretary: z.string().optional(),
  companySecretaryEmail: z.string().email().optional(),
  complianceOfficer: z.string().optional(),
  complianceOfficerEmail: z.string().email().optional(),
});

// Branches Schema - for step 5 in the existing form
export const branchSchema = z.object({
  address: z.string().min(1, "Branch address is required"),
  rdJurisdiction: z.string().min(1, "RD jurisdiction is required"),
});

export const companyStep3BranchesSchema = z.object({
  branches: z.array(branchSchema).optional(),
  actualBusinessActivity: z.string().optional(),
  alternateBooksAddress: z.string().optional(),
});

// Corporate Relations Schema - for step 6 in the existing form
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

export const companyStep4CorporateSchema = z.object({
  corporateRelations: z.array(corporateRelationSchema).optional(),
});

// Registrations Schema - for step 7 in the existing form
export const registrationSchema = z.object({
  pan: z.string().min(1, "PAN is required"),
  panFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "PAN document is required")
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
  tan: z.string().min(1, "TAN is required"),
  tanFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "TAN document is required")
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
