import { useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { Loader2 } from "lucide-react";

const Checkout = () => {
  const { user, loading } = useAuth();
  const { isActive, sub, loading: subLoading } = useSubscription();
  const [params] = useSearchParams();
  const priceId = params.get("priceId") || "";

  useEffect(() => {
    document.title = "Checkout — Tropical Bounce";
  }, []);

  if (loading || subLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/auth?redirect=${encodeURIComponent(`/checkout?priceId=${priceId}`)}`} replace />;
  }

  if (!priceId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <p className="text-muted-foreground mb-4">No product selected.</p>
          <Link to="/" className="underline text-primary">Back to pricing</Link>
        </div>
      </div>
    );
  }

  // Prevent duplicate subscription
  if (priceId === "upstream_pro_monthly" && isActive && sub?.price_id === "upstream_pro_monthly") {
    return <Navigate to="/account" replace />;
  }

  const returnUrl = `${window.location.origin}/checkout/success?price=${priceId}&session_id={CHECKOUT_SESSION_ID}`;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-3xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-heading font-bold">Complete your purchase</h1>
          <Link to="/#pricing" className="text-sm text-muted-foreground hover:text-foreground underline">
            ← Back to pricing
          </Link>
        </div>
        <div className="rounded-2xl overflow-hidden bg-card shadow-card">
          <StripeEmbeddedCheckout
            priceId={priceId}
            userId={user.id}
            customerEmail={user.email}
            returnUrl={returnUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
