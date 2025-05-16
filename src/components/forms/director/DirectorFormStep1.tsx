
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { directorStep1Schema } from "@/schemas/directorSchema";
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
  FormDescription,
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
import { Director } from "@/types";

type FormData = z.infer<typeof directorStep1Schema>;

interface DirectorFormStep1Props {
  onNext: (data: Partial<Director>) => void;
  defaultValues?: Partial<FormData>;
}

const DirectorFormStep1 = ({ onNext, defaultValues = {} }: DirectorFormStep1Props) => {
  const form = useForm<FormData>({
    resolver: zodResolver(directorStep1Schema),
    defaultValues: {
      designation: defaultValues.designation || "",
      designationCategory: defaultValues.designationCategory || "",
      designationSubcategory: defaultValues.designationSubcategory || "",
      din: defaultValues.din || "",
      prefix: defaultValues.prefix || "",
      firstName: defaultValues.firstName || "",
      middleName: defaultValues.middleName || "",
      lastName: defaultValues.lastName || "",
      fatherName: defaultValues.fatherName || "",
      occupation: defaultValues.occupation || "",
      dateOfBirth: defaultValues.dateOfBirth || "",
      nationality: defaultValues.nationality || "Indian",
      dateOfAppointment: defaultValues.dateOfAppointment || "",
      dateOfCessation: defaultValues.dateOfCessation || "",
      membershipNumber: defaultValues.membershipNumber || "",
      practiceNumber: defaultValues.practiceNumber || "",
    },
  });

  const handleSubmit = (data: FormData) => {
    onNext(data);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Director Personal Information</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select designation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Additional Director">Additional Director</SelectItem>
                        <SelectItem value="Alternate Director">Alternate Director</SelectItem>
                        <SelectItem value="Chief Executive Officer">Chief Executive Officer</SelectItem>
                        <SelectItem value="Chief Financial Officer">Chief Financial Officer</SelectItem>
                        <SelectItem value="Director">Director</SelectItem>
                        <SelectItem value="Managing Director">Managing Director</SelectItem>
                        <SelectItem value="Nominee Director">Nominee Director</SelectItem>
                        <SelectItem value="Secretary">Secretary</SelectItem>
                        <SelectItem value="Whole Time Director">Whole Time Director</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Directors appointed in Casual Vacancy">Directors appointed in Casual Vacancy</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="designationCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category of Designation*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Independent">Independent</SelectItem>
                        <SelectItem value="Promoter">Promoter</SelectItem>
                        <SelectItem value="Professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="designationSubcategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategory of Designation*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subcategory" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Chairman">Chairman</SelectItem>
                        <SelectItem value="Executive Director">Executive Director</SelectItem>
                        <SelectItem value="Non-Executive Director">Non-Executive Director</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="din"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DIN (Director Identification Number)*</FormLabel>
                    <FormControl>
                      <Input placeholder="12345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prefix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prefix*</FormLabel>
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
                        <SelectItem value="Mr">Mr</SelectItem>
                        <SelectItem value="Ms">Ms</SelectItem>
                        <SelectItem value="Mrs">Mrs</SelectItem>
                        <SelectItem value="Smt">Smt</SelectItem>
                        <SelectItem value="Dr">Dr</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input placeholder="William" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fatherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Father's Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="James Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation*</FormLabel>
                    <FormControl>
                      <Input placeholder="Business" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth*</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality*</FormLabel>
                    <FormControl>
                      <Input placeholder="Indian" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfAppointment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Appointment*</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfCessation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Cessation</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="membershipNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Institute Membership Number</FormLabel>
                    <FormControl>
                      <Input placeholder="MEM123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="practiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate of Practice Number</FormLabel>
                    <FormControl>
                      <Input placeholder="COP123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                Next
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DirectorFormStep1;
