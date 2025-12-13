'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Select } from '@/components/ui/Select';
import { Search, Plus, Edit, Trash2, Package, ChevronLeft, ChevronRight, Layers, Loader2, Download, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface Product {
  _id: string;
  product_id: string;
  product_name: string;
  product_title: string;
  product_description: string;
  image_urls: string[];
  category_id: string;
  subcategory_id: string;
  status: string;
}

interface Category {
  _id: string;
  category_name: string;
  category_id?: string;
}

interface Subcategory {
  _id: string;
  subcategory_name: string;
  category_id: string;
  subcategory_id?: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const ITEMS_PER_PAGE = 10;

export default function ProductListPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filterSubcategories, setFilterSubcategories] = useState<Subcategory[]>([]);
  const [allSubcategories, setAllSubcategories] = useState<Subcategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [subcategoryFilter, setSubcategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: ITEMS_PER_PAGE,
    totalPages: 0
  });
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showImportDropdown, setShowImportDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [exportLoading, setExportLoading] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // Reset to page 1 on search
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch categories and all subcategories on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesRes, allSubcatsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/subcategories'),
        ]);

        const categoriesData = await categoriesRes.json();
        const allSubcatsData = await allSubcatsRes.json();

        if (categoriesData.success) {
          setCategories(categoriesData.data);
        }
        if (allSubcatsData.success) {
          setAllSubcategories(allSubcatsData.data);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch products with pagination
  const fetchProducts = useCallback(async (page: number, showLoader = true) => {
    if (showLoader) {
      setIsPageLoading(true);
    }

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: ITEMS_PER_PAGE.toString(),
      });

      if (debouncedSearch) {
        params.append('search', debouncedSearch);
      }
      if (categoryFilter !== 'all') {
        params.append('category_id', categoryFilter);
      }
      if (subcategoryFilter !== 'all') {
        params.append('subcategory_id', subcategoryFilter);
      }

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setProducts(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
      setIsPageLoading(false);
    }
  }, [debouncedSearch, categoryFilter, subcategoryFilter]);

  // Reset page and fetch when filters change
  useEffect(() => {
    setCurrentPage(1);
    // Fetch will be triggered by the currentPage change
  }, [debouncedSearch, categoryFilter, subcategoryFilter]);

  // Fetch products when page changes
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, fetchProducts]);

  // Fetch filter subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (categoryFilter === 'all') {
        setFilterSubcategories([]);
        return;
      }

      try {
        const res = await fetch(`/api/subcategories/${categoryFilter}`);
        const data = await res.json();
        if (data.success) {
          setFilterSubcategories(data.data);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
  }, [categoryFilter]);

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setSubcategoryFilter('all');
  };

  const getCategoryKey = (c: Category) => c.category_id || c._id;
  const getSubcategoryKey = (s: Subcategory) => s.subcategory_id || s._id;

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => getCategoryKey(c) === categoryId);
    return category?.category_name || 'Unknown';
  };

  const getSubcategoryName = (subcategoryId: string) => {
    const subcategory = allSubcategories.find((s) => getSubcategoryKey(s) === subcategoryId);
    return subcategory?.subcategory_name || 'Unknown';
  };

  const handleDelete = async (productId: string, productName: string) => {
    if (!confirm(`Are you sure you want to delete "${productName}"?`)) {
      return;
    }

    setDeletingProductId(productId);
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Product deleted successfully');
        // Refresh current page
        fetchProducts(currentPage, false);
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      setDeletingProductId(null);
    }
  };

  const handleEdit = (productId: string) => {
    setEditingProductId(productId);
    router.push(`/products/${productId}`);
  };

  const handleExport = async (type: 'json' | 'excel') => {
    setShowExportDropdown(false);
    setExportLoading(true);
    try {
      const res = await fetch('/api/products?all=true');
      const data = await res.json();
      if (!data.success || !Array.isArray(data.data)) {
        toast.error('Failed to export products!');
        setExportLoading(false);
        return;
      }
      const products = data.data;
      if (type === 'json') {
        const blob = new Blob([JSON.stringify(products, null, 2)], { type: 'application/json' });
        const fname = `products_export_${new Date().toISOString().slice(0, 10)}.json`;
        saveAs(blob, fname);
      } else if (type === 'excel') {
        const ws = XLSX.utils.json_to_sheet(products);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Products');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const fname = `products_export_${new Date().toISOString().slice(0, 10)}.xlsx`;
        saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fname);
      }
    } catch (err) {
      toast.error('Export failed!');
    }
    setExportLoading(false);
  };
  const handleImport = (type: 'json' | 'excel') => {
    setShowImportDropdown(false);
    // Placeholder: open file input or launch flow for import
    if (fileInputRef.current) fileInputRef.current.value = '';
    fileInputRef.current?.click();
    toast.success(`Import as ${type.toUpperCase()} coming soon!`);
  };

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map((cat) => ({ value: getCategoryKey(cat), label: cat.category_name })),
  ];

  const subcategoryOptions = [
    { value: 'all', label: 'All Subcategories' },
    ...filterSubcategories.map((sub) => ({ value: getSubcategoryKey(sub), label: sub.subcategory_name })),
  ];

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages && page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Product List">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500"></div>
          <p className="text-slate-500">Loading products...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Product List">
      {exportLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl flex items-center gap-3 shadow-lg">
            <Loader2 className="w-6 h-6 animate-spin text-teal-500" />
            <span className="font-medium text-slate-700">Exporting...</span>
          </div>
        </div>
      )}
      <div className="space-y-4 md:space-y-5">
        {/* Stats Card */}
        <div className="bg-white rounded-2xl border-2 border-teal-500 p-4 md:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">Total Products</p>
              <p className="text-3xl md:text-4xl font-bold mt-1 text-slate-800">{pagination.total}</p>
              {(debouncedSearch || categoryFilter !== 'all' || subcategoryFilter !== 'all') && (
                <p className="text-slate-500 text-sm mt-1">
                  Filtered results
                </p>
              )}
            </div>
            <div className="w-14 h-14 md:w-16 md:h-16 border-2 border-teal-500 rounded-2xl flex items-center justify-center bg-teal-50">
              <Layers className="w-7 h-7 md:w-8 md:h-8 text-teal-600" />
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          {/* Search - Full width on mobile */}
          <div className="relative w-full mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl border-2 border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 transition-all"
            />
          </div>

          {/* Filters and Add Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-1 gap-3">
              <Select
                value={categoryFilter}
                onValueChange={handleCategoryChange}
                options={categoryOptions}
                placeholder="Category"
                className="flex-1 sm:flex-none sm:w-44"
              />

              <Select
                value={subcategoryFilter}
                onValueChange={setSubcategoryFilter}
                options={subcategoryOptions}
                placeholder="Subcategory"
                disabled={categoryFilter === 'all'}
                className="flex-1 sm:flex-none sm:w-44"
              />
            </div>

            <div className="flex gap-2 relative">
              <div>
                <button onClick={() => setShowExportDropdown((s) => !s)} className="h-11 px-4 bg-white border-2 border-green-500 text-green-600 rounded-xl font-semibold hover:bg-green-50 hover:border-green-600 transition-all flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                </button>
                {showExportDropdown && (
                  <div className="absolute z-20 mt-2 left-0 w-44 bg-white border border-gray-200 rounded-lg shadow-md p-2">
                    <button onClick={() => handleExport('excel')} className="block w-full px-4 py-2 text-left hover:bg-gray-50 rounded font-medium text-sm">Export as Excel</button>
                    <button onClick={() => handleExport('json')} className="block w-full px-4 py-2 mt-1 text-left hover:bg-gray-50 rounded font-medium text-sm">Export as JSON</button>
                  </div>
                )}
              </div>
              <div>
                <button onClick={() => setShowImportDropdown((s) => !s)} className="h-11 px-4 bg-white border-2 border-blue-500 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-600 transition-all flex items-center justify-center gap-2">
                  <Upload className="w-5 h-5" />
                </button>
                {showImportDropdown && (
                  <div className="absolute z-20 mt-2 left-0 w-44 bg-white border border-gray-200 rounded-lg shadow-md p-2">
                    <button onClick={() => handleImport('excel')} className="block w-full px-4 py-2 text-left hover:bg-gray-50 rounded font-medium text-sm">Import from Excel</button>
                    <button onClick={() => handleImport('json')} className="block w-full px-4 py-2 mt-1 text-left hover:bg-gray-50 rounded font-medium text-sm">Import from JSON</button>
                  </div>
                )}
                {/* Hidden file input for import flow */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  className="hidden"
                  onChange={() => toast('File selected (not yet processed)')} />
              </div>
            </div>

            <button
              onClick={() => router.push('/products/new')}
              className="h-11 px-5 bg-white border-2 border-teal-500 text-teal-600 rounded-xl font-semibold hover:bg-teal-50 hover:border-teal-600 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Loading Overlay */}
        {isPageLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
          </div>
        )}

        {/* Products Grid - Mobile Cards */}
        {!isPageLoading && (
          <div className="block md:hidden space-y-3">
            {products.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No products found</p>
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 ring-1 ring-slate-200">
                      {product.image_urls?.[0] ? (
                        <img
                          src={product.image_urls[0]}
                          alt={product.product_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Package className="w-8 h-8" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-800 truncate">
                        {product.product_name}
                      </h3>
                      <p className="text-sm text-teal-600 font-medium mt-1">
                        {getCategoryName(product.category_id)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {getSubcategoryName(product.subcategory_id)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEdit(product.product_id)}
                        disabled={editingProductId === product._id || deletingProductId === product._id}
                        className="p-2.5 bg-white border-2 border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        title="Edit"
                      >
                        {editingProductId === product._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Edit className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(product.product_id, product.product_name)}
                        disabled={deletingProductId === product._id || editingProductId === product._id}
                        className="p-2.5 bg-white border-2 border-rose-500 text-rose-600 rounded-lg hover:bg-rose-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        title="Delete"
                      >
                        {deletingProductId === product._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Desktop Table */}
        {!isPageLoading && (
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                      Product
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                      Category
                    </th>
                    <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 ring-1 ring-slate-200">
                            {product.image_urls?.[0] ? (
                              <img
                                src={product.image_urls[0]}
                                alt={product.product_name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <Package className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <span className="font-semibold text-slate-800">{product.product_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-slate-800 font-medium">{getCategoryName(product.category_id)}</p>
                          <p className="text-slate-500 text-sm">{getSubcategoryName(product.subcategory_id)}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product.product_id)}
                            disabled={editingProductId === product._id || deletingProductId === product._id}
                            className="p-2.5 bg-white border-2 border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            title="Edit"
                          >
                            {editingProductId === product._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Edit className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(product.product_id, product.product_name)}
                            disabled={deletingProductId === product._id || editingProductId === product._id}
                            className="p-2.5 bg-white border-2 border-rose-500 text-rose-600 rounded-lg hover:bg-rose-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            title="Delete"
                          >
                            {deletingProductId === product._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {products.length === 0 && (
              <div className="text-center py-16">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No products found</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && !isPageLoading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-600">
                Page <span className="font-semibold text-slate-800">{pagination.page}</span> of{' '}
                <span className="font-semibold text-slate-800">{pagination.totalPages}</span>
                {' · '}
                <span className="font-semibold text-slate-800">{pagination.total}</span> products
              </p>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-10 px-3 flex items-center gap-1 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`w-10 h-10 rounded-xl font-medium transition-all ${
                          currentPage === pageNum
                            ? 'bg-white border-2 border-teal-500 text-teal-600'
                            : 'text-slate-600 hover:bg-slate-50 border border-slate-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                  className="h-10 px-3 flex items-center gap-1 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
