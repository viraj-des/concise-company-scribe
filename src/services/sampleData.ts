
import { Company, Director, ShareCapitalMember } from "@/types";
import { v4 as uuid } from 'uuid';

// Sample Companies
export const sampleCompanies: Company[] = [
  {
    id: uuid(),
    name: "TechSolutions Inc.",
    cin: "L12345MH2020PLC987654",
    website: "https://techsolutions.example.com",
    incorpDate: "2020-06-15",
    category: "Private",
    class: "Limited by Shares",
    subcategory: "Non-government company",
    phoneNumber: "+91 9876543210",
    email: "contact@techsolutions.example.com",
    fyStart: "04-01",
    fyEnd: "03-31",
    regAddress: "123 Tech Park, Andheri East",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    pinCode: "400093",
    rocJurisdiction: "RoC-Mumbai",
    branches: [
      {
        id: uuid(),
        address: "456 Business Hub, Powai",
        rdJurisdiction: "Mumbai"
      }
    ],
    corporateRelations: [],
    registrations: {
      pan: "AAACT1234A",
      tan: "MUMT12345A"
    },
    actualBusinessActivity: "IT Services and Software Development"
  },
  {
    id: uuid(),
    name: "GreenEnergy Solutions Pvt. Ltd.",
    cin: "U67890MH2019PTC876543",
    website: "https://greenenergy.example.com",
    incorpDate: "2019-08-10",
    category: "Private",
    class: "Limited by Shares",
    subcategory: "Non-government company",
    phoneNumber: "+91 8765432109",
    email: "info@greenenergy.example.com",
    fyStart: "04-01",
    fyEnd: "03-31",
    regAddress: "789 Green Building, Worli",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    pinCode: "400018",
    rocJurisdiction: "RoC-Mumbai",
    branches: [],
    corporateRelations: [],
    registrations: {
      pan: "AAAGE5678B",
      tan: "MUMG23456B"
    },
    actualBusinessActivity: "Renewable Energy Solutions"
  },
  {
    id: uuid(),
    name: "HealthPlus Medical Systems Ltd.",
    cin: "L54321DL2018PLC765432",
    website: "https://healthplus.example.com",
    incorpDate: "2018-03-22",
    category: "Public",
    class: "Limited by Shares",
    subcategory: "Non-government company",
    phoneNumber: "+91 7654321098",
    email: "contact@healthplus.example.com",
    fyStart: "04-01",
    fyEnd: "03-31",
    regAddress: "321 Healthcare Avenue, Connaught Place",
    country: "India",
    state: "Delhi",
    city: "New Delhi",
    pinCode: "110001",
    rocJurisdiction: "RoC-Delhi",
    branches: [
      {
        id: uuid(),
        address: "654 Hospital Complex, Gurgaon",
        rdJurisdiction: "Gurgaon"
      },
      {
        id: uuid(),
        address: "987 Medical Center, Noida",
        rdJurisdiction: "Noida"
      }
    ],
    corporateRelations: [],
    registrations: {
      pan: "AAAHP9876C",
      tan: "DELH34567C"
    },
    actualBusinessActivity: "Healthcare Services and Medical Systems"
  }
];

// Sample Directors
export const sampleDirectors: Director[] = [
  {
    id: uuid(),
    designation: "Managing Director",
    designationCategory: "Professional",
    designationSubcategory: "Executive Director",
    din: "00123456",
    prefix: "Mr",
    firstName: "Rajesh",
    lastName: "Sharma",
    fatherName: "Mukesh Sharma",
    presentAddress: "123 Directors Colony, Juhu",
    presentCountry: "India",
    presentState: "Maharashtra",
    presentCity: "Mumbai",
    presentPinCode: "400049",
    isPermanentSameAsPresent: true,
    email: "rajesh.sharma@example.com",
    phoneNumber: "+91 9876543210",
    pan: "ABCPS1234D",
    occupation: "Business Executive",
    dateOfBirth: "1975-05-15",
    nationality: "Indian",
    dateOfAppointment: "2020-06-15",
    hasInterestInOtherEntities: false,
    otherEntities: [],
    companies: [sampleCompanies[0], sampleCompanies[1]]
  },
  {
    id: uuid(),
    designation: "Director",
    designationCategory: "Independent",
    designationSubcategory: "Non-Executive Director",
    din: "00234567",
    prefix: "Ms",
    firstName: "Priya",
    lastName: "Patel",
    fatherName: "Suresh Patel",
    presentAddress: "456 Directors Avenue, Bandra",
    presentCountry: "India",
    presentState: "Maharashtra",
    presentCity: "Mumbai",
    presentPinCode: "400050",
    isPermanentSameAsPresent: false,
    permanentAddress: "789 Family Home, Surat",
    permanentCountry: "India",
    permanentState: "Gujarat",
    permanentCity: "Surat",
    permanentPinCode: "395007",
    email: "priya.patel@example.com",
    phoneNumber: "+91 8765432109",
    pan: "DEFPP5678E",
    occupation: "Financial Consultant",
    dateOfBirth: "1980-10-25",
    nationality: "Indian",
    dateOfAppointment: "2019-09-12",
    hasInterestInOtherEntities: true,
    otherEntities: [
      {
        id: uuid(),
        entityName: "Finance Advisory Services LLP",
        registrationNumber: "AAA-1234",
        designation: "Partner",
        dateOfAppointment: "2018-05-20",
        shareholdingPercentage: 25,
        shareholdingAmount: 250000
      }
    ],
    companies: [sampleCompanies[1], sampleCompanies[2]]
  },
  {
    id: uuid(),
    designation: "Whole Time Director",
    designationCategory: "Promoter",
    designationSubcategory: "Executive Director",
    din: "00345678",
    prefix: "Dr",
    firstName: "Anil",
    lastName: "Kapoor",
    fatherName: "Ramesh Kapoor",
    presentAddress: "789 Directors Park, Defence Colony",
    presentCountry: "India",
    presentState: "Delhi",
    presentCity: "New Delhi",
    presentPinCode: "110024",
    isPermanentSameAsPresent: true,
    email: "anil.kapoor@example.com",
    phoneNumber: "+91 7654321098",
    pan: "GHIAK8901F",
    occupation: "Medical Professional",
    dateOfBirth: "1970-03-18",
    nationality: "Indian",
    dateOfAppointment: "2018-03-22",
    hasInterestInOtherEntities: false,
    otherEntities: [],
    companies: [sampleCompanies[2]]
  }
];

// Sample Audits
export const sampleAudits = [
  {
    id: uuid(),
    companyId: sampleCompanies[0].id,
    auditDetails: {
      auditType: "Statutory Audit",
      financialYear: "2022-2023",
      startDate: "2023-04-01",
      endDate: "2023-06-15",
      auditorName: "ABC & Associates",
      auditorRegistrationNumber: "FRN12345",
      auditorAddress: "123 Auditor Street, Fort",
      auditorCity: "Mumbai",
      remarks: "Clean audit with no major findings"
    }
  },
  {
    id: uuid(),
    companyId: sampleCompanies[1].id,
    auditDetails: {
      auditType: "Internal Audit",
      financialYear: "2022-2023",
      startDate: "2023-01-15",
      endDate: "2023-03-20",
      auditorName: "XYZ Auditors LLP",
      auditorRegistrationNumber: "FRN67890",
      auditorAddress: "456 Audit House, Worli",
      auditorCity: "Mumbai",
      remarks: "Minor compliance issues identified and addressed"
    }
  },
  {
    id: uuid(),
    companyId: sampleCompanies[2].id,
    auditDetails: {
      auditType: "Statutory Audit",
      financialYear: "2022-2023",
      startDate: "2023-05-10",
      endDate: "2023-07-25",
      auditorName: "PQR & Co.",
      auditorRegistrationNumber: "FRN54321",
      auditorAddress: "789 Auditor Complex, Connaught Place",
      auditorCity: "New Delhi",
      remarks: "All financial statements found to be in order"
    }
  },
  {
    id: uuid(),
    companyId: sampleCompanies[0].id,
    auditDetails: {
      auditType: "Tax Audit",
      financialYear: "2022-2023",
      startDate: "2023-07-05",
      endDate: "2023-08-15",
      auditorName: "ABC & Associates",
      auditorRegistrationNumber: "FRN12345",
      auditorAddress: "123 Auditor Street, Fort",
      auditorCity: "Mumbai",
      remarks: "Tax compliance verified and confirmed"
    }
  }
];

// Sample Share Capital Members
export const sampleShareCapitalMembers: ShareCapitalMember[] = [
  {
    id: uuid(),
    authorizedCapital: {
      capitalType: "Equity",
      date: "2020-06-15",
      mode: "Incorporation",
      numberOfShares: 100000,
      nominalValuePerShare: 10,
      nominalAmount: 1000000
    },
    issuedCapital: {
      capitalType: "Equity",
      description: "Initial issued capital",
      date: "2020-06-15",
      mode: "Incorporation",
      numberOfShares: 50000,
      nominalValuePerShare: 10,
      premiumOrDiscountPerShare: 0
    },
    subscribedCapital: {
      isSameAsIssued: true,
      capitalType: "Equity",
      description: "Initial subscribed capital",
      date: "2020-06-15",
      mode: "Incorporation",
      numberOfShares: 50000,
      nominalValuePerShare: 10,
      premiumOrDiscountPerShare: 0
    },
    calledUpCapital: {
      isSameAsSubscribed: true,
      capitalType: "Equity",
      description: "Initial called-up capital",
      date: "2020-06-15",
      mode: "Incorporation",
      numberOfShares: 50000,
      nominalValuePerShare: 10,
      amountCalledUpPerShare: 10,
      premiumOrDiscountPerShare: 0
    },
    paidUpCapital: {
      isSameAsCalledUp: true,
      capitalType: "Equity",
      description: "Initial paid-up capital",
      date: "2020-06-15",
      mode: "Incorporation",
      numberOfShares: 50000,
      nominalValuePerShare: 10,
      amountPaidUpPerShare: 10,
      premiumOrDiscountPerShare: 0,
      srnOfPas3: "R12345678"
    },
    memberDetails: {
      status: "Individual",
      prefix: "Mr",
      firstName: "Rajesh",
      lastName: "Sharma",
      address: "123 Directors Colony, Juhu, Mumbai - 400049",
      email: "rajesh.sharma@example.com",
      phoneNumber: "+91 9876543210",
      pan: "ABCPS1234D",
      nationality: "Indian",
      occupation: "Business Executive",
      isMinor: false,
      hasNomination: false
    },
    equityDetails: {
      dateOfBecomingMember: "2020-06-15",
      nominalValuePerShare: 10,
      physicalForm: 0,
      dematForm: 25000,
      totalShares: 25000,
      folioNumberDpIdClientId: "IN301330/12345678"
    }
  },
  {
    id: uuid(),
    authorizedCapital: {
      capitalType: "Equity",
      date: "2019-08-10",
      mode: "Incorporation",
      numberOfShares: 200000,
      nominalValuePerShare: 10,
      nominalAmount: 2000000
    },
    issuedCapital: {
      capitalType: "Equity",
      description: "Initial issued capital",
      date: "2019-08-10",
      mode: "Incorporation",
      numberOfShares: 100000,
      nominalValuePerShare: 10,
      premiumOrDiscountPerShare: 5
    },
    subscribedCapital: {
      isSameAsIssued: true,
      capitalType: "Equity",
      description: "Initial subscribed capital",
      date: "2019-08-10",
      mode: "Incorporation",
      numberOfShares: 100000,
      nominalValuePerShare: 10,
      premiumOrDiscountPerShare: 5
    },
    calledUpCapital: {
      isSameAsSubscribed: true,
      capitalType: "Equity",
      description: "Initial called-up capital",
      date: "2019-08-10",
      mode: "Incorporation",
      numberOfShares: 100000,
      nominalValuePerShare: 10,
      amountCalledUpPerShare: 10,
      premiumOrDiscountPerShare: 5
    },
    paidUpCapital: {
      isSameAsCalledUp: true,
      capitalType: "Equity",
      description: "Initial paid-up capital",
      date: "2019-08-10",
      mode: "Incorporation",
      numberOfShares: 100000,
      nominalValuePerShare: 10,
      amountPaidUpPerShare: 10,
      premiumOrDiscountPerShare: 5,
      srnOfPas3: "G98765432"
    },
    memberDetails: {
      status: "Individual",
      prefix: "Ms",
      firstName: "Priya",
      lastName: "Patel",
      address: "456 Directors Avenue, Bandra, Mumbai - 400050",
      email: "priya.patel@example.com",
      phoneNumber: "+91 8765432109",
      pan: "DEFPP5678E",
      nationality: "Indian",
      occupation: "Financial Consultant",
      isMinor: false,
      hasNomination: true
    },
    equityDetails: {
      dateOfBecomingMember: "2019-08-10",
      nominalValuePerShare: 10,
      physicalForm: 5000,
      dematForm: 30000,
      totalShares: 35000,
      folioNumberDpIdClientId: "IN302269/87654321"
    }
  },
  {
    id: uuid(),
    authorizedCapital: {
      capitalType: "Equity",
      date: "2018-03-22",
      mode: "Incorporation",
      numberOfShares: 500000,
      nominalValuePerShare: 10,
      nominalAmount: 5000000
    },
    issuedCapital: {
      capitalType: "Equity",
      description: "Initial issued capital",
      date: "2018-03-22",
      mode: "Incorporation",
      numberOfShares: 300000,
      nominalValuePerShare: 10,
      premiumOrDiscountPerShare: 15
    },
    subscribedCapital: {
      isSameAsIssued: true,
      capitalType: "Equity",
      description: "Initial subscribed capital",
      date: "2018-03-22",
      mode: "Incorporation",
      numberOfShares: 300000,
      nominalValuePerShare: 10,
      premiumOrDiscountPerShare: 15
    },
    calledUpCapital: {
      isSameAsSubscribed: true,
      capitalType: "Equity",
      description: "Initial called-up capital",
      date: "2018-03-22",
      mode: "Incorporation",
      numberOfShares: 300000,
      nominalValuePerShare: 10,
      amountCalledUpPerShare: 10,
      premiumOrDiscountPerShare: 15
    },
    paidUpCapital: {
      isSameAsCalledUp: true,
      capitalType: "Equity",
      description: "Initial paid-up capital",
      date: "2018-03-22",
      mode: "Incorporation",
      numberOfShares: 300000,
      nominalValuePerShare: 10,
      amountPaidUpPerShare: 10,
      premiumOrDiscountPerShare: 15,
      srnOfPas3: "D54321098"
    },
    memberDetails: {
      status: "Individual",
      prefix: "Dr",
      firstName: "Anil",
      lastName: "Kapoor",
      address: "789 Directors Park, Defence Colony, New Delhi - 110024",
      email: "anil.kapoor@example.com",
      phoneNumber: "+91 7654321098",
      pan: "GHIAK8901F",
      nationality: "Indian",
      occupation: "Medical Professional",
      isMinor: false,
      hasNomination: false
    },
    equityDetails: {
      dateOfBecomingMember: "2018-03-22",
      nominalValuePerShare: 10,
      physicalForm: 0,
      dematForm: 50000,
      totalShares: 50000,
      folioNumberDpIdClientId: "IN303719/10293847"
    }
  },
  {
    id: uuid(),
    authorizedCapital: {
      capitalType: "Preference",
      date: "2021-04-15",
      mode: "Allotment",
      numberOfShares: 20000,
      nominalValuePerShare: 100,
      nominalAmount: 2000000
    },
    issuedCapital: {
      capitalType: "Preference",
      description: "Cumulative Preference Shares",
      date: "2021-04-15",
      mode: "Allotment",
      numberOfShares: 15000,
      nominalValuePerShare: 100,
      premiumOrDiscountPerShare: 10
    },
    subscribedCapital: {
      isSameAsIssued: true,
      capitalType: "Preference",
      description: "Cumulative Preference Shares",
      date: "2021-04-15",
      mode: "Allotment",
      numberOfShares: 15000,
      nominalValuePerShare: 100,
      premiumOrDiscountPerShare: 10
    },
    calledUpCapital: {
      isSameAsSubscribed: true,
      capitalType: "Preference",
      description: "Cumulative Preference Shares",
      date: "2021-04-15",
      mode: "Allotment",
      numberOfShares: 15000,
      nominalValuePerShare: 100,
      amountCalledUpPerShare: 100,
      premiumOrDiscountPerShare: 10
    },
    paidUpCapital: {
      isSameAsCalledUp: true,
      capitalType: "Preference",
      description: "Cumulative Preference Shares",
      date: "2021-04-15",
      mode: "Allotment",
      numberOfShares: 15000,
      nominalValuePerShare: 100,
      amountPaidUpPerShare: 100,
      premiumOrDiscountPerShare: 10,
      srnOfPas3: "P10293847"
    },
    memberDetails: {
      status: "Body Corporate",
      prefix: "Mr",
      firstName: "ABC",
      lastName: "Investments Ltd",
      address: "123 Corporate Tower, BKC, Mumbai - 400051",
      email: "investments@abcgroup.com",
      phoneNumber: "+91 2222334455",
      cinRegistrationNumber: "U67890MH2010PTC234567",
      pan: "AAACI7890G",
      nationality: "Indian",
      occupation: "Investment Company",
      isMinor: false,
      hasNomination: false
    },
    preferenceDetails: {
      dateOfBecomingMember: "2021-04-15",
      nominalValuePerShare: 100,
      physicalForm: 0,
      dematForm: 15000,
      totalShares: 15000,
      folioNumberDpIdClientId: "IN304295/56789012"
    }
  }
];
