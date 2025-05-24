
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyStep4Schema } from "@/schemas/companySchema";
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
import { CompanyFormData } from "@/types/company";

type FormData = z.infer<typeof companyStep4Schema>;

interface CompanyFormStep4FinancialProps {
  onNext: (data: Partial<CompanyFormData>) => void;
  onBack: () => void;
  defaultValues?: Partial<FormData>;
}

const CompanyFormStep4Financial = ({ onNext, onBack, defaultValues = {} }: CompanyFormStep4FinancialProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(companyStep4Schema),
    defaultValues: {
      authorizedCapital: defaultValues.authorizedCapital || 0,
      paidUpCapital: defaultValues.paidUpCapital || 0,
      fyStart: defaultValues.fyStart || "",
      fyEnd: defaultValues.fyEnd || "",
      agmDate: defaultValues.agmDate || "",
      firstBoardMeetingDate: defaultValues.firstBoardMeetingDate || "",
      recentResolutionDate: defaultValues.recentResolutionDate || "",
      currency: defaultValues.currency || "INR",
      locale: defaultValues.locale || "en-IN",
    },
  });

  const handleSubmit = (data: FormData) => {
    onNext(data);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Financial Parameters</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="authorizedCapital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Authorized Capital (₹)*</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="1000000" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Maximum share capital authorized by MOA
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paidUpCapital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paid-Up Capital (₹)*</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="500000" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Actual capital paid by shareholders
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fyStart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Financial Year Start*</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fyEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Financial Year End*</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agmDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of AGM</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>
                      Annual General Meeting date
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstBoardMeetingDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Board Meeting Post-FY End</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recentResolutionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recent Shareholder Resolution Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>
                      Cross-references the Meeting sheet
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Currency*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="locale"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Locale*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select locale" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="en-IN">en-IN - English (India)</SelectItem>
                        <SelectItem value="hi-IN">hi-IN - Hindi (India)</SelectItem>
                        <SelectItem value="en-US">en-US - English (US)</SelectItem>
                        <SelectItem value="en-GB">en-GB - English (UK)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

export default CompanyFormStep4Financial;
