import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calledUpCapitalSchema } from "@/schemas/shareCapitalSchema";
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

interface ShareCapitalFormStep4Props {
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

const ShareCapitalFormStep4 = ({
  onNext,
  onBack,
  defaultValues = {},
  previousData = {},
}: ShareCapitalFormStep4Props) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValues.date ? new Date(defaultValues.date) : undefined
  );

  const [isSameAsSubscribed, setIsSameAsSubscribed] = useState(
    defaultValues.isSameAsSubscribed ?? false
  );

  const form = useForm({
    resolver: zodResolver(calledUpCapitalSchema),
    defaultValues: {
      isSameAsSubscribed: defaultValues.isSameAsSubscribed || false,
      capitalType: defaultValues.capitalType || "",
      description: defaultValues.description || "",
      date: defaultValues.date || "",
      mode: defaultValues.mode || "",
      numberOfShares: defaultValues.numberOfShares || "",
      nominalValuePerShare: defaultValues.nominalValuePerShare || "",
      amountCalledUpPerShare: defaultValues.amountCalledUpPerShare || "",
      premiumOrDiscountPerShare: defaultValues.premiumOrDiscountPerShare || "",
    },
  });

  const handleSubmit = (data: any) => {
    if (isSameAsSubscribed && previousData.subscribedCapital) {
      // If same as subscribed, use subscribed capital data but keep the isSameAsSubscribed flag
      // and add the missing field
      const calledUpData = {
        ...previousData.subscribedCapital,
        isSameAsSubscribed: true,
        amountCalledUpPerShare: data.amountCalledUpPerShare || "",
      };
      onNext({ calledUpCapital: calledUpData });
    } else {
      onNext({ calledUpCapital: data });
    }
  };

  const toggleSameAsSubscribed = (checked: boolean) => {
    setIsSameAsSubscribed(checked);
    form.setValue("isSameAsSubscribed", checked);
    
    if (checked && previousData.subscribedCapital) {
      // Prefill with subscribed capital data
      form.setValue("capitalType", previousData.subscribedCapital.capitalType);
      form.setValue("description", previousData.subscribedCapital.description);
      form.setValue("date", previousData.subscribedCapital.date);
      form.setValue("mode", previousData.subscribedCapital.mode);
      form.setValue("numberOfShares", previousData.subscribedCapital.numberOfShares);
      form.setValue("nominalValuePerShare", previousData.subscribedCapital.nominalValuePerShare);
      form.setValue("premiumOrDiscountPerShare", previousData.subscribedCapital.premiumOrDiscountPerShare);
      
      if (previousData.subscribedCapital.date) {
        setDate(new Date(previousData.subscribedCapital.date));
      }
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Called Up Share Capital</h2>
      
      <div className="flex items-center space-x-2 mb-6">
        <Switch
          checked={isSameAsSubscribed}
          onCheckedChange={toggleSameAsSubscribed}
          id="same-as-subscribed"
        />
        <label 
          htmlFor="same-as-subscribed" 
          className="text-sm font-medium leading-none cursor-pointer"
        >
          Called Up Share Capital is same as Subscribed Share Capital
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
                    disabled={isSameAsSubscribed}
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
                    <Input {...field} disabled={isSameAsSubscribed} />
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
                          disabled={isSameAsSubscribed}
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
                    disabled={isSameAsSubscribed}
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
                    <Input {...field} type="number" disabled={isSameAsSubscribed} />
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
                    <Input {...field} type="number" disabled={isSameAsSubscribed} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amountCalledUpPerShare"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount Called Up Per Share (₹)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
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
                    <Input {...field} type="number" disabled={isSameAsSubscribed} />
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

export default ShareCapitalFormStep4;
