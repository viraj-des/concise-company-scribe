
import { z } from "zod";

// Authorize Capital schema
export const authorizedCapitalSchema = z.object({
  capitalType: z.string(),
  date: z.string(),
  mode: z.string(),
  srnOfSh7: z.string().optional(),
  numberOfShares: z.string(),
  nominalValuePerShare: z.string(),
  nominalAmount: z.string(),
});

// Issued Capital schema
export const issuedCapitalSchema = z.object({
  capitalType: z.string(),
  description: z.string(),
  date: z.string(),
  mode: z.string(),
  numberOfShares: z.string(),
  nominalValuePerShare: z.string(),
  premiumOrDiscountPerShare: z.string(),
});

// Subscribed Capital schema
export const subscribedCapitalSchema = z.object({
  isSameAsIssued: z.boolean(),
  capitalType: z.string(),
  description: z.string(),
  date: z.string(),
  mode: z.string(),
  numberOfShares: z.string(),
  nominalValuePerShare: z.string(),
  premiumOrDiscountPerShare: z.string(),
});

// Called Up Capital schema
export const calledUpCapitalSchema = z.object({
  isSameAsSubscribed: z.boolean(),
  capitalType: z.string(),
  description: z.string(),
  date: z.string(),
  mode: z.string(),
  numberOfShares: z.string(),
  nominalValuePerShare: z.string(),
  amountCalledUpPerShare: z.string(),
  premiumOrDiscountPerShare: z.string(),
});

// Paid Up Capital schema
export const paidUpCapitalSchema = z.object({
  isSameAsCalledUp: z.boolean(),
  capitalType: z.string(),
  description: z.string(),
  date: z.string(),
  mode: z.string(),
  numberOfShares: z.string(),
  nominalValuePerShare: z.string(),
  amountPaidUpPerShare: z.string(),
  premiumOrDiscountPerShare: z.string(),
  srnOfPas3: z.string(),
});

// Member Details schema
export const memberDetailsSchema = z.object({
  status: z.string(),
  prefix: z.string(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  jointShareholderName: z.string().optional(),
  address: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  cinRegistrationNumber: z.string().optional(),
  pan: z.string(),
  nationality: z.string(),
  occupation: z.string(),
  isMinor: z.boolean(),
  hasNomination: z.boolean(),
});

// Equity Details schema
export const equityDetailsSchema = z.object({
  folioNumberDpIdClientId: z.string().optional(),
  dateOfBecomingMember: z.string(),
  nominalValuePerShare: z.string(),
  physicalForm: z.string(),
  dematForm: z.string(),
  dateOfDeclaration: z.string().optional(),
  beneficialOwnerName: z.string().optional(),
  srnOfMgt6: z.string().optional(),
  dateOfCessation: z.string().optional(),
});

// Preference Details schema
export const preferenceDetailsSchema = z.object({
  folioNumberDpIdClientId: z.string().optional(),
  dateOfBecomingMember: z.string(),
  nominalValuePerShare: z.string(),
  physicalForm: z.string(),
  dematForm: z.string(),
  dateOfDeclaration: z.string().optional(),
  beneficialOwnerName: z.string().optional(),
  srnOfMgt6: z.string().optional(),
  dateOfCessation: z.string().optional(),
});

// Combined schema for Share Capital Member
export const shareCapitalMemberSchema = z.object({
  authorizedCapital: authorizedCapitalSchema,
  issuedCapital: issuedCapitalSchema,
  subscribedCapital: subscribedCapitalSchema,
  calledUpCapital: calledUpCapitalSchema,
  paidUpCapital: paidUpCapitalSchema,
  memberDetails: memberDetailsSchema,
  equityDetails: equityDetailsSchema.optional(),
  preferenceDetails: preferenceDetailsSchema.optional(),
});
