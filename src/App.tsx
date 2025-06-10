import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // Renamed to avoid conflict if Sonner itself is a component
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import SalesAnalyticsPage from "./pages/SalesAnalyticsPage";
import ProductPerformancePage from "./pages/ProductPerformancePage";
import CustomerInsightsPage from "./pages/CustomerInsightsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

// If ChartConfig type is globally used and defined in ui/chart, it can be exported.
// For now, chart configs are locally defined within each page component.
// Example: export type ChartConfig = { [key: string]: { label: string, color: string } };


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SonnerToaster richColors position="top-right" /> {/* shadcn sonner component */}
      <BrowserRouter>
        <Routes>
          {/* Default route redirects to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} /> 
          
          <Route path="/dashboard" element={<DashboardOverviewPage />} />
          <Route path="/sales-analytics" element={<SalesAnalyticsPage />} />
          <Route path="/product-performance" element={<ProductPerformancePage />} />
          <Route path="/customer-insights" element={<CustomerInsightsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;