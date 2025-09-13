import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/admin/AdminLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Apps from "./pages/admin/Apps";
import UsersPage from "./pages/admin/Users";
import Import from "./pages/admin/Import";
import SettingsPage from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="categories" element={<Categories />} />
            <Route path="apps" element={<Apps />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="import" element={<Import />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
