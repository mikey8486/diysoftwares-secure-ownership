import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-7xl font-black gradient-text mb-4">404</h1>
    <p className="text-muted-foreground mb-8 text-lg">This page doesn't exist.</p>
    <Link
      to="/"
      className="gradient-btn px-8 py-4 rounded-xl text-primary-foreground font-bold"
    >
      Go Home
    </Link>
  </div>
);

export default NotFound;
