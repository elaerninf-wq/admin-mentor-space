import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Layout } from "./components/layout/Layout";
import { RoleSelection } from "./components/auth/RoleSelection";
import { LoginForm } from "./components/auth/LoginForm";
import { Dashboard } from "./pages/Dashboard";
import { Syllabus } from "./pages/Syllabus";
import { Attendance } from "./pages/Attendance";
import { Roadmap } from "./pages/Roadmap";
import { Tools } from "./pages/Tools";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, selectedRole } = useAuth();

  if (!user && !selectedRole) {
    return <RoleSelection />;
  }

  if (!user && selectedRole) {
    return <LoginForm role={selectedRole} onBack={() => window.location.reload()} />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/syllabus" element={<Syllabus />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
