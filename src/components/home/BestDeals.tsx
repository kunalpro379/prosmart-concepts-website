import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Star } from "lucide-react";

type DealProduct = {
  product_id: string;
  product_name: string;
  product_title: string;
  product_description: string;
  product_price: string | null;
  image_urls?: string[];
  rating?: number;
};

type DealCategory = {
  category_name: string;
  category_id: string;
  products: DealProduct[];
};

const COUNTDOWN_SECONDS = 12 * 60 * 60 + 45 * 60 + 32; // 12:45:32 in seconds

const BestDeals = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [categories, setCategories] = useState<DealCategory[]>([]);
  const [secondsLeft, setSecondsLeft] = useState<number>(COUNTDOWN_SECONDS);

  // Fetch deals data from the public JSON
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/data/best_deals.json");
        const json = await res.json();
        setCategories(json.categories || []);
      } catch (err) {
        console.error("Failed to load best deals JSON", err);
      }
    };
    load();
  }, []);

  // Countdown that restarts when it reaches zero
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) return COUNTDOWN_SECONDS;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTimer = useMemo(() => {
    const hrs = Math.floor(secondsLeft / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((secondsLeft % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor(secondsLeft % 60)
      .toString()
      .padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  }, [secondsLeft]);

  const categoryTabs = useMemo(() => categories.map((c) => c.category_name), [categories]);

  // Set default active category when data loads
  useEffect(() => {
    if (!activeCategory && categoryTabs.length > 0) {
      setActiveCategory(categoryTabs[0]);
    }
  }, [activeCategory, categoryTabs]);

  const productsToShow = useMemo<DealProduct[]>(() => {
    if (!categories.length) return [];

    const current = categories.find((c) => c.category_name === activeCategory);
    return current ? current.products.slice(0, 3) : [];
  }, [activeCategory, categories]);

  return (
    <section className="relative z-20 py-8 sm:py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-black text-gray-900">
              Best Deals <span className="text-cyan-500">For You</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
              Deals ends in:{" "}
              <span className="text-orange-500 font-bold">{formattedTimer}</span>
            </p>
          </div>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categoryTabs.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <Link 
            to="/products"
            className="hidden lg:flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-gray-900"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {productsToShow.map((product, index) => (
            <Link
              key={product.product_id}
              to={`/products/${product.product_id}${product.category_id}`}
              className="group bg-white border-2 border-black rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image Container */}
              <div className="relative bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 aspect-square flex items-center justify-center overflow-hidden">
                <img 
                  src={product.image_urls?.[0] ?? "/placeholder.png"}
                  alt={product.product_name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-1.5 sm:mb-2">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-[10px] sm:text-xs font-medium text-gray-600">{product.rating ?? 4.8}</span>
              </div>
              
              {/* Product Info */}
              <h3 className="font-semibold text-xs sm:text-sm text-gray-900 line-clamp-2 mb-1">
                {product.product_name}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-500 mb-2 line-clamp-2">
                {product.product_title}
              </p>
              
              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-cyan-500">
                  {product.product_price ?? "Price on request"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestDeals;
