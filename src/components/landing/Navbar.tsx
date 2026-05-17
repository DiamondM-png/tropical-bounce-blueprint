import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Palmtree, Lock } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <Palmtree className="h-7 w-7 text-primary" />
          <span className="font-heading font-extrabold text-xl text-foreground">
            tropicalbounce<span className="text-secondary">.com</span>
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
            className="group flex items-center gap-1.5 text-sm font-heading font-semibold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent hover:from-amber-400 hover:to-amber-500 transition-all"
          >
            <Lock className="h-3.5 w-3.5 text-amber-500 group-hover:text-amber-400" />
            Upstream Hub
          </Link>
          <Button variant="cta" size="sm">
            Get Started
          </Button>
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
            Upstream Hub
          </Link>
          <Button variant="cta" size="sm" className="w-full mt-2">
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
