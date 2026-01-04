import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animate all elements with data-animate attribute
    const animateElements = containerRef.current.querySelectorAll('[data-animate]');
    
    animateElements.forEach((element, index) => {
      gsap.fromTo(
        element,
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
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return containerRef;
};

export const useHoverLift = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const onMouseEnter = () => {
      gsap.to(element, {
        y: -8,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(element, {
        y: 0,
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [ref]);
};

export const useStaggerAnimation = (
  selector: string,
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
  }
) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: options?.duration || 0.6,
        delay: options?.delay || 0,
        stagger: options?.stagger || 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elements[0],
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selector, options]);
};

export const useScrollReveal = (
  selector: string,
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    distance?: number;
  }
) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const direction = options?.direction || 'up';
    const distance = options?.distance || 30;
    
    const fromVars: any = {
      opacity: 0,
    };

    if (direction === 'up') fromVars.y = distance;
    if (direction === 'down') fromVars.y = -distance;
    if (direction === 'left') fromVars.x = distance;
    if (direction === 'right') fromVars.x = -distance;

    gsap.fromTo(
      elements,
      fromVars,
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: options?.duration || 0.8,
        delay: options?.delay || 0,
        stagger: options?.stagger || 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elements[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selector, options]);
};

export const useHoverScale = (ref: React.RefObject<HTMLElement>, scale = 1.05) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const onMouseEnter = () => {
      gsap.to(element, {
        scale,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [ref, scale]);
};

export const useClickPulse = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const onClick = () => {
      gsap.to(element, {
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(element, {
            scale: 1,
            duration: 0.2,
            ease: 'elastic.out(1, 0.5)',
          });
        },
      });
    };

    element.addEventListener('click', onClick);

    return () => {
      element.removeEventListener('click', onClick);
    };
  }, [ref]);
};

export const useParallax = (ref: React.RefObject<HTMLElement>, speed = 0.5) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const onScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const distance = scrolled - (elementTop - window.innerHeight);
      
      gsap.to(element, {
        y: distance * speed,
        duration: 0,
      });
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref, speed]);
};

// ============================================
// REAL-TIME REACTIVE ANIMATIONS
// ============================================

export const useCursorFollow = (ref: React.RefObject<HTMLElement>, intensity = 0.3) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let mouseX = 0;
    let mouseY = 0;
    let elementX = 0;
    let elementY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      mouseX = e.clientX - rect.left - rect.width / 2;
      mouseY = e.clientY - rect.top - rect.height / 2;
    };

    const animate = () => {
      elementX += (mouseX - elementX) * 0.1;
      elementY += (mouseY - elementY) * 0.1;

      gsap.to(element, {
        x: elementX * intensity,
        y: elementY * intensity,
        duration: 0,
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [ref, intensity]);
};

export const useMagneticButton = (ref: React.RefObject<HTMLElement>, range = 80) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      mouseX = e.clientX;
      mouseY = e.clientY;

      const distance = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
      );

      if (distance < range) {
        const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
        const x = Math.cos(angle) * (range - distance) * 0.3;
        const y = Math.sin(angle) * (range - distance) * 0.3;

        gsap.to(element, {
          x,
          y,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [ref, range]);
};

export const useScrollParallax = (ref: React.RefObject<HTMLElement>, speed = 0.5, direction: 'up' | 'down' = 'up') => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const multiplier = direction === 'up' ? -1 : 1;

    const onScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const distance = scrolled - (elementTop - window.innerHeight);

      gsap.to(element, {
        y: distance * speed * multiplier,
        duration: 0,
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref, speed, direction]);
};

export const usePointerDepth = (ref: React.RefObject<HTMLElement>, maxDepth = 20) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const onMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = (e.clientX - centerX) / rect.width;
      const distanceY = (e.clientY - centerY) / rect.height;

      const rotateX = distanceY * maxDepth;
      const rotateY = -distanceX * maxDepth;

      gsap.to(element, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(element, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [ref, maxDepth]);
};

export const useContinuousMotion = (ref: React.RefObject<HTMLElement>, options?: {
  duration?: number;
  distance?: number;
  direction?: 'x' | 'y' | 'xy';
}) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const duration = options?.duration || 6;
    const distance = options?.distance || 10;
    const direction = options?.direction || 'y';

    const timeline = gsap.timeline({ repeat: -1 });

    if (direction === 'y' || direction === 'xy') {
      timeline.to(element, {
        y: distance,
        duration: duration / 2,
        ease: 'sine.inOut',
      }, 0);
    }

    if (direction === 'x' || direction === 'xy') {
      timeline.to(element, {
        x: distance,
        duration: duration / 2,
        ease: 'sine.inOut',
      }, 0);
    }

    timeline.to(element, {
      y: direction === 'y' || direction === 'xy' ? -distance : 0,
      x: direction === 'x' || direction === 'xy' ? -distance : 0,
      duration: duration / 2,
      ease: 'sine.inOut',
    });

    return () => {
      timeline.kill();
    };
  }, [ref, options]);
};

export const useInertiaScroll = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let velocity = 0;
    let lastScrollY = window.scrollY;
    let animationId: number;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      velocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
    };

    const animate = () => {
      if (Math.abs(velocity) > 0.1) {
        velocity *= 0.95;
        gsap.to(element, {
          y: -velocity * 0.5,
          duration: 0,
        });
        animationId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const startAnimation = () => {
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', startAnimation, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', startAnimation);
      cancelAnimationFrame(animationId);
    };
  }, [ref]);
};

export const useResponsiveHover = (ref: React.RefObject<HTMLElement>, options?: {
  scaleAmount?: number;
  shadowIntensity?: number;
  duration?: number;
}) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const scaleAmount = options?.scaleAmount || 1.05;
    const shadowIntensity = options?.shadowIntensity || 0.2;
    const duration = options?.duration || 0.3;

    const onMouseEnter = () => {
      gsap.to(element, {
        scale: scaleAmount,
        boxShadow: `0 20px 40px rgba(0, 0, 0, ${shadowIntensity})`,
        duration,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
        duration,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [ref, options]);
};

export const useGlitchEffect = (ref: React.RefObject<HTMLElement>, triggerOnHover = true) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const triggerGlitch = () => {
      const timeline = gsap.timeline();

      for (let i = 0; i < 3; i++) {
        timeline.to(element, {
          x: (Math.random() - 0.5) * 10,
          y: (Math.random() - 0.5) * 10,
          duration: 0.05,
        }, i * 0.05);
      }

      timeline.to(element, {
        x: 0,
        y: 0,
        duration: 0.1,
      });
    };

    if (triggerOnHover) {
      element.addEventListener('mouseenter', triggerGlitch);
      return () => {
        element.removeEventListener('mouseenter', triggerGlitch);
      };
    }
  }, [ref, triggerOnHover]);
};

export const useFluidCursor = (ref: React.RefObject<HTMLElement>, options?: {
  size?: number;
  color?: string;
  blur?: number;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let mouseX = 0;
    let mouseY = 0;
    let displayX = 0;
    let displayY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const animate = () => {
      displayX += (mouseX - displayX) * 0.2;
      displayY += (mouseY - displayY) * 0.2;

      setPosition({ x: displayX, y: displayY });
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    element.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      element.removeEventListener('mousemove', onMouseMove);
    };
  }, [ref]);

  return position;
};

export const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const animationId = useRef<number>();

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const newVelocity = currentScrollY - lastScrollY.current;
      setVelocity(newVelocity);
      lastScrollY.current = currentScrollY;

      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }

      animationId.current = requestAnimationFrame(() => {
        setVelocity(0);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  return velocity;
};

export const useElementInView = (ref: React.RefObject<HTMLElement>) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isInView;
};