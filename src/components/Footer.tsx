import { useState, useEffect, useRef } from "react";

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  // Customize the scrolling text here
  const scrollingText = "PREMIUM PACKAGING * SUSTAINABLE * INNOVATIVE * QUALITY *";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsExpanded(true);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of footer is visible
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer
      id="footer"
      ref={footerRef}
      className={`relative bg-black text-white overflow-hidden transition-all duration-700 ease-out ${
        isExpanded
          ? "fixed inset-0 z-50 min-h-screen"
          : "relative min-h-[200px]"
      }`}
    >
      {/* Animated Background Grid */}
      {isExpanded && (
        <div className="absolute inset-0 opacity-10">
          <div className="grid-pattern"></div>
        </div>
      )}

      {/* Gradient Overlays */}
      {isExpanded && (
        <>
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/50 to-transparent z-[5]"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent z-[5]"></div>
        </>
      )}

      {/* Floating Particles Effect */}
      {isExpanded && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Main NAYAB Section */}
      <div
        className={`relative py-20 px-6 flex items-center justify-center transition-all duration-700 ${
          isExpanded ? "h-screen min-h-screen" : "min-h-[200px]"
        }`}
      >
        <div className="relative inline-block">
          {/* Large NAYAB Text */}
          <h1
            className={`font-black uppercase tracking-tight leading-none relative z-10 transition-all duration-700 ${
              isExpanded
                ? "text-[15rem] md:text-[19rem] lg:text-[20rem]"
                : "text-6xl md:text-8xl"
            }`}
            style={{ fontFamily: "'Tricked', sans-serif" }}
          >
            <span className="relative inline-block">
              NAYAB
              {/* Animated underline effect */}
              {isExpanded && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-underline"></span>
              )}
            </span>
            {/* Copyright Symbol */}
            <span
              className={`absolute top-0 right-[-2rem] transition-all duration-700 ${
                isExpanded ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"
              }`}
            >
              ©
            </span>
          </h1>

          {/* Coin decoration */}
          {isExpanded && (
            <div className="absolute top-4 right-[35%] w-20 h-20 md:w-28 md:h-28 z-20 pointer-events-none animate-coin">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="black"
                  stroke="white"
                  strokeWidth="3"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="30"
                  fontWeight="bold"
                  fontFamily="Arial, sans-serif"
                >
                  $
                </text>
              </svg>
            </div>
          )}

          {/* Red Labels Overlay - INSTAGRAM */}
          {isExpanded && (
            <a
              href="#"
              className="absolute left-[5%] top-[60%] bg-red-600 text-black px-4 py-2 rounded-lg font-bold text-sm md:text-base uppercase transform -rotate-6 hover:scale-110 hover:rotate-0 transition-all duration-300 z-30 animate-label-1"
            >
              INSTAGRAM
            </a>
          )}

          {/* Red Labels Overlay - TERMS */}
          {isExpanded && (
            <a
              href="#"
              className="absolute left-[30%] top-[20%] bg-red-600 text-black px-6 py-2 rounded-full font-bold text-sm md:text-base uppercase transform rotate-6 hover:scale-110 hover:rotate-0 transition-all duration-300 z-30 animate-label-2"
            >
              TERMS
            </a>
          )}

          {/* Red Labels Overlay - CONTACT */}
          {isExpanded && (
            <a
              href="#"
              className="absolute right-[25%] top-[25%] bg-red-600 text-black px-4 py-2 rounded-lg font-bold text-sm md:text-base uppercase transform -rotate-6 hover:scale-110 hover:rotate-0 transition-all duration-300 z-30 animate-label-3"
            >
              CONTACT
            </a>
          )}

          {/* Red Labels Overlay - FAQ */}
          {isExpanded && (
            <a
              href="#"
              className="absolute right-[10%] bottom-[15%] bg-red-600 text-black w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold text-sm md:text-base uppercase hover:scale-110 hover:rotate-12 transition-all duration-300 z-30 animate-label-4"
            >
              FAQ
            </a>
          )}
        </div>
      </div>

      {/* Enhanced Scrolling Text Line */}
      {isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/30 py-4 overflow-hidden bg-gradient-to-t from-black/80 to-transparent">
          <div className="scrolling-text whitespace-nowrap">
            <span className="inline-block text-sm md:text-base uppercase tracking-wider text-gradient">
              {scrollingText.repeat(10)}
            </span>
          </div>
        </div>
      )}

      <style>{`
        /* Custom Font - Tricked */
        @font-face {
          font-family: 'Tricked';
          src: url('/Tricked.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        /* Grid Pattern */
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          width: 100%;
          height: 100%;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        /* Floating Particles */
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          opacity: 0.3;
          animation: float linear infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }

        /* Coin Animation */
        @keyframes coin {
          0%, 100% {
            transform: rotateY(0deg) scale(1);
          }
          50% {
            transform: rotateY(180deg) scale(1.05);
          }
        }

        .animate-coin {
          animation: coin 3s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        /* Underline Animation */
        @keyframes underline {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scaleX(1);
            opacity: 0.5;
          }
        }

        .animate-underline {
          animation: underline 2s ease-out forwards;
        }

        /* Staggered Label Animations */
        @keyframes labelSlide {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-label-1 {
          animation: labelSlide 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-label-2 {
          animation: labelSlide 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-label-3 {
          animation: labelSlide 0.6s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-label-4 {
          animation: labelSlide 0.6s ease-out 0.8s forwards;
          opacity: 0;
        }

        /* Scrolling Text */
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .scrolling-text {
          animation: scroll 7s linear infinite;
        }
        
        .scrolling-text:hover {
          animation-play-state: paused;
        }

        /* Text Gradient */
        .text-gradient {
          background: linear-gradient(90deg, 
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(255, 255, 255, 1) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </footer>
  );
};

export default Footer;


