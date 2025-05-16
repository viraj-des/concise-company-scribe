
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
      presentAddress: defaultValues.presentAddress || "",
      presentCountry: defaultValues.presentCountry || "India",
      presentState: defaultValues.presentState || "",
      presentCity: defaultValues.presentCity || "",
      presentPinCode: defaultValues.presentPinCode || "",
      isPermanentSameAsPresent: defaultValues.isPermanentSameAsPresent || false,
      permanentAddress: defaultValues.permanentAddress || "",
      permanentCountry: defaultValues.permanentCountry || "",
      permanentState: defaultValues.permanentState || "",
      permanentCity: defaultValues.permanentCity || "",
      permanentPinCode: defaultValues.permanentPinCode || "",
    },
  });

  // Watch for changes to the same address checkbox
  const sameAsPresent = form.watch("isPermanentSameAsPresent");

  // Update permanent address fields when checkbox is checked
  useEffect(() => {
    if (sameAsPresent) {
      form.setValue("permanentAddress", form.getValues("presentAddress"));
      form.setValue("permanentCountry", form.getValues("presentCountry"));
      form.setValue("permanentState", form.getValues("presentState"));
      form.setValue("permanentCity", form.getValues("presentCity"));
      form.setValue("permanentPinCode", form.getValues("presentPinCode"));
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
                  name="presentAddress"
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
                  name="presentAddressProofFile"
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
                  name="presentCountry"
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
                  name="presentState"
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
                  name="presentCity"
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
                  name="presentPinCode"
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
                name="isPermanentSameAsPresent"
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
                      name="permanentAddress"
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
                      name="permanentAddressProofFile"
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
                      name="permanentCountry"
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
                      name="permanentState"
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
                      name="permanentCity"
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
                      name="permanentPinCode"
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
