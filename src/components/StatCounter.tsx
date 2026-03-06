import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface StatCounterProps {
  pageName: string;
  label: string;
  icon: React.ReactNode;
  trackVisit?: boolean;
}

const StatCounter = ({ pageName, label, icon, trackVisit = false }: StatCounterProps) => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchAndTrack = async () => {
      if (trackVisit) {
        await supabase.rpc("increment_visit", { p_page_name: pageName });
      }

      const { data } = await supabase
        .from("site_stats")
        .select("visit_count, purchase_count")
        .eq("page_name", pageName)
        .single();

      if (data) {
        setCount(label.toLowerCase().includes("purchase") ? data.purchase_count : data.visit_count);
      }
    };

    fetchAndTrack();
  }, [pageName, label, trackVisit]);

  return (
    <div className="flex items-center gap-2 text-muted-foreground text-sm">
      {icon}
      <span className="font-mono">
        {count !== null ? count.toLocaleString() : "—"}
      </span>
      <span>{label}</span>
    </div>
  );
};

export default StatCounter;
