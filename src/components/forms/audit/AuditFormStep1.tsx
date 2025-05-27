
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const auditStep1Schema = z.object({
  auditor_type: z.string().min(1, "Auditor type is required"),
  auditor_name: z.string().min(3, "Auditor name must be at least 3 characters"),
  address: z.string().min(1, "Address is required"),
  pin_code: z.string().min(1, "PIN code is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  appointment_date: z.string().min(1, "Appointment date is required"),
  cessation_date: z.string().optional(),
  cessation_type: z.string().optional(),
  firm_registration_number: z.string().min(1, "Firm registration number is required"),
  membership_number: z.string().min(1, "Membership number is required"),
  duration_of_appointment: z.string().min(1, "Duration of appointment is required"),
  pan_of_firm: z.string().min(1, "PAN of firm is required"),
  pan_of_signing_partner: z.string().min(1, "PAN of signing partner is required"),
  email_id: z.string().email("Please enter a valid email"),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
  srn_of_adt: z.string().min(1, "SRN of ADT is required"),
  mode_of_appointment: z.string().min(1, "Mode of appointment is required"),
  attended_agm: z.boolean().optional(),
  branch_office_address: z.string().optional(),
});

type FormData = z.infer<typeof auditStep1Schema>;

interface AuditFormStep1Props {
  onNext: (data: FormData) => void;
  defaultValues?: Partial<FormData>;
}

const AuditFormStep1 = ({ onNext, defaultValues = {} }: AuditFormStep1Props) => {
  const form = useForm<FormData>({
    resolver: zodResolver(auditStep1Schema),
    defaultValues: {
      auditor_type: defaultValues.auditor_type || "",
      auditor_name: defaultValues.auditor_name || "",
      address: defaultValues.address || "",
      pin_code: defaultValues.pin_code || "",
      country: defaultValues.country || "",
      state: defaultValues.state || "",
      city: defaultValues.city || "",
      appointment_date: defaultValues.appointment_date || "",
      cessation_date: defaultValues.cessation_date || "",
      cessation_type: defaultValues.cessation_type || "",
      firm_registration_number: defaultValues.firm_registration_number || "",
      membership_number: defaultValues.membership_number || "",
      duration_of_appointment: defaultValues.duration_of_appointment || "",
      pan_of_firm: defaultValues.pan_of_firm || "",
      pan_of_signing_partner: defaultValues.pan_of_signing_partner || "",
      email_id: defaultValues.email_id || "",
      phone_number: defaultValues.phone_number || "",
      srn_of_adt: defaultValues.srn_of_adt || "",
      mode_of_appointment: defaultValues.mode_of_appointment || "",
      attended_agm: defaultValues.attended_agm || false,
      branch_office_address: defaultValues.branch_office_address || "",
    },
  });

  const handleSubmit = (data: FormData) => {
    onNext(data);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Auditor Information</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="auditor_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Auditor Type*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select auditor type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="firm">Firm</SelectItem>
                        <SelectItem value="llp">LLP</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="auditor_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of Auditor/Proprietary Concern/Partnership Firm*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pin_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PIN Code*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="usa">USA</SelectItem>
                        <SelectItem value="uk">UK</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="appointment_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Appointment*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => {
                            if (date) field.onChange(date.toISOString());
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
                control={form.control}
                name="cessation_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Cessation</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => {
                            if (date) field.onChange(date.toISOString());
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
                control={form.control}
                name="cessation_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cessation Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cessation type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="resignation">Resignation</SelectItem>
                        <SelectItem value="retirement">Retirement</SelectItem>
                        <SelectItem value="removal">Removal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firm_registration_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firm Registration Number*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="membership_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Membership Number of Auditor/Proprietor*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration_of_appointment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration of Appointment*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pan_of_firm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN of Firm*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pan_of_signing_partner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN of Signing Partner/Auditor*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Id*</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="srn_of_adt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SRN of ADT*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mode_of_appointment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mode of Appointment*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select mode of appointment" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="agm">AGM</SelectItem>
                        <SelectItem value="egm">EGM</SelectItem>
                        <SelectItem value="boardMeeting">Board Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="branch_office_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch Office Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="attended_agm"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Whether Statutory Auditor attended Annual General Meeting (AGM)?*
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Next</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AuditFormStep1;
