import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagneticButton, useResponsiveHover } from "@/hooks/use-animations";
import { useContinuousBackground } from "@/hooks/use-continuous-bg";

gsap.registerPlugin(ScrollTrigger);

const EcosystemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

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
        delay: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate diagram elements
    const badges = diagramRef.current?.querySelectorAll(".ecosystem-badge");
    badges?.forEach((badge, index) => {
      gsap.fromTo(
        badge,
        {
          opacity: 0,
          scale: 0.8,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2 + index * 0.15,
          ease: "back.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // Add hover animation
      const onMouseEnter = () => {
        gsap.to(badge, {
          scale: 1.1,
          y: -8,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const onMouseLeave = () => {
        gsap.to(badge, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      badge.addEventListener("mouseenter", onMouseEnter);
      badge.addEventListener("mouseleave", onMouseLeave);

      return () => {
        badge.removeEventListener("mouseenter", onMouseEnter);
        badge.removeEventListener("mouseleave", onMouseLeave);
      };
    });

    // Animate center dot
    const centerDot = diagramRef.current?.querySelector(".ecosystem-center");
    gsap.fromTo(
      centerDot,
      {
        opacity: 0,
        scale: 0,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 0.5,
        ease: "back.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    // Add pulsing animation to center dot
    gsap.to(centerDot, {
      boxShadow: "0 0 0 20px rgba(0, 0, 0, 0)",
      duration: 2,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section id="ecosystem" className="py-20 px-6" ref={sectionRef}>
      <div className="container mx-auto">
        <h2 ref={titleRef} className="text-4xl lg:text-5xl font-bold text-center mb-4 will-animate">
          The NAYAB Ecosystem
        </h2>
        <p ref={descriptionRef} className="text-center text-muted-foreground mb-16 will-animate">
          3P: Creators, Collectors, Investors, Stewards. Community-based and transparent.
        </p>
        
        <div ref={diagramRef} className="relative h-96 flex items-center justify-center will-animate">
          <div className="ecosystem-badge absolute top-0 left-1/2 -translate-x-1/2 hover-scale transition-smooth cursor-pointer responsive-scale magnetic-element">
            <div className="bg-muted rounded-full px-6 py-3 text-sm font-semibold">
              On & Off Trade
            </div>
          </div>
          
          <div className="ecosystem-badge absolute bottom-0 left-1/4 hover-scale transition-smooth cursor-pointer responsive-scale magnetic-element">
            <div className="bg-muted rounded-full px-6 py-3 text-sm font-semibold">
              Our Wallet
            </div>
          </div>
          
          <div className="ecosystem-badge absolute top-1/3 right-1/4 hover-scale transition-smooth cursor-pointer responsive-scale magnetic-element">
            <div className="bg-muted rounded-full px-6 py-3 text-sm font-semibold">
              Our Store/Vendor
            </div>
          </div>
          
          <div className="ecosystem-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-foreground rounded-full will-animate" style={{ boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.1)" }}></div>
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-foreground rounded-full opacity-50 animate-soft-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-foreground rounded-full opacity-50 animate-soft-pulse" style={{ animationDelay: "0.5s" }}></div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
