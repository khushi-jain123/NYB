import { Button } from "@/components/ui/button";
import { useTextScramble } from "@/hooks/use-text-scramble";
import { useState } from "react";

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

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  const imageStyle = {
    userSelect: 'none' as const,
    WebkitUserSelect: 'none' as const,
    MozUserSelect: 'none' as const,
    msUserSelect: 'none' as const,
    pointerEvents: 'none' as const,
    WebkitTouchCallout: 'none' as const,
    WebkitUserDrag: 'none' as const,
    KhtmlUserSelect: 'none' as const,
  };

  return (
    <section id="hero" className="pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-muted rounded-full text-sm">
              On a Mission <span className="mx-2">•</span> Over 100k Users <span className="mx-2">•</span> 2bn
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              A marketplace that flips the rule - where users are owners
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              Shop and earn in a decentralized way — powered by Web3 and owned by its users.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <ScrambleButton variant="default" size="lg">
                Coming Soon
              </ScrambleButton>
              <ScrambleButton variant="link" className="text-foreground">
                Explore Marketplace
              </ScrambleButton>
            </div>
          </div>
          
          <div className="relative">
            <div 
              className="bg-muted/50 rounded-3xl p-8 aspect-square flex items-center justify-center relative overflow-hidden cursor-pointer group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Base image */}
              <img 
                src="/mockup.png" 
                alt="Mobile App Mockup" 
                className={`max-w-full max-h-full object-contain rounded-2xl select-none pointer-events-none absolute inset-0 m-auto transition-opacity duration-500 ease-in-out ${
                  isHovered ? 'opacity-0' : 'opacity-100'
                }`}
                style={imageStyle}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                draggable={false}
              />
              {/* Hover image */}
              <img 
                src="/mockup1.png" 
                alt="Mobile App Mockup Hover" 
                className={`max-w-full max-h-full object-contain rounded-2xl select-none pointer-events-none absolute inset-0 m-auto transition-opacity duration-500 ease-in-out ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                style={imageStyle}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
