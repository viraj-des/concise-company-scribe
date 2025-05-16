
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { directorStep4Schema, entityInterestSchema } from "@/schemas/directorSchema";
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
import { Director, EntityInterest } from "@/types";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";

type FormData = z.infer<typeof directorStep4Schema>;
type EntityInterestFormData = z.infer<typeof entityInterestSchema>;

interface DirectorFormStep4Props {
  onNext: (data: Partial<Director>) => void;
  onBack: () => void;
  defaultValues?: Partial<FormData>;
}

const DirectorFormStep4 = ({ onNext, onBack, defaultValues = {} }: DirectorFormStep4Props) => {
  const [entities, setEntities] = useState<EntityInterest[]>(defaultValues.otherEntities || []);

  const form = useForm<FormData>({
    resolver: zodResolver(directorStep4Schema),
    defaultValues: {
      hasInterestInOtherEntities: defaultValues.hasInterestInOtherEntities || false,
      otherEntities: defaultValues.otherEntities || [],
    },
  });

  const entityForm = useForm<EntityInterestFormData>({
    resolver: zodResolver(entityInterestSchema),
    defaultValues: {
      entityName: "",
      registrationNumber: "",
      designation: "",
      dateOfAppointment: "",
      shareholdingPercentage: 0,
      shareholdingAmount: 0,
    },
  });

  const hasInterest = form.watch("hasInterestInOtherEntities");

  const addEntity = (data: EntityInterestFormData) => {
    const newEntity: EntityInterest = {
      ...data,
      id: Date.now().toString(),
    };
    
    setEntities([...entities, newEntity]);
    entityForm.reset();
  };

  const removeEntity = (id: string) => {
    setEntities(entities.filter(entity => entity.id !== id));
  };

  const handleSubmit = () => {
    form.setValue("otherEntities", entities);
    onNext({
      hasInterestInOtherEntities: form.getValues("hasInterestInOtherEntities"),
      otherEntities: entities
    });
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Entity Interests</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="hasInterestInOtherEntities"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Does the director have interest in other entities?</FormLabel>
                    <FormDescription>
                      Check this if the director has any interest in other companies, LLPs, or other entities.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {hasInterest && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-md border">
                  <h3 className="text-md font-medium mb-4">Add Entity Interest</h3>
                  <Form {...entityForm}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={entityForm.control}
                        name="entityName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Entity Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="XYZ Enterprises Ltd" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={entityForm.control}
                        name="registrationNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Registration Number*</FormLabel>
                            <FormControl>
                              <Input placeholder="CIN/LLPIN/Registration No" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={entityForm.control}
                        name="designation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Designation*</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select designation" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Director">Director</SelectItem>
                                <SelectItem value="Managing Director">Managing Director</SelectItem>
                                <SelectItem value="Partner">Partner</SelectItem>
                                <SelectItem value="Proprietor">Proprietor</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={entityForm.control}
                        name="dateOfAppointment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Appointment*</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={entityForm.control}
                        name="dateOfCessation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Cessation</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={entityForm.control}
                        name="shareholdingPercentage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shareholding Percentage (%)*</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="10.5" 
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={entityForm.control}
                        name="shareholdingAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shareholding Amount (₹)*</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="100000" 
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button 
                        type="button" 
                        onClick={entityForm.handleSubmit(addEntity)}
                        className="flex items-center"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Entity
                      </Button>
                    </div>
                  </Form>
                </div>

                {entities.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-md font-medium mb-2">Added Entities</h3>
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shareholding %</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {entities.map((entity) => (
                            <tr key={entity.id}>
                              <td className="px-6 py-4 whitespace-nowrap">{entity.entityName}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{entity.designation}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{entity.shareholdingPercentage}%</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => removeEntity(entity.id || "")}
                                  className="text-red-500"
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

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

export default DirectorFormStep4;
