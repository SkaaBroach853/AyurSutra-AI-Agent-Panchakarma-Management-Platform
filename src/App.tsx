import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleSelector } from "./pages/RoleSelector";
import { PatientDashboard } from "./pages/PatientDashboard";
import { SessionsPage } from "./pages/SessionsPage";
import { InfoHub } from "./pages/InfoHub";
import { ProfilePage } from "./pages/ProfilePage";
import { DoctorDashboard } from "./pages/DoctorDashboard";
import { PatientLayout } from "./components/PatientLayout";
import NotFound from "./pages/NotFound";
import EShopPage from "./pages/EShopPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelector />} />
          
          {/* Patient Routes */}
          <Route path="/patient" element={
            <PatientLayout>
              <PatientDashboard />
            </PatientLayout>
          } />
          <Route path="/sessions" element={
            <PatientLayout>
              <SessionsPage />
            </PatientLayout>
          } />
          <Route path="/info-hub" element={
            <PatientLayout>
              <InfoHub />
            </PatientLayout>
          } />
          <Route path="/profile" element={
            <PatientLayout>
              <ProfilePage />
            </PatientLayout>
          } />
          <Route path="/eshop" element={
            <PatientLayout>
              <EShopPage />
            </PatientLayout>
          } />
          
          {/* Doctor Route */}
          <Route path="/doctor" element={<DoctorDashboard />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
