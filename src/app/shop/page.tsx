'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  Glasses,
  Filter,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles,
  RotateCcw,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useBuilderStore } from '@/store/useBuilderStore';
import { MOCK_PRODUCTS } from '@/lib/data/mock-catalog';
import { formatPrice } from '@/lib/utils';
import { ProductCategory, FrameShape, FrameMaterial, Gender } from '@/types';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as ProductCategory) || 'ALL';
  const initialShape = searchParams.get('shape') || 'ALL';

  const { openBuilder } = useBuilderStore();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedGender, setSelectedGender] = useState<string>('ALL');
  const [selectedShape, setSelectedShape] = useState<string>(initialShape);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('ALL');
  const [maxPrice, setMaxPrice] = useState<number>(8000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const shapes: FrameShape[] = ['Round', 'Rectangle', 'Aviator', 'Cat-Eye', 'Square', 'Geometric', 'Browline'];
  const materials: FrameMaterial[] = ['Titanium', 'Italian Acetate', 'TR90 Ultra-Light', 'Stainless Steel'];
  const genders: Gender[] = ['Men', 'Women', 'Unisex'];

  // Filter Computation
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      if (selectedCategory !== 'ALL' && product.category !== selectedCategory) return false;
      if (selectedGender !== 'ALL' && product.gender !== selectedGender && product.gender !== 'Unisex') return false;
      if (selectedShape !== 'ALL' && product.shape !== selectedShape) return false;
      if (selectedMaterial !== 'ALL' && product.material !== selectedMaterial) return false;
      if (product.price > maxPrice) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [selectedCategory, selectedGender, selectedShape, selectedMaterial, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedGender('ALL');
    setSelectedShape('ALL');
    setSelectedMaterial('ALL');
    setMaxPrice(8000);
    setSortBy('featured');
  };

  const activeFiltersCount =
    (selectedCategory !== 'ALL' ? 1 : 0) +
    (selectedGender !== 'ALL' ? 1 : 0) +
    (selectedShape !== 'ALL' ? 1 : 0) +
    (selectedMaterial !== 'ALL' ? 1 : 0) +
    (maxPrice < 8000 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-teal-600">Home</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium">Eyewear Catalog</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white">
              Optical Frames & Sunglasses
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore titanium and acetate frames engineered for digital blue-cut and progressive lenses.
            </p>
          </div>

          {/* Quick controls on desktop */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden glass-pill px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <Filter className="w-4 h-4 text-teal-600" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Sort selector */}
            <div className="flex items-center gap-2 glass-pill px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="sortBy" className="sr-only">Sort by</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border-none focus:ring-0 text-xs font-bold text-slate-900 dark:text-white cursor-pointer"
              >
                <option value="featured" className="dark:bg-slate-900">Featured & Bestsellers</option>
                <option value="price-asc" className="dark:bg-slate-900">Price: Low to High</option>
                <option value="price-desc" className="dark:bg-slate-900">Price: High to Low</option>
                <option value="rating" className="dark:bg-slate-900">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout: Sidebar Filters (3 cols) + Product Grid (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* DESKTOP FILTER SIDEBAR (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-teal-600" />
                Faceted Filters
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Product Category
              </label>
              <div className="space-y-1 text-xs">
                {['ALL', 'EYEGLASSES', 'SUNGLASSES', 'CONTACT_LENS'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full px-3 py-2 rounded-xl text-left font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{cat === 'ALL' ? 'All Categories' : cat === 'EYEGLASSES' ? 'Prescription Glasses' : cat === 'SUNGLASSES' ? 'Sunglasses' : 'Contact Lenses'}</span>
                    {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-teal-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-white/5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Gender
              </label>
              <div className="grid grid-cols-3 gap-1 text-xs">
                {['ALL', ...genders].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`py-1.5 px-2 rounded-lg font-bold text-center transition-colors cursor-pointer ${
                      selectedGender === g
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {g === 'ALL' ? 'All' : g}
                  </button>
                ))}
              </div>
            </div>

            {/* Shape Filter */}
            <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-white/5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Frame Shape
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['ALL', ...shapes].map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setSelectedShape(shape)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      selectedShape === shape
                        ? 'bg-teal-600 text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-white/5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Chassis Material
              </label>
              <div className="space-y-1 text-xs">
                {['ALL', ...materials].map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`w-full px-3 py-1.5 rounded-lg text-left font-medium transition-colors flex items-center justify-between cursor-pointer ${
                      selectedMaterial === mat
                        ? 'text-teal-700 dark:text-teal-300 font-bold bg-teal-500/10'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{mat === 'ALL' ? 'All Materials' : mat}</span>
                    {selectedMaterial === mat && <Check className="w-3.5 h-3.5 text-teal-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Slider */}
            <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-white/5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Max Price:</span>
                <span className="text-teal-600 dark:text-teal-400 font-mono">
                  {formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="8000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>
          </div>
        </aside>

        {/* PRODUCT GRID (9 cols) */}
        <main className="lg:col-span-9 space-y-6">
          {/* Result bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium pb-2 border-b border-slate-200/80 dark:border-white/10">
            <span>Showing <strong>{filteredProducts.length}</strong> optical items</span>
            <span className="hidden sm:inline">100% Free Shipping & Prescription Verification</span>
          </div>

          {/* Product Cards */}
          {filteredProducts.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto text-slate-400">
                <Glasses className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display">No frames match your filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Try adjusting your shape, material, or maximum price preferences.
                </p>
              </div>
              <Button variant="primary" size="sm" onClick={handleResetFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 flex flex-col justify-between group hover:shadow-xl hover:border-teal-500/40 transition-all duration-300"
                >
                  <div>
                    {/* Image Thumbnail */}
                    <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {product.isBestseller && (
                          <Badge variant="gold" size="sm">
                            Bestseller
                          </Badge>
                        )}
                        {product.isNewArrival && (
                          <Badge variant="cyan" size="sm">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                        {product.shape}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                            {product.brand}
                          </span>
                          <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                            {product.name}
                          </h3>
                        </div>
                        <span className="text-sm font-bold font-display text-slate-900 dark:text-white shrink-0">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-white/5">
                        <span>{product.material}</span>
                        <div className="flex items-center gap-1">
                          {product.colors.map((c) => (
                            <span
                              key={c.name}
                              className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-600"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                    <Link href={`/shop/${product.id}`} className="w-full">
                      <Button variant="outline" size="sm" className="w-full">
                        Details
                      </Button>
                    </Link>
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => openBuilder(product)}
                    >
                      Customize Lenses
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs glass-panel h-full overflow-y-auto p-6 space-y-6 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <span className="font-bold text-sm">Faceted Filters</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-500">Category</label>
                <div className="space-y-1 mt-2">
                  {['ALL', 'EYEGLASSES', 'SUNGLASSES', 'CONTACT_LENS'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="w-full text-left py-1.5 text-xs font-semibold block"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setMobileFilterOpen(false)}
              >
                Apply Filters ({filteredProducts.length} Results)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500 mt-3">Loading Optical Catalog...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
