import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import PasswordManager from "./pages/PasswordManager";
import CybersecurityToolkit from "./pages/CybersecurityToolkit";
import DownloadPasswordManager from "./pages/DownloadPasswordManager";
import DownloadCybersecurityToolkit from "./pages/DownloadCybersecurityToolkit";
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
          <Route path="/download/password-manager" element={<DownloadPasswordManager />} />
          <Route path="/download/cybersecurity-toolkit" element={<DownloadCybersecurityToolkit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
