import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { usePaddleCheckout } from "@/hooks/usePaddleCheckout";

type Props = ButtonProps & {
  priceId: string;
  children: ReactNode;
};

export function CheckoutButton({ priceId, children, ...btn }: Props) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { openCheckout, loading: checkoutLoading } = usePaddleCheckout();

  const onClick = () => {
    if (!user) {
      navigate(`/auth?redirect=${encodeURIComponent(window.location.pathname + window.location.hash)}`);
      return;
    }
    openCheckout({
      priceId,
      userId: user.id,
      customerEmail: user.email,
    });
  };

  return (
    <Button {...btn} onClick={onClick} disabled={loading || checkoutLoading || btn.disabled}>
      {checkoutLoading ? "Opening…" : children}
    </Button>
  );
}
