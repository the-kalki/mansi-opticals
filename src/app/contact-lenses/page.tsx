'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  RotateCw,
  Truck,
  Plus,
  Minus,
  Star,
  ArrowRight,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/components/providers/ToastProvider';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';
import confetti from 'canvas-confetti';

const CONTACT_PRODUCTS: (Product & { brandLogo?: string })[] = [
  {
    id: 'contact-1',
    slug: 'acuvue-oasys-hydraluxe-1day',
    name: 'Acuvue Oasys with HydraLuxe 1-Day (30 Pack)',
    brand: 'Johnson & Johnson',
    category: 'CONTACT_LENS',
    price: 2499,
    originalPrice: 2899,
    rating: 4.9,
    reviewCount: 380,
    isBestseller: true,
    gender: 'Unisex',
    shape: 'Round',
    material: 'TR90 Ultra-Light',
    fit: 'Medium',
    description: 'Daily disposable silicone hydrogel contact lenses with tear-infused design that mimics natural moisture to prevent tired, strained digital eyes.',
    features: [
      'HydraLuxe Tear-Infused Network',
      'Class 1 Highest UV-Blocking',
      '98% Oxygen Delivery to Cornea',
      '30 Lenses per Box (1 Month Supply)',
    ],
    dimensions: { lensWidth: 14, bridgeWidth: 8, templeLength: 0, frameWidth: 0, lensHeight: 14 },
    colors: [{ name: 'Clear Aqua', hex: '#38BDF8', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1000&q=80' }],
    images: ['https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1000&q=80'],
    inventory: 150,
  },
  {
    id: 'contact-2',
    slug: 'dailies-total-1-water-gradient',
    name: 'Dailies Total 1 Water Gradient Lenses (30 Pack)',
    brand: 'Alcon',
    category: 'CONTACT_LENS',
    price: 2799,
    originalPrice: 3299,
    rating: 5.0,
    reviewCount: 295,
    isBestseller: true,
    gender: 'Unisex',
    shape: 'Round',
    material: 'TR90 Ultra-Light',
    fit: 'Medium',
    description: 'The world\'s first water gradient contact lens approaching nearly 100% water at the outermost surface. Unmatched breathability and all-day lubricity.',
    features: [
      'Water Gradient Technology',
      'SmarTears Stabilizing Formula',
      '156 Dk/t Exceptional Breathability',
      '30 Daily Contact Lenses',
    ],
    dimensions: { lensWidth: 14, bridgeWidth: 8, templeLength: 0, frameWidth: 0, lensHeight: 14 },
    colors: [{ name: 'Pure Moisture Blue', hex: '#0284C7', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1000&q=80' }],
    images: ['https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1000&q=80'],
    inventory: 120,
  },
];

export default function ContactLensesPage() {
  const { addItem } = useCartStore();
  const { success } = useToast();

  const [selectedProduct, setSelectedProduct] = useState(CONTACT_PRODUCTS[0]);
  const [boxesOD, setBoxesOD] = useState(2);
  const [boxesOS, setBoxesOS] = useState(2);
  const [powerOD, setPowerOD] = useState(-2.5);
  const [powerOS, setPowerOS] = useState(-2.25);
  const [bcOD, setBcOD] = useState(8.5);
  const [bcOS, setBcOS] = useState(8.5);
  const [cadence, setCadence] = useState<1 | 3 | 6 | 12>(3);

  const baseTotal = (boxesOD + boxesOS) * selectedProduct.price;
  const isSubscribed = cadence > 0;
  const discountRate = isSubscribed ? 0.15 : 0;
  const discountAmount = Math.round(baseTotal * discountRate);
  const finalTotal = baseTotal - discountAmount;

  const handleSubscribe = () => {
    addItem({
      type: 'CONTACT_LENS',
      product: selectedProduct,
      selectedColor: selectedProduct.colors[0],
      contactConfig: {
        brand: selectedProduct.brand,
        wearingSchedule: 'Daily',
        packSize: 30,
        boxesOD,
        boxesOS,
        powerOD: { sphere: powerOD, baseCurve: bcOD, diameter: 14.2 },
        powerOS: { sphere: powerOS, baseCurve: bcOS, diameter: 14.2 },
        subscriptionCadence: cadence,
        subscriptionDiscount: discountRate,
      },
      unitPrice: Math.round(finalTotal / (boxesOD + boxesOS)),
      quantity: boxesOD + boxesOS,
    });

    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch {}

    success('Contact Subscription Added!', `Delivering every ${cadence} months with 15% discount.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="cyan" size="sm">
          📦 Automated RX Verification & Express Dispatch
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
          Never Run Out of Fresh Contacts.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Subscribe to your exact doctor-prescribed parameters. Enjoy guaranteed lowest prices, automatic lab verification, and free express delivery.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 pt-2 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            100% Authentic FDA-Approved
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Zero-Hassle Pause / Cancel
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            15% Recurring Discount
          </span>
        </div>
      </section>

      {/* Main Configuration Grid: Brand & Specs (7 cols) + Subscription Summary (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT BRAND & POWER CONFIG (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Brand Selector */}
          <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Select Your Prescribed Brand
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CONTACT_PRODUCTS.map((prod) => {
                const isSelected = selectedProduct.id === prod.id;
                return (
                  <div
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod)}
                    className={`glass-card-interactive p-4 rounded-xl border flex flex-col justify-between select-none ${
                      isSelected
                        ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/40 dark:bg-teal-950/30'
                        : 'border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase text-teal-700 dark:text-teal-300">
                          {prod.brand}
                        </span>
                        <Badge variant="gold" size="sm">★ 4.9</Badge>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {prod.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-bold">
                      <span className="text-teal-700 dark:text-teal-300">
                        {formatPrice(prod.price)} / box
                      </span>
                      <span className="text-slate-400 line-through text-[11px]">
                        {formatPrice(prod.originalPrice || 0)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Eye Power Parameters Grid */}
          <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Prescription Parameters & Box Quantities
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Right Eye (OD) */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    Right Eye (OD)
                  </span>
                  <Badge variant="teal" size="sm">OD</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">Power (SPH):</span>
                    <select
                      value={powerOD}
                      onChange={(e) => setPowerOD(parseFloat(e.target.value))}
                      className="glass-input rounded-lg px-2 py-1 text-xs font-mono font-bold"
                    >
                      {[-0.5, -1.0, -1.5, -2.0, -2.25, -2.5, -2.75, -3.0, -3.5, -4.0, -4.5, -5.0, -6.0].map((p) => (
                        <option key={p} value={p}>{p > 0 ? `+${p.toFixed(2)}` : p.toFixed(2)}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">Base Curve (BC):</span>
                    <select
                      value={bcOD}
                      onChange={(e) => setBcOD(parseFloat(e.target.value))}
                      className="glass-input rounded-lg px-2 py-1 text-xs font-mono font-bold"
                    >
                      {[8.4, 8.5, 8.6].map((bc) => (
                        <option key={bc} value={bc}>{bc} mm</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-600 dark:text-slate-400">Quantity (Boxes):</span>
                    <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setBoxesOD(Math.max(1, boxesOD - 1))}
                        className="px-2 py-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-bold font-mono">{boxesOD}</span>
                      <button
                        onClick={() => setBoxesOD(boxesOD + 1)}
                        className="px-2 py-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Left Eye (OS) */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    Left Eye (OS)
                  </span>
                  <Badge variant="teal" size="sm">OS</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">Power (SPH):</span>
                    <select
                      value={powerOS}
                      onChange={(e) => setPowerOS(parseFloat(e.target.value))}
                      className="glass-input rounded-lg px-2 py-1 text-xs font-mono font-bold"
                    >
                      {[-0.5, -1.0, -1.5, -2.0, -2.25, -2.5, -2.75, -3.0, -3.5, -4.0, -4.5, -5.0, -6.0].map((p) => (
                        <option key={p} value={p}>{p > 0 ? `+${p.toFixed(2)}` : p.toFixed(2)}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">Base Curve (BC):</span>
                    <select
                      value={bcOS}
                      onChange={(e) => setBcOS(parseFloat(e.target.value))}
                      className="glass-input rounded-lg px-2 py-1 text-xs font-mono font-bold"
                    >
                      {[8.4, 8.5, 8.6].map((bc) => (
                        <option key={bc} value={bc}>{bc} mm</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-600 dark:text-slate-400">Quantity (Boxes):</span>
                    <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setBoxesOS(Math.max(1, boxesOS - 1))}
                        className="px-2 py-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-bold font-mono">{boxesOS}</span>
                      <button
                        onClick={() => setBoxesOS(boxesOS + 1)}
                        className="px-2 py-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SUBSCRIPTION CADENCE & TOTALS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 space-y-6 bg-white/90 dark:bg-slate-900/85">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5" />
                  Delivery Cadence
                </span>
                <Badge variant="gold" size="sm">Save 15%</Badge>
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mt-1">
                Subscribe & Save
              </h3>
            </div>

            {/* Cadence Pills */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { months: 1, label: 'Every Month', tag: 'Flex' },
                { months: 3, label: 'Every 3 Months', tag: 'Most Popular' },
                { months: 6, label: 'Every 6 Months', tag: 'Best Value' },
                { months: 12, label: 'Annual Plan', tag: 'Max Savings' },
              ].map((cad) => {
                const isSelected = cadence === cad.months;
                return (
                  <button
                    key={cad.months}
                    onClick={() => setCadence(cad.months as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50/40 dark:bg-teal-950/30 ring-2 ring-teal-500/20'
                        : 'border-slate-200 dark:border-white/10 hover:border-teal-500/40'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase text-teal-600 dark:text-teal-400 block">
                      {cad.tag}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5">
                      {cad.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs pt-3 border-t border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Boxes Total ({boxesOD + boxesOS} boxes)</span>
                <span className="font-mono text-slate-900 dark:text-white">{formatPrice(baseTotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Subscription Savings (15%)</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Insured Shipping</span>
                <span className="text-teal-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Recurring Amount</span>
                <span className="text-lg font-display text-teal-600 dark:text-teal-400 font-extrabold">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full font-bold shadow-xl shadow-teal-600/30"
              onClick={handleSubscribe}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Subscribe & Add to Bag ({formatPrice(finalTotal)})
            </Button>

            <p className="text-[11px] text-center text-slate-500">
              Zero commitments. Easily swap, delay, or cancel anytime in your patient dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
