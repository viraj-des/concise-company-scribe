
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CompanyProvider } from "@/contexts/CompanyContext";
import Dashboard from "./pages/Dashboard";
import CompanyList from "./pages/CompanyList";
import CompanyForm from "./pages/CompanyForm";
import DirectorList from "./pages/DirectorList";
import DirectorForm from "./pages/DirectorForm";
import AuditList from "./pages/AuditList";
import AuditForm from "./pages/AuditForm";
import AuditEdit from "./pages/AuditEdit";
import ShareCapitalMemberList from "./pages/ShareCapitalMemberList";
import ShareCapitalMemberForm from "./pages/ShareCapitalMemberForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CompanyProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/companies/add" element={<CompanyForm />} />
            <Route path="/directors" element={<DirectorList />} />
            <Route path="/directors/add" element={<DirectorForm />} />
            <Route path="/audits" element={<AuditList />} />
            <Route path="/audits/add" element={<AuditForm />} />
            <Route path="/audits/edit/:id" element={<AuditEdit />} />
            <Route path="/share-capital-members" element={<ShareCapitalMemberList />} />
            <Route path="/share-capital-members/add" element={<ShareCapitalMemberForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CompanyProvider>
  </QueryClientProvider>
);

export default App;
