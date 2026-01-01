const EcosystemSection = () => {
  return (
    <section id="ecosystem" className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">
          The NAYAB Ecosystem
        </h2>
        <p className="text-center text-muted-foreground mb-16">
          3P: Creators, Collectors, Investors, Stewards. Community-based and transparent.
        </p>
        
        <div className="relative h-96 flex items-center justify-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <div className="bg-muted rounded-full px-6 py-3 text-sm font-semibold">
              On & Off Trade
            </div>
          </div>
          
          <div className="absolute bottom-0 left-1/4">
            <div className="bg-muted rounded-full px-6 py-3 text-sm font-semibold">
              Our Wallet
            </div>
          </div>
          
          <div className="absolute top-1/3 right-1/4">
            <div className="bg-muted rounded-full px-6 py-3 text-sm font-semibold">
              Our Store/Vendor
            </div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-foreground rounded-full"></div>
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-foreground rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-foreground rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
