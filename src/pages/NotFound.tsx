import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
    <p className="text-muted-foreground mb-6">Page not found</p>
    <Link
      to="/"
      className="px-6 py-3 rounded-md bg-gradient-to-r from-primary to-accent text-primary-foreground font-mono font-bold hover:shadow-glow-hover transition-shadow"
    >
      Go Home
    </Link>
  </div>
);

export default NotFound;
