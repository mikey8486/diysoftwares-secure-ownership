import { motion } from "framer-motion";
import { ShieldCheck, Check, Terminal } from "lucide-react";

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


      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
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
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-xl p-8 text-center"
      >
        <p className="text-muted-foreground text-sm mb-2">One-time payment</p>
        <p className="text-5xl font-black gradient-text mb-2">$12</p>
        <p className="text-muted-foreground text-sm mb-8">Lifetime support included • No subscriptions</p>

        <a
          href="https://diycrafts5.gumroad.com/l/cidao"
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
