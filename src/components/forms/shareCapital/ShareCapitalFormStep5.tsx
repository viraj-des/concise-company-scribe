import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paidUpCapitalSchema } from "@/schemas/shareCapitalSchema";
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

interface ShareCapitalFormStep5Props {
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

const ShareCapitalFormStep5 = ({
  onNext,
  onBack,
  defaultValues = {},
  previousData = {},
}: ShareCapitalFormStep5Props) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValues.date ? new Date(defaultValues.date) : undefined
  );

  const [isSameAsCalledUp, setIsSameAsCalledUp] = useState(
    defaultValues.isSameAsCalledUp ?? false
  );

  const form = useForm({
    resolver: zodResolver(paidUpCapitalSchema),
    defaultValues: {
      isSameAsCalledUp: defaultValues.isSameAsCalledUp || false,
      capitalType: defaultValues.capitalType || "",
      description: defaultValues.description || "",
      date: defaultValues.date || "",
      mode: defaultValues.mode || "",
      numberOfShares: defaultValues.numberOfShares || "",
      nominalValuePerShare: defaultValues.nominalValuePerShare || "",
      amountPaidUpPerShare: defaultValues.amountPaidUpPerShare || "",
      premiumOrDiscountPerShare: defaultValues.premiumOrDiscountPerShare || "",
      srnOfPas3: defaultValues.srnOfPas3 || "",
    },
  });

  const handleSubmit = (data: any) => {
    if (isSameAsCalledUp && previousData.calledUpCapital) {
      // If same as called up, use called up capital data but keep the isSameAsCalledUp flag
      // and add or rename missing fields
      const paidUpData = {
        ...previousData.calledUpCapital,
        isSameAsCalledUp: true,
        amountPaidUpPerShare: previousData.calledUpCapital.amountCalledUpPerShare || "",
        srnOfPas3: data.srnOfPas3 || "",
      };
      onNext({ paidUpCapital: paidUpData });
    } else {
      onNext({ paidUpCapital: data });
    }
  };

  const toggleSameAsCalledUp = (checked: boolean) => {
    setIsSameAsCalledUp(checked);
    form.setValue("isSameAsCalledUp", checked);
    
    if (checked && previousData.calledUpCapital) {
      // Prefill with called up capital data
      form.setValue("capitalType", previousData.calledUpCapital.capitalType);
      form.setValue("description", previousData.calledUpCapital.description);
      form.setValue("date", previousData.calledUpCapital.date);
      form.setValue("mode", previousData.calledUpCapital.mode);
      form.setValue("numberOfShares", previousData.calledUpCapital.numberOfShares);
      form.setValue("nominalValuePerShare", previousData.calledUpCapital.nominalValuePerShare);
      form.setValue("amountPaidUpPerShare", previousData.calledUpCapital.amountCalledUpPerShare);
      form.setValue("premiumOrDiscountPerShare", previousData.calledUpCapital.premiumOrDiscountPerShare);
      
      if (previousData.calledUpCapital.date) {
        setDate(new Date(previousData.calledUpCapital.date));
      }
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Paid Up Share Capital</h2>
      
      <div className="flex items-center space-x-2 mb-6">
        <Switch
          checked={isSameAsCalledUp}
          onCheckedChange={toggleSameAsCalledUp}
          id="same-as-calledup"
        />
        <label 
          htmlFor="same-as-calledup" 
          className="text-sm font-medium leading-none cursor-pointer"
        >
          Paid Up Share Capital is same as Called Up Share Capital
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
                    disabled={isSameAsCalledUp}
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
                    <Input {...field} disabled={isSameAsCalledUp} />
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
                          disabled={isSameAsCalledUp}
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
                    disabled={isSameAsCalledUp}
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
                    <Input {...field} type="number" disabled={isSameAsCalledUp} />
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
                    <Input {...field} type="number" disabled={isSameAsCalledUp} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amountPaidUpPerShare"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount Paid Up Per Share (₹)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" disabled={isSameAsCalledUp} />
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
                    <Input {...field} type="number" disabled={isSameAsCalledUp} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="srnOfPas3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SRN of PAS-3</FormLabel>
                  <FormControl>
                    <Input {...field} />
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

export default ShareCapitalFormStep5;
