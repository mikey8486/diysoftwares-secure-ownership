import { useState } from "react";
import { motion } from "framer-motion";
import { KeyRound, ShieldCheck, ArrowUpDown, Gamepad2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";

type SortMode = "newest" | "price-high";

const products = [
  {
    name: "DIY Password Manager",
    description: "Secure, offline password manager that keeps your credentials safe on your own device. No cloud, no risk.",
    price: "$10",
    priceNum: 10,
    href: "/product/password-manager",
    icon: <KeyRound size={28} />,
    created: 2,
  },
  {
    name: "DIY Cybersecurity Toolkit",
    description: "Comprehensive Linux security toolkit for penetration testing, network analysis, and system hardening.",
    price: "$12",
    priceNum: 12,
    href: "/product/cybersecurity-toolkit",
    icon: <ShieldCheck size={28} />,
    created: 1,
  },
];

const Products = () => {
  const [sort, setSort] = useState<SortMode>("newest");

  const sorted = [...products].sort((a, b) => {
    if (sort === "newest") return a.created - b.created;
    return b.priceNum - a.priceNum;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-black mb-4">
          Our <span className="gradient-text">Products</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Privacy-first security tools. One-time purchase, lifetime support.
        </p>
      </motion.div>

      {/* Sort control */}
      <div className="flex justify-end mb-8">
        <div className="flex items-center gap-2 glass-card rounded-lg p-1">
          <ArrowUpDown size={14} className="text-muted-foreground ml-3" />
          <button
            onClick={() => setSort("newest")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              sort === "newest"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSort("price-high")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              sort === "price-high"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Highest Price
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sorted.map((product, i) => (
          <ProductCard
            key={product.name}
            name={product.name}
            description={product.description}
            price={product.price}
            href={product.href}
            icon={product.icon}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
