import { Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  index: number;
  isMobile?: boolean;
}

const ProductCard = ({ product, index, isMobile = false }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  // Use product_price if available, otherwise generate price based on product_id
  const getPrice = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash % 15000) + 1000;
  };

  const formatPrice = (amount: number | string) => {
    if (typeof amount === 'string') {
      // If it's already a string with ₹, return as is
      if (amount.includes('₹')) return amount;
      // Try to parse it
      const num = parseFloat(amount);
      if (isNaN(num)) return amount;
      return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    }
    return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  const price = product.product_price || getPrice(product.product_id);
  const hasDiscount = product.product_id.charCodeAt(0) % 3 === 0;
  const discountPercent = hasDiscount ? 20 : 0;
  const originalPrice = hasDiscount ? Math.floor(Number(price) * 1.25) : null;
  const rating = 4.5;

  // Create product detail ID: product_id + category_id (concatenated)
  const productDetailId = `${product.product_id}${product.category_id}`;

  return (
    <Link to={`/products/${productDetailId}`} className="h-full flex">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03, duration: 0.4 }}
        className={`group relative border border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden flex flex-col h-full w-full ${
          isMobile 
            ? 'bg-white/80 backdrop-blur-md' 
            : 'bg-white'
        }`}
      >
      {/* Discount Badge */}
      {hasDiscount && (
        <div className={`absolute z-10 bg-yellow-400 text-black font-bold rounded-md ${isMobile ? 'top-1.5 left-1.5 text-[10px] px-1.5 py-0.5' : 'top-3 left-3 text-xs px-2.5 py-1'}`}>
          {discountPercent}% Off
        </div>
      )}

      {/* Image Container */}
      <div className={`aspect-square bg-gray-50 flex items-center justify-center overflow-hidden ${isMobile ? 'p-2' : 'p-4'}`}>
        {product.image_urls && product.image_urls.length > 0 ? (
          <img
            src={product.image_urls[0]}
            alt={product.product_name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center">
            <span className={`text-slate-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>No image</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={`space-y-2 flex-1 flex flex-col ${isMobile ? 'px-2 pt-2 pb-1.5' : 'px-4 pt-4 pb-3 space-y-3'}`}>
        {/* Category */}
        <span className={`text-gray-500 font-medium block ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
          {product.subcategory || 'Product'}
        </span>

        {/* Product Name with Rating */}
        <div className="flex items-start justify-between gap-1 flex-1">
          <h3 className={`text-gray-800 font-semibold line-clamp-2 flex-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            {product.product_name}
          </h3>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <Star className={`fill-orange-400 text-orange-400 ${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
            <span className={`text-gray-600 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>({rating})</span>
          </div>
        </div>

        {/* Bottom Section: Button and Price */}
        <div className={`flex items-center justify-between gap-2 mt-auto`}>
          {/* Contact Us Button */}
          <button className={`flex items-center gap-1 bg-cyan-500 text-white hover:bg-cyan-500 transition-colors rounded-full font-medium whitespace-nowrap shadow-sm ${isMobile ? 'px-2 py-1 text-[10px]' : 'px-4 py-2 text-xs'}`}>
            Contact Us
          </button>
        </div>
      </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;

