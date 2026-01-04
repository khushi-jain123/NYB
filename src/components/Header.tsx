import { Button } from "@/components/ui/button";
import { useTextScramble } from "@/hooks/use-text-scramble";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMagneticButton, useResponsiveHover } from "@/hooks/use-animations";
import { useParticleExplosion, useHyperScale, useShockwave } from "@/hooks/use-extreme-animations";

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
  const buttonRef = useRef<HTMLButtonElement>(null);

  useMagneticButton(buttonRef, 100);
  useResponsiveHover(buttonRef, { scaleAmount: 1.08, shadowIntensity: 0.2, duration: 0.3 });
  useParticleExplosion(buttonRef, { particleCount: 15, velocity: 6 });
  useShockwave(buttonRef);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const onMouseEnter = () => {
      scramble();
    };

    const onMouseLeave = () => {
      reset();
    };

    const onClick = () => {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(button, {
            scale: 1.08,
            duration: 0.2,
            ease: "elastic.out(1, 0.5)",
          });
        },
      });
    };

    button.addEventListener("mouseenter", onMouseEnter);
    button.addEventListener("mouseleave", onMouseLeave);
    button.addEventListener("click", onClick);

    return () => {
      button.removeEventListener("mouseenter", onMouseEnter);
      button.removeEventListener("mouseleave", onMouseLeave);
      button.removeEventListener("click", onClick);
    };
  }, [scramble, reset]);

  return (
    <Button
      ref={buttonRef}
      variant={variant}
      size={size}
      className={`${className} transition-smooth will-animate magnetic-element extreme-hover`}
      {...props}
    >
      {displayText}
    </Button>
  );
};

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useHyperScale(logoRef);

  useEffect(() => {
    // Animate header on mount
    gsap.fromTo(
      headerRef.current,
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }
    );

    // Animate logo
    gsap.fromTo(
      logoRef.current,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 0.2,
        ease: "back.out",
      }
    );

    // Animate nav
    gsap.fromTo(
      navRef.current,
      {
        opacity: 0,
        y: -10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out",
      }
    );

    // Animate buttons
    gsap.fromTo(
      buttonsRef.current?.querySelectorAll("button"),
      {
        opacity: 0,
        y: -10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.4,
        stagger: 0.1,
        ease: "power2.out",
      }
    );

    // Add hover animation to nav links
    const navLinks = navRef.current?.querySelectorAll("a");
    navLinks?.forEach((link) => {
      const onMouseEnter = () => {
        gsap.to(link, {
          color: "var(--foreground)",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const onMouseLeave = () => {
        gsap.to(link, {
          color: "var(--muted-foreground)",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      link.addEventListener("mouseenter", onMouseEnter);
      link.addEventListener("mouseleave", onMouseLeave);

      return () => {
        link.removeEventListener("mouseenter", onMouseEnter);
        link.removeEventListener("mouseleave", onMouseLeave);
      };
    });
  }, []);

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border will-animate"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div ref={logoRef} className="flex items-center gap-2 hover-scale cursor-pointer will-animate animate-hyper-pulse">
            <div className="w-6 h-6 rounded-full bg-foreground animate-soft-pulse"></div>
            <span className="text-lg font-semibold neon-text">NAYAB</span>
          </div>
          
          <nav ref={navRef} className="hidden md:flex items-center gap-8 will-animate">
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-smooth hover-underline"
            >
              Create, Sell, or Buy
            </a>
          </nav>
          
          <div ref={buttonsRef} className="flex items-center gap-3 will-animate">
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
