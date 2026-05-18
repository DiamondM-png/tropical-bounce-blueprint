import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

type Props = ButtonProps & {
  priceId: string;
  children: ReactNode;
};

export function CheckoutButton({ priceId, children, ...btn }: Props) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const onClick = () => {
    if (!user) {
      const target = `/checkout?priceId=${encodeURIComponent(priceId)}`;
      navigate(`/auth?redirect=${encodeURIComponent(target)}`);
      return;
    }
    navigate(`/checkout?priceId=${encodeURIComponent(priceId)}`);
  };

  return (
    <Button {...btn} onClick={onClick} disabled={loading || btn.disabled}>
      {children}
    </Button>
  );
}
