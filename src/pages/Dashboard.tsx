import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Shield,
  Package,
  Download,
  BarChart3,
  Users,
  ShoppingCart,
  Settings,
  ExternalLink,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Purchase {
  id: string;
  product: string;
  purchased_at: string;
  download_count: number;
}

interface SiteStat {
  page_name: string;
  visit_count: number;
  purchase_count: number;
}

const productNames: Record<string, string> = {
  "password-manager": "DIY Password Manager",
  "cybersecurity-toolkit": "DIY Cybersecurity Toolkit",
};

const productColors: Record<string, string> = {
  "password-manager": "text-neon-cyan",
  "cybersecurity-toolkit": "text-neon-green",
};

const Dashboard = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [stats, setStats] = useState<SiteStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }
    if (!user) return;

    const fetchData = async () => {
      const { data: purchaseData } = await supabase
        .from("customer_purchases")
        .select("*")
        .eq("user_id", user.id)
        .order("purchased_at", { ascending: false });

      if (purchaseData) setPurchases(purchaseData);

      if (isAdmin) {
        const { data: statsData } = await supabase
          .from("site_stats")
          .select("*");
        if (statsData) setStats(statsData);
      }

      setLoading(false);
    };

    fetchData();
  }, [user, isAdmin, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "there";

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between mb-12 flex-wrap gap-4"
      >
        <div>
          <h1 className="text-3xl font-black mb-2">
            {isAdmin ? (
              <>Admin <span className="gradient-text">Dashboard</span></>
            ) : (
              <>My <span className="gradient-text">Dashboard</span></>
            )}
          </h1>
          <p className="text-muted-foreground">
            Welcome back, <span className="text-foreground font-medium">{displayName}</span>
          </p>
        </div>
        <Link
          to="/account"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border hover:border-primary/40 px-4 py-2 rounded-xl transition-all"
        >
          <Settings size={15} />
          Account Settings
        </Link>
      </motion.div>

      {/* Admin Stats */}
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-primary" /> Site Analytics
          </h2>
          {stats.length === 0 ? (
            <div className="glass-card rounded-xl p-6 text-center text-muted-foreground text-sm">
              No analytics data yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.page_name} className="glass-card rounded-xl p-6">
                  <p className="text-sm text-muted-foreground mb-3 capitalize font-medium">
                    {stat.page_name.replace(/-/g, " ")}
                  </p>
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <Users size={15} className="text-neon-cyan" />
                        <span className="text-2xl font-black text-foreground">
                          {stat.visit_count.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">visits</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <ShoppingCart size={15} className="text-neon-green" />
                        <span className="text-2xl font-black text-foreground">
                          {stat.purchase_count.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">purchases</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Customer Purchases */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Package size={20} className="text-primary" /> My Purchases
        </h2>
        {purchases.length === 0 ? (
          <div className="glass-card rounded-xl p-10 text-center">
            <Shield size={44} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground mb-5 text-sm">
              No purchases yet. Browse our products to get started.
            </p>
            <Link
              to="/products"
              className="gradient-btn px-6 py-3 rounded-xl text-primary-foreground font-bold inline-flex items-center gap-2"
            >
              <Package size={16} />
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {purchases.map((purchase, i) => (
              <motion.div
                key={purchase.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                className="glass-card rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Package size={18} className={productColors[purchase.product] || "text-primary"} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">
                      {productNames[purchase.product] || purchase.product}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Purchased {new Date(purchase.purchased_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Download size={14} />
                    <span>{purchase.download_count} downloads</span>
                  </div>
                  <Link
                    to={`/product/${purchase.product}`}
                    className="flex items-center gap-1 text-primary hover:underline text-xs font-medium"
                  >
                    <ExternalLink size={12} />
                    View Product
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
