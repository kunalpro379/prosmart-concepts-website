import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  { 
    name: "Respiratory Care", 
    products: "150+ Products", 
    image: "https://res.cloudinary.com/dstmt1w5p/image/upload/v1764670288/Medical__Diagnostics/Otoscope__Ear_Care/prod_0088/prod_0088_img1.jpg", 
    link: "/products?category=Respiratory Care" 
  },
  { 
    name: "Emergency Equipment", 
    products: "85+ Products", 
    image: "https://res.cloudinary.com/dstmt1w5p/image/upload/v1764670214/Massage__Therapy_Devices/Neck_Massagers/prod_0093/prod_0093_img1.jpg", 
    link: "/products?category=Emergency Equipment" 
  },
  { 
    name: "Patient Monitors", 
    products: "120+ Products", 
    image: "https://res.cloudinary.com/dstmt1w5p/image/upload/v1764670202/Lighting__Portable_Lamps/Portable_LED_Lamps/prod_0096/prod_0096_img1.jpg", 
    link: "/products?category=Patient Monitors" 
  },
];

const CategoryShowcase = () => {
  return (
    <section className="relative z-20 py-8 sm:py-12 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Category Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">
          Explore <span className="text-gray-400">New</span> Products
          </h2>
          <Link 
            to="/products"
            className="text-xs sm:text-sm font-bold text-gray-700 hover:text-gray-900 flex items-center gap-1"
          >
            View All <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </div>

        {/* Category Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-16">
          {categories.map((cat, index) => (
            <Link
              key={cat.name}
              to={cat.link}
              className="group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 overflow-hidden border-2 border-gray-300 hover:border-gray-400 hover:shadow-xl transition-all duration-300 animate-fade-in-up min-h-[150px] sm:min-h-[180px]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative z-10">
                <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-0.5 sm:mb-1">{cat.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500">{cat.products}</p>
                <span className="inline-flex items-center gap-1 mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-[#1a5d1a]">
                  Shop Now <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              <img 
                src={cat.image}
                alt={cat.name}
                className="absolute bottom-0 right-0 w-24 sm:w-32 lg:w-40 object-contain opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300"
              />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoryShowcase;
