import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout = ({ title, children }: AuthLayoutProps) => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md bg-card border border-border rounded-xl p-8 shadow-glow"
    >
      <Link to="/" className="block text-center mb-6">
        <h1 className="text-2xl font-bold text-primary">DIY Software Library</h1>
      </Link>
      <h2 className="text-xl font-bold text-foreground text-center mb-6">{title}</h2>
      {children}
    </motion.div>
  </div>
);

export default AuthLayout;
