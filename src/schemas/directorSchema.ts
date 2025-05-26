
import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

// Step 1: Personal Details
export const directorStep1Schema = z.object({
  designation: z.string().min(1, "Designation is required"),
  designation_category: z.string().min(1, "Designation category is required"),
  designation_subcategory: z.string().min(1, "Designation subcategory is required"),
  din: z.string().min(8, "DIN must be at least 8 characters"),
  prefix: z.string().min(1, "Prefix is required"),
  first_name: z.string().min(1, "First name is required"),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, "Last name is required"),
  father_name: z.string().min(1, "Father's name is required"),
  occupation: z.string().min(1, "Occupation is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  date_of_appointment: z.string().min(1, "Date of appointment is required"),
  date_of_cessation: z.string().optional(),
  membership_number: z.string().optional(),
  practice_number: z.string().optional(),
});

// Step 2: Address Information
export const directorStep2Schema = z.object({
  present_address: z.string().min(1, "Present address is required"),
  present_address_proof_file: z
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
  present_address_proof_url: z.string().optional(),
  present_country: z.string().min(1, "Country is required"),
  present_state: z.string().min(1, "State is required"),
  present_city: z.string().min(1, "City is required"),
  present_pin_code: z.string().min(6, "PIN code must be 6 digits"),
  is_permanent_same_as_present: z.boolean(),
  permanent_address: z.string().optional(),
  permanent_address_proof_file: z
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
  permanent_address_proof_url: z.string().optional(),
  permanent_country: z.string().optional(),
  permanent_state: z.string().optional(),
  permanent_city: z.string().optional(),
  permanent_pin_code: z.string().optional(),
});

// Step 3: Identification
export const directorStep3Schema = z.object({
  email: z.string().email("Please enter a valid email"),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format").optional(),
  driving_license: z.string().optional(),
  passport: z.string().optional(),
  aadhar: z.string().optional(),
});

// Step 4: Entity Interests
export const entityInterestSchema = z.object({
  entity_name: z.string().min(1, "Entity name is required"),
  registration_number: z.string().min(1, "Registration number is required"),
  designation: z.string().min(1, "Designation is required"),
  date_of_appointment: z.string().min(1, "Date of appointment is required"),
  date_of_cessation: z.string().optional(),
  shareholding_percentage: z.number().min(0, "Percentage must be a positive number"),
  shareholding_amount: z.number().min(0, "Amount must be a positive number"),
});

export const directorStep4Schema = z.object({
  has_interest_in_other_entities: z.boolean(),
  other_entities: z.array(entityInterestSchema).optional(),
});

// Step 5: Company Associations
export const directorStep5Schema = z.object({
  companies: z.array(
    z.object({
      company_id: z.string().min(1, "Company ID is required"),
      designation: z.string().min(1, "Designation is required"),
      date_of_appointment: z.string().min(1, "Date of appointment is required"),
      date_of_cessation: z.string().optional(),
    })
  ).optional(),
});
