
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyStep3BranchesSchema, branchSchema } from "@/schemas/companySchema";
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
import { CompanyFormData } from "@/types/company";
import { Branch } from "@/types/index";
import { useState } from "react";
import { Plus, Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type FormData = z.infer<typeof companyStep3BranchesSchema>;
type BranchFormData = z.infer<typeof branchSchema>;

interface CompanyFormStep3Props {
  onNext: (data: Partial<CompanyFormData>) => void;
  onBack: () => void;
  defaultValues?: Partial<CompanyFormData>;
}

const CompanyFormStep3 = ({ onNext, onBack, defaultValues = {} }: CompanyFormStep3Props) => {
  const [branches, setBranches] = useState<Branch[]>(
    Array.isArray(defaultValues.branches) ? defaultValues.branches : []
  );

  const form = useForm<FormData>({
    resolver: zodResolver(companyStep3BranchesSchema),
    defaultValues: {
      actualBusinessActivity: defaultValues.actualBusinessActivity || "",
      alternateBooksAddress: defaultValues.alternateBooksAddress || "",
    },
  });

  const branchForm = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      address: "",
      rdJurisdiction: "",
    },
  });

  const addBranch = (data: BranchFormData) => {
    const newBranch: Branch = {
      id: Date.now().toString(),
      address: data.address,
      rdJurisdiction: data.rdJurisdiction,
    };
    
    setBranches([...branches, newBranch]);
    branchForm.reset();
  };

  const removeBranch = (id: string) => {
    setBranches(branches.filter(branch => branch.id !== id));
  };

  const handleSubmit = (data: FormData) => {
    onNext({
      ...data,
      branches,
    });
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Branch Offices & Business Activities</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="actualBusinessActivity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Actual Business Activity</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the actual business activities of the company"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="alternateBooksAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternate Address for Books of Account (if any)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Address where books of account are maintained (if different from registered office)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Branch Offices</h3>

              <div className="bg-gray-50 p-4 rounded-md border">
                <h3 className="text-md font-medium mb-4">Add Branch Office</h3>
                <Form {...branchForm}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={branchForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Branch Address*</FormLabel>
                          <FormControl>
                            <Input placeholder="Branch Office Address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={branchForm.control}
                      name="rdJurisdiction"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>RD Jurisdiction*</FormLabel>
                          <FormControl>
                            <Input placeholder="RD Jurisdiction" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button 
                      type="button" 
                      onClick={branchForm.handleSubmit(addBranch)}
                      className="flex items-center"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Branch
                    </Button>
                  </div>
                </Form>
              </div>

              {branches.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-md font-medium mb-2">Added Branches</h3>
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch Address</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RD Jurisdiction</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {branches.map((branch) => (
                          <tr key={branch.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{branch.address}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{branch.rdJurisdiction}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeBranch(branch.id || "")}
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

export default CompanyFormStep3;
