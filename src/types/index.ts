
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
