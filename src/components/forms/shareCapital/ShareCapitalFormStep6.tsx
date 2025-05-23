
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { memberDetailsSchema, equityDetailsSchema, preferenceDetailsSchema } from "@/schemas/shareCapitalSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MemberStatus, Prefix } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ShareCapitalFormStep6Props {
  onNext: (data: any) => void;
  onBack: () => void;
  defaultValues?: any;
}

const memberStatuses: MemberStatus[] = [
  "Individual",
  "Body Corporate",
  "LLP",
  "HUF",
  "Foreign National",
  "Foreign Company",
  "Other",
];

const prefixes: Prefix[] = ["Mr", "Ms", "Mrs", "Smt", "Dr"];

const ShareCapitalFormStep6 = ({
  onNext,
  onBack,
  defaultValues = {},
}: ShareCapitalFormStep6Props) => {
  const [becameMemberDate, setBecameMemberDate] = useState<Date | undefined>(
    defaultValues.equityDetails?.dateOfBecomingMember 
      ? new Date(defaultValues.equityDetails.dateOfBecomingMember) 
      : undefined
  );
  
  const [declarationDate, setDeclarationDate] = useState<Date | undefined>(
    defaultValues.equityDetails?.dateOfDeclaration 
      ? new Date(defaultValues.equityDetails.dateOfDeclaration) 
      : undefined
  );
  
  const [cessationDate, setCessationDate] = useState<Date | undefined>(
    defaultValues.equityDetails?.dateOfCessation 
      ? new Date(defaultValues.equityDetails.dateOfCessation) 
      : undefined
  );
  
  const [prefBecameMemberDate, setPrefBecameMemberDate] = useState<Date | undefined>(
    defaultValues.preferenceDetails?.dateOfBecomingMember 
      ? new Date(defaultValues.preferenceDetails.dateOfBecomingMember) 
      : undefined
  );
  
  const [prefDeclarationDate, setPrefDeclarationDate] = useState<Date | undefined>(
    defaultValues.preferenceDetails?.dateOfDeclaration 
      ? new Date(defaultValues.preferenceDetails.dateOfDeclaration) 
      : undefined
  );
  
  const [prefCessationDate, setPrefCessationDate] = useState<Date | undefined>(
    defaultValues.preferenceDetails?.dateOfCessation 
      ? new Date(defaultValues.preferenceDetails.dateOfCessation) 
      : undefined
  );

  // Member details form
  const memberForm = useForm({
    resolver: zodResolver(memberDetailsSchema),
    defaultValues: {
      status: defaultValues.memberDetails?.status || "",
      prefix: defaultValues.memberDetails?.prefix || "",
      firstName: defaultValues.memberDetails?.firstName || "",
      middleName: defaultValues.memberDetails?.middleName || "",
      lastName: defaultValues.memberDetails?.lastName || "",
      jointShareholderName: defaultValues.memberDetails?.jointShareholderName || "",
      address: defaultValues.memberDetails?.address || "",
      email: defaultValues.memberDetails?.email || "",
      phoneNumber: defaultValues.memberDetails?.phoneNumber || "",
      cinRegistrationNumber: defaultValues.memberDetails?.cinRegistrationNumber || "",
      pan: defaultValues.memberDetails?.pan || "",
      nationality: defaultValues.memberDetails?.nationality || "",
      occupation: defaultValues.memberDetails?.occupation || "",
      isMinor: defaultValues.memberDetails?.isMinor || false,
      hasNomination: defaultValues.memberDetails?.hasNomination || false,
    },
  });

  // Equity details form
  const equityForm = useForm({
    resolver: zodResolver(equityDetailsSchema),
    defaultValues: {
      folioNumberDpIdClientId: defaultValues.equityDetails?.folioNumberDpIdClientId || "",
      dateOfBecomingMember: defaultValues.equityDetails?.dateOfBecomingMember || "",
      nominalValuePerShare: defaultValues.equityDetails?.nominalValuePerShare || "",
      physicalForm: defaultValues.equityDetails?.physicalForm || "",
      dematForm: defaultValues.equityDetails?.dematForm || "",
      dateOfDeclaration: defaultValues.equityDetails?.dateOfDeclaration || "",
      beneficialOwnerName: defaultValues.equityDetails?.beneficialOwnerName || "",
      srnOfMgt6: defaultValues.equityDetails?.srnOfMgt6 || "",
      dateOfCessation: defaultValues.equityDetails?.dateOfCessation || "",
    },
  });

  // Preference details form
  const preferenceForm = useForm({
    resolver: zodResolver(preferenceDetailsSchema),
    defaultValues: {
      folioNumberDpIdClientId: defaultValues.preferenceDetails?.folioNumberDpIdClientId || "",
      dateOfBecomingMember: defaultValues.preferenceDetails?.dateOfBecomingMember || "",
      nominalValuePerShare: defaultValues.preferenceDetails?.nominalValuePerShare || "",
      physicalForm: defaultValues.preferenceDetails?.physicalForm || "",
      dematForm: defaultValues.preferenceDetails?.dematForm || "",
      dateOfDeclaration: defaultValues.preferenceDetails?.dateOfDeclaration || "",
      beneficialOwnerName: defaultValues.preferenceDetails?.beneficialOwnerName || "",
      srnOfMgt6: defaultValues.preferenceDetails?.srnOfMgt6 || "",
      dateOfCessation: defaultValues.preferenceDetails?.dateOfCessation || "",
    },
  });

  const handleSubmit = async () => {
    try {
      // Validate all forms
      const memberDetails = await memberForm.trigger();
      const equityDetails = await equityForm.trigger();
      const preferenceDetails = await preferenceForm.trigger();

      if (!memberDetails) {
        return;
      }

      // Get values from forms
      const memberData = memberForm.getValues();
      const equityData = equityForm.getValues();
      const preferenceData = preferenceForm.getValues();

      // Calculate total shares for equity
      if (equityData.physicalForm && equityData.dematForm) {
        equityData.totalShares = Number(equityData.physicalForm) + Number(equityData.dematForm);
      }

      // Calculate total shares for preference
      if (preferenceData.physicalForm && preferenceData.dematForm) {
        preferenceData.totalShares = Number(preferenceData.physicalForm) + Number(preferenceData.dematForm);
      }

      onNext({
        memberDetails: memberData,
        equityDetails: equityDetails ? equityData : undefined,
        preferenceDetails: preferenceDetails ? preferenceData : undefined,
      });
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Member Details</h2>

      {/* Member Details Form */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Details of Member</h3>
        <Form {...memberForm}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={memberForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select member status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {memberStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={memberForm.control}
                name="prefix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prefix</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select prefix" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {prefixes.map((prefix) => (
                          <SelectItem key={prefix} value={prefix}>
                            {prefix}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={memberForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={memberForm.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={memberForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={memberForm.control}
                name="jointShareholderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Joint Shareholder Name (if any)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={memberForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Address / Registered Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={memberForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={memberForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={memberForm.control}
                name="cinRegistrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CIN / Registration Number (if any)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={memberForm.control}
                name="pan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={memberForm.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={memberForm.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-8 col-span-2">
                <FormField
                  control={memberForm.control}
                  name="isMinor"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">Member is a Minor</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={memberForm.control}
                  name="hasNomination"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">Nomination has been received</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </Form>
      </div>

      {/* Equity and Preference Details Tabs */}
      <Tabs defaultValue="equity" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="equity">Details of Equity</TabsTrigger>
          <TabsTrigger value="preference">Details of Preference</TabsTrigger>
        </TabsList>
        
        {/* Equity Details Tab */}
        <TabsContent value="equity">
          <CardContent className="p-0">
            <Form {...equityForm}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={equityForm.control}
                  name="folioNumberDpIdClientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Folio Number / DP ID-Client ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={equityForm.control}
                  name="dateOfBecomingMember"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Becoming Member</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={`w-full pl-3 text-left font-normal ${
                                !field.value ? "text-muted-foreground" : ""
                              }`}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={becameMemberDate}
                            onSelect={(date) => {
                              setBecameMemberDate(date);
                              field.onChange(date ? date.toISOString() : "");
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={equityForm.control}
                  name="nominalValuePerShare"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nominal Value per Share (₹)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={equityForm.control}
                      name="physicalForm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Physical Form</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              onChange={(e) => {
                                field.onChange(e);
                                const physical = Number(e.target.value) || 0;
                                const demat = Number(equityForm.getValues("dematForm")) || 0;
                                const total = physical + demat;
                                // This is for display only, we'll calculate it again during submission
                                document.getElementById("equity-total")!.innerText = total.toString();
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={equityForm.control}
                      name="dematForm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Demat Form</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              onChange={(e) => {
                                field.onChange(e);
                                const physical = Number(equityForm.getValues("physicalForm")) || 0;
                                const demat = Number(e.target.value) || 0;
                                const total = physical + demat;
                                // This is for display only, we'll calculate it again during submission
                                document.getElementById("equity-total")!.innerText = total.toString();
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormItem>
                      <FormLabel>Total Shares</FormLabel>
                      <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base flex items-center">
                        <span id="equity-total">
                          {
                            (Number(equityForm.getValues("physicalForm")) || 0) +
                            (Number(equityForm.getValues("dematForm")) || 0)
                          }
                        </span>
                      </div>
                    </FormItem>
                  </div>
                </div>

                <FormField
                  control={equityForm.control}
                  name="dateOfDeclaration"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Declaration Under Section 89 (if applicable)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={`w-full pl-3 text-left font-normal ${
                                !field.value ? "text-muted-foreground" : ""
                              }`}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={declarationDate}
                            onSelect={(date) => {
                              setDeclarationDate(date);
                              field.onChange(date ? date.toISOString() : "");
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={equityForm.control}
                  name="beneficialOwnerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name and Address of Beneficial Owner (if applicable)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={equityForm.control}
                  name="srnOfMgt6"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SRN of MGT 6 (if applicable)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={equityForm.control}
                  name="dateOfCessation"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Cessation</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={`w-full pl-3 text-left font-normal ${
                                !field.value ? "text-muted-foreground" : ""
                              }`}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={cessationDate}
                            onSelect={(date) => {
                              setCessationDate(date);
                              field.onChange(date ? date.toISOString() : "");
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Form>
          </CardContent>
        </TabsContent>
        
        {/* Preference Details Tab */}
        <TabsContent value="preference">
          <CardContent className="p-0">
            <Form {...preferenceForm}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={preferenceForm.control}
                  name="folioNumberDpIdClientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Folio Number / DP ID-Client ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={preferenceForm.control}
                  name="dateOfBecomingMember"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Becoming Member</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={`w-full pl-3 text-left font-normal ${
                                !field.value ? "text-muted-foreground" : ""
                              }`}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={prefBecameMemberDate}
                            onSelect={(date) => {
                              setPrefBecameMemberDate(date);
                              field.onChange(date ? date.toISOString() : "");
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={preferenceForm.control}
                  name="nominalValuePerShare"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nominal Value per Share (₹)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={preferenceForm.control}
                      name="physicalForm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Physical Form</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              onChange={(e) => {
                                field.onChange(e);
                                const physical = Number(e.target.value) || 0;
                                const demat = Number(preferenceForm.getValues("dematForm")) || 0;
                                const total = physical + demat;
                                // This is for display only, we'll calculate it again during submission
                                document.getElementById("preference-total")!.innerText = total.toString();
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={preferenceForm.control}
                      name="dematForm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Demat Form</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              onChange={(e) => {
                                field.onChange(e);
                                const physical = Number(preferenceForm.getValues("physicalForm")) || 0;
                                const demat = Number(e.target.value) || 0;
                                const total = physical + demat;
                                // This is for display only, we'll calculate it again during submission
                                document.getElementById("preference-total")!.innerText = total.toString();
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormItem>
                      <FormLabel>Total Shares</FormLabel>
                      <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base flex items-center">
                        <span id="preference-total">
                          {
                            (Number(preferenceForm.getValues("physicalForm")) || 0) +
                            (Number(preferenceForm.getValues("dematForm")) || 0)
                          }
                        </span>
                      </div>
                    </FormItem>
                  </div>
                </div>

                <FormField
                  control={preferenceForm.control}
                  name="dateOfDeclaration"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Declaration Under Section 89 (if applicable)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={`w-full pl-3 text-left font-normal ${
                                !field.value ? "text-muted-foreground" : ""
                              }`}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={prefDeclarationDate}
                            onSelect={(date) => {
                              setPrefDeclarationDate(date);
                              field.onChange(date ? date.toISOString() : "");
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={preferenceForm.control}
                  name="beneficialOwnerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name and Address of Beneficial Owner (if applicable)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={preferenceForm.control}
                  name="srnOfMgt6"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SRN of MGT 6 (if applicable)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={preferenceForm.control}
                  name="dateOfCessation"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Cessation</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={`w-full pl-3 text-left font-normal ${
                                !field.value ? "text-muted-foreground" : ""
                              }`}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={prefCessationDate}
                            onSelect={(date) => {
                              setPrefCessationDate(date);
                              field.onChange(date ? date.toISOString() : "");
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Form>
          </CardContent>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-8">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Card>
  );
};

export default ShareCapitalFormStep6;
