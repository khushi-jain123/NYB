const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="bg-muted/30 rounded-3xl p-8 md:p-12 aspect-square flex items-center justify-center min-h-[300px] md:min-h-[400px]">
            <div className="relative w-full h-full max-w-sm">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 border-2 border-foreground rounded-lg flex items-center justify-center font-semibold text-sm md:text-base">
                Payout
              </div>
              <div className="absolute top-4 left-4 md:top-0 md:left-0 w-20 h-20 md:w-24 md:h-24 border-2 border-foreground rounded-lg flex items-center justify-center font-semibold text-sm md:text-base">
                Buyer
              </div>
              <div className="absolute bottom-4 right-4 md:bottom-0 md:right-0 w-20 h-20 md:w-24 md:h-24 border-2 border-foreground rounded-lg flex items-center justify-center font-semibold text-sm md:text-base">
                Seller
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                No middlemen. No gatekeepers. Just ownership.
              </h2>
              <p className="text-muted-foreground">
                NAYAB eliminates costly intermediaries, puts quality first with no gatekeeper, control, giving users direct ownership.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-2">No Middlemen</h3>
                <p className="text-sm text-muted-foreground">
                  Maximizing value by cutting out middlemen.
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-2">No Gatekeepers</h3>
                <p className="text-sm text-muted-foreground">
                  Open for all access & fair.
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-6">
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
