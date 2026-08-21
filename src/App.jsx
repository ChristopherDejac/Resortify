import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LandingPage2 from "./pages/LandingPage2";
import LandingPage3 from "./pages/LandingPage3";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Calendar from "./pages/Calendar";
import Guests from "./pages/Guests";
import Settings from "./pages/Settings";
import Management from "./pages/Management";
import MediaGallery from "./pages/MediaGallery";
import RegistrationPage from "./pages/RegistrationPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-it-works" element={<LandingPage2 />} />
        <Route path="/establishment-type" element={<LandingPage3 />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/management" element={<Management />} />
        <Route path="/media-gallery" element={<MediaGallery />} />
        <Route path="/resort-registration" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}
