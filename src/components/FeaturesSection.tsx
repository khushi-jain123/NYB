import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePointerDepth, useResponsiveHover } from "@/hooks/use-animations";
import { useContinuousBackground } from "@/hooks/use-continuous-bg";
import { useHyperTilt, useHyperFloat, useParticleExplosion } from "@/hooks/use-extreme-animations";

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const buyerRef = useRef<HTMLDivElement>(null);
  const payoutRef = useRef<HTMLDivElement>(null);
  const sellerRef = useRef<HTMLDivElement>(null);

  usePointerDepth(imageRef, 15);
  useContinuousBackground(imageRef, { speed: 0.1, intensity: 3, direction: 'xy' });
  useHyperTilt(imageRef);
  useHyperFloat(payoutRef);
  useParticleExplosion(buyerRef);
  useParticleExplosion(sellerRef);

  useEffect(() => {
    // Animate image container
    gsap.fromTo(
      imageRef.current,
      {
        opacity: 0,
        x: -40,
        scale: 0.95,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate heading
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
        delay: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
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
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate cards with stagger
    const cards = cardsRef.current?.querySelectorAll(".feature-card");
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: 0.3,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    // Add hover animations to cards
    cards?.forEach((card) => {
      const onMouseEnter = () => {
        gsap.to(card, {
          y: -8,
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const onMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", onMouseEnter);
      card.addEventListener("mouseleave", onMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", onMouseEnter);
        card.removeEventListener("mouseleave", onMouseLeave);
      };
    });

    // Animate diagram boxes
    const diagramBoxes = imageRef.current?.querySelectorAll("div[class*='border']");
    diagramBoxes?.forEach((box, index) => {
      gsap.fromTo(
        box,
        {
          opacity: 0,
          scale: 0.8,
          rotation: -10,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: 0.4 + index * 0.1,
          ease: "back.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section id="features" className="py-20 px-6" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div ref={imageRef} className="bg-muted/30 rounded-3xl p-8 md:p-12 aspect-square flex items-center justify-center min-h-[300px] md:min-h-[400px] will-animate reactive-depth">
            <div className="relative w-full h-full max-w-sm">
              {/* Animated flowing lines with black/gray/white gradient */}
              <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                <defs>
                  <linearGradient id="buyerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                    <stop offset="100%" stopColor="rgba(128, 128, 128, 0.3)" />
                  </linearGradient>
                  <linearGradient id="payoutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(200, 200, 200, 0.7)" />
                    <stop offset="100%" stopColor="rgba(100, 100, 100, 0.3)" />
                  </linearGradient>
                  <linearGradient id="sellerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(180, 180, 180, 0.6)" />
                    <stop offset="100%" stopColor="rgba(80, 80, 80, 0.3)" />
                  </linearGradient>
                </defs>
                {/* Buyer to Payout line */}
                <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="url(#buyerGradient)" strokeWidth="2" className="animate-pulse connection-line" />
                {/* Payout to Seller line */}
                <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="url(#sellerGradient)" strokeWidth="2" className="animate-pulse connection-line" style={{ animationDelay: '0.3s' }} />
                {/* Buyer to Payout line */}
                <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="url(#payoutGradient)" strokeWidth="2" className="animate-pulse connection-line" style={{ animationDelay: '0.6s' }} />
              </svg>

              {/* Buyer - Top Left - White Theme */}
              <div 
                ref={buyerRef}
                className="absolute top-4 left-4 md:top-0 md:left-0 w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center font-semibold text-sm md:text-base hover-scale transition-smooth cursor-pointer will-animate buyer-element"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(200, 200, 200, 0.05) 100%)',
                  border: '2px solid rgb(200, 200, 200)',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(200, 200, 200, 0.1)',
                }}
              >
                <div className="text-center">
                  <div className="text-gray-300 font-bold">Buyer</div>
                </div>
              </div>

              {/* Payout - Center - Gray Theme */}
              <div 
                ref={payoutRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-lg flex items-center justify-center font-semibold text-sm md:text-base hover-scale transition-smooth cursor-pointer will-animate payout-element animate-hyper-pulse"
                style={{
                  background: 'linear-gradient(135deg, rgba(150, 150, 150, 0.15) 0%, rgba(100, 100, 100, 0.05) 100%)',
                  border: '2px solid rgb(150, 150, 150)',
                  boxShadow: '0 0 30px rgba(200, 200, 200, 0.5), inset 0 0 30px rgba(150, 150, 150, 0.15)',
                }}
              >
                <div className="text-center">
                  <div className="text-gray-400 font-bold">Payout</div>
                </div>
              </div>

              {/* Seller - Bottom Right - Black Theme */}
              <div 
                ref={sellerRef}
                className="absolute bottom-4 right-4 md:bottom-0 md:right-0 w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center font-semibold text-sm md:text-base hover-scale transition-smooth cursor-pointer will-animate seller-element"
                style={{
                  background: 'linear-gradient(135deg, rgba(100, 100, 100, 0.1) 0%, rgba(50, 50, 50, 0.05) 100%)',
                  border: '2px solid rgb(100, 100, 100)',
                  boxShadow: '0 0 20px rgba(150, 150, 150, 0.3), inset 0 0 20px rgba(100, 100, 100, 0.1)',
                }}
              >
                <div className="text-center">
                  <div className="text-gray-500 font-bold">Seller</div>
                </div>
              </div>

              {/* Flow indicator dots - Black/Gray/White */}
              <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full animate-soft-pulse" style={{ backgroundColor: 'rgb(200, 200, 200)' }}></div>
              <div className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full animate-soft-pulse" style={{ backgroundColor: 'rgb(100, 100, 100)', animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full animate-soft-pulse" style={{ backgroundColor: 'rgb(150, 150, 150)', animationDelay: '0.25s' }}></div>
            </div>
          </div>
          
          <div className="space-y-8 will-animate">
            <div>
              <h2 ref={headingRef} className="text-4xl lg:text-5xl font-bold mb-4 will-animate neon-text">
                No middlemen. No gatekeepers. Just ownership.
              </h2>
              <p ref={descriptionRef} className="text-muted-foreground will-animate">
                NAYAB eliminates costly intermediaries, puts quality first with no gatekeeper, control, giving users direct ownership.
              </p>
            </div>
            
            <div ref={cardsRef} className="space-y-4">
              <div className="feature-card bg-muted/50 rounded-lg p-6 hover-lift transition-smooth will-animate responsive-scale">
                <h3 className="font-semibold mb-2">No Middlemen</h3>
                <p className="text-sm text-muted-foreground">
                  Maximizing value by cutting out middlemen.
                </p>
              </div>
              
              <div className="feature-card bg-muted/50 rounded-lg p-6 hover-lift transition-smooth will-animate responsive-scale">
                <h3 className="font-semibold mb-2">No Gatekeepers</h3>
                <p className="text-sm text-muted-foreground">
                  Open for all access & fair.
                </p>
              </div>
              
              <div className="feature-card bg-muted/50 rounded-lg p-6 hover-lift transition-smooth will-animate responsive-scale">
                <h3 className="font-semibold mb-2">Decentralized Ownership</h3>
                <p className="text-sm text-muted-foreground">
                  Users truly own their creations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
