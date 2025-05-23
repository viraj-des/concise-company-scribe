import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribedCapitalSchema } from "@/schemas/shareCapitalSchema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CapitalType, CapitalMode } from "@/types";
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

interface ShareCapitalFormStep3Props {
  onNext: (data: any) => void;
  onBack: () => void;
  defaultValues?: any;
  previousData?: any;
}

const capitalTypes: CapitalType[] = ["Equity", "Preference", "Other"];
const capitalModes: CapitalMode[] = [
  "Incorporation",
  "Allotment",
  "Transfer",
  "Transmission",
  "Bonus",
  "Conversion",
  "Split",
  "Consolidation",
  "Buy-Back",
  "Other",
];

const ShareCapitalFormStep3 = ({
  onNext,
  onBack,
  defaultValues = {},
  previousData = {},
}: ShareCapitalFormStep3Props) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValues.date ? new Date(defaultValues.date) : undefined
  );

  const [isSameAsIssued, setIsSameAsIssued] = useState(
    defaultValues.isSameAsIssued ?? false
  );

  const form = useForm({
    resolver: zodResolver(subscribedCapitalSchema),
    defaultValues: {
      isSameAsIssued: defaultValues.isSameAsIssued || false,
      capitalType: defaultValues.capitalType || "",
      description: defaultValues.description || "",
      date: defaultValues.date || "",
      mode: defaultValues.mode || "",
      numberOfShares: defaultValues.numberOfShares || "",
      nominalValuePerShare: defaultValues.nominalValuePerShare || "",
      premiumOrDiscountPerShare: defaultValues.premiumOrDiscountPerShare || "",
    },
  });

  const handleSubmit = (data: any) => {
    if (isSameAsIssued && previousData.issuedCapital) {
      // If same as issued, use issued capital data but keep the isSameAsIssued flag
      const subscribedData = {
        ...previousData.issuedCapital,
        isSameAsIssued: true,
      };
      onNext({ subscribedCapital: subscribedData });
    } else {
      onNext({ subscribedCapital: data });
    }
  };

  const toggleSameAsIssued = (checked: boolean) => {
    setIsSameAsIssued(checked);
    form.setValue("isSameAsIssued", checked);
    
    if (checked && previousData.issuedCapital) {
      // Prefill with issued capital data
      form.setValue("capitalType", previousData.issuedCapital.capitalType);
      form.setValue("description", previousData.issuedCapital.description);
      form.setValue("date", previousData.issuedCapital.date);
      form.setValue("mode", previousData.issuedCapital.mode);
      form.setValue("numberOfShares", previousData.issuedCapital.numberOfShares);
      form.setValue("nominalValuePerShare", previousData.issuedCapital.nominalValuePerShare);
      form.setValue("premiumOrDiscountPerShare", previousData.issuedCapital.premiumOrDiscountPerShare);
      
      if (previousData.issuedCapital.date) {
        setDate(new Date(previousData.issuedCapital.date));
      }
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Subscribed Share Capital</h2>
      
      <div className="flex items-center space-x-2 mb-6">
        <Switch
          checked={isSameAsIssued}
          onCheckedChange={toggleSameAsIssued}
          id="same-as-issued"
        />
        <label 
          htmlFor="same-as-issued" 
          className="text-sm font-medium leading-none cursor-pointer"
        >
          Subscribed Share Capital is same as Issued Share Capital
        </label>
      </div>
      
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="capitalType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Capital</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSameAsIssued}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select capital type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {capitalTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSameAsIssued} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`w-full pl-3 text-left font-normal ${
                            !field.value ? "text-muted-foreground" : ""
                          }`}
                          disabled={isSameAsIssued}
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
                        selected={date}
                        onSelect={(date) => {
                          setDate(date);
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
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mode</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSameAsIssued}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {capitalModes.map((mode) => (
                        <SelectItem key={mode} value={mode}>
                          {mode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfShares"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Shares</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" disabled={isSameAsIssued} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nominalValuePerShare"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nominal Value per Share (₹)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" disabled={isSameAsIssued} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="premiumOrDiscountPerShare"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Premium / (Discount) Per Share (₹)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" disabled={isSameAsIssued} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default ShareCapitalFormStep3;
