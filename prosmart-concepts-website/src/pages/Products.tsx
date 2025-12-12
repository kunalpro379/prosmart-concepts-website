import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronRight, Grid3X3, LayoutGrid, X } from 'lucide-react';
import ProductsHeader from '@/components/products/ProductsHeader';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import ProductsLoading from '@/components/products/ProductsLoading';
import { fetchCategoriesWithProducts } from '@/services/api';
import { Product, ProductData } from '@/types/product';
const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('All Items');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showShimmer, setShowShimmer] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const shimmerTimeoutRef = useRef<number | null>(null);

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      // Minimum shimmer duration for smooth UX (500ms)
      const MIN_SHIMMER_MS = 500;
      const startTime = Date.now();
      const controller = new AbortController();
      const TIMEOUT_MS = 20_000;
      const timeoutId = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        setLoading(true);
        setShowShimmer(true);
        setError(null);
        const data = await fetchCategoriesWithProducts({ signal: controller.signal });
        setProductData(data);

        // Calculate how much time remains to reach the minimum shimmer duration
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_SHIMMER_MS - elapsed);

        // Clear any existing timer before setting a new one
        if (shimmerTimeoutRef.current) {
          window.clearTimeout(shimmerTimeoutRef.current);
        }

        shimmerTimeoutRef.current = window.setTimeout(() => {
          setShowShimmer(false);
        }, remaining);

        setLoading(false);
      } catch (err) {
        console.error('Failed to load products:', err);
        const isAbort = err instanceof DOMException && err.name === 'AbortError';
        setError(
          isAbort
            ? 'Request timed out. Please retry.'
            : 'Failed to load products. Please try again later.'
        );
        setLoading(false);
        setShowShimmer(false);
      }
      
      window.clearTimeout(timeoutId);
    };

    loadProducts();

    return () => {
      if (shimmerTimeoutRef.current) {
        window.clearTimeout(shimmerTimeoutRef.current);
      }
    };
  }, []);

  // On effect for URL param/category, only preselect if param exists
  useEffect(() => {
    if (categoryParam && productData) {
      // Check if it's a main category
      const mainCats = new Set<string>();
      Object.values(productData.categories).forEach((category) => {
        if (category.main_category) {
          mainCats.add(category.main_category);
        }
      });

      if (mainCats.has(categoryParam)) {
        setActiveTab(categoryParam);
      } else {
        // Check if it's a category name
        const categoryExists = Object.values(productData.categories).some(
          (cat) => cat.category_name === categoryParam
        );
        if (categoryExists) {
          setSelectedCategories([categoryParam]);
        }
      }
    } else {
      setActiveTab('All Items');
      setSelectedCategories([]);
      setSelectedSubcategories([]);
    }
  }, [categoryParam, productData]);

  // Extract all products, main categories, categories, and subcategories from data
  const { allProducts, mainCategories, categories, subcategories } = useMemo(() => {
    if (!productData) {
      return {
        allProducts: [],
        mainCategories: [],
        categories: [],
        subcategories: [],
      };
    }

    const products: Product[] = [];
    const mainCats = new Set<string>();
    const cats: string[] = [];
    const subcats: string[] = [];

    Object.values(productData.categories).forEach((category) => {
      cats.push(category.category_name);
      if (category.main_category) {
        mainCats.add(category.main_category);
      }
      Object.values(category.subcategories).forEach((subcategory) => {
        subcats.push(subcategory.subcategory_name);
        products.push(...subcategory.products);
      });
    });

    return {
      allProducts: products,
      mainCategories: Array.from(mainCats),
      categories: [...new Set(cats)],
      subcategories: [...new Set(subcats)],
    };
  }, [productData]);

  // Get categories and subcategories for the active main category tab
  const { filteredCategories, filteredSubcategories } = useMemo(() => {
    if (!productData || activeTab === 'All Items') {
      return {
        filteredCategories: categories,
        filteredSubcategories: subcategories,
      };
    }

    const cats: string[] = [];
    const subcats: string[] = [];

    Object.values(productData.categories).forEach((category) => {
      if (category.main_category === activeTab) {
        cats.push(category.category_name);
        Object.values(category.subcategories).forEach((subcategory) => {
          subcats.push(subcategory.subcategory_name);
        });
      }
    });

    return {
      filteredCategories: [...new Set(cats)],
      filteredSubcategories: [...new Set(subcats)],
    };
  }, [activeTab, categories, subcategories, productData]);

  // Filter products based on selections
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by active tab (main category)
    if (activeTab !== 'All Items' && productData) {
      filtered = filtered.filter((product) => product.main_category === activeTab);
    }

    // Filter by selected categories
    if (selectedCategories.length > 0 && productData) {
      filtered = filtered.filter((product) => {
        const category = Object.values(productData.categories).find(
          (cat) => cat.category_id === product.category_id
        );
        return category && selectedCategories.includes(category.category_name);
      });
    }

    // Filter by selected subcategories
    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedSubcategories.includes(product.subcategory)
      );
    }

    return filtered;
  }, [allProducts, activeTab, selectedCategories, selectedSubcategories, productData]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((s) => s !== subcategory)
        : [...prev, subcategory]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setActiveTab('All Items');
    setPriceRange(null);
  };

  // Error state
  if (error) {
    return (
      <div className="h-screen overflow-hidden bg-white flex flex-col">
        <ProductsHeader />
        <main className="flex-1 bg-gradient-to-br from-emerald-50/80 via-cyan-50/60 to-sky-100/70 backdrop-blur-sm rounded-t-[3rem] shadow-xl py-8 px-8 lg:px-16 mx-6 lg:mx-12 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Loading/Shimmer state - show while data is loading
  if (showShimmer) {
    return (
      <div className="h-screen overflow-hidden bg-white flex flex-col">
        <ProductsHeader />
        <main className="relative flex-1 bg-gradient-to-br from-white via-cyan-100/85 to-sky-200/60 backdrop-blur-sm rounded-t-3xl shadow-xl border-2 border-blue-100 py-6 px-6 lg:px-10 mx-3 lg:mx-6 overflow-hidden mt-20 lg:mt-24 pt-4">
          <div className="pointer-events-none absolute inset-0 bg-white/35 backdrop-blur-md" />
          <div className="relative z-10 flex flex-col h-full">
            <ProductsLoading />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-white flex flex-col">
      <ProductsHeader />

      {/* Breadcrumb - Outside blue container */}
      <div className="container mx-auto px-6 lg:px-10 mt-20 lg:mt-24 mb-4">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span className="hover:text-foreground cursor-pointer transition-colors">Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary font-medium">Products</span>
        </div>
      </div>

      <main className="relative flex-1 bg-gradient-to-br from-white via-cyan-100/85 to-sky-200/60 backdrop-blur-sm rounded-t-3xl shadow-xl border-2 border-blue-100 py-6 px-6 lg:px-10 mx-3 lg:mx-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-white/35 backdrop-blur-md" />
        <div className="relative z-10 flex flex-col h-full">

          {/* Page Header - OUR PRODUCTS with Category Tabs inline and Filters Button (Mobile Only) */}
          <div className="flex flex-col gap-2 mb-2 flex-shrink-0">
            {/* OUR PRODUCTS, Category Tabs (Desktop), and Filters Button Row */}
            <div className="flex items-center gap-2 lg:gap-4 flex-nowrap">
              {/* 1. Update header "OUR PRODUCTS" to show product count */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-xl font-bold text-foreground flex-shrink-0"
              >
                OUR PRODUCTS <span className="font-medium text-primary ml-2">({filteredProducts.length})</span>
              </motion.h1>
              {/* Filters Button - Mobile Only, right of heading */}
              <div className="relative lg:hidden ml-auto flex-shrink-0">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-card border border-border rounded-lg text-muted-foreground text-xs font-medium shadow-sm hover:bg-muted transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span className="whitespace-nowrap">Filters</span>
                  {(selectedCategories.length > 0 || selectedSubcategories.length > 0) && (
                    <span className="px-1.5 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                      {selectedCategories.length + selectedSubcategories.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
            {/* Category Tabs - Mobile: horizontally scrollable below heading, Desktop: inline (already above) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }} 
              className="flex flex-nowrap gap-1.5 overflow-x-auto no-scrollbar -mx-2 px-2 lg:hidden mb-1"
            >
              <button onClick={() => { setActiveTab('All Items'); setSelectedCategories([]); setSelectedSubcategories([]); }} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all flex-shrink-0 ${activeTab === 'All Items' ? 'bg-white border-2 border-cyan-600 text-cyan-600 shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}>All Items</button>
              {categories.map((c) => (
                <button key={c} onClick={() => { setSelectedCategories([c]); setActiveTab('All Items'); setSelectedSubcategories([]); }} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all flex-shrink-0 ${selectedCategories.includes(c) ? 'bg-white border-2 border-cyan-600 text-cyan-600 shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}>{c}</button>
              ))}
            </motion.div>
            {/* Desktop category tabs inline with h1 (already above, keep as previously styled) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }} 
              className="hidden lg:flex flex-wrap gap-1.5 flex-1 mb-4 lg:mb-0"
            >
              <button onClick={() => { setActiveTab('All Items'); setSelectedCategories([]); setSelectedSubcategories([]); }} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all flex-shrink-0 ${activeTab === 'All Items' ? 'bg-white border-2 border-cyan-600 text-cyan-600 shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}>All Items</button>
              {categories.map((c) => (
                <button key={c} onClick={() => { setSelectedCategories([c]); setActiveTab('All Items'); setSelectedSubcategories([]); }} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all flex-shrink-0 ${selectedCategories.includes(c) ? 'bg-white border-2 border-cyan-600 text-cyan-600 shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}>{c}</button>
              ))}
            </motion.div>
          </div>

          {/* Filters Card Modal - Mobile Only (shows when filter button is clicked) */}
          {showFilters && (
            <>
              {/* Backdrop - Mobile Only */}
              <div
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setShowFilters(false)}
              />
              {/* Filters Card - Mobile Only */}
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden fixed top-16 right-3 bg-card rounded-xl shadow-2xl border-2 border-border z-50 w-[calc(100%-1.5rem)] sm:w-80 max-h-[calc(100vh-5rem)] overflow-hidden flex flex-col"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
                  <h3 className="font-bold text-base text-foreground">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Filters Content - Scrollable */}
                <div className="overflow-y-auto flex-1 p-4">
                  {/* 3. In <ProductFilters ...> component calls, DO NOT pass category-related props (remove categories, selectedCategories, onCategoryChange, etc) */}
                  <ProductFilters
                    subcategories={filteredSubcategories}
                    selectedSubcategories={selectedSubcategories}
                    onSubcategoryChange={handleSubcategoryChange}
                    onResetFilters={handleResetFilters}
                    priceRange={[priceRange?.min || 0, priceRange?.max || 500]}
                    onPriceChange={(range) => setPriceRange({ min: range[0], max: range[1] })}
                  />
                </div>

                {/* Card Footer - Apply Button */}
                <div className="p-4 border-t border-border bg-muted/50 flex gap-3">
                  <button
                    onClick={handleResetFilters}
                    className="flex-1 px-4 py-2.5 border border-border rounded-lg text-muted-foreground font-medium hover:bg-muted transition-colors text-sm"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            </>
          )}

          <div className="flex gap-0 flex-1 overflow-hidden">
            {/* Left Sidebar Filters - Desktop Only (Always Visible) */}
            <aside className="hidden lg:block w-80 flex-shrink-0 bg-card rounded-xl border-2 border-border shadow-lg overflow-hidden flex flex-col">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
                <h3 className="font-bold text-base text-foreground">Filters</h3>
                {(selectedCategories.length > 0 || selectedSubcategories.length > 0) && (
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                  >
                    <X className="w-4 h-4" />
                    Reset
                  </button>
                )}
              </div>
              {/* Filters Content - Scrollable */}
              <div className="overflow-y-auto flex-1 p-4 custom-scrollbar">
                {/* 3. In <ProductFilters ...> component calls, DO NOT pass category-related props (remove categories, selectedCategories, onCategoryChange, etc) */}
                <ProductFilters
                  subcategories={filteredSubcategories}
                  selectedSubcategories={selectedSubcategories}
                  onSubcategoryChange={handleSubcategoryChange}
                  onResetFilters={handleResetFilters}
                  priceRange={[priceRange?.min || 0, priceRange?.max || 500]}
                  onPriceChange={(range) => setPriceRange({ min: range[0], max: range[1] })}
                />
              </div>
            </aside>

            {/* Dotted Vertical Separator */}
            <div className="hidden lg:block w-px border-l-2 border-dashed border-cyan-500/50 mx-3 flex-shrink-0"></div>

            {/* Products Section - Active filters and products in one scrollable container */}
            <div className="flex-1 h-full min-h-0 flex flex-col relative">
              <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pr-2 min-h-0">
                {/* Active Filters - always above products list and inside scroll */}
                {(selectedCategories.length > 0 || selectedSubcategories.length > 0) && (
                  <div className="flex flex-wrap gap-2 mb-2 flex-shrink-0">
                    {selectedCategories.map((cat) => (
                      <span
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs text-primary cursor-pointer hover:bg-primary/20 transition-colors"
                      >
                        {cat}
                        <X className="w-3 h-3" />
                      </span>
                    ))}
                    {selectedSubcategories.map((sub) => (
                      <span
                        key={sub}
                        onClick={() => handleSubcategoryChange(sub)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/20 border border-accent/30 rounded-full text-xs text-foreground cursor-pointer hover:bg-accent/30 transition-colors"
                      >
                        {sub}
                        <X className="w-3 h-3" />
                      </span>
                    ))}
                  </div>
                )}
                {/* Products Grid - All layouts */}
                {filteredProducts.length > 0 ? (
                  <>
                    {/* Mobile: 2 Column Grid */}
                    <div className="md:hidden">
                      <div className="grid grid-cols-2 gap-2 pb-2">
                        {filteredProducts.map((product, index) => (
                          <ProductCard key={product.product_id} product={product} index={index} isMobile={true} />
                        ))}
                      </div>
                      {/* Load More */}
                      {filteredProducts.length > 16 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="flex justify-center mt-6 pb-8"
                        >
                          <button className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors shadow-lg text-sm">
                            Load More Products
                          </button>
                        </motion.div>
                      )}
                    </div>
                    {/* Tablet: 2 Column Grid */}
                    <div className="hidden md:block lg:hidden">
                      <div className="grid grid-cols-2 gap-4 sm:gap-5">
                        {filteredProducts.map((product, index) => (
                          <ProductCard key={product.product_id} product={product} index={index} />
                        ))}
                      </div>
                      {/* Load More */}
                      {filteredProducts.length > 16 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="flex justify-center mt-8 pb-8"
                        >
                          <button className="px-6 py-2.5 sm:px-8 sm:py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors shadow-lg text-sm sm:text-base">
                            Load More Products
                          </button>
                        </motion.div>
                      )}
                    </div>
                    {/* Desktop: Grid Layout */}
                    <div className="hidden lg:block">
                      <div className="grid grid-cols-3 xl:grid-cols-4 gap-5">
                        {filteredProducts.map((product, index) => (
                          <ProductCard key={product.product_id} product={product} index={index} />
                        ))}
                      </div>
                      {/* Load More */}
                      {filteredProducts.length > 16 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="flex justify-center mt-12 pb-8"
                        >
                          <button className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors shadow-lg">
                            Load More Products
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[200px]">
                    <p className="text-muted-foreground text-sm sm:text-base">No products found matching your filters.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
