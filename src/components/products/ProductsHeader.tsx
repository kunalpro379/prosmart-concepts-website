import { Search, Heart, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductsHeader = () => {
  return (
    <header className="py-4 px-6 lg:px-12">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/prosmart_logo_lg.png"
            alt="Prosmart Concepts"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Navigation + Search */}
        <div className="flex-1 flex items-center justify-center gap-6 px-6">
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/products" className="text-blue-600 font-medium text-sm">
              All Products
            </Link>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">
              Categories
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">
              Deals
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">
              New Arrivals
            </a>
          </nav>

          <div className="hidden md:flex items-center w-full max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products"
                className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/favorites"
            className="w-10 h-10 rounded-full bg-slate-100/50 flex items-center justify-center text-slate-600 hover:bg-slate-200/50 transition-colors"
            aria-label="Liked products"
          >
            <Heart className="w-5 h-5" />
          </Link>
          <button className="md:hidden w-10 h-10 rounded-full bg-slate-100/50 flex items-center justify-center text-slate-600 hover:bg-slate-200/50 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ProductsHeader;

