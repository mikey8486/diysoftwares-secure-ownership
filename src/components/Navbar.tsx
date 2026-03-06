import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-center gap-8 bg-card px-4 py-3 border-y border-border relative">
      <Link
        to="/"
        className={`text-sm transition-colors ${
          location.pathname === "/" ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Home
      </Link>
      <Link
        to="/login"
        className="absolute right-5 px-4 py-2 rounded-md border border-primary text-primary text-sm font-bold hover:shadow-glow transition-shadow"
      >
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
