'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import {
  Glasses,
  Sparkles,
  ShieldCheck,
  Award,
  CheckCircle2,
  Camera,
  Layers,
  Ruler,
  Truck,
  RotateCcw,
  ArrowRight,
  Star,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import { Modal } from '@/components/ui/Modal';
import { useBuilderStore } from '@/store/useBuilderStore';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/components/providers/ToastProvider';
import { MOCK_PRODUCTS } from '@/lib/data/mock-catalog';
import { formatPrice } from '@/lib/utils';
import { ColorOption } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = MOCK_PRODUCTS.find((p) => p.id === slug || p.slug === slug) || MOCK_PRODUCTS[0];

  const { openBuilder } = useBuilderStore();
  const { addItem } = useCartStore();
  const { success } = useToast();

  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isARModalOpen, setIsARModalOpen] = useState(false);
  const [isARLoading, setIsARLoading] = useState(false);

  const handleAddFrameOnly = () => {
    addItem({
      type: 'FRAME_ONLY',
      product,
      selectedColor,
      unitPrice: product.price,
      quantity: 1,
    });
    success('Frame Added!', `${product.name} (Chassis Only) added to your optical bag.`);
  };

  const handleLaunchAR = () => {
    setIsARModalOpen(true);
    setIsARLoading(true);
    setTimeout(() => {
      setIsARLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-teal-600">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-teal-600">Catalog</Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-medium">{product.name}</span>
      </div>

      {/* Main PDP Grid: Gallery (7 cols) + Purchase Sidebar (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT GALLERY (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Hero Image Frame */}
          <div className="glass-card rounded-3xl overflow-hidden relative h-[380px] sm:h-[480px] w-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-white/10 flex items-center justify-center group">
            <Image
              src={product.images[selectedImageIndex] || selectedColor.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.isBestseller && <Badge variant="gold" size="sm">★ Bestseller</Badge>}
              <Badge variant="teal" size="sm">{product.material}</Badge>
            </div>

            {/* AR Virtual Mirror Trigger Button */}
            <button
              onClick={handleLaunchAR}
              className="absolute bottom-4 right-4 glass-panel px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 text-slate-900 dark:text-white shadow-xl hover:border-teal-500 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Launch 3D AR Try-On</span>
            </button>
          </div>

          {/* Gallery Thumbnails */}
          <div className="flex items-center gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedImageIndex === idx
                    ? 'border-teal-600 ring-2 ring-teal-500/20 scale-105'
                    : 'border-slate-200 dark:border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Frame Optical Dimensions Schematic */}
          <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Ruler className="w-4 h-4 text-teal-600" />
                Optical Frame Dimensions
              </h3>
              <Badge variant="slate" size="sm">Standard Fit ({product.fit})</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
                <span className="text-[11px] text-slate-400 block font-semibold">Lens Width</span>
                <span className="text-base font-bold font-display text-slate-900 dark:text-white">
                  {product.dimensions.lensWidth} mm
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
                <span className="text-[11px] text-slate-400 block font-semibold">Bridge Width</span>
                <span className="text-base font-bold font-display text-slate-900 dark:text-white">
                  {product.dimensions.bridgeWidth} mm
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
                <span className="text-[11px] text-slate-400 block font-semibold">Temple Length</span>
                <span className="text-base font-bold font-display text-slate-900 dark:text-white">
                  {product.dimensions.templeLength} mm
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
                <span className="text-[11px] text-slate-400 block font-semibold">Total Width</span>
                <span className="text-base font-bold font-display text-slate-900 dark:text-white">
                  {product.dimensions.frameWidth} mm
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PURCHASE & SPECS SIDEBAR (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 space-y-6 bg-white/90 dark:bg-slate-900/85">
            {/* Title & Brand */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600 dark:text-teal-400">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Frame + Free Anti-Reflective Coating
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatch Selector */}
            <div className="space-y-2.5 pt-2 border-t border-slate-200/80 dark:border-white/10">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">
                  Frame Finish: <strong className="text-slate-900 dark:text-white">{selectedColor.name}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-9 h-9 rounded-xl border-2 transition-all p-0.5 cursor-pointer flex items-center justify-center ${
                      selectedColor.name === c.name
                        ? 'border-teal-600 ring-2 ring-teal-500/30 scale-110'
                        : 'border-slate-300 dark:border-slate-600 hover:scale-105'
                    }`}
                  >
                    <span
                      className="w-full h-full rounded-lg block shadow-inner"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-white/10">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Chassis Specifications
              </label>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Primary Customizer Actions */}
            <div className="space-y-3 pt-3 border-t border-slate-200/80 dark:border-white/10">
              <Button
                variant="primary"
                size="lg"
                className="w-full font-bold shadow-xl shadow-teal-600/30"
                onClick={() => openBuilder(product, selectedColor)}
                leftIcon={<Glasses className="w-5 h-5" />}
                rightIcon={<Sparkles className="w-4 h-4" />}
              >
                Select Lenses & Customize
              </Button>

              <Button
                variant="outline"
                size="md"
                className="w-full"
                onClick={handleAddFrameOnly}
              >
                Buy Frame Only ({formatPrice(product.price)})
              </Button>
            </div>

            {/* Service & Delivery Trust Bar */}
            <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-500 pt-2 border-t border-slate-200/80 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>1-Year Scratch Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-teal-600 shrink-0" />
                <span>30-Day Zero-Risk Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-teal-600 shrink-0" />
                <span>HSA / FSA Accepted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AR / 3D Try-On Modal */}
      <Modal
        isOpen={isARModalOpen}
        onClose={() => setIsARModalOpen(false)}
        maxWidth="2xl"
        title="AR Virtual Mirror & 3D Spatial Fitting"
        description="Fit this frame live using your camera mesh calibration."
      >
        <div className="space-y-5 text-center">
          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-900 border border-teal-500/30 flex items-center justify-center">
            {isARLoading ? (
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full border-4 border-teal-500 border-t-transparent animate-spin mx-auto" />
                <p className="text-xs text-teal-300 font-bold">
                  Initializing Facial Landmark Mesh...
                </p>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                  alt="AR Try-On Face"
                  fill
                  className="object-cover opacity-60"
                />
                {/* Overlay 3D frame representation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-24 border-2 border-teal-400/80 rounded-3xl p-2 flex items-center justify-center bg-teal-500/10 backdrop-blur-xs animate-float">
                    <Glasses className="w-36 h-36 text-teal-300 drop-shadow-[0_0_15px_rgba(20,184,166,0.8)]" />
                  </div>
                </div>
                <div className="absolute bottom-3 inset-x-3 bg-slate-950/80 backdrop-blur-md rounded-xl p-2.5 text-xs text-white flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-teal-300 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Optimal Width Match: 98% Face Harmony
                  </span>
                  <span className="font-mono text-slate-400">PD: 63mm detected</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" size="sm" onClick={() => setIsARModalOpen(false)}>
              Close Mirror
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsARModalOpen(false);
                openBuilder(product, selectedColor);
              }}
            >
              Continue to Custom Lenses
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
