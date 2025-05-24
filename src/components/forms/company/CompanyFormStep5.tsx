
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "@/schemas/companySchema";
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

type FormData = z.infer<typeof registrationSchema>;

interface CompanyFormStep5Props {
  onNext: (data: FormData) => void;
  onBack: () => void;
  defaultValues?: Partial<FormData>;
}

const CompanyFormStep5 = ({ onNext, onBack, defaultValues = {} }: CompanyFormStep5Props) => {
  const form = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      pan: defaultValues.pan || "",
      panFileUrl: defaultValues.panFileUrl || "",
      tan: defaultValues.tan || "",
      tanFileUrl: defaultValues.tanFileUrl || "",
      esic: defaultValues.esic || "",
      esicFileUrl: defaultValues.esicFileUrl || "",
      epf: defaultValues.epf || "",
      epfFileUrl: defaultValues.epfFileUrl || "",
      pt: defaultValues.pt || "",
      ptFileUrl: defaultValues.ptFileUrl || "",
      gst: defaultValues.gst || "",
      gstFileUrl: defaultValues.gstFileUrl || "",
      isin: defaultValues.isin || "",
      isinFileUrl: defaultValues.isinFileUrl || "",
    },
  });

  const handleSubmit = (data: FormData) => {
    onNext(data);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Registrations & Compliances</h2>
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
                      <Input placeholder="AAAAA1234A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="panFile"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>PAN Document*</FormLabel>
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
                      Upload PAN card document (PDF/Image, max 2MB)
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
                      <Input placeholder="AAAA12345A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tanFile"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>TAN Document*</FormLabel>
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
                      Upload TAN document (PDF/Image, max 2MB)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="esic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ESIC Registration</FormLabel>
                    <FormControl>
                      <Input placeholder="ESIC Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="esicFile"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>ESIC Document</FormLabel>
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
                      Upload ESIC document (PDF/Image, max 2MB)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="epf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>EPF Registration</FormLabel>
                    <FormControl>
                      <Input placeholder="EPF Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="epfFile"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>EPF Document</FormLabel>
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
                      Upload EPF document (PDF/Image, max 2MB)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Tax Registration</FormLabel>
                    <FormControl>
                      <Input placeholder="PT Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ptFile"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>PT Document</FormLabel>
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
                      Upload PT document (PDF/Image, max 2MB)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gst"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GST Registration</FormLabel>
                    <FormControl>
                      <Input placeholder="GST Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gstFile"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>GST Document</FormLabel>
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
                      Upload GST document (PDF/Image, max 2MB)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISIN (For Listed Companies)</FormLabel>
                    <FormControl>
                      <Input placeholder="ISIN Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isinFile"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>ISIN Document</FormLabel>
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
                      Upload ISIN document (PDF/Image, max 2MB)
                    </FormDescription>
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
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CompanyFormStep5;
