import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Palmtree, Lock, LogOut, UserCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <Palmtree className="h-7 w-7 text-primary" />
          <span className="font-heading font-extrabold text-xl text-foreground">
            Tropical<span className="text-secondary">Bounce.com</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/upstream-hub"
            className="flex items-center gap-1.5 text-sm font-heading font-semibold px-3 py-1.5 rounded-full bg-slate-900 text-amber-400 border border-amber-500/50 hover:bg-slate-800 hover:border-amber-400 transition-all"
          >
            <Lock className="h-3.5 w-3.5" />
            Member Portal
          </Link>
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild className="gap-1.5">
                <Link to="/account">
                  <UserCircle className="h-4 w-4" /> Account
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut} className="gap-1.5">
                <LogOut className="h-4 w-4" /> Sign out
              </Button>
            </>
          ) : (
            <Button variant="cta" size="sm" asChild>
              <Link to="/auth">Sign in</Link>
            </Button>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/upstream-hub"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1.5 text-sm font-heading font-semibold text-amber-600"
          >
            <Lock className="h-3.5 w-3.5" />
            Member Portal
          </Link>
          {user ? (
            <>
              <Link
                to="/account"
                onClick={() => setOpen(false)}
                className="block text-sm font-heading font-semibold text-foreground"
              >
                Account
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
                className="w-full mt-2"
              >
                Sign out
              </Button>
            </>
          ) : (
            <Button variant="cta" size="sm" className="w-full mt-2" asChild>
              <Link to="/auth" onClick={() => setOpen(false)}>
                Sign in
              </Link>
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
