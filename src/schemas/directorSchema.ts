
import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

// Step 1: Personal Details
export const directorStep1Schema = z.object({
  designation: z.string().min(1, "Designation is required"),
  designationCategory: z.string().min(1, "Designation category is required"),
  designationSubcategory: z.string().min(1, "Designation subcategory is required"),
  din: z.string().min(8, "DIN must be at least 8 characters"),
  prefix: z.string().min(1, "Prefix is required"),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  occupation: z.string().min(1, "Occupation is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  dateOfAppointment: z.string().min(1, "Date of appointment is required"),
  dateOfCessation: z.string().optional(),
  membershipNumber: z.string().optional(),
  practiceNumber: z.string().optional(),
});

// Step 2: Address Information
export const directorStep2Schema = z.object({
  presentAddress: z.string().min(1, "Present address is required"),
  presentAddressProofFile: z
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
  presentAddressProofUrl: z.string().optional(),
  presentCountry: z.string().min(1, "Country is required"),
  presentState: z.string().min(1, "State is required"),
  presentCity: z.string().min(1, "City is required"),
  presentPinCode: z.string().min(6, "PIN code must be 6 digits"),
  isPermanentSameAsPresent: z.boolean(),
  permanentAddress: z.string().optional(),
  permanentAddressProofFile: z
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
  permanentAddressProofUrl: z.string().optional(),
  permanentCountry: z.string().optional(),
  permanentState: z.string().optional(),
  permanentCity: z.string().optional(),
  permanentPinCode: z.string().optional(),
});

// Step 3: Identification
export const directorStep3Schema = z.object({
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format").optional(),
  drivingLicense: z.string().optional(),
  passport: z.string().optional(),
  aadhar: z.string().optional(),
});

// Step 4: Entity Interests
// All required fields in EntityInterest interface must also be required here
export const entityInterestSchema = z.object({
  entityName: z.string().min(1, "Entity name is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  designation: z.string().min(1, "Designation is required"),
  dateOfAppointment: z.string().min(1, "Date of appointment is required"),
  dateOfCessation: z.string().optional(),
  shareholdingPercentage: z.number().min(0, "Percentage must be a positive number"),
  shareholdingAmount: z.number().min(0, "Amount must be a positive number"),
});

export const directorStep4Schema = z.object({
  hasInterestInOtherEntities: z.boolean(),
  otherEntities: z.array(entityInterestSchema).optional(),
});

// Step 5: Company Associations
export const directorStep5Schema = z.object({
  companies: z.array(
    z.object({
      companyId: z.string().min(1, "Company ID is required"),
      designation: z.string().min(1, "Designation is required"),
      dateOfAppointment: z.string().min(1, "Date of appointment is required"),
      dateOfCessation: z.string().optional(),
    })
  ).optional(),
});
