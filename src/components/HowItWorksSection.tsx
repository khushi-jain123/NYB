import { Button } from "@/components/ui/button";
import { useTextScramble } from "@/hooks/use-text-scramble";

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

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      {...props}
    >
      {displayText}
    </Button>
  );
};

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-background">
      <div className="container mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
          How NAYAB Works
        </h2>
        
        <div className="space-y-24">
          {/* Step 1 */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4">
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
              <div className="bg-muted rounded-2xl p-4 md:p-8 flex-1 aspect-square flex items-center justify-center min-h-[100px]">
                <span className="text-accent font-semibold text-xs md:text-base">Product 1</span>
              </div>
              <div className="bg-accent rounded-2xl p-4 md:p-8 flex-1 aspect-square flex items-center justify-center min-h-[100px]">
                <span className="text-accent-foreground font-semibold text-xs md:text-base">Product 2</span>
              </div>
              <div className="bg-muted rounded-2xl p-4 md:p-8 flex-1 aspect-square flex items-center justify-center min-h-[100px]">
                <span className="text-accent font-semibold text-xs md:text-base">Product 3</span>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 order-2 lg:order-1">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-card border-2 border-border rounded-2xl p-6 flex-1">
                  <h4 className="font-semibold mb-2">Wallets</h4>
                  <p className="text-sm text-muted-foreground">Crypto payment option</p>
                </div>
                <div className="bg-card border-2 border-border rounded-2xl p-6 flex-1">
                  <h4 className="font-semibold mb-2">Cards</h4>
                  <p className="text-sm text-muted-foreground">Traditional payment</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 order-1 lg:order-2">
              <div className="text-sm text-muted-foreground">Step 2</div>
              <h3 className="text-2xl md:text-3xl font-bold">Pay Your Way</h3>
              <p className="text-muted-foreground">
                Crypto or traditional payment: a seamless checkout.
              </p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">Step 3</div>
              <h3 className="text-3xl font-bold">Get More Than Just a Product</h3>
              <p className="text-muted-foreground">
                Receive a product, plus an NFT certificate which is verified ownership.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-muted rounded-2xl p-8 flex-1 aspect-[3/4] flex items-center justify-center">
                <span className="font-semibold">Product</span>
              </div>
              <div className="bg-muted rounded-2xl p-8 flex-1 aspect-[3/4] flex items-center justify-center">
                <span className="font-semibold">NFT Proof</span>
              </div>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border-2 border-border rounded-2xl p-6">
                  <h4 className="font-semibold mb-2">Governance Role</h4>
                  <p className="text-2xl font-bold">1,240</p>
                  <p className="text-sm text-muted-foreground">Cast Vote</p>
                </div>
                <div className="bg-card border-2 border-border rounded-2xl p-6">
                  <h4 className="font-semibold mb-2">Royalty Revenue</h4>
                  <p className="text-2xl font-bold">$24k</p>
                  <p className="text-sm text-muted-foreground">Earned</p>
                </div>
                <div className="bg-card border-2 border-border rounded-2xl p-6">
                  <h4 className="font-semibold mb-2">Referrals</h4>
                  <p className="text-sm text-muted-foreground">Invite others, get 40 weeks</p>
                </div>
                <div className="bg-card border-2 border-border rounded-2xl p-6">
                  <h4 className="font-semibold mb-2">Your Score</h4>
                  <p className="text-sm text-muted-foreground">Access to weekly unlocks</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 order-1 lg:order-2">
              <div className="text-sm text-muted-foreground">Step 4</div>
              <h3 className="text-3xl font-bold">Own It</h3>
              <p className="text-muted-foreground">
                With governance rights and future book royalty sales, they really unlock anything else in...
              </p>
              <div className="flex gap-4">
                <Button variant="outline">Governance</Button>
                <Button variant="accent">Earn NFTs</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
