import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Star, Heart, ChevronRight, Check, ShoppingCart, 
  Package, Shield, Truck, Phone, ChevronLeft, ChevronDown, Zap, Award,
  X, ZoomIn, ZoomOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchProductByCatSubcatId } from '@/services/api';
import { Product, ProductData } from "@/types/product";

// Shimmer component for loading state
const Shimmer = () => (
  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
);

const ProductDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="w-full bg-white border-b border-border/60 py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-32 bg-gray-200 rounded animate-shimmer" />
          </div>
          <div className="flex items-center gap-6">
            <div className="h-4 w-12 bg-gray-200 rounded animate-shimmer" />
            <div className="h-4 w-16 bg-gray-200 rounded animate-shimmer" />
          </div>
        </div>
      </nav>

      {/* Breadcrumb Skeleton - Outside the card */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-4 mb-0">
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 md:h-4 md:w-14 bg-gray-200 rounded animate-shimmer" />
          <div className="h-3.5 w-3.5 md:h-4 md:w-4 bg-gray-200 rounded animate-shimmer" />
          <div className="h-4 w-16 md:h-4 md:w-20 bg-gray-200 rounded animate-shimmer" />
          <div className="h-3.5 w-3.5 md:h-4 md:w-4 bg-gray-200 rounded animate-shimmer" />
          <div className="h-4 w-20 md:h-4 md:w-24 bg-gray-200 rounded animate-shimmer" />
        </div>
      </div>

      <main className="relative flex-1 bg-gradient-to-br from-white via-cyan-100/85 to-sky-200/60 backdrop-blur-sm rounded-t-3xl shadow-xl border-2 border-blue-100 py-6 px-6 lg:px-10 mx-3 lg:mx-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-white/35 backdrop-blur-md" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="container mx-auto px-0 flex-1">
            <div className="bg-transparent px-0 pt-0 pb-0 mb-0">
              <div className="grid lg:grid-cols-2 gap-6 md:gap-12 p-4 md:p-6 lg:p-8">
                {/* Left - Image Skeleton */}
                <div className="space-y-3 md:space-y-6">
                  {/* Badge Skeleton */}
                  <div className="h-6 w-32 bg-gray-200 rounded-full animate-shimmer" />
                  
                  {/* Main Image Skeleton */}
                  <div className="relative overflow-hidden bg-gray-200 aspect-square rounded-lg">
                    <Shimmer />
                  </div>
                  
                  {/* Thumbnail Skeleton */}
                  <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gray-200 overflow-hidden rounded border-2 border-transparent">
                        <Shimmer />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right - Info Skeleton */}
                <div className="space-y-3 md:space-y-6">
                  {/* Category Badges Skeleton */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    <div className="h-5 w-24 md:h-6 md:w-28 bg-gray-200 rounded-full animate-shimmer" />
                    <div className="h-5 w-20 md:h-6 md:w-24 bg-gray-200 rounded-full animate-shimmer" />
                  </div>

                  {/* Product Name Skeleton */}
                  <div className="relative h-6 md:h-8 lg:h-10 w-3/4 bg-gray-200 rounded animate-shimmer" />

                  {/* Rating Skeleton */}
                  <div className="flex items-center gap-1 md:gap-2">
                    <div className="flex gap-0.5 md:gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-3.5 h-3.5 md:w-5 md:h-5 bg-gray-200 rounded animate-shimmer" />
                      ))}
                    </div>
                    <div className="h-4 w-8 md:h-5 md:w-10 bg-gray-200 rounded animate-shimmer ml-1 md:ml-2" />
                  </div>

                  {/* Product Title Skeleton */}
                  <div className="py-2 md:py-4 border-y border-gray-200">
                    <div className="relative h-4 md:h-6 w-full bg-gray-200 rounded animate-shimmer" />
                  </div>

                  {/* Description Skeleton */}
                  <div className="space-y-2">
                    <div className="relative h-4 md:h-5 w-24 md:w-32 bg-gray-200 rounded animate-shimmer" />
                    <div className="relative h-3 md:h-4 w-full bg-gray-200 rounded animate-shimmer" />
                    <div className="relative h-3 md:h-4 w-5/6 bg-gray-200 rounded animate-shimmer" />
                    <div className="relative h-3 md:h-4 w-4/5 bg-gray-200 rounded animate-shimmer" />
                  </div>

                  {/* Contact Button Skeleton */}
                  <div className="relative h-10 md:h-12 w-full bg-gray-200 rounded-lg animate-shimmer" />

                  {/* Trust Badges Skeleton */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 pt-3 md:pt-6 border-t border-gray-200">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="text-center">
                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-200 mx-auto mb-1 md:mb-2 animate-shimmer" />
                        <div className="h-3 md:h-4 w-16 md:w-20 bg-gray-200 rounded mx-auto animate-shimmer" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ProductDetail = () => {
  const { catidsubcatid, pid } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [minLoadingTime, setMinLoadingTime] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(1);

  useEffect(() => {
    const minTimer = setTimeout(() => setMinLoadingTime(false), 800);
    const loadProduct = async () => {
      try {
        if (!catidsubcatid || !pid) {
          navigate('/products');
          return;
        }
        // Parse from /cat-XXXsubcat-YYY
        const match = catidsubcatid.match(/^(cat[-_\w]+)(subcat[-_\w]+)$/);
        if (!match) {
          toast({ title: 'Invalid product URL', variant: 'destructive' });
          navigate('/products');
          return;
        }
        const catid = match[1];
        const subcatid = match[2];
        // Fetch product by API
        const prod = await fetchProductByCatSubcatId(catid, subcatid, pid);
        setProduct(prod);
        setLoading(false);
      } catch (err: any) {
        toast({ title: 'Error loading product', description: err.message, variant: 'destructive' });
        navigate('/products');
        setLoading(false);
      }
      clearTimeout(minTimer);
    };
    loadProduct();
    // eslint-disable-next-line
  }, [catidsubcatid, pid]);

  const handleAddToCart = () => {
    toast({
      title: "Added to Inquiry Cart",
      description: `${product?.product_name} has been added to your inquiry list.`,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Request Submitted",
      description: "Our team will contact you within 24 hours.",
    });
  };

  const formatPrice = (amount: number | string | undefined) => {
    if (!amount) return "Price on request";
    if (typeof amount === 'string') {
      if (amount.includes('₹')) return amount;
      const num = parseFloat(amount);
      if (isNaN(num)) return amount;
      return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    }
    return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  const getPrice = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash % 15000) + 1000;
  };

  const price = product?.product_price ?? getPrice(product?.product_id ?? "fallback_id");
  const rating = 4.5;
  const reviews = Math.floor(Math.random() * 1000) + 100;

  // Auto-play images every 2s (pause when lightbox is open)
  useEffect(() => {
    if (!product?.image_urls || product.image_urls.length <= 1 || showLightbox) return;
    const id = window.setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % product.image_urls.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, [product?.image_urls, showLightbox]);

  const handleOpenLightbox = () => {
    if (!product?.image_urls?.length) return;
    setLightboxZoom(1);
    setShowLightbox(true);
  };

  const handleCloseLightbox = () => {
    setShowLightbox(false);
    setLightboxZoom(1);
  };

  const handleZoom = (delta: number) => {
    setLightboxZoom((prev) => {
      const next = prev + delta;
      return Math.min(Math.max(next, 1), 3);
    });
  };

  // Show skeleton while loading OR during minimum loading time
  if (loading || !product) {
    return <ProductDetailSkeleton />;
  }

  // Debug: show product JSON
  // Remove or comment out after confirming fix
  return (
    <div className="min-h-screen bg-white">
      <nav className="w-full bg-white border-b border-border/60 py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/prosmart_logo_lg.png"
              alt="Prosmart Concepts logo"
              className="h-12 w-auto"
            />
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-colors font-medium">
              Products
            </Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb - Outside the card */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 pt-4 mb-0">
        <nav className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="text-foreground">{product.category_name || product.subcategory}</span>
        </nav>
      </div>

      <main className="relative flex-1 bg-gradient-to-br from-white via-cyan-100/85 to-sky-200/60 backdrop-blur-sm rounded-t-3xl shadow-xl border-2 border-blue-100 py-6 px-6 lg:px-10 mx-3 lg:mx-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-white/35 backdrop-blur-md" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="container mx-auto px-0 flex-1">
            <div className="bg-transparent px-0 pt-0 pb-0 mb-0">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-12 p-4 md:p-6 lg:p-8">
            {/* Left - Product Images */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Badge */}
              {product.main_category && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-xs font-semibold text-white bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-full shadow-lg">
                    {product.main_category}
                  </span>
                </div>
              )}

              {/* Wishlist */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
              </button>

              {/* Main Image */}
              <div
                className="relative overflow-hidden bg-gradient-to-br from-muted via-background to-muted/50 aspect-square mb-6 cursor-zoom-in"
                onClick={handleOpenLightbox}
              >
                <AnimatePresence mode="wait">
                  {product.image_urls && product.image_urls.length > 0 ? (
                    <motion.img
                      key={selectedImage}
                      src={product.image_urls[selectedImage]}
                      alt={product.product_name}
                      className="w-full h-full object-contain p-8"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="w-48 h-48 text-primary/20" />
                    </div>
                  )}
                </AnimatePresence>
                
                {/* Image Navigation */}
                {product.image_urls && product.image_urls.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? product.image_urls!.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === product.image_urls!.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.image_urls && product.image_urls.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {product.image_urls.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative flex-shrink-0 w-20 h-20 overflow-hidden bg-muted border-2 transition-all ${
                        selectedImage === i ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={url}
                        alt={`${product.product_name} view ${i + 1}`}
                        className="w-full h-full object-contain p-2"
                      />
                    </button>
                  ))}
                </div>
              )}
          </motion.div>

          {/* Lightbox */}
          {showLightbox && product.image_urls && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
              <button
                onClick={handleCloseLightbox}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 text-foreground shadow-lg flex items-center justify-center hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-w-5xl w-full bg-white/5 rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center justify-center overflow-hidden rounded-xl bg-background">
                  <img
                    src={product.image_urls[selectedImage]}
                    alt={`${product.product_name} enlarged`}
                    className="max-h-[70vh] object-contain transition-transform"
                    style={{ transform: `scale(${lightboxZoom})` }}
                    onWheel={(e) => {
                      e.preventDefault();
                      handleZoom(e.deltaY < 0 ? 0.1 : -0.1);
                    }}
                  />
                </div>

                <div className="flex items-center justify-center gap-3 mt-4">
                  <button
                    onClick={() => handleZoom(0.1)}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-foreground rounded-full shadow-sm hover:bg-gray-100"
                  >
                    <ZoomIn className="w-4 h-4" />
                    Zoom In
                  </button>
                  <button
                    onClick={() => handleZoom(-0.1)}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-foreground rounded-full shadow-sm hover:bg-gray-100"
                  >
                    <ZoomOut className="w-4 h-4" />
                    Zoom Out
                  </button>
                </div>
              </div>
            </div>
          )}

            {/* Right - Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-3 md:space-y-6"
            >
              {/* Category Badge */}
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {product.subcategory_name && (
                  <span className="inline-block text-[10px] md:text-xs font-semibold text-accent bg-accent/10 px-2 py-1 md:px-3 md:py-1.5 rounded-full">
                    {product.subcategory_name}
                  </span>
                )}
                {product.category_name && (
                  <span className="inline-block text-[10px] md:text-xs font-semibold text-primary bg-primary/10 px-2 py-1 md:px-3 md:py-1.5 rounded-full">
                    {product.category_name}
                  </span>
                )}
              </div>

              {/* Product Name */}
              <div>
                <h1 className="font-display text-xl md:text-3xl lg:text-4xl font-bold leading-tight text-foreground">
                  {product.product_name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 md:gap-4">
                <div className="flex items-center gap-0.5 md:gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 md:w-5 md:h-5 ${i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} 
                    />
                  ))}
                  <span className="font-semibold ml-1 md:ml-2 text-sm md:text-base">{rating}</span>
                </div>
              </div>

              {/* Product Title */}
              {product.product_title && (
                <div className="py-2 md:py-4 border-y border-border">
                  <h2 className="text-sm md:text-xl font-semibold text-foreground mb-1 md:mb-2">
                    {product.product_title}
                  </h2>
                </div>
              )}

              {/* Description */}
              {product.product_description && (
                <div>
                  <h3 className="font-display font-semibold text-sm md:text-lg mb-1.5 md:mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed text-xs md:text-base">
                    {product.product_description}
                  </p>
                </div>
              )}

              {/* Key Features removed as requested */}

              {/* Quantity Selector removed as requested */}

              {/* Contact Button */}
              <div className="pt-2 md:pt-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-cyan-900 text-cyan-900 bg-transparent hover:bg-cyan-50 hover:text-cyan-900 text-sm md:text-base py-2 md:py-6"
                  onClick={handleBuyNow}
                >
                  Contact Us
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 pt-3 md:pt-6 border-t border-border">
                <div className="text-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-1 md:mb-2">
                    <Shield className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                  </div>
                  <p className="text-[10px] md:text-xs text-muted-foreground font-medium">Quality Warranty</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-1 md:mb-2">
                    <Truck className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                  </div>
                  <p className="text-[10px] md:text-xs text-muted-foreground font-medium">Fast Delivery</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-1 md:mb-2">
                    <Phone className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                  </div>
                  <p className="text-[10px] md:text-xs text-muted-foreground font-medium">24/7 Support</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-1 md:mb-2">
                    <Award className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                  </div>
                  <p className="text-[10px] md:text-xs text-muted-foreground font-medium">Certified Product</p>
                </div>
              </div>
            </motion.div>
            </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
