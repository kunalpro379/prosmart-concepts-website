import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center gradient-animated overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">25+ Years of Excellence</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Pioneering{" "}
              <span className="gradient-text">Innovation</span>
              {" "}in Medical & Defense Technology
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Prosmart Concepts delivers cutting-edge, Made in India solutions for Medical Electronics, 
              Disposable & Defense sectors. Trusted by Indian Navy and leading healthcare institutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="lg" asChild>
                <Link to="/products">
                  Explore Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              {[
                { icon: Shield, text: "Defense Approved" },
                { icon: Award, text: "MSME Registered" },
                { icon: Zap, text: "100% Made in India" },
              ].map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-muted-foreground">
                  <badge.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="relative lg:pl-12">
            <div className="grid gap-6">
              {/* Main Card */}
              <div className="glass-card p-8 hover-lift animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-glow">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">HEED Device</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Helicopter Emergency Egress Device - One of only 3 such products worldwide. 
                  Developed for Indian Navy pilots' safety.
                </p>
                <span className="inline-block mt-4 text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                  First in India
                </span>
              </div>

              {/* Secondary Cards */}
              <div className="grid grid-cols-2 gap-6">
                <div className="glass-card p-6 hover-lift animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="font-display font-semibold mb-2">Oxycare</h4>
                  <p className="text-muted-foreground text-xs">
                    Portable Oxygen Cylinder - Pioneered in India
                  </p>
                </div>

                <div className="glass-card p-6 hover-lift animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="font-display font-semibold mb-2">Quality First</h4>
                  <p className="text-muted-foreground text-xs">
                    All products with quality warranty
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
