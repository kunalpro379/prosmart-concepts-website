import { motion } from 'framer-motion';
import ProductCardSkeleton from './ProductCardSkeleton';

const ProductsLoading = () => {
  // Generate skeleton cards
  const skeletonCards = Array.from({ length: 12 }, (_, i) => i);

  return (
    <>
      {/* Page Header Skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 flex-shrink-0">
        <div className="flex-1">
          {/* OUR PRODUCTS with Filter Button */}
          <div className="flex items-center justify-between gap-4 mb-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-8 w-48 bg-slate-200 rounded-lg animate-shimmer"
            />
            {/* Filter Button Skeleton */}
            <div className="h-8 w-20 bg-slate-200 rounded-lg animate-shimmer" />
          </div>
          
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 bg-slate-200 rounded animate-shimmer" />
            <div className="h-4 w-4 bg-slate-200 rounded animate-shimmer" />
            <div className="h-4 w-16 bg-slate-200 rounded animate-shimmer" />
          </div>
        </div>

        {/* Main Category Tabs Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-nowrap gap-1.5 overflow-x-auto no-scrollbar -mx-2 px-2 sm:flex-wrap sm:overflow-visible sm:mx-0 sm:px-0"
        >
          {/* All Items + 6 main categories = 7 tabs */}
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="h-7 w-24 bg-slate-200 rounded-full animate-shimmer flex-shrink-0"
            />
          ))}
        </motion.div>
      </div>

      {/* Products Section Skeleton */}
      <div className="flex-1 h-full overflow-hidden flex flex-col min-h-0 relative">
        {/* Products Grid Skeleton */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pr-2 min-h-0">
          {/* Mobile: 2 Column Grid */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-2 pb-6">
              {skeletonCards.map((_, index) => (
                <ProductCardSkeleton key={index} index={index} isMobile={true} />
              ))}
            </div>
          </div>

          {/* Tablet: 2 Column Grid */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {skeletonCards.map((_, index) => (
                <ProductCardSkeleton key={index} index={index} />
              ))}
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-3 xl:grid-cols-4 gap-5">
              {skeletonCards.map((_, index) => (
                <ProductCardSkeleton key={index} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsLoading;
