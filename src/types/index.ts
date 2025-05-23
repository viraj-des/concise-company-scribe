
export interface Company {
  id?: string;
  cin: string;
  coiUrl?: string;
  website?: string;
  name: string;
  incorpDate: string;
  category: string;
  class: string;
  subcategory: string;
  phoneNumber?: string;
  email?: string;
  fyStart: string;
  fyEnd: string;
  regAddress?: string;
  addressProofUrl?: string;
  country: string;
  state: string;
  city: string;
  pinCode: string;
  rocJurisdiction: string;
  branches: Branch[];
  corporateRelations: CorporateRelation[];
  registrations: Registration;
  actualBusinessActivity?: string;
  alternateBooksAddress?: string;
  directors?: Director[];
}

export interface Branch {
  id?: string;
  address: string;
  rdJurisdiction: string;
}

export interface CorporateRelation {
  id?: string;
  type: 'holding' | 'subsidiary' | 'associate';
  name: string;
  cin: string;
  address: string;
  shares: number;
  percentage: number;
  since: string;
  end?: string;
  section: string;
}

export interface Registration {
  id?: string;
  pan: string;
  panFileUrl?: string;
  tan: string;
  tanFileUrl?: string;
  esic?: string;
  esicFileUrl?: string;
  epf?: string;
  epfFileUrl?: string;
  pt?: string;
  ptFileUrl?: string;
  gst?: string;
  gstFileUrl?: string;
  isin?: string;
  isinFileUrl?: string;
}

export type Designation = 
  | 'Additional Director'
  | 'Alternate Director'
  | 'Chief Executive Officer'
  | 'Chief Financial Officer'
  | 'Director'
  | 'Managing Director'
  | 'Nominee Director'
  | 'Secretary'
  | 'Whole Time Director'
  | 'Manager'
  | 'Directors appointed in Casual Vacancy'
  | 'Other'
  | 'Partner'  // Added for entity interests
  | 'Proprietor'; // Added for entity interests

export type DesignationCategory = 'Independent' | 'Promoter' | 'Professional';
export type DesignationSubcategory = 'Chairman' | 'Executive Director' | 'Non-Executive Director';
export type Prefix = 'Mr' | 'Ms' | 'Mrs' | 'Smt' | 'Dr';

export interface Director {
  id?: string;
  designation: Designation;
  designationCategory: DesignationCategory;
  designationSubcategory: DesignationSubcategory;
  din: string;
  prefix: Prefix;
  firstName: string;
  middleName?: string;
  lastName: string;
  fatherName: string;
  presentAddress: string;
  presentAddressProofUrl?: string;
  presentCountry: string;
  presentState: string;
  presentCity: string;
  presentPinCode: string;
  isPermanentSameAsPresent: boolean;
  permanentAddress?: string;
  permanentAddressProofUrl?: string;
  permanentCountry?: string;
  permanentState?: string;
  permanentCity?: string;
  permanentPinCode?: string;
  email: string;
  phoneNumber: string;
  pan?: string;
  drivingLicense?: string;
  passport?: string;
  aadhar?: string;
  occupation: string;
  dateOfBirth: string;
  nationality: string;
  membershipNumber?: string;
  practiceNumber?: string;
  dateOfAppointment: string;
  dateOfCessation?: string;
  hasInterestInOtherEntities: boolean;
  otherEntities?: EntityInterest[];
  companies?: Company[];
}

export interface EntityInterest {
  id?: string;
  entityName: string;
  registrationNumber: string;
  designation: Designation;
  dateOfAppointment: string;
  dateOfCessation?: string;
  shareholdingPercentage: number;
  shareholdingAmount: number;
}

export interface DirectorCompanyRelation {
  directorId: string;
  companyId: string;
  designation: Designation;
  dateOfAppointment: string;
  dateOfCessation?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Employee' | 'Super-User';
}

// Share Capital Members Types
export type CapitalType = 'Equity' | 'Preference' | 'Other';
export type MemberStatus = 'Individual' | 'Body Corporate' | 'LLP' | 'HUF' | 'Foreign National' | 'Foreign Company' | 'Other';
export type CapitalMode = 'Incorporation' | 'Allotment' | 'Transfer' | 'Transmission' | 'Bonus' | 'Conversion' | 'Split' | 'Consolidation' | 'Buy-Back' | 'Other';

export interface AuthorizedCapital {
  id?: string;
  capitalType: CapitalType;
  date: string;
  mode: CapitalMode;
  srnOfSh7?: string;
  numberOfShares: number;
  nominalValuePerShare: number;
  nominalAmount: number;
}

export interface IssuedCapital {
  id?: string;
  capitalType: CapitalType;
  description: string;
  date: string;
  mode: CapitalMode;
  numberOfShares: number;
  nominalValuePerShare: number;
  premiumOrDiscountPerShare: number;
}

export interface SubscribedCapital {
  id?: string;
  isSameAsIssued: boolean;
  capitalType: CapitalType;
  description: string;
  date: string;
  mode: CapitalMode;
  numberOfShares: number;
  nominalValuePerShare: number;
  premiumOrDiscountPerShare: number;
}

export interface CalledUpCapital {
  id?: string;
  isSameAsSubscribed: boolean;
  capitalType: CapitalType;
  description: string;
  date: string;
  mode: CapitalMode;
  numberOfShares: number;
  nominalValuePerShare: number;
  amountCalledUpPerShare: number;
  premiumOrDiscountPerShare: number;
}

export interface PaidUpCapital {
  id?: string;
  isSameAsCalledUp: boolean;
  capitalType: CapitalType;
  description: string;
  date: string;
  mode: CapitalMode;
  numberOfShares: number;
  nominalValuePerShare: number;
  amountPaidUpPerShare: number;
  premiumOrDiscountPerShare: number;
  srnOfPas3: string;
}

export interface MemberDetails {
  id?: string;
  status: MemberStatus;
  prefix: Prefix;
  firstName: string;
  middleName?: string;
  lastName: string;
  jointShareholderName?: string;
  address: string;
  email: string;
  phoneNumber: string;
  cinRegistrationNumber?: string;
  pan: string;
  nationality: string;
  occupation: string;
  isMinor: boolean;
  hasNomination: boolean;
}

export interface EquityDetails {
  id?: string;
  folioNumberDpIdClientId?: string;
  dateOfBecomingMember: string;
  nominalValuePerShare: number;
  physicalForm: number;
  dematForm: number;
  totalShares?: number;
  dateOfDeclaration?: string;
  beneficialOwnerName?: string;
  srnOfMgt6?: string;
  dateOfCessation?: string;
}

export interface PreferenceDetails {
  id?: string;
  folioNumberDpIdClientId?: string;
  dateOfBecomingMember: string;
  nominalValuePerShare: number;
  physicalForm: number;
  dematForm: number;
  totalShares?: number;
  dateOfDeclaration?: string;
  beneficialOwnerName?: string;
  srnOfMgt6?: string;
  dateOfCessation?: string;
}

export interface ShareCapitalMember {
  id?: string;
  authorizedCapital: AuthorizedCapital;
  issuedCapital: IssuedCapital;
  subscribedCapital: SubscribedCapital;
  calledUpCapital: CalledUpCapital;
  paidUpCapital: PaidUpCapital;
  memberDetails: MemberDetails;
  equityDetails?: EquityDetails;
  preferenceDetails?: PreferenceDetails;
}
