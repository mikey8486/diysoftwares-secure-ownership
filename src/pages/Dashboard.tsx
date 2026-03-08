import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Package, Download, BarChart3, Users, ShoppingCart } from "lucide-react";
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
      // Fetch customer purchases
      const { data: purchaseData } = await supabase
        .from("customer_purchases")
        .select("*")
        .eq("user_id", user.id)
        .order("purchased_at", { ascending: false });

      if (purchaseData) setPurchases(purchaseData);

      // Fetch stats if admin
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

  const productNames: Record<string, string> = {
    "password-manager": "DIY Password Manager",
    "cybersecurity-toolkit": "DIY Cybersecurity Toolkit",
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-black mb-2">
          {isAdmin ? (
            <>Admin <span className="gradient-text">Dashboard</span></>
          ) : (
            <>My <span className="gradient-text">Dashboard</span></>
          )}
        </h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.user_metadata?.full_name || user?.email}
        </p>
      </motion.div>

      {/* Admin Stats */}
      {isAdmin && stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-primary" /> Site Analytics
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.page_name} className="glass-card rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-1 capitalize">
                  {stat.page_name.replace(/-/g, " ")}
                </p>
                <div className="flex items-center gap-6 mt-3">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-neon-cyan" />
                    <span className="text-lg font-bold text-foreground">{stat.visit_count}</span>
                    <span className="text-xs text-muted-foreground">visits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={16} className="text-neon-green" />
                    <span className="text-lg font-bold text-foreground">{stat.purchase_count}</span>
                    <span className="text-xs text-muted-foreground">purchases</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
          <div className="glass-card rounded-xl p-8 text-center">
            <Shield size={40} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground mb-4">No purchases yet</p>
            <Link
              to="/products"
              className="gradient-btn px-6 py-3 rounded-xl text-primary-foreground font-bold inline-flex items-center gap-2"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="glass-card rounded-xl p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-foreground">
                    {productNames[purchase.product] || purchase.product}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Purchased {new Date(purchase.purchased_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Download size={16} />
                  {purchase.download_count} downloads
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
