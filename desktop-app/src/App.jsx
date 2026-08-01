import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import OwnerRegisterPage from "./pages/OwnerRegisterPage";
import LandingPage3 from "./pages/LandingPage3";
import RegistrationPage from "./pages/RegistrationPage";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Calendar from "./pages/Calendar";
import Guests from "./pages/Guests";
import Settings from "./pages/Settings";
import Management from "./pages/Management";
import MediaGallery from "./pages/MediaGallery";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<OwnerRegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/establishment-type"
          element={
            <ProtectedRoute>
              <LandingPage3 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resort-registration"
          element={
            <ProtectedRoute>
              <RegistrationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guests"
          element={
            <ProtectedRoute>
              <Guests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/management"
          element={
            <ProtectedRoute>
              <Management />
            </ProtectedRoute>
          }
        />
        <Route
          path="/media-gallery"
          element={
            <ProtectedRoute>
              <MediaGallery />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}
