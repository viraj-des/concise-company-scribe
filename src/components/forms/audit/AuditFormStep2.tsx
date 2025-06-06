
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const auditStep2Schema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  paidUpCapital: z.string().min(1, "Paid-up capital is required"),
  reservesAndSurplus: z.string().min(1, "Reserves & surplus is required"),
  netWorth: z.string().min(1, "Net worth is required"),
  netProfit: z.string().min(1, "Net profit/loss is required"),
  amountOfBorrowing: z.string().min(1, "Amount of borrowing is required"),
  turnover: z.string().min(1, "Turnover is required"),
});

type FormData = z.infer<typeof auditStep2Schema>;

interface AuditFormStep2Props {
  onNext: (data: FormData) => void;
  onBack: () => void;
  defaultValues?: Partial<FormData>;
}

const AuditFormStep2 = ({ onNext, onBack, defaultValues = {} }: AuditFormStep2Props) => {
  const form = useForm<FormData>({
    resolver: zodResolver(auditStep2Schema),
    defaultValues: {
      startDate: defaultValues.startDate || "",
      endDate: defaultValues.endDate || "",
      paidUpCapital: defaultValues.paidUpCapital || "",
      reservesAndSurplus: defaultValues.reservesAndSurplus || "",
      netWorth: defaultValues.netWorth || "",
      netProfit: defaultValues.netProfit || "",
      amountOfBorrowing: defaultValues.amountOfBorrowing || "",
      turnover: defaultValues.turnover || "",
    },
  });

  const handleSubmit = (data: FormData) => {
    onNext(data);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Figures As On Latest Audited Financials</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => {
                            if (date) field.onChange(date.toISOString());
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
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => {
                            if (date) field.onChange(date.toISOString());
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
                name="paidUpCapital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paid-Up Capital (₹)*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Enter amount in Indian Rupees</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reservesAndSurplus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reserves & Surplus (₹)*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Enter amount in Indian Rupees</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="netWorth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Net Worth (₹)*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Enter amount in Indian Rupees</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="netProfit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Net Profit / (Loss) (₹)*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Enter amount in Indian Rupees</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amountOfBorrowing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount of Borrowing (₹)*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Enter amount in Indian Rupees</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="turnover"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Turnover (₹)*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Enter amount in Indian Rupees</FormDescription>
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

export default AuditFormStep2;
