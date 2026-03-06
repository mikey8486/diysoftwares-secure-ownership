import { Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-8 mt-16">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-muted-foreground text-sm">
        © 2026 DIYsoftwares. All rights reserved.
      </p>
      <a
        href="mailto:diysoftwares@gmail.com"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <Mail size={14} />
        diysoftwares@gmail.com
      </a>
    </div>
  </footer>
);

export default Footer;
