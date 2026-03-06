import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Download, ShieldAlert, Terminal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DownloadCybersecurityToolkit = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<"loading" | "valid" | "invalid">("loading");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("invalid");
        return;
      }

      const { data, error } = await supabase
        .from("purchase_tokens")
        .select("*")
        .eq("token", token)
        .eq("product", "cybersecurity-toolkit")
        .eq("used", false)
        .single();

      if (error || !data) {
        setStatus("invalid");
        return;
      }

      await supabase
        .from("purchase_tokens")
        .update({ used: true })
        .eq("id", data.id);

      setStatus("valid");
    };

    verify();
  }, [token]);

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying your purchase...</p>
        </div>
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-xl p-8 max-w-md text-center"
        >
          <ShieldAlert size={48} className="text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground">
            This download link is invalid or has already been used. Contact{" "}
            <a href="mailto:diysoftwares@gmail.com" className="text-primary hover:underline">
              diysoftwares@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center text-accent mx-auto mb-6">
          <ShieldCheck size={40} />
        </div>
        <h1 className="text-3xl font-black mb-3">
          Thank You for Your <span className="gradient-text">Purchase!</span>
        </h1>
        <p className="text-muted-foreground">
          Download DIY Cybersecurity Toolkit below. This link is one-time use.
        </p>
      </motion.div>

      <motion.a
        href="https://github.com/mikey8486/Cybersecurity-Toolkit/releases/latest/download/cybersecurity-toolkit-linux"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-8 text-center block hover:border-primary/40 transition-all mb-12"
      >
        <Terminal size={32} className="text-primary mx-auto mb-3" />
        <h3 className="font-bold text-foreground mb-4">Linux</h3>
        <div className="gradient-btn px-8 py-4 rounded-lg text-primary-foreground font-bold text-lg inline-flex items-center gap-2">
          <Download size={20} />
          Download for Linux
        </div>
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-xl p-8"
      >
        <h2 className="text-lg font-bold text-foreground mb-4">Setup Instructions</h2>
        <div className="bg-muted rounded-lg p-4 font-mono text-sm text-foreground">
          <p>chmod +x cybersecurity-toolkit-linux</p>
          <p>./cybersecurity-toolkit-linux</p>
        </div>
      </motion.div>
    </div>
  );
};

export default DownloadCybersecurityToolkit;
