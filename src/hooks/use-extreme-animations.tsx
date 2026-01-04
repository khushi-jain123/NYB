import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// ============================================
// EXTREME LEVEL ANIMATIONS
// ============================================

export const useParticleExplosion = (ref: React.RefObject<HTMLElement>, options?: {
  particleCount?: number;
  velocity?: number;
  colors?: string[];
}) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const particleCount = options?.particleCount || 20;
    const velocity = options?.velocity || 8;
    const colors = options?.colors || ['#ffffff', '#000000'];

    const onClick = () => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = Math.random() * 8 + 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        gsap.to(particle, {
          x: vx * 100,
          y: vy * 100,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          onComplete: () => {
            particle.remove();
          },
        });
      }
    };

    element.addEventListener('click', onClick);

    return () => {
      element.removeEventListener('click', onClick);
    };
  }, [ref, options]);
};

export const useLiquidSwipe = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const distX = (mouseX - centerX) / centerX;
      const distY = (mouseY - centerY) / centerY;

      gsap.to(element, {
        skewX: distX * 5,
        skewY: distY * 5,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(element, {
        skewX: 0,
        skewY: 0,
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
  }, [ref]);
};

export const useShapeShifter = (ref: React.RefObject<HTMLElement>, shapes?: string[]) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const shapeList = shapes || ['0%', '25%', '50%', '75%', '100%'];
    let currentShape = 0;

    const cycle = () => {
      gsap.to(element, {
        borderRadius: shapeList[currentShape],
        duration: 0.8,
        ease: 'power2.inOut',
      });

      currentShape = (currentShape + 1) % shapeList.length;
    };

    const interval = setInterval(cycle, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [ref, shapes]);
};

export const useRippleEffect = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const onClick = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = '0px';
      ripple.style.height = '0px';
      ripple.style.borderRadius = '50%';
      ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
      ripple.style.pointerEvents = 'none';
      ripple.style.transform = 'translate(-50%, -50%)';

      element.style.position = 'relative';
      element.style.overflow = 'hidden';
      element.appendChild(ripple);

      gsap.to(ripple, {
        width: Math.max(rect.width, rect.height) * 2,
        height: Math.max(rect.width, rect.height) * 2,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          ripple.remove();
        },
      });
    };

    element.addEventListener('click', onClick);

    return () => {
      element.removeEventListener('click', onClick);
    };
  }, [ref]);
};

export const useGlitchWave = (ref: React.RefObject<HTMLElement>, intensity = 5) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let animationId: number;

    const animate = () => {
      const time = Date.now() * 0.001;
      const glitch = Math.sin(time * 3) * intensity;

      gsap.set(element, {
        x: glitch,
        y: Math.sin(time * 2.5) * intensity,
        filter: `hue-rotate(${Math.sin(time) * 10}deg)`,
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      gsap.set(element, { x: 0, y: 0, filter: 'hue-rotate(0deg)' });
    };
  }, [ref, intensity]);
};

export const useWaveDistortion = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const distX = (mouseX - centerX) / centerX;
      const distY = (mouseY - centerY) / centerY;

      gsap.to(element, {
        rotationX: distY * 15,
        rotationY: distX * 15,
        transformPerspective: 800,
        duration: 0.4,
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
  }, [ref]);
};

export const useHyperScale = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const onMouseEnter = () => {
      gsap.to(element, {
        scale: 1.2,
        duration: 0.2,
        ease: 'back.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.4,
        ease: 'elastic.out(1.2, 0.6)',
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

export const useRotationVortex = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let animationId: number;

    const animate = () => {
      const time = Date.now() * 0.001;
      gsap.set(element, {
        rotation: time * 180,
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      gsap.set(element, { rotation: 0 });
    };
  }, [ref]);
};

export const useBlurPulse = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.to(element, {
      filter: 'blur(0px)',
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      gsap.killTweensOf(element);
    };
  }, [ref]);
};

export const useHyperBounce = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.to(element, {
      y: -20,
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    return () => {
      gsap.killTweensOf(element);
    };
  }, [ref]);
};

export const useChaoticRotation = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let animationId: number;

    const animate = () => {
      const time = Date.now() * 0.002;
      const chaotic = Math.sin(time * 2.3) * 30 + Math.cos(time * 1.7) * 20;

      gsap.set(element, {
        rotation: chaotic,
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      gsap.set(element, { rotation: 0 });
    };
  }, [ref]);
};

export const useColorShift = (ref: React.RefObject<HTMLElement>, colors?: string[]) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const colorList = colors || ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    let currentColor = 0;

    const cycle = () => {
      gsap.to(element, {
        backgroundColor: colorList[currentColor],
        duration: 0.5,
        ease: 'power2.inOut',
      });

      currentColor = (currentColor + 1) % colorList.length;
    };

    const interval = setInterval(cycle, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [ref, colors]);
};

export const useHyperMorphing = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const shapes = ['0%', '50%', '0%'];
    let currentShape = 0;

    const timeline = gsap.timeline({ repeat: -1 });

    shapes.forEach((shape) => {
      timeline.to(element, {
        borderRadius: shape,
        duration: 1,
        ease: 'sine.inOut',
      });
    });

    return () => {
      timeline.kill();
    };
  }, [ref]);
};

export const useStrobeEffect = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.to(element, {
      opacity: 1,
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: 'none',
    });

    return () => {
      gsap.killTweensOf(element);
    };
  }, [ref]);
};

export const useHyperFloat = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let animationId: number;

    const animate = () => {
      const time = Date.now() * 0.001;
      const y = Math.sin(time * 2) * 15 + Math.cos(time * 1.5) * 10;
      const x = Math.sin(time * 1.3) * 10;

      gsap.set(element, {
        y,
        x,
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      gsap.set(element, { x: 0, y: 0 });
    };
  }, [ref]);
};

export const useShockwave = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const onClick = () => {
      gsap.fromTo(
        element,
        {
          scale: 1,
          boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.7)',
        },
        {
          scale: 1.1,
          boxShadow: '0 0 0 30px rgba(255, 255, 255, 0)',
          duration: 0.6,
          ease: 'power2.out',
        }
      );
    };

    element.addEventListener('click', onClick);

    return () => {
      element.removeEventListener('click', onClick);
    };
  }, [ref]);
};

export const useHyperTilt = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;

      const rotateX = (mouseY - 0.5) * 30;
      const rotateY = (mouseX - 0.5) * -30;

      gsap.to(element, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 600,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(element, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'elastic.out(1.2, 0.6)',
      });
    };

    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [ref]);
};
