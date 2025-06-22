import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import AdminHome from "./pages/AdminHome";

import DashboardLayout from "@/components/DashboardLayout.tsx";
import LocationList from "./pages/LocationList";
import AdminProfile from "./pages/AdminProfile";
import AdminLogin from "./pages/AdminLogin";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { AuthProvider } from "@/api/auth";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="admin" element={<DashboardLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="locations" element={<LocationList />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
            <Route path="admin-login" element={<AdminLogin />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
