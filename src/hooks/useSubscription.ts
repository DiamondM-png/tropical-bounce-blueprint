import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getPaddleEnvironment } from "@/lib/paddle";

type Sub = {
  status: string;
  current_period_end: string | null;
  product_id: string;
  price_id: string;
};

export function useSubscription() {
  const { user } = useAuth();
  const [sub, setSub] = useState<Sub | null>(null);
  const [loading, setLoading] = useState(true);

  const refetch = async () => {
    if (!user) { setSub(null); setLoading(false); return; }
    const { data } = await supabase
      .from("subscriptions")
      .select("status, current_period_end, product_id, price_id")
      .eq("user_id", user.id)
      .eq("environment", getPaddleEnvironment())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setSub(data as Sub | null);
    setLoading(false);
  };

  useEffect(() => {
    refetch();
    if (!user) return;
    const ch = supabase
      .channel(`sub-${user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "subscriptions", filter: `user_id=eq.${user.id}` }, refetch)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const isActive =
    !!sub &&
    ["active", "trialing", "past_due"].includes(sub.status) &&
    (!sub.current_period_end || new Date(sub.current_period_end) > new Date());

  return { sub, isActive, loading, refetch };
}
