import { Button } from "@/components/ui/button";
import { useTextScramble } from "@/hooks/use-text-scramble";

const ScrambleButton = ({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "",
  asChild = false,
  ...props 
}: { 
  children: string; 
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "accent";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  asChild?: boolean;
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
      asChild={asChild}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      {...props}
    >
      {asChild ? children : displayText}
    </Button>
  );
};

const ScrambleLink = ({ 
  children, 
  href = "#",
  variant = "outline",
  size = "lg",
  className = "",
  target,
  rel,
  ...props 
}: { 
  children: string; 
  href?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "accent";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  target?: string;
  rel?: string;
  [key: string]: any;
}) => {
  const { displayText, scramble, reset } = useTextScramble(children, {
    revealSpeed: 30,
  });

  return (
    <Button asChild variant={variant} size={size} className={className} {...props}>
      <a 
        href={href}
        target={target}
        rel={rel}
        onMouseEnter={scramble}
        onMouseLeave={reset}
      >
        {displayText}
      </a>
    </Button>
  );
};

const CTASection = () => {
  return (
    <section id="cta" className="py-20 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          Join the Revolution
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Be part of the future where users own their data, content, and value. We provide transparency and accessibility.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <ScrambleButton variant="default" size="lg">
            Coming Soon
          </ScrambleButton>
          <ScrambleLink 
            href="https://forms.gle/pZQmEdSEnZv2mHuX7" 
            variant="outline" 
            size="lg"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Join the waitlist
          </ScrambleLink>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
