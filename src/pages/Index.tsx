import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppCard from "@/components/AppCard";

const directApps = [
  {
    name: "Cybersecurity Toolkit (Linux)",
    buttons: [{ label: "Linux", href: "downloads/cybersecurity-toolkit-linux.zip", variant: "download" as const }],
  },
  {
    name: "Password Manager",
    buttons: [
      { label: "Linux", href: "downloads/password-manager-linux.zip", variant: "download" as const },
      { label: "Windows", href: "downloads/password-manager-windows.zip", variant: "download" as const },
    ],
  },
];

const githubApps = [
  {
    name: "Cybersecurity Toolkit",
    buttons: [
      { label: "Repository", href: "https://github.com/mikey8486/Cybersecurity-Toolkit", variant: "github" as const },
      { label: "Releases", href: "https://github.com/mikey8486/Cybersecurity-Toolkit/releases/latest", variant: "github" as const },
    ],
  },
  {
    name: "Password Manager",
    buttons: [
      { label: "Repository", href: "https://github.com/mikey8486/Passward-manager", variant: "github" as const },
      { label: "Releases", href: "https://github.com/mikey8486/Passward-manager/releases/latest", variant: "github" as const },
    ],
  },
];

type Tab = "direct" | "github";

const Index = () => {
  const [tab, setTab] = useState<Tab>("direct");
  const apps = tab === "direct" ? directApps : githubApps;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="text-center py-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-primary"
        >
          DIY Software Library
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-accent mt-2"
        >
          Fast builds • Direct downloads • Open-source access
        </motion.p>
      </header>

      <Navbar />

      <main className="flex-1 max-w-[950px] w-full mx-auto mt-8 px-4">
        <div className="flex gap-6 mb-6 justify-center">
          <button
            onClick={() => setTab("direct")}
            className={`font-mono transition-colors ${
              tab === "direct" ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Direct Downloads
          </button>
          <button
            onClick={() => setTab("github")}
            className={`font-mono transition-colors ${
              tab === "github" ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            GitHub Repositories
          </button>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-glow">
          {apps.map((app, i) => (
            <AppCard key={app.name} name={app.name} buttons={app.buttons} index={i} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
