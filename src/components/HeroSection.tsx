import { Button } from "@/components/ui/button";
import { useTextScramble } from "@/hooks/use-text-scramble";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursorFollow, useResponsiveHover, useMagneticButton } from "@/hooks/use-animations";
import { useContinuousBackground } from "@/hooks/use-continuous-bg";
import { useHyperTilt, useParticleExplosion, useShockwave, useHyperFloat } from "@/hooks/use-extreme-animations";

gsap.registerPlugin(ScrollTrigger);

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

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useCursorFollow(contentRef, 0.15);
  useContinuousBackground(badgeRef, { speed: 0.08, intensity: 2, direction: 'xy' });
  useHyperTilt(imageContainerRef);
  useHyperFloat(badgeRef);

  useEffect(() => {
    // Animate badge
    gsap.fromTo(
      badgeRef.current,
      {
        opacity: 0,
        y: 20,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: 0.1,
        ease: "back.out",
      }
    );

    // Animate heading with stagger
    gsap.fromTo(
      headingRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
      }
    );

    // Animate description
    gsap.fromTo(
      descriptionRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      }
    );

    // Animate buttons
    gsap.fromTo(
      buttonsRef.current?.querySelectorAll("button"),
      {
        opacity: 0,
        y: 20,
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

    // Animate image container
    gsap.fromTo(
      imageContainerRef.current,
      {
        opacity: 0,
        scale: 0.95,
        x: 40,
      },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      }
    );

    // Add scroll animation to image
    gsap.to(imageContainerRef.current, {
      scrollTrigger: {
        trigger: imageContainerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
      },
      y: -30,
    });
  }, []);

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
    <section id="hero" className="pt-32 pb-20 px-6" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="space-y-6 will-animate cursor-follow">
            <div ref={badgeRef} className="inline-block px-4 py-2 bg-muted rounded-full text-sm hover-scale cursor-pointer transition-smooth animate-hyper-pulse extreme-glow text-white">
              On a Mission <span className="mx-2">•</span> Over 100k Users <span className="mx-2">•</span> 2bn
            </div>
            
            <h1 ref={headingRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight will-animate neon-text text-white">
              A marketplace that flips the rule - where users are owners
            </h1>
            
            <p ref={descriptionRef} className="text-lg text-white max-w-lg will-animate">
              Shop and earn in a decentralized way — powered by Web3 and owned by its users.
            </p>
            
            <div ref={buttonsRef} className="flex flex-wrap items-center gap-4 will-animate">
              <ScrambleButton variant="default" size="lg">
                Coming Soon
              </ScrambleButton>
              <ScrambleButton variant="link" className="text-foreground">
                Explore Marketplace
              </ScrambleButton>
            </div>
          </div>
          
          <div ref={imageContainerRef} className="relative will-animate extreme-depth">
            <div 
              className="bg-muted/50 rounded-3xl p-8 aspect-square flex items-center justify-center relative overflow-hidden cursor-pointer group hover-scale transition-smooth extreme-hover"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Base image */}
              <img 
                src="/mockup.png" 
                alt="Mobile App Mockup" 
                className={`max-w-full max-h-full object-contain rounded-2xl select-none pointer-events-none absolute inset-0 m-auto transition-all duration-500 ease-in-out ${
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
                className={`max-w-full max-h-full object-contain rounded-2xl select-none pointer-events-none absolute inset-0 m-auto transition-all duration-500 ease-in-out ${
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
