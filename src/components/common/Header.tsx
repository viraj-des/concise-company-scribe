
import { User } from '@/types';
import { Bell, Search } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCompany } from "@/contexts/CompanyContext";

// Mock user data - in a real app this would come from auth context
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'Admin'
};

const Header = () => {
  const { name, role } = mockUser;
  const { selectedCompany, setSelectedCompany, companies, loading } = useCompany();
  
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <header className="bg-white shadow-sm h-16 flex items-center px-6 sticky top-0 z-10">
      <div className="flex flex-1 items-center justify-between gap-x-4">
        {/* Company Selector */}
        <div className="ml-16 min-w-[300px]">
          <Select
            value={selectedCompany?.id || ""}
            onValueChange={(value) => {
              const company = companies.find(c => c.id === value);
              setSelectedCompany(company || null);
            }}
            disabled={loading}
          >
            <SelectTrigger className="w-full">
              <SelectValue 
                placeholder={loading ? "Loading companies..." : "Select a company"} 
              />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{company.name}</span>
                    {company.cin && (
                      <span className="text-xs text-gray-500">CIN: {company.cin}</span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search and User Actions */}
        <div className="flex items-center gap-x-4">
          <div className="relative max-w-md w-full lg:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Search..."
              type="search"
            />
          </div>

          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-sm">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-white">{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="font-bold">{name}</div>
                <div className="text-xs text-gray-500">{role}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
