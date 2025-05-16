import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

// Director details schema
export const directorPersonalDetailsSchema = z.object({
  designation: z.string().min(1, "Designation is required"),
  designationCategory: z.string().min(1, "Designation category is required"),
  designationSubcategory: z.string().min(1, "Designation subcategory is required"),
  din: z.string().min(8, "DIN must be valid").max(8),
  prefix: z.string().min(1, "Prefix is required"),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  occupation: z.string().min(1, "Occupation is required"),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

// Address details schema
export const directorAddressDetailsSchema = z.object({
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
  
  permanentAddress: z.string().min(1, "Permanent address is required").optional(),
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
}).refine(
  (data) => {
    if (!data.isPermanentSameAsPresent) {
      return !!data.permanentAddress && 
             !!data.permanentCountry && 
             !!data.permanentState && 
             !!data.permanentCity && 
             !!data.permanentPinCode;
    }
    return true;
  },
  {
    message: "Permanent address details are required when not same as present address",
    path: ["permanentAddress"],
  }
);

// Identification details schema
export const directorIdentificationDetailsSchema = z.object({
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format").optional(),
  drivingLicense: z.string().optional(),
  passport: z.string().optional(),
  aadhar: z.string().optional(),
  membershipNumber: z.string().optional(),
  practiceNumber: z.string().optional(),
  dateOfAppointment: z.string().min(1, "Date of appointment is required"),
  dateOfCessation: z.string().optional(),
}).refine(
  (data) => {
    // If nationality is not Indian, passport is required, otherwise PAN is required
    // This is a simplified logic - you might need to adjust based on actual requirements
    if (data.passport) {
      return true;
    }
    return !!data.pan;
  },
  {
    message: "Either PAN (for Indian nationals) or passport (for foreign nationals) is required",
    path: ["pan"],
  }
);

// Entity interest schema
export const entityInterestSchema = z.object({
  entityName: z.string().min(1, "Entity name is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  designation: z.string().min(1, "Designation is required"),
  dateOfAppointment: z.string().min(1, "Date of appointment is required"),
  dateOfCessation: z.string().optional(),
  shareholdingPercentage: z.number().min(0, "Percentage must be between 0 and 100").max(100),
  shareholdingAmount: z.number().min(0, "Amount must be a positive number"),
});

// Other entity interests schema
export const directorEntityInterestsSchema = z.object({
  hasInterestInOtherEntities: z.boolean(),
  otherEntities: z.array(entityInterestSchema).optional(),
}).refine(
  (data) => {
    if (data.hasInterestInOtherEntities) {
      return !!data.otherEntities && data.otherEntities.length > 0;
    }
    return true;
  },
  {
    message: "At least one entity interest is required when declaring interests",
    path: ["otherEntities"],
  }
);

// Company associations schema
export const directorCompanyAssociationsSchema = z.object({
  companies: z.array(
    z.object({
      id: z.string().min(1, "Company ID is required"),
      name: z.string().min(1, "Company name is required"),
      designation: z.string().min(1, "Designation is required"),
      dateOfAppointment: z.string().min(1, "Date of appointment is required"),
      dateOfCessation: z.string().optional(),
    })
  ).min(1, "At least one company association is required"),
});
