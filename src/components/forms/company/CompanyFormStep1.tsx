
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyStep1Schema } from "@/schemas/companySchema";
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
import { Company } from "@/types";

type FormData = z.infer<typeof companyStep1Schema>;

interface CompanyFormStep1Props {
  onNext: (data: Partial<Company>) => void;
  defaultValues?: Partial<FormData>;
}

const CompanyFormStep1 = ({ onNext, defaultValues = {} }: CompanyFormStep1Props) => {
  const form = useForm<FormData>({
    resolver: zodResolver(companyStep1Schema),
    defaultValues: {
      cin: defaultValues.cin || "",
      website: defaultValues.website || "",
      name: defaultValues.name || "",
      incorpDate: defaultValues.incorpDate || "",
      category: defaultValues.category || "",
      class: defaultValues.class || "",
      subcategory: defaultValues.subcategory || "",
    },
  });

  const handleSubmit = (data: FormData) => {
    onNext({
      cin: data.cin,
      coiUrl: data.coiUrl,
      website: data.website,
      name: data.name,
      incorpDate: data.incorpDate,
      category: data.category,
      class: data.class,
      subcategory: data.subcategory,
    });
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Company Basic Information</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="cin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CIN (Corporate Identity Number)*</FormLabel>
                    <FormControl>
                      <Input placeholder="U12345MH2020PTC123456" {...field} />
                    </FormControl>
                    <FormDescription>
                      21-character unique company identifier
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coiFile"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Certificate of Incorporation (COI)*</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => {
                          onChange(e.target.files);
                        }}
                        {...fieldProps}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload COI document (PDF/Image, max 2MB)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Company's official website URL
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC Enterprises Pvt Ltd" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="incorpDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Incorporation*</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category*</FormLabel>
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
                        <SelectItem value="Public">Public</SelectItem>
                        <SelectItem value="Private">Private</SelectItem>
                        <SelectItem value="OPC">One Person Company</SelectItem>
                        <SelectItem value="Section 8">Section 8 Company</SelectItem>
                        <SelectItem value="Foreign">Foreign Company</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Limited by Shares">
                          Limited by Shares
                        </SelectItem>
                        <SelectItem value="Limited by Guarantee">
                          Limited by Guarantee
                        </SelectItem>
                        <SelectItem value="Unlimited Company">
                          Unlimited Company
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subcategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategory*</FormLabel>
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
                        <SelectItem value="Listed Company">
                          Listed Company
                        </SelectItem>
                        <SelectItem value="Non-Government Company">
                          Non-Government Company
                        </SelectItem>
                        <SelectItem value="Government Company">
                          Government Company
                        </SelectItem>
                        <SelectItem value="NBFC">
                          NBFC
                        </SelectItem>
                        <SelectItem value="Banking Company">
                          Banking Company
                        </SelectItem>
                      </SelectContent>
                    </Select>
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

export default CompanyFormStep1;
