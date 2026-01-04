import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useContinuousBackground = (ref: React.RefObject<HTMLElement>, options?: {
  speed?: number;
  intensity?: number;
  direction?: 'x' | 'y' | 'xy';
}) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const speed = options?.speed || 0.5;
    const intensity = options?.intensity || 1;
    const direction = options?.direction || 'xy';

    let offsetX = 0;
    let offsetY = 0;
    let targetX = 0;
    let targetY = 0;

    const animate = () => {
      // Gentle oscillation
      targetX = Math.sin(Date.now() * 0.0001) * intensity * (direction === 'x' || direction === 'xy' ? 1 : 0);
      targetY = Math.cos(Date.now() * 0.00008) * intensity * (direction === 'y' || direction === 'xy' ? 1 : 0);

      offsetX += (targetX - offsetX) * speed;
      offsetY += (targetY - offsetY) * speed;

      gsap.set(element, {
        x: offsetX,
        y: offsetY,
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [ref, options]);
};

export const useGradientShift = (ref: React.RefObject<HTMLElement>, colors?: string[]) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const defaultColors = [
      'rgba(255, 255, 255, 0.05)',
      'rgba(255, 255, 255, 0.1)',
      'rgba(255, 255, 255, 0.05)',
    ];
    const animationColors = colors || defaultColors;

    const timeline = gsap.timeline({ repeat: -1 });

    animationColors.forEach((color, index) => {
      timeline.to(
        element,
        {
          backgroundImage: `linear-gradient(45deg, ${color}, transparent)`,
          duration: 3,
        },
        index * 3
      );
    });

    return () => {
      timeline.kill();
    };
  }, [ref, colors]);
};

export const useParticleEffect = (ref: React.RefObject<HTMLElement>, particleCount = 5) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const particles: HTMLElement[] = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = 'currentColor';
      particle.style.opacity = '0.3';
      particle.style.pointerEvents = 'none';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';

      element.appendChild(particle);
      particles.push(particle);

      // Animate each particle
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: 0,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        delay: Math.random() * 2,
        ease: 'none',
      });
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, [ref, particleCount]);
};

export const useMouseGlow = (ref: React.RefObject<HTMLElement>, options?: {
  size?: number;
  blur?: number;
  opacity?: number;
}) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const size = options?.size || 200;
    const blur = options?.blur || 40;
    const opacity = options?.opacity || 0.15;

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
      displayX += (mouseX - displayX) * 0.15;
      displayY += (mouseY - displayY) * 0.15;

      element.style.background = `radial-gradient(circle ${size}px at ${displayX}px ${displayY}px, rgba(255, 255, 255, ${opacity}), transparent 80%)`;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    element.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      element.removeEventListener('mousemove', onMouseMove);
    };
  }, [ref, options]);
};

export const useBlurOnScroll = (ref: React.RefObject<HTMLElement>, maxBlur = 10) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const rect = element.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;

    const onScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      const distance = Math.abs(elementCenter - viewportCenter);
      const blur = Math.min(maxBlur, (distance / viewportCenter) * maxBlur);

      gsap.to(element, {
        filter: `blur(${blur}px)`,
        duration: 0.3,
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [ref, maxBlur]);
};

export const useRotateOnScroll = (ref: React.RefObject<HTMLElement>, intensity = 0.5) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const rotation = (scrollY * intensity) % 360;

      gsap.to(element, {
        rotation,
        duration: 0,
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [ref, intensity]);
};

export const useStaggeredFloat = (selector: string, options?: {
  duration?: number;
  distance?: number;
  stagger?: number;
}) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const duration = options?.duration || 6;
    const distance = options?.distance || 10;
    const stagger = options?.stagger || 0.2;

    elements.forEach((element, index) => {
      gsap.to(element, {
        y: -distance,
        duration: duration / 2,
        delay: index * stagger,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => {
      gsap.killTweensOf(selector);
    };
  }, [selector, options]);
};
