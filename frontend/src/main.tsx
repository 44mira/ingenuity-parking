import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import AdminHome from "./pages/AdminHome";

import DashboardLayout from "@/components/DashboardLayout.tsx";
import LocationList from "./pages/LocationList";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="admin" element={<DashboardLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="locations" element={<LocationList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
