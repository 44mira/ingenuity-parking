import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import AdminHome from "./pages/AdminHome";

import DashboardLayout from "@/components/DashboardLayout.tsx";
import LocationList from "./pages/LocationList";
import ReservationList from "./pages/ReservationList";
import AdminProfile from "./pages/AdminProfile";
import Login from "./pages/Login";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { AuthProvider } from "@/api/auth";
import RequireAuth from "./components/RequireAuth";
import LocationForm from "./components/LocationForm";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="admin" element={<DashboardLayout />}>
                <Route index element={<AdminHome />} />
                <Route path="locations">
                  <Route index element={<LocationList />} />
                  <Route path="create" element={<LocationForm />} />
                  <Route path="update/:id" element={<LocationForm />} />
                </Route>
                <Route path="reservations">
                  <Route index element={<ReservationList />} />
                </Route>
                <Route path="profile" element={<AdminProfile />} />
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
