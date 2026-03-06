import { motion } from "framer-motion";
import { KeyRound, Check, Eye, ShoppingBag, Monitor, Terminal } from "lucide-react";
import StatCounter from "@/components/StatCounter";

const features = [
  "AES-256 encryption for all stored passwords",
  "Works 100% offline — no internet required",
  "Cross-platform: Windows & Linux",
  "Auto-generate strong, unique passwords",
  "Simple, intuitive interface",
  "Export & backup your vault securely",
  "No cloud sync — your data stays local",
  "Lifetime updates & support included",
];

const PasswordManager = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center text-primary mx-auto mb-6">
          <KeyRound size={40} />
        </div>
        <h1 className="text-3xl md:text-4xl font-black mb-3">
          DIY <span className="gradient-text">Password Manager</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          A secure, offline password manager that keeps your credentials safe on your own device.
          No cloud storage. No data collection. Just security you can trust.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 justify-center mb-12">
        <StatCounter pageName="password-manager" label="Views" icon={<Eye size={16} />} trackVisit />
        <StatCounter pageName="password-manager" label="Purchases" icon={<ShoppingBag size={16} />} />
      </div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-8 mb-12"
      >
        <h2 className="text-xl font-bold text-foreground mb-6">Features</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-3">
              <Check size={18} className="text-accent mt-0.5 shrink-0" />
              <span className="text-foreground text-sm">{f}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Pricing & Buy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-xl p-8 text-center"
      >
        <p className="text-muted-foreground text-sm mb-2">One-time payment</p>
        <p className="text-5xl font-black gradient-text mb-2">$10</p>
        <p className="text-muted-foreground text-sm mb-8">Lifetime support included • No subscriptions</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://diycrafts5.gumroad.com/l/knjqq"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-btn px-8 py-4 rounded-xl text-primary-foreground font-bold text-lg inline-flex items-center justify-center gap-3"
          >
            <Terminal size={22} />
            Buy for Linux — $10
          </a>
          <a
            href="https://diycrafts5.gumroad.com/l/jslwk"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-btn px-8 py-4 rounded-xl text-primary-foreground font-bold text-lg inline-flex items-center justify-center gap-3"
          >
            <Monitor size={22} />
            Buy for Windows — $10
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default PasswordManager;
