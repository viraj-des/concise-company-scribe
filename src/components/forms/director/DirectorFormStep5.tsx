import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { directorStep5Schema } from "@/schemas/directorSchema";
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
import { Designation, Director } from "@/types";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { database } from "@/services/database";

type FormData = z.infer<typeof directorStep5Schema>;

interface CompanyAssociation {
  companyId: string;
  designation: string;
  dateOfAppointment: string;
  dateOfCessation?: string;
}

interface DirectorFormStep5Props {
  onNext: (data: Partial<Director>) => void;
  onBack: () => void;
  defaultValues?: Partial<Director>;
}

const DirectorFormStep5 = ({ onNext, onBack, defaultValues = {} }: DirectorFormStep5Props) => {
  const [companies, setCompanies] = useState<CompanyAssociation[]>(
    Array.isArray(defaultValues.companies) 
      ? defaultValues.companies.map(c => ({
          companyId: c.id || "",
          designation: c.name || "",
          dateOfAppointment: new Date().toISOString().split('T')[0],
          dateOfCessation: undefined
        }))
      : []
  );

  const [companyList, setCompanyList] = useState<{id: string, name: string}[]>([]);
  
  useEffect(() => {
    // Load companies from database
    const loadCompanies = async () => {
      try {
        const loadedCompanies = await database.getCompanies();
        const mappedCompanies = loadedCompanies.map(company => ({
          id: company.id || "",
          name: company.name
        }));
        setCompanyList(mappedCompanies);
      } catch (error) {
        console.error("Error loading companies:", error);
      }
    };
    
    loadCompanies();
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(directorStep5Schema),
    defaultValues: {
      companies: companies,
    },
  });

  const associationForm = useForm({
    defaultValues: {
      companyId: "",
      designation: "",
      dateOfAppointment: new Date().toISOString().split('T')[0],
      dateOfCessation: ""
    }
  });

  const addCompanyAssociation = (data: CompanyAssociation) => {
    setCompanies(prev => [...prev, data]);
    associationForm.reset();
  };

  const removeCompanyAssociation = (index: number) => {
    setCompanies(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // We'll transform the company associations to match the Director type
    const associatedCompanies = companies.map(assoc => {
      const company = companyList.find(c => c.id === assoc.companyId);
      return {
        id: assoc.companyId,
        name: company?.name || "Unknown Company",
        cin: "",
        category: "",
        class: "",
        subcategory: "",
        incorpDate: "",
        fyStart: "",
        fyEnd: "",
        country: "",
        state: "",
        city: "",
        pinCode: "",
        rocJurisdiction: "",
        branches: [],
        corporateRelations: [],
        registrations: {
          pan: "",
          tan: ""
        }
      };
    });
    
    onNext({ companies: associatedCompanies });
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Company Associations</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md border">
              <h3 className="text-md font-medium mb-4">Add Company Association</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormItem>
                  <FormLabel>Company*</FormLabel>
                  <Select
                    onValueChange={(value) => associationForm.setValue("companyId", value)}
                    value={associationForm.watch("companyId")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companyList.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>

                <FormItem>
                  <FormLabel>Designation*</FormLabel>
                  <Select
                    onValueChange={(value) => associationForm.setValue("designation", value)}
                    value={associationForm.watch("designation")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select designation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Director">Director</SelectItem>
                      <SelectItem value="Managing Director">Managing Director</SelectItem>
                      <SelectItem value="Chief Executive Officer">Chief Executive Officer</SelectItem>
                      <SelectItem value="Chief Financial Officer">Chief Financial Officer</SelectItem>
                      <SelectItem value="Whole Time Director">Whole Time Director</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>

                <FormItem>
                  <FormLabel>Date of Appointment*</FormLabel>
                  <Input 
                    type="date" 
                    value={associationForm.watch("dateOfAppointment")}
                    onChange={(e) => associationForm.setValue("dateOfAppointment", e.target.value)}
                  />
                  <FormMessage />
                </FormItem>

                <FormItem>
                  <FormLabel>Date of Cessation</FormLabel>
                  <Input 
                    type="date" 
                    value={associationForm.watch("dateOfCessation")}
                    onChange={(e) => associationForm.setValue("dateOfCessation", e.target.value)}
                  />
                  <FormMessage />
                </FormItem>
              </div>
              <div className="mt-4 flex justify-end">
                <Button 
                  type="button" 
                  onClick={() => {
                    const data = associationForm.getValues();
                    if (data.companyId && data.designation && data.dateOfAppointment) {
                      addCompanyAssociation(data);
                    }
                  }}
                  className="flex items-center"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Association
                </Button>
              </div>
            </div>

            {companies.length > 0 && (
              <div className="mt-6">
                <h3 className="text-md font-medium mb-2">Associated Companies</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointed</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {companies.map((association, index) => {
                        const company = companyList.find(c => c.id === association.companyId);
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{company?.name || association.companyId}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{association.designation}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(association.dateOfAppointment).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeCompanyAssociation(index)}
                                className="text-red-500"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
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
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DirectorFormStep5;
