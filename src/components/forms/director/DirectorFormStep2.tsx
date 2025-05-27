
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { directorStep2Schema } from "@/schemas/directorSchema";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Director } from "@/types";
import { useEffect } from "react";

type FormData = z.infer<typeof directorStep2Schema>;

interface DirectorFormStep2Props {
  onNext: (data: Partial<Director>) => void;
  onBack: () => void;
  defaultValues?: Partial<FormData>;
}

const DirectorFormStep2 = ({ onNext, onBack, defaultValues = {} }: DirectorFormStep2Props) => {
  const form = useForm<FormData>({
    resolver: zodResolver(directorStep2Schema),
    defaultValues: {
      present_address: defaultValues.present_address || "",
      present_country: defaultValues.present_country || "India",
      present_state: defaultValues.present_state || "",
      present_city: defaultValues.present_city || "",
      present_pin_code: defaultValues.present_pin_code || "",
      is_permanent_same_as_present: defaultValues.is_permanent_same_as_present || false,
      permanent_address: defaultValues.permanent_address || "",
      permanent_country: defaultValues.permanent_country || "",
      permanent_state: defaultValues.permanent_state || "",
      permanent_city: defaultValues.permanent_city || "",
      permanent_pin_code: defaultValues.permanent_pin_code || "",
    },
  });

  // Watch for changes to the same address checkbox
  const sameAsPresent = form.watch("is_permanent_same_as_present");

  // Update permanent address fields when checkbox is checked
  useEffect(() => {
    if (sameAsPresent) {
      form.setValue("permanent_address", form.getValues("present_address"));
      form.setValue("permanent_country", form.getValues("present_country"));
      form.setValue("permanent_state", form.getValues("present_state"));
      form.setValue("permanent_city", form.getValues("present_city"));
      form.setValue("permanent_pin_code", form.getValues("present_pin_code"));
    }
  }, [sameAsPresent, form]);

  const handleSubmit = (data: FormData) => {
    onNext(data);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Address Information</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Present Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="present_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Present Address*</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, Apartment 4B" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="present_address_proof_file"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Address Proof*</FormLabel>
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
                        Upload address proof document (PDF/Image, max 2MB)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="present_country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country*</FormLabel>
                      <FormControl>
                        <Input placeholder="India" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="present_state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State*</FormLabel>
                      <FormControl>
                        <Input placeholder="Maharashtra" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="present_city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City*</FormLabel>
                      <FormControl>
                        <Input placeholder="Mumbai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="present_pin_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIN Code*</FormLabel>
                      <FormControl>
                        <Input placeholder="400001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="is_permanent_same_as_present"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Permanent address is same as present address</FormLabel>
                      <FormDescription>
                        Check this if your permanent address is the same as your present address.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {!sameAsPresent && (
                <>
                  <h3 className="text-lg font-medium mt-6">Permanent Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="permanent_address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Permanent Address*</FormLabel>
                          <FormControl>
                            <Input placeholder="456 Park Avenue" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="permanent_address_proof_file"
                      render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                          <FormLabel>Address Proof*</FormLabel>
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
                            Upload address proof document (PDF/Image, max 2MB)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="permanent_country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country*</FormLabel>
                          <FormControl>
                            <Input placeholder="India" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="permanent_state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State*</FormLabel>
                          <FormControl>
                            <Input placeholder="Delhi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="permanent_city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City*</FormLabel>
                          <FormControl>
                            <Input placeholder="New Delhi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="permanent_pin_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PIN Code*</FormLabel>
                          <FormControl>
                            <Input placeholder="110001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
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

export default DirectorFormStep2;
