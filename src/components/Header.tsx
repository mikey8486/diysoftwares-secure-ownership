import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const Header = () => {
  const location = useLocation();
  const { user, loading, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="DIYsoftwares" className="h-10" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!loading && (
            user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors inline-flex items-center gap-1.5 ${
                    isActive("/dashboard")
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <button
                  onClick={signOut}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`text-sm font-medium transition-colors inline-flex items-center gap-1.5 ${
                  isActive("/login")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LogIn size={16} /> Sign In
              </Link>
            )
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground p-2"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-medium py-2 transition-colors ${
                    isActive(link.to)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!loading && (
                user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="text-sm font-medium py-2 text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
                    >
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                    <button
                      onClick={() => { signOut(); setMenuOpen(false); }}
                      className="text-sm font-medium py-2 text-muted-foreground hover:text-foreground text-left inline-flex items-center gap-1.5"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-medium py-2 text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
                  >
                    <LogIn size={16} /> Sign In
                  </Link>
                )
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
