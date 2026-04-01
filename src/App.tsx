import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import PasswordManager from "./pages/PasswordManager";
import CybersecurityToolkit from "./pages/CybersecurityToolkit";
import StealthGameBooster from "./pages/StealthGameBooster";
import DownloadPasswordManager from "./pages/DownloadPasswordManager";
import DownloadCybersecurityToolkit from "./pages/DownloadCybersecurityToolkit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import AccountSettings from "./pages/AccountSettings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/password-manager" element={<PasswordManager />} />
          <Route path="/product/cybersecurity-toolkit" element={<CybersecurityToolkit />} />
          <Route path="/product/stealth-game-booster" element={<StealthGameBooster />} />
          <Route path="/download/password-manager" element={<DownloadPasswordManager />} />
          <Route path="/download/cybersecurity-toolkit" element={<DownloadCybersecurityToolkit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<AccountSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
