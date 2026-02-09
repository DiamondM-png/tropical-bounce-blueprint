import { Palmtree } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <a href="#" className="flex items-center gap-2 mb-3">
              <Palmtree className="h-6 w-6 text-accent" />
              <span className="font-heading font-extrabold text-lg">
                tropicalbounce.com
              </span>
            </a>
            <p className="text-sm text-primary-foreground/60 max-w-xs font-body">
              Your complete toolkit for launching a profitable bounce house 
              rental business.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="font-heading font-bold text-sm mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/60 font-body">
                <li><a href="#features" className="hover:text-primary-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-primary-foreground transition-colors">Pricing</a></li>
                <li><a href="#testimonials" className="hover:text-primary-foreground transition-colors">Testimonials</a></li>
                <li><a href="#faq" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/60 font-body">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center">
          <p className="text-sm text-primary-foreground/40 font-body">
            © {new Date().getFullYear()} tropicalbounce.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
