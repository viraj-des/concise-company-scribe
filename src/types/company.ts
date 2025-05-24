export interface CompanyFormData {
  // Step 1: Basic Information
  cin: string;
  coiFile?: FileList;
  coiUrl?: string;
  website?: string;
  name: string;
  incorpDate: string;
  category: string;
  class: string;
  subcategory: string;

  // Step 2: Address & Contact
  regAddress: string;
  regAddress2?: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  email: string;
  phoneNumber: string;
  faxNumber?: string;
  addressProofFile?: FileList;
  addressProofUrl?: string;

  // Step 3: Statutory Identifiers
  pan: string;
  tan: string;
  gstin?: string;
  rocEmail: string;
  mcaEmail: string;
  itEmail: string;
  shareholderEmail: string;
  nicCode: string;
  rocJurisdiction: string;

  // Step 4: Financial Parameters
  authorizedCapital: number;
  paidUpCapital: number;
  fyStart: string;
  fyEnd: string;
  agmDate?: string;
  firstBoardMeetingDate?: string;
  recentResolutionDate?: string;
  currency: string;
  locale: string;

  // Step 5: Management
  numberOfDirectors: number;
  managingDirector?: string;
  managingDirectorEmail?: string;
  cfo?: string;
  cfoEmail?: string;
  companySecretary?: string;
  companySecretaryEmail?: string;
  complianceOfficer?: string;
  complianceOfficerEmail?: string;

  // Step 6: Audit Information
  auditorFirm: string;
  auditorPartner: string;
  auditorRegistrationNumber: string;
  auditorAddress: string;
  auditorAddress2?: string;
  auditorCity: string;
  auditorState: string;
  auditorCountry: string;
  auditorPinCode: string;
  auditorEmail: string;
  auditorPhone: string;

  // Step 7: Banking
  refundAccountNumber: string;
  refundBankName: string;
  refundBranchAddress: string;
  refundIfscCode: string;

  // Step 8: Branding
  logoFile?: FileList;
  logoUrl?: string;
  watermarkFile?: FileList;
  watermarkUrl?: string;
  termsAndConditions?: string;
  privacyPolicy?: string;

  // Step 9: System Settings
  defaultTimeZone: string;
  supportEmail?: string;
  supportPhone?: string;
  crmIntegrationKey?: string;
  smsGatewayUrl?: string;
  smsApiKey?: string;
  smtpServer?: string;
  smtpPort?: number;
  smtpUsername?: string;
  smtpPassword?: string;

  // Step 10: Security & Advanced
  enableNotifications: boolean;
  auditTrailRetention: number;
  dataEncryptionKey?: string;
  enableTwoFactor: boolean;
  apiRateLimit: number;
  sessionTimeout: number;
  maxFileUploadSize: number;
  logRetentionDuration: number;
  enableDebugMode: boolean;
  conditionalFilingRequirements?: string;
  llpSpecificSections?: string;
  enableDataDownload: boolean;

  // Existing fields (branches, corporate relations, etc.)
  branches?: Array<{
    address: string;
    rdJurisdiction: string;
  }>;
  corporateRelations?: Array<{
    type: 'holding' | 'subsidiary' | 'associate';
    name: string;
    cin: string;
    address: string;
    shares: number;
    percentage: number;
    since: string;
    end?: string;
    section: string;
  }>;
  actualBusinessActivity?: string;
  alternateBooksAddress?: string;
}
