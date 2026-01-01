import { Button } from "@/components/ui/button";
import { useTextScramble } from "@/hooks/use-text-scramble";

const ScrambleButton = ({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "",
  ...props 
}: { 
  children: string; 
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "accent";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  [key: string]: any;
}) => {
  const { displayText, scramble, reset } = useTextScramble(children, {
    revealSpeed: 30,
  });

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      {...props}
    >
      {displayText}
    </Button>
  );
};

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-foreground"></div>
            <span className="text-lg font-semibold">NAYAB</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Create, Sell, or Buy
            </a>
          </nav>
          
          <div className="flex items-center gap-3">
            <ScrambleButton 
              variant="outline" 
              size="sm"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/nayab.pdf';
                link.download = 'nayab.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Whitepaper
            </ScrambleButton>
            <ScrambleButton variant="default" size="sm">
              Coming Soon
            </ScrambleButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
