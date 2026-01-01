import { useEffect } from "react";

/**
 * Hook to enable smooth scrolling for anchor links
 * Handles both click events and programmatic navigation
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement;
      
      if (!anchor) return;
      
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Calculate offset to account for fixed header
        const header = document.querySelector("header");
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    };

    // Handle click events on anchor links
    document.addEventListener("click", handleClick);

    // Handle hash changes (e.g., when user navigates with browser back/forward)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const header = document.querySelector("header");
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    // Handle initial hash if present
    if (window.location.hash) {
      // Small delay to ensure DOM is ready
      setTimeout(handleHashChange, 100);
    }

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
};

