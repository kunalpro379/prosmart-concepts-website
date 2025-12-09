import { Link } from "react-router-dom";
import { ArrowRight, Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const FeaturedProduct = () => {
  return (
    <section className="relative z-20 py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Main Featured Product */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left - Main Product */}
          <div className="bg-gray-50 rounded-3xl p-8 lg:p-12 relative overflow-hidden group">
            <span className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">Our Best deals</span>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4">
            Otoscope & <br />Ear Care
            </h2>
            <p className="text-sm text-gray-900 mb-6 max-w-xs">
            NE3 Wireless Visible Earpick
            </p>
            <p className="text-sm text-gray-600 mb-6 max-w-xs">
            A wireless visual otoscope with HD camera, Wi-Fi connectivity, 6 LED lights, and Type-C charging. Suitable for earwax removal and inspection.
            </p>
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 bg-[#1a5d1a] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#0d3d0d] transition-colors group"
            >
              SHOP NOW
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {/* Price badge */}
            <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-gray-900"></span>
            </div>
            
            {/* Product Image */}
            <img 
              src="https://res.cloudinary.com/dstmt1w5p/image/upload/v1764670288/Medical__Diagnostics/Otoscope__Ear_Care/prod_0088/prod_0088_img1.jpg"
              alt="Otoscope & Ear Care"
              className="absolute bottom-0 right-0 w-48 lg:w-64 object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Right - Promo Cards */}
          <div className="grid grid-rows-2 gap-6">
            {/* Summer Sale Card */}
            <div className="bg-gradient-to-r from-purple-100 to-purple-50 rounded-3xl p-6 lg:p-8 relative overflow-hidden group">
              <span className="text-[10px] bg-purple-500 text-white px-2 py-1 rounded-full font-bold mb-2 inline-block">SUMMER SALES</span>
              <span className="absolute top-4 right-4 text-xs font-bold text-purple-600 bg-white px-2 py-1 rounded-full">25% Off</span>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-2">
              Neck Massagers<br />Hydrolite F2 Cervical Massager
              </h3>
              <p className="text-sm text-gray-600 mb-6 max-w-xs">

              Hydrolite F2 Electric Cervical Vertebra Massager
              </p>
              <Link 
                to="/products"
                className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-purple-600 hover:text-purple-700"
              >
                SHOP NOW <ArrowRight className="w-3 h-3" />
              </Link>
              <img 
                src="https://res.cloudinary.com/dstmt1w5p/image/upload/v1764670214/Massage__Therapy_Devices/Neck_Massagers/prod_0093/prod_0093_img1.jpg"
                alt="Neck Massager"
                className="absolute bottom-0 right-4 w-28 lg:w-36 object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Product Card */}
            <div className="bg-gray-100 rounded-3xl p-6 lg:p-8 relative overflow-hidden group">
            <span className="absolute top-4 right-4 text-xs font-bold text-purple-600 bg-white px-2 py-1 rounded-full">25% Off</span>

              <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
              Lighting & <br />Portable Lamps
              </h3>
              
              <p className="text-lg font-bold text-[#1a5d1a] mt-2">₹4,999</p>

              <p className="text-sm text-gray-600 mb-6 max-w-xs">

              I.M.LAB Portable Smart Wireless LED Lamp
</p>
              <Link 
                to="/products"
                className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-gray-700 hover:text-gray-900"
              >
                SHOP NOW <ArrowRight className="w-3 h-3" />
              </Link>
              <img 
                src="https://res.cloudinary.com/dstmt1w5p/image/upload/v1764670202/Lighting__Portable_Lamps/Portable_LED_Lamps/prod_0096/prod_0096_img1.jpg"
                alt="Portable LED Lamp"
                className="absolute bottom-0 right-4 w-28 lg:w-36 object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
        
        {/* Trust Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#1a5d1a] group-hover:text-white transition-colors">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">FASTEST DELIVERY</p>
              <p className="text-xs text-gray-500">Delivery in 24hr</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#1a5d1a] group-hover:text-white transition-colors">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">24 HOURS RETURN</p>
              <p className="text-xs text-gray-500">100% money-back guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#1a5d1a] group-hover:text-white transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">SECURE PAYMENT</p>
              <p className="text-xs text-gray-500">Your money is safe</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#1a5d1a] group-hover:text-white transition-colors">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">SUPPORT 24/7</p>
              <p className="text-xs text-gray-500">Live contact/message</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
