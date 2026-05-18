import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";

type Props = ButtonProps & {
  priceId: string;
  children: ReactNode;
};

export function CheckoutButton({ priceId, children, ...btn }: Props) {
  const { user, loading } = useAuth();
  const { isActive, sub } = useSubscription();
  const navigate = useNavigate();

  const alreadySubscribed =
    priceId === "upstream_pro_monthly" && isActive && sub?.price_id === "upstream_pro_monthly";

  const onClick = () => {
    if (!user) {
      const target = `/checkout?priceId=${encodeURIComponent(priceId)}`;
      navigate(`/auth?redirect=${encodeURIComponent(target)}`);
      return;
    }
    if (alreadySubscribed) {
      navigate("/account");
      return;
    }
    navigate(`/checkout?priceId=${encodeURIComponent(priceId)}`);
  };

  return (
    <Button {...btn} onClick={onClick} disabled={loading || btn.disabled}>
      {alreadySubscribed ? "Manage your subscription" : children}
    </Button>
  );
}
