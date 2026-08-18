'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Calendar,
  Layers,
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { LENS_INDEX_OPTIONS, LENS_COATINGS } from '@/lib/data/mock-catalog';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    getSubtotal,
    getEstimatedTax,
    getTotal,
    getTotalCount,
  } = useCartStore();

  const subtotal = getSubtotal();
  const estimatedTax = getEstimatedTax();
  const total = getTotal();
  const totalCount = getTotalCount();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-slate-950/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-screen max-w-md glass-panel border-l border-slate-200 dark:border-white/10 shadow-2xl flex flex-col bg-white/95 dark:bg-[#0F172A]/95 text-slate-900 dark:text-white"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold font-display">
                    Your Optical Bag ({totalCount})
                  </h3>
                </div>
                <button
                  onClick={closeDrawer}
                  className="rounded-full p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="bg-teal-50 dark:bg-teal-950/40 px-5 py-2.5 border-b border-teal-100 dark:border-teal-900/40 text-xs font-medium text-teal-800 dark:text-teal-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                  Free Express Shipping with Optical Insurance Included
                </span>
                <span className="font-bold">100% Free</span>
              </div>

              {/* Cart Line Items */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto text-slate-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-display">Your bag is empty</h4>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                        Explore our handcrafted titanium frames or subscribe to daily contact lenses.
                      </p>
                    </div>
                    <Link href="/shop" onClick={closeDrawer}>
                      <Button variant="primary" size="sm">
                        Explore Eyewear Catalog
                      </Button>
                    </Link>
                  </div>
                ) : (
                  items.map((item) => {
                    const indexDetails = item.lensConfig
                      ? LENS_INDEX_OPTIONS.find((opt) => opt.id === item.lensConfig?.index)
                      : null;

                    return (
                      <div
                        key={item.id}
                        className="glass-card rounded-xl p-3.5 border border-slate-200/80 dark:border-white/10 space-y-2.5 relative group"
                      >
                        <div className="flex gap-3">
                          {/* Image */}
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 relative shrink-0 border border-slate-200/50 dark:border-white/5">
                            {item.selectedColor?.image ? (
                              <Image
                                src={item.selectedColor.image}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            ) : item.type === 'EXAM_BOOKING' ? (
                              <div className="w-full h-full flex items-center justify-center bg-teal-500/10 text-teal-600">
                                <Calendar className="w-8 h-8" />
                              </div>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                                <Layers className="w-8 h-8" />
                              </div>
                            )}
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="text-xs sm:text-sm font-bold truncate">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-slate-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <p className="text-[11px] text-slate-500 font-medium">
                              Color: {item.selectedColor?.name || 'Standard'}
                            </p>

                            {/* Lens Config Summary */}
                            {item.lensConfig && (
                              <div className="mt-1 space-y-0.5 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-100/70 dark:bg-white/5 p-2 rounded-lg border border-slate-200/50 dark:border-white/5">
                                <p className="font-semibold text-teal-700 dark:text-teal-300">
                                  {item.lensConfig.usage === 'PROGRESSIVE'
                                    ? 'Digital Progressive'
                                    : item.lensConfig.usage === 'SINGLE_VISION'
                                    ? 'Single Vision Distance'
                                    : 'Blue-Light Guard (Non-RX)'}
                                </p>
                                <p>Lens Index: {indexDetails?.index || '1.50 Standard'}</p>
                                {item.lensConfig.coatings.length > 0 && (
                                  <p className="text-slate-500 truncate">
                                    Coatings: {item.lensConfig.coatings.join(', ')}
                                  </p>
                                )}
                              </div>
                            )}

                            {/* Contact Lens Subscription Summary */}
                            {item.contactConfig?.subscriptionCadence && (
                              <div className="mt-1 text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 p-1.5 rounded-lg">
                                <span>Recurring Every {item.contactConfig.subscriptionCadence} Months (15% Saved)</span>
                              </div>
                            )}

                            {/* Price & Quantity Controls */}
                            <div className="flex items-center justify-between mt-2 pt-1">
                              <span className="text-sm font-bold font-display text-teal-700 dark:text-teal-300">
                                {formatPrice(item.unitPrice * item.quantity)}
                              </span>

                              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-bold">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer & Checkout Action */}
              {items.length > 0 && (
                <div className="p-5 border-t border-slate-200/80 dark:border-white/10 space-y-3 bg-slate-50/90 dark:bg-slate-900/90">
                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Optical GST (12%)</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {formatPrice(estimatedTax)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                      <span>Total Amount</span>
                      <span className="text-teal-600 dark:text-teal-400 font-display text-base">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  <Link href="/checkout" onClick={closeDrawer} className="block">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full font-bold shadow-lg shadow-teal-600/30"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Proceed to Secure Checkout
                    </Button>
                  </Link>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>HSA/FSA Eligible • 1-Year Optical Warranty Included</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
