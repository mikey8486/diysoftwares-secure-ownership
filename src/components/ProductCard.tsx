import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  href: string;
  icon: React.ReactNode;
  index: number;
}

const ProductCard = ({ name, description, price, href, icon, index }: ProductCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.15, duration: 0.5 }}
    className="glass-card rounded-xl p-6 flex flex-col gap-4 transition-all duration-300 group"
  >
    <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center text-primary">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="text-lg font-bold text-foreground mb-1">{name}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
    <div className="flex items-center justify-between mt-2">
      <span className="text-xl font-bold gradient-text">{price}</span>
      <Link
        to={href}
        className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-btn text-primary-foreground text-sm font-semibold"
      >
        View Product
        <ArrowRight size={14} />
      </Link>
    </div>
  </motion.div>
);

export default ProductCard;
