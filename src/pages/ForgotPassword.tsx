import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyRound, Mail, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-8 max-w-md text-center"
        >
          <Mail size={48} className="text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-black mb-2">Check Your Email</h1>
          <p className="text-muted-foreground">
            We've sent a password reset link to <strong className="text-foreground">{email}</strong>.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-primary mx-auto mb-4">
            <KeyRound size={32} />
          </div>
          <h1 className="text-2xl font-black">
            Reset <span className="gradient-text">Password</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-2">Enter your email to receive a reset link</p>
        </div>

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-btn py-3.5 rounded-xl text-primary-foreground font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-6"
        >
          <ArrowLeft size={16} /> Back to login
        </Link>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
