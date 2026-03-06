import { motion } from "framer-motion";
import { ExternalLink, Download } from "lucide-react";

interface AppButton {
  label: string;
  href: string;
  variant: "download" | "github";
}

interface AppCardProps {
  name: string;
  buttons: AppButton[];
  index: number;
}

const AppCard = ({ name, buttons, index }: AppCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    className="flex items-center justify-between py-5 border-b border-border last:border-b-0"
  >
    <span className="text-foreground">{name}</span>
    <div className="flex gap-2">
      {buttons.map((btn) => (
        <a key={btn.label} href={btn.href} target={btn.variant === "github" ? "_blank" : undefined} rel="noopener noreferrer">
          <button
            className={`flex items-center gap-2 px-5 py-3 rounded-md font-mono font-bold text-sm cursor-pointer transition-shadow ${
              btn.variant === "download"
                ? "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-glow-hover"
                : "bg-muted text-primary border border-primary hover:shadow-glow"
            }`}
          >
            {btn.variant === "github" ? <ExternalLink size={14} /> : <Download size={14} />}
            {btn.label}
          </button>
        </a>
      ))}
    </div>
  </motion.div>
);

export default AppCard;
