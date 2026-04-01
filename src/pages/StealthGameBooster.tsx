import { motion } from "framer-motion";
import { Gamepad2, Check, Monitor } from "lucide-react";

const features = [
  "Manual Boost: Instantly terminate high CPU/RAM apps",
  "Auto Monitor: Get CPU & RAM warnings with full control",
  "Restore Function: Reopen closed apps with one click",
  "Power Button: Close all unnecessary background processes safely",
  "Drive-based Filtering: Target programs on selected drives only",
  "Refresh App List: Always see the latest running applications",
  "Lightweight & Safe: Minimal CPU impact, no system crashes",
  "One-time purchase with lifetime updates & support",
];

const steps = [
  "Select drives to monitor",
  "Set CPU and RAM thresholds",
  "Run manual or automatic boost",
  "Choose which apps to close from popups",
  "Restore closed apps instantly if needed",
];

const StealthGameBooster = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center text-primary mx-auto mb-6">
          <Gamepad2 size={40} />
        </div>
        <h1 className="text-3xl md:text-4xl font-black mb-3">
          Stealth <span className="gradient-text">Game Booster PRO</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Take full control of your PC gaming performance. Safely monitor CPU & RAM usage,
          boost game speed, and close heavy apps without killing important system processes.
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
        <h2 className="text-xl font-bold text-foreground mb-6">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-3">
              <Check size={18} className="text-accent mt-0.5 shrink-0" />
              <span className="text-foreground text-sm">{f}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* How it Works */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-xl p-8 mb-12"
      >
        <h2 className="text-xl font-bold text-foreground mb-6">How It Works</h2>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={step} className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <span className="text-foreground text-sm pt-1">{step}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-xl p-8 mb-12"
      >
        <h2 className="text-xl font-bold text-foreground mb-6">Why Choose Us?</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Optimized for gamers, Stealth Game Booster PRO keeps your system lean, improves FPS,
          and prevents lag caused by unnecessary background apps — all while giving you total control.
        </p>
        <p className="text-muted-foreground text-sm mt-3">
          <span className="text-foreground font-semibold">Supported OS:</span> Windows 10 / 11 (64-bit)
        </p>
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
        <p className="text-5xl font-black gradient-text mb-2">$29.99</p>
        <p className="text-muted-foreground text-sm mb-8">Lifetime support included • No subscriptions</p>

        <a
          href="https://diycrafts5.gumroad.com/l/lrjuhw"
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-btn px-8 py-4 rounded-xl text-primary-foreground font-bold text-lg inline-flex items-center justify-center gap-3"
        >
          <Monitor size={22} />
          Buy for Windows — $29.99
        </a>
      </motion.div>
    </div>
  );
};

export default StealthGameBooster;
