import { Button } from "@/components/ui/button";
import { useTextScramble } from "@/hooks/use-text-scramble";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagneticButton, useResponsiveHover } from "@/hooks/use-animations";

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
      className={`${className} transition-smooth will-animate magnetic-element`}
      {...props}
    >
      {displayText}
    </Button>
  );
};

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate each step
    const steps = stepsRef.current?.querySelectorAll(".step-container");
    steps?.forEach((step, index) => {
      const isEven = index % 2 === 0;
      
      gsap.fromTo(
        step,
        {
          opacity: 0,
          x: isEven ? -40 : 40,
          y: 30,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          delay: 0.1 + index * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate content within step
      const content = step.querySelectorAll(".step-content > *");
      gsap.fromTo(
        content,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2 + index * 0.15,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate boxes
      const boxes = step.querySelectorAll(".step-box");
      gsap.fromTo(
        boxes,
        {
          opacity: 0,
          scale: 0.9,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3 + index * 0.15,
          stagger: 0.08,
          ease: "back.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Add hover to boxes with continuous motion
      boxes?.forEach((box) => {
        const onMouseEnter = () => {
          gsap.to(box, {
            y: -8,
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const onMouseLeave = () => {
          gsap.to(box, {
            y: 0,
            scale: 1,
            boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
            duration: 0.3,
            ease: "power2.out",
          });
        };

        box.addEventListener("mouseenter", onMouseEnter);
        box.addEventListener("mouseleave", onMouseLeave);

        return () => {
          box.removeEventListener("mouseenter", onMouseEnter);
          box.removeEventListener("mouseleave", onMouseLeave);
        };
      });
    });
  }, []);

  return (
    <section id="how-it-works" className="py-20 px-6" ref={sectionRef}>
      <div className="container mx-auto">
        <h2 ref={titleRef} className="text-4xl lg:text-5xl font-bold text-center mb-16 will-animate">
          How NAYAB Works
        </h2>
        
        <div ref={stepsRef} className="space-y-24">
          {/* Step 1 */}
          <div className="step-container grid lg:grid-cols-2 gap-8 lg:gap-12 items-center will-animate">
            <div className="step-content space-y-4">
              <div className="text-sm text-muted-foreground">Step 1</div>
              <h3 className="text-2xl md:text-3xl font-bold">Explore the Marketplace</h3>
              <p className="text-muted-foreground">
                Browse a diverse range of both digital and blockchain products.
              </p>
              <ScrambleButton variant="default" size="lg" className="w-full sm:w-auto">
                Start Exploring →
              </ScrambleButton>
            </div>
            <div className="flex gap-3 md:gap-4">
              <div className="step-box bg-muted rounded-2xl p-4 md:p-8 flex-1 aspect-square flex items-center justify-center min-h-[100px] hover-lift transition-smooth cursor-pointer responsive-scale">
                <span className="text-accent font-semibold text-xs md:text-base">Product 1</span>
              </div>
              <div className="step-box bg-accent rounded-2xl p-4 md:p-8 flex-1 aspect-square flex items-center justify-center min-h-[100px] hover-lift transition-smooth cursor-pointer responsive-scale">
                <span className="text-accent-foreground font-semibold text-xs md:text-base">Product 2</span>
              </div>
              <div className="step-box bg-muted rounded-2xl p-4 md:p-8 flex-1 aspect-square flex items-center justify-center min-h-[100px] hover-lift transition-smooth cursor-pointer responsive-scale">
                <span className="text-accent font-semibold text-xs md:text-base">Product 3</span>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="step-container grid lg:grid-cols-2 gap-8 lg:gap-12 items-center will-animate">
            <div className="space-y-4 order-2 lg:order-1">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="step-box bg-card border-2 border-border rounded-2xl p-6 flex-1 hover-lift transition-smooth cursor-pointer responsive-scale">
                  <h4 className="font-semibold mb-2">Wallets</h4>
                  <p className="text-sm text-muted-foreground">Crypto payment option</p>
                </div>
                <div className="step-box bg-card border-2 border-border rounded-2xl p-6 flex-1 hover-lift transition-smooth cursor-pointer responsive-scale">
                  <h4 className="font-semibold mb-2">Cards</h4>
                  <p className="text-sm text-muted-foreground">Traditional payment</p>
                </div>
              </div>
            </div>
            <div className="step-content space-y-4 order-1 lg:order-2">
              <div className="text-sm text-muted-foreground">Step 2</div>
              <h3 className="text-2xl md:text-3xl font-bold">Pay Your Way</h3>
              <p className="text-muted-foreground">
                Crypto or traditional payment: a seamless checkout.
              </p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="step-container grid lg:grid-cols-2 gap-12 items-center will-animate">
            <div className="step-content space-y-4">
              <div className="text-sm text-muted-foreground">Step 3</div>
              <h3 className="text-3xl font-bold">Get More Than Just a Product</h3>
              <p className="text-muted-foreground">
                Receive a product, plus an NFT certificate which is verified ownership.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="step-box bg-muted rounded-2xl p-8 flex-1 aspect-[3/4] flex items-center justify-center hover-lift transition-smooth cursor-pointer responsive-scale">
                <span className="font-semibold">Product</span>
              </div>
              <div className="step-box bg-muted rounded-2xl p-8 flex-1 aspect-[3/4] flex items-center justify-center hover-lift transition-smooth cursor-pointer responsive-scale">
                <span className="font-semibold">NFT Proof</span>
              </div>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="step-container grid lg:grid-cols-2 gap-12 items-center will-animate">
            <div className="space-y-4 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="step-box bg-card border-2 border-border rounded-2xl p-6 hover-lift transition-smooth cursor-pointer responsive-scale">
                  <h4 className="font-semibold mb-2">Governance Role</h4>
                  <p className="text-2xl font-bold">1,240</p>
                  <p className="text-sm text-muted-foreground">Cast Vote</p>
                </div>
                <div className="step-box bg-card border-2 border-border rounded-2xl p-6 hover-lift transition-smooth cursor-pointer responsive-scale">
                  <h4 className="font-semibold mb-2">Royalty Revenue</h4>
                  <p className="text-2xl font-bold">$24k</p>
                  <p className="text-sm text-muted-foreground">Earned</p>
                </div>
                <div className="step-box bg-card border-2 border-border rounded-2xl p-6 hover-lift transition-smooth cursor-pointer responsive-scale">
                  <h4 className="font-semibold mb-2">Referrals</h4>
                  <p className="text-sm text-muted-foreground">Invite others, get 40 weeks</p>
                </div>
                <div className="step-box bg-card border-2 border-border rounded-2xl p-6 hover-lift transition-smooth cursor-pointer responsive-scale">
                  <h4 className="font-semibold mb-2">Your Score</h4>
                  <p className="text-sm text-muted-foreground">Access to weekly unlocks</p>
                </div>
              </div>
            </div>
            <div className="step-content space-y-4 order-1 lg:order-2">
              <div className="text-sm text-muted-foreground">Step 4</div>
              <h3 className="text-3xl font-bold">Own It</h3>
              <p className="text-muted-foreground">
                With governance rights and future book royalty sales, they really unlock anything else in...
              </p>
              <div className="flex gap-4">
                <Button variant="outline" className="hover-lift transition-smooth magnetic-element">Governance</Button>
                <Button variant="accent" className="hover-lift transition-smooth magnetic-element">Earn NFTs</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
