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
  const linkRef = useRef<HTMLAnchorElement>(null);

  useMagneticButton(linkRef, 100);
  useResponsiveHover(linkRef, { scaleAmount: 1.08, shadowIntensity: 0.2, duration: 0.3 });

  useEffect(() => {
    if (!linkRef.current) return;

    const link = linkRef.current;
    const onMouseEnter = () => {
      scramble();
    };

    const onMouseLeave = () => {
      reset();
    };

    const onClick = () => {
      gsap.to(link, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(link, {
            scale: 1.08,
            duration: 0.2,
            ease: "elastic.out(1, 0.5)",
          });
        },
      });
    };

    link.addEventListener("mouseenter", onMouseEnter);
    link.addEventListener("mouseleave", onMouseLeave);
    link.addEventListener("click", onClick);

    return () => {
      link.removeEventListener("mouseenter", onMouseEnter);
      link.removeEventListener("mouseleave", onMouseLeave);
      link.removeEventListener("click", onClick);
    };
  }, [scramble, reset]);

  return (
    <Button asChild variant={variant} size={size} className={`${className} transition-smooth will-animate magnetic-element`} {...props}>
      <a 
        ref={linkRef}
        href={href}
        target={target}
        rel={rel}
      >
        {displayText}
      </a>
    </Button>
  );
};

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out",
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

    // Animate buttons
    gsap.fromTo(
      buttonsRef.current?.querySelectorAll("button, a"),
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section id="cta" className="py-20 px-6" ref={sectionRef}>
      <div className="container mx-auto text-center will-animate">
        <h2 ref={titleRef} className="text-4xl lg:text-5xl font-bold mb-4 will-animate">
          Join the Revolution
        </h2>
        <p ref={descriptionRef} className="text-muted-foreground mb-8 max-w-2xl mx-auto will-animate">
          Be part of the future where users own their data, content, and value. We provide transparency and accessibility.
        </p>
        <div ref={buttonsRef} className="flex flex-wrap justify-center gap-4 will-animate">
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
