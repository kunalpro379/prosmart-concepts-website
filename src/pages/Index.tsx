import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Truck, ShieldCheck, ArrowRight, ChevronDown,
  Search, ShoppingCart, User, Tag, MapPin, Phone, Star
} from "lucide-react";

// Import images
import productVitamins from "@/assets/product-vitamins.png";
import productNutrition from "@/assets/product-nutrition.png";
import productSoap from "@/assets/product-soap.png";
import productProtein from "@/assets/product-protein.png";

// Import section components
import FeaturedProduct from "@/components/home/FeaturedProduct";
import BestDeals from "@/components/home/BestDeals";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import Newsletter from "@/components/home/Newsletter";
import CustomerReviews from "@/components/home/CustomerReviews";
import Footer from "@/components/home/Footer";
import AnimatedCards from "@/components/AnimatedCards";

const Index = () => {
  // Array of card data for animated carousel - Only 2 products repeating
  const heroCards = [
    {
      image: "/militag_hero_section.png",
      alt: "MiliTag Device",
    },
    {
      image: "/magnifier_glasses_hero_section.png",
      alt: "Magnifier Glasses",
    },
    {
      image: "/militag_hero_section.png",
      alt: "MiliTag Device",
    },
    {
      image: "/magnifier_glasses_hero_section.png",
      alt: "Magnifier Glasses",
    },
    {
      image: "/militag_hero_section.png",
      alt: "MiliTag Device",
    },
    {
      image: "/magnifier_glasses_hero_section.png",
      alt: "Magnifier Glasses",
    },
    {
      image: "/militag_hero_section.png",
      alt: "MiliTag Device",
    },
    {
      image: "/magnifier_glasses_hero_section.png",
      alt: "Magnifier Glasses",
    },
    {
      image: "/militag_hero_section.png",
      alt: "MiliTag Device",
    },
    {
      image: "/magnifier_glasses_hero_section.png",
      alt: "Magnifier Glasses",
    },
  ];

  const categories = [
    { name: "Healthcare Essentials", image: "/healthcare.jpg" },
    { name: "Personal Care", image: "/products_cat2.png" },
    { name: "Smart Home", image: "/products_cat3.png" },
    { name: "Gadgets & Accessories", image: "/products_cat4.png" },
    { name: "Tools & Hardware", image: "/products_cat5.png" },
    { name: "Kids & Crafts", image: "/products_cat6.png" },
  ];

  // Curated products pulled from product_final_old.json (remote images)
  const curatedProducts = [
    {
      id: "prod_0001",
      name: "Otoscope & Ear Care",
      subtitle: "Wireless HD visual otoscope with Wi-Fi and 6 LED lights",
      price: "₹4,999",
      image: "https://res.cloudinary.com/dstmt1w5p/image/upload/v1764670288/Medical__Diagnostics/Otoscope__Ear_Care/prod_0088/prod_0088_img1.jpg",
    },
    {
      id: "prod_0093",
      name: "Neck Massagers",
      subtitle: "Hydrolite F2 Electric Cervical Vertebra Massager",
      price: "₹3,999",
      image: "https://res.cloudinary.com/dstmt1w5p/image/upload/v1764670214/Massage__Therapy_Devices/Neck_Massagers/prod_0093/prod_0093_img1.jpg",
    },
    {
      id: "prod_0096",
      name: "Lighting & Portable Lamps",
      subtitle: "Portable smart wireless LED lamp",
      price: "₹4,999",
      image: "https://res.cloudinary.com/dstmt1w5p/image/upload/v1764670202/Lighting__Portable_Lamps/Portable_LED_Lamps/prod_0096/prod_0096_img1.jpg",
    },
  ];

  const testimonials = [
    {
      title: "Exceptional corporate gifting experience",
      quote: "We've been partnering with Prosmart for over a year now, and I must say that I am extremely satisfied with their service and product quality.",
      author: "Rajesh Sharma",
      rating: 5,
    },
    {
      title: "Outstanding B2B supply service",
      quote: "Prosmart has been our go-to supplier for corporate gifts. Their range and customization options are impressive.",
      author: "Priya Menon",
      rating: 5,
    },
    {
      title: "Reliable import solutions",
      quote: "Working with Prosmart for our import needs has been seamless. They handle everything professionally.",
      author: "Amit Patel",
      rating: 5,
    },
    {
      title: "Perfect for bulk orders",
      quote: "The staff took all necessary precautions during delivery, and our corporate event was a huge success thanks to their products.",
      author: "Sunita Krishnan",
      rating: 5,
    },
    {
      title: "Quality lifestyle products",
      quote: "Prosmart delivers quality products consistently. Their FMCG range is perfect for our retail needs.",
      author: "Vikram Singh",
      rating: 5,
    },
    {
      title: "Trusted partner for years",
      quote: "We've worked with many suppliers but Prosmart stands out for their reliability and product diversity.",
      author: "Neha Gupta",
      rating: 5,
    },
  ];

  const processSteps = [
    {
      id: 1,
      title: "Initial Consultation",
      description: "Share your requirements and we understand your unique business needs.",
      image: "/consultation.png",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      id: 2,
      title: "Product Sourcing",
      description: "We source the best products from our global network of suppliers.",
      image: "/assessment.png",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      id: 3,
      title: "Customization",
      description: "Add your branding, packaging, and personalization to products.",
      image: "/implementation.png",
      gradient: "from-orange-500 to-amber-400",
    },
    {
      id: 4,
      title: "Delivery",
      description: "Timely delivery to your doorstep with end-to-end tracking.",
      image: "/partnership.png",
      gradient: "from-emerald-500 to-teal-400",
    },
  ];

  const featuredProducts = [
    { 
      id: "oxycare",
      name: "Oxycare Portable", 
      subtitle: "Oxygen Cylinder",
      badge: "20% Off",
      price: "₹24,999",
      originalPrice: "₹31,249",
      image: productVitamins,
    },
    { 
      id: "heed",
      name: "HEED Device", 
      subtitle: "Emergency Egress",
      badge: null,
      price: "₹1,49,999",
      image: productProtein,
    },
    { 
      id: "patient-monitor",
      name: "Patient Monitor", 
      subtitle: "Vital Signs",
      badge: null,
      price: "₹89,999",
      image: productNutrition,
    },
    { 
      id: "nebulizer",
      name: "Smart Nebulizer", 
      subtitle: "Respiratory Care",
      badge: null,
      price: "₹4,999",
      image: productSoap,
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 animate-fade-in">
              <img
                src="/prosmart_logo_lg.png"
                alt="Prosmart Concepts"
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Search */}
            <div className="hidden lg:flex items-center flex-1 max-w-sm mx-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a5d1a]" />
                <input
                  type="text"
                  placeholder="Search products"
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5d1a]/20 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="hidden lg:flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                <MapPin className="w-4 h-4 text-[#1a5d1a]" />
                <span>Mumbai</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                <User className="w-4 h-4 text-[#1a5d1a]" />
                <a href="mailto:online@prosmart.com" className="hover:text-[#0d3d0d] transition-colors">
                  online@prosmart.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                <Phone className="w-4 h-4 text-[#1a5d1a]" />
                <a href="tel:+919111111111" className="hover:text-[#0d3d0d] transition-colors">
                  +91 9111111111
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <button className="lg:hidden p-2">
              <div className="w-5 h-0.5 bg-gray-800 mb-1"></div>
              <div className="w-5 h-0.5 bg-gray-800 mb-1"></div>
              <div className="w-5 h-0.5 bg-gray-800"></div>
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-16 lg:pt-20">
        {/* Hero Section - Fixed position so other sections scroll over it */}
        <section className="fixed top-16 lg:top-20 left-0 right-0 h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] overflow-hidden bg-gradient-to-br from-[#e8f5e8] via-[#d4f0d4] to-[#c8ebc8] mx-2 sm:mx-4 lg:mx-8 rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] z-0">
          {/* Background video */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] overflow-hidden">
            <video
              src="/hero_section_video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-3 sm:px-6 lg:px-12 py-4 sm:py-8 lg:py-16 relative z-10 h-full">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 sm:gap-8 lg:gap-12 h-full">
              <div className="flex-1 max-w-3xl space-y-3 sm:space-y-4 lg:space-y-6 animate-slide-in-left lg:pt-8">
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1] uppercase text-white drop-shadow-sm font-extrabold"
                  style={{
                    fontFamily: '"Bebas Neue", "Impact", sans-serif',
                    letterSpacing: '0.04em',
                    textShadow:
                      "-1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, 1px 1px 0 #000000",
                  }}
                >
                  PROSMART<span className="lg:hidden"> </span>
                  <span className="hidden lg:inline-block"><br /></span>
                  CONCEPT
                </h1>
                
                <p className="text-xs sm:text-sm lg:text-base text-yellow-400 max-w-3xl leading-relaxed">
                  ProSmart Concepts has been a trusted leader in India's business gifting industry for 17 years, consistently launching cutting-edge, high-impact gifting products for corporate clients.
                </p>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-start gap-3 sm:gap-4 lg:gap-6 animate-fade-in-up">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-green-200 flex items-center justify-center text-[#0f2e1b] shrink-0">
                      <Truck className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-bold text-white leading-tight">Delivery to</p>
                      <p className="text-[10px] sm:text-xs text-white/90">your doorstep</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-green-200 flex items-center justify-center text-[#0f2e1b] shrink-0">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-bold text-white leading-tight">100% Genuine</p>
                      <p className="text-[10px] sm:text-xs text-white/90">Products</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-green-200 flex items-center justify-center text-[#0f2e1b] shrink-0">
                      <Tag className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-bold text-white leading-tight">Best Value</p>
                      <p className="text-[10px] sm:text-xs text-white/90">Fair pricing</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-green-200 flex items-center justify-center text-[#0f2e1b] shrink-0">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-bold text-white leading-tight">Pan-India</p>
                      <p className="text-[10px] sm:text-xs text-white/90">Coverage</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 sm:pt-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-white/10 border border-white/30 backdrop-blur-md hover:bg-white/20 transition-all shadow-lg shadow-black/15"
                  >
                    Explore our products
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                </div>
              </div>

              {/* 3D Animated Cards on right - Hidden on mobile to prevent overlap */}
              <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1 lg:max-w-2xl animate-slide-in-right">
                <AnimatedCards 
                  cards={heroCards}
                  totalCards={10}
                  visibleCards={6}
                  interval={2000}
                />
              </div>
            </div>
          </div>
        </section>
        {/* Categories Section - Slides over hero */}
        <section
          className="relative z-20 pt-6 pb-10 sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-16 bg-white rounded-t-[2rem] sm:rounded-t-[2.5rem] lg:rounded-t-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0.1)] mt-[calc(100vh-8rem)]"
          style={{
            backgroundImage: 'url("/reviews_bg copy.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex items-center justify-center mb-5 sm:mb-6 lg:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-center">
                <span className="text-black">Browse Our </span>
                <span className="text-[#1a5d1a]">Collections</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
              {categories.map((cat, index) => (
                <Link
                  key={index}
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group relative rounded-xl sm:rounded-2xl lg:rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-full aspect-[4/3] bg-gray-50 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                    />
                  </div>
                  <div className="px-2 sm:px-3 pb-2 sm:pb-3 pt-1.5 sm:pt-2 text-center">
                    <p className="text-[10px] sm:text-xs lg:text-sm font-semibold text-gray-800 line-clamp-2">{cat.name}</p>
                  </div>
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/0 group-hover:to-black/5 transition-colors duration-500" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Curated Picks from catalog JSON */}
        <section className="relative z-20 py-8 sm:py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col items-center text-center mb-6 sm:mb-10 lg:mb-12">
              <p className="text-xs sm:text-sm font-semibold text-[#0f3d1f] uppercase tracking-[0.12em]">The Best Place to Buy</p>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mt-2">Fresh picks from our catalog</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3">Handpicked directly from our product data file.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {curatedProducts.map((item, index) => (
                <div
                  key={item.id}
                  className="group bg-white border-2 border-black rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] mb-3 sm:mb-4 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">{item.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#0f3d1f] font-bold text-sm sm:text-base">{item.price}</span>
                    <Link
                      to="/products"
                      className="text-xs sm:text-sm font-semibold text-[#1a5d1a] hover:text-[#0d3d0d] inline-flex items-center gap-1"
                    >
                      Shop now <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>



        <section className="relative z-20 py-10 sm:py-14 lg:py-18 bg-gradient-to-b from-white via-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-[#1a5d1a]/10 text-[#1a5d1a] text-[10px] sm:text-xs lg:text-sm font-semibold rounded-full mb-2 sm:mb-3 uppercase tracking-[0.12em]">
                Our Process
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900">
                How We <span className="text-[#1a5d1a]">Work</span>
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-2 sm:mt-3 px-4">
                A streamlined process designed for your convenience
              </p>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute left-0 right-0 top-[50px] lg:top-[70px] border-t-2 border-dashed border-[#1a5d1a]/30" />

              <div className="grid grid-cols-2 md:flex md:flex-row items-start justify-between gap-6 sm:gap-8 lg:gap-6 relative">
                {processSteps.map((step) => (
                  <div
                    key={step.id}
                    className="flex-1 flex flex-col items-center text-center px-1 sm:px-2"
                  >
                    <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-3">
                      <div className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-gradient-to-br ${step.gradient} p-1 shadow-md`}>
                        <div className="w-full h-full rounded-full overflow-hidden bg-white">
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      <div className="inline-flex items-center justify-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white border border-[#1a5d1a]/20 text-[10px] sm:text-xs font-semibold text-gray-700 shadow-sm">
                        {step.id.toString().padStart(2, "0")}
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mt-3 sm:mt-4 mb-1 sm:mb-2">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 max-w-xs">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 py-8 sm:py-12 lg:py-16 bg-gray-50 overflow-hidden">
          <style>
            {`
              @keyframes scroll-left {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              @keyframes scroll-right {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0); }
              }
              .marquee-left {
                display: flex;
                width: 200%;
                animation: scroll-left 35s linear infinite;
              }
              .marquee-right {
                display: flex;
                width: 200%;
                animation: scroll-right 35s linear infinite;
              }
              .testimonial-card {
                flex: 0 0 280px;
              }
              @media (min-width: 640px) {
                .testimonial-card {
                  flex: 0 0 320px;
                }
              }
            `}
          </style>
          <div className="w-full">
            <div className="w-full flex flex-col items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 px-4 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#1a5d1a]">
                What our Customers say
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5 sm:gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#1a5d1a] text-[#1a5d1a]" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-gray-600">500+ Reviews on Google</span>
              </div>
            </div>

            <div className="overflow-hidden mb-4 sm:mb-6">
              <div className="marquee-left gap-3 sm:gap-4">
                {[...testimonials, ...testimonials].map((item, index) => (
                  <div
                    key={`row1-${index}-${item.author}`}
                    className="testimonial-card bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-2 sm:mb-3 line-clamp-2">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-4">"{item.quote}"</p>
                    <div className="flex gap-0.5 mb-1.5 sm:mb-2">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-[#1a5d1a] text-[#1a5d1a]" />
                      ))}
                    </div>
                    <p className="font-semibold text-xs sm:text-sm text-gray-900">{item.author}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 */}
            <div className="overflow-hidden">
              <div className="marquee-right gap-3 sm:gap-4">
                {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((item, index) => (
                  <div
                    key={`row2-${index}-${item.author}`}
                    className="testimonial-card bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-2 sm:mb-3 line-clamp-2">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-4">"{item.quote}"</p>
                    <div className="flex gap-0.5 mb-1.5 sm:mb-2">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-[#1a5d1a] text-[#1a5d1a]" />
                      ))}
                    </div>
                    <p className="font-semibold text-xs sm:text-sm text-gray-900">{item.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Sections */}
        <FeaturedProduct />
        <BestDeals />
        <CategoryShowcase />
        <Newsletter />
        {/* Legal Address */}
        <section className="relative z-20 py-8 sm:py-10 lg:py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm grid lg:grid-cols-[1.05fr_1fr] gap-6 sm:gap-8 items-center">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#1a5d1a] mb-1.5 sm:mb-2">Legal Address</p>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900">ProSmart Concepts</h3>
                </div>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                  <p className="font-semibold text-gray-800">Address</p>
                  <p>3 UJAGAR CHAMBERS, OPP DEONAR BUS, DEPOT ST, NEAR SUNDER BAUG,</p>
                  <p><span className="font-semibold">Postcode:</span> 400088</p>
                  <p><span className="font-semibold">City/Parish:</span> MUMBAI</p>
                  <p><span className="font-semibold">Country:</span> India</p>
                </div>
                <div className="pt-1 sm:pt-2">
                  <a
                    href="https://www.google.com/maps/place/PROSMART+CONCEPTS/@19.0471925,72.9143037,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c71258928bd1:0xab70c3ebf58e6727!8m2!3d19.0471874!4d72.9168786!16s%2Fg%2F11h_wsstp1?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1a5d1a] hover:text-[#0d3d0d]"
                  >
                    View on Google Maps
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>
              <div className="w-full">
                <a
                  href="https://www.google.com/maps/place/PROSMART+CONCEPTS/@19.0471925,72.9143037,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c71258928bd1:0xab70c3ebf58e6727!8m2!3d19.0471874!4d72.9168786!16s%2Fg%2F11h_wsstp1?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noreferrer"
                  className="block overflow-hidden rounded-xl sm:rounded-2xl shadow-md border border-gray-200 bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src="/image.png"
                    alt="Map location for ProSmart Concepts"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default Index;
