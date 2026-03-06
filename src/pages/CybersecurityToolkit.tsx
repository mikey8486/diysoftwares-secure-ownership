import { motion } from "framer-motion";
import { ShieldCheck, Check, Eye, ShoppingBag, Terminal } from "lucide-react";
import StatCounter from "@/components/StatCounter";

const features = [
  "Network scanning & vulnerability detection",
  "Penetration testing tools suite",
  "System hardening scripts",
  "Encrypted communications toolkit",
  "Log analysis & monitoring",
  "Firewall configuration helpers",
  "Works 100% offline on Linux",
  "Lifetime updates & support included",
];

const CybersecurityToolkit = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center text-primary mx-auto mb-6">
          <ShieldCheck size={40} />
        </div>
        <h1 className="text-3xl md:text-4xl font-black mb-3">
          DIY <span className="gradient-text">Cybersecurity Toolkit</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          A comprehensive Linux security toolkit for penetration testing, network analysis, and system hardening.
          Built for professionals who value privacy.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 justify-center mb-12">
        <StatCounter pageName="cybersecurity-toolkit" label="Views" icon={<Eye size={16} />} trackVisit />
        <StatCounter pageName="cybersecurity-toolkit" label="Purchases" icon={<ShoppingBag size={16} />} />
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
        <p className="text-5xl font-black gradient-text mb-2">$12</p>
        <p className="text-muted-foreground text-sm mb-8">Lifetime support included • No subscriptions</p>

        <a
          href="https://github.com/mikey8486/Cybersecurity-Toolkit/releases/latest"
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-btn px-8 py-4 rounded-xl text-primary-foreground font-bold text-lg inline-flex items-center justify-center gap-3"
        >
          <Terminal size={22} />
          Buy for Linux — $12
        </a>
      </motion.div>
    </div>
  );
};

export default CybersecurityToolkit;
