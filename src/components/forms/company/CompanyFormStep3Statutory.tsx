
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyStep3Schema } from "@/schemas/companySchema";
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
import { CompanyFormData } from "@/types/company";

type FormData = z.infer<typeof companyStep3Schema>;

interface CompanyFormStep3StatutoryProps {
  onNext: (data: Partial<CompanyFormData>) => void;
  onBack: () => void;
  defaultValues?: Partial<FormData>;
}

const CompanyFormStep3Statutory = ({ onNext, onBack, defaultValues = {} }: CompanyFormStep3StatutoryProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(companyStep3Schema),
    defaultValues: {
      pan: defaultValues.pan || "",
      tan: defaultValues.tan || "",
      gstin: defaultValues.gstin || "",
      rocEmail: defaultValues.rocEmail || "",
      mcaEmail: defaultValues.mcaEmail || "",
      itEmail: defaultValues.itEmail || "",
      shareholderEmail: defaultValues.shareholderEmail || "",
      nicCode: defaultValues.nicCode || "",
      rocJurisdiction: defaultValues.rocJurisdiction || "",
    },
  });

  const handleSubmit = (data: FormData) => {
    onNext(data);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Statutory Identifiers & Compliance</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="pan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN*</FormLabel>
                    <FormControl>
                      <Input placeholder="ABCDE1234F" {...field} />
                    </FormControl>
                    <FormDescription>
                      10-character alphanumeric PAN number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TAN*</FormLabel>
                    <FormControl>
                      <Input placeholder="ABCD12345E" {...field} />
                    </FormControl>
                    <FormDescription>
                      10-character Tax Deduction Account Number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gstin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GSTIN</FormLabel>
                    <FormControl>
                      <Input placeholder="22AAAAA0000A1Z5" {...field} />
                    </FormControl>
                    <FormDescription>
                      15-character GST Identification Number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nicCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIC Code*</FormLabel>
                    <FormControl>
                      <Input placeholder="123456" {...field} />
                    </FormControl>
                    <FormDescription>
                      6-digit National Industrial Classification Code
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rocJurisdiction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ROC Jurisdiction*</FormLabel>
                    <FormControl>
                      <Input placeholder="ROC Mumbai" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Compliance Email Addresses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="rocEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ROC Email*</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="roc@company.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Email for ROC communications
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mcaEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MCA Email*</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="mca@company.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Email for MCA communications
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="itEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Income Tax Email*</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="it@company.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Email for Income Tax communications
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shareholderEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shareholder Communication Email*</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="shareholders@company.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Email for shareholder communications
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onBack}>
                Back
              </Button>
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

export default CompanyFormStep3Statutory;
