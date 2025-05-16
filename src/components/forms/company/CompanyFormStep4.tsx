
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyStep4Schema, corporateRelationSchema } from "@/schemas/companySchema";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Company, CorporateRelation } from "@/types";
import { useState } from "react";
import { Plus, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormData = z.infer<typeof companyStep4Schema>;
type RelationFormData = z.infer<typeof corporateRelationSchema>;

interface CompanyFormStep4Props {
  onNext: (data: Partial<Company>) => void;
  onBack: () => void;
  defaultValues?: Partial<Company>;
}

const CompanyFormStep4 = ({ onNext, onBack, defaultValues = {} }: CompanyFormStep4Props) => {
  const [relations, setRelations] = useState<CorporateRelation[]>(
    Array.isArray(defaultValues.corporateRelations) ? defaultValues.corporateRelations : []
  );

  const form = useForm<FormData>({
    resolver: zodResolver(companyStep4Schema),
    defaultValues: {},
  });

  const relationForm = useForm<RelationFormData>({
    resolver: zodResolver(corporateRelationSchema),
    defaultValues: {
      type: "holding",
      name: "",
      cin: "",
      address: "",
      shares: 0,
      percentage: 0,
      since: "",
      section: "",
    },
  });

  const addRelation = (data: RelationFormData) => {
    const newRelation: CorporateRelation = {
      id: Date.now().toString(),
      type: data.type,
      name: data.name,
      cin: data.cin,
      address: data.address,
      shares: data.shares,
      percentage: data.percentage,
      since: data.since,
      end: data.end,
      section: data.section,
    };
    
    setRelations([...relations, newRelation]);
    relationForm.reset();
  };

  const removeRelation = (id: string) => {
    setRelations(relations.filter(relation => relation.id !== id));
  };

  const handleSubmit = () => {
    onNext({
      corporateRelations: relations,
    });
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Corporate Relations</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md border">
              <h3 className="text-md font-medium mb-4">Add Corporate Relation</h3>
              <Form {...relationForm}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={relationForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relation Type*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select relation type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="holding">Holding</SelectItem>
                            <SelectItem value="subsidiary">Subsidiary</SelectItem>
                            <SelectItem value="associate">Associate</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={relationForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="XYZ Limited" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={relationForm.control}
                    name="cin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CIN*</FormLabel>
                        <FormControl>
                          <Input placeholder="L12345MH2020PLC123456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={relationForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registered Address*</FormLabel>
                        <FormControl>
                          <Input placeholder="123, Business Park, City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={relationForm.control}
                    name="shares"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Shares*</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="1000" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={relationForm.control}
                    name="percentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shareholding Percentage (%)*</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="51" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={relationForm.control}
                    name="since"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship Since*</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={relationForm.control}
                    name="end"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship End (if applicable)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={relationForm.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Section 2(87)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button 
                    type="button" 
                    onClick={relationForm.handleSubmit(addRelation)}
                    className="flex items-center"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Relation
                  </Button>
                </div>
              </Form>
            </div>

            {relations.length > 0 && (
              <div className="mt-6">
                <h3 className="text-md font-medium mb-2">Added Relations</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holding</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Since</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {relations.map((relation) => (
                        <tr key={relation.id}>
                          <td className="px-6 py-4 whitespace-nowrap capitalize">{relation.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{relation.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{relation.percentage}%</td>
                          <td className="px-6 py-4 whitespace-nowrap">{new Date(relation.since).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeRelation(relation.id || "")}
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

export default CompanyFormStep4;
