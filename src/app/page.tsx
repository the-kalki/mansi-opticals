'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Glasses,
  Calendar,
  Sparkles,
  ShieldCheck,
  Award,
  Eye,
  Camera,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Star,
  Layers,
  MapPin,
  Clock,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import { useBuilderStore } from '@/store/useBuilderStore';
import { MOCK_PRODUCTS } from '@/lib/data/mock-catalog';
import { MOCK_CLINICS, MOCK_OPTOMETRISTS } from '@/lib/data/mock-clinics';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';

export default function HomePage() {
  const { openBuilder } = useBuilderStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'ALL' | 'EYEGLASSES' | 'SUNGLASSES' | 'CONTACT_LENS'>('ALL');

  const filteredProducts = selectedCategoryTab === 'ALL'
    ? MOCK_PRODUCTS.slice(0, 6)
    : MOCK_PRODUCTS.filter((p) => p.category === selectedCategoryTab);

  const faqs = [
    {
      q: 'Can I upload an expired prescription?',
      a: 'We strictly require a valid, unexpired prescription to protect your vision health. If yours has expired, you can easily book a quick clinical exam with our certified in-house optometrists today!',
    },
    {
      q: 'How do I get my PD (Pupillary Distance)?',
      a: 'No ruler needed! Use our Instant Auto-PD tool during the lens builder flow. Your device camera will calculate your PD with clinical millimeter accuracy in under 10 seconds.',
    },
    {
      q: 'What is the difference between single-vision and progressive lenses?',
      a: 'Single-vision corrects for one specific focal distance (distance driving or reading). Our digital progressives provide a smooth, line-free transition from distance to intermediate computer vision to close-up reading.',
    },
    {
      q: 'Do you accept HSA/FSA and vision insurance?',
      a: 'Absolutely. You can use your HSA or FSA cards directly at checkout. We also generate itemized compliant optical receipts so you can easily submit for out-of-network insurance reimbursement.',
    },
    {
      q: 'What does your 1-Year warranty cover?',
      a: 'Every pair comes with our 1-Year Frame & Lens Warranty. If your frames break or your lenses get scratched under normal use, we replace them with zero hassle.',
    },
    {
      q: 'What is the turnaround time for prescription glasses?',
      a: 'Lab processing takes 3–5 business days for single vision, and 5–7 business days for complex progressive digital surfacing. Express courier dispatch ensures safe delivery right to your door.',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-16 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 text-xs font-bold border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Next-Gen Omnichannel Optical Experience</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              Vision Perfected.{' '}
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-500 bg-clip-text text-transparent">
                Style Uncompromised.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Experience lab-tested precision lenses, premium titanium & Italian acetate frames, and certified clinical care—seamlessly integrated for your digital lifestyle.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/shop" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full shadow-lg shadow-teal-600/30"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Shop Prescription Glasses
                </Button>
              </Link>
              <Link href="/book" className="w-full sm:w-auto">
                <Button variant="glass" size="lg" className="w-full" leftIcon={<Calendar className="w-4 h-4 text-teal-600" />}>
                  Book an Eye Exam
                </Button>
              </Link>
            </div>

            {/* Guarantee Microcopy */}
            <div className="flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                100% Zero-Risk Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Free 30-Day Returns
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                HSA / FSA Accepted
              </span>
            </div>
          </div>

          {/* Right Hero Visual: Floating Glass Hologram Frame Card (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient radiant background circle */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-teal-500/20 to-cyan-400/20 rounded-full blur-3xl -z-10 animate-pulse-slow" />

            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-white/60 dark:border-white/10 shadow-2xl relative w-full max-w-md bg-white/90 dark:bg-slate-900/80">
              {/* Top pill badge */}
              <div className="flex items-center justify-between mb-4">
                <Badge variant="gold" size="sm">
                  ★ Flagship Titanium Edition
                </Badge>
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  9.2g Featherweight
                </span>
              </div>

              {/* Product Frame Showcase Image */}
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-200/50 dark:border-white/5">
                <Image
                  src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1000&q=80"
                  alt="Mansi Aero Titanium Round"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-teal-400" />
                  Blue-Shield Coated
                </div>
              </div>

              {/* Frame Info & Quick Builder Action */}
              <div className="mt-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                      Mansi Aero Titanium Round
                    </h3>
                    <p className="text-xs text-slate-500">
                      Japanese Beta-Titanium • Matte Obsidian
                    </p>
                  </div>
                  <span className="text-lg font-bold font-display text-teal-600 dark:text-teal-400">
                    {formatPrice(3499)}
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  className="w-full shadow-md shadow-teal-600/20"
                  onClick={() => openBuilder(MOCK_PRODUCTS[0])}
                  leftIcon={<Glasses className="w-4 h-4" />}
                >
                  Configure Custom Lenses
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST AUTHORITY BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 shadow-lg bg-white/80 dark:bg-slate-900/60">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-teal-600 dark:text-teal-400">
                99.8%
              </div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Prescription Accuracy Rate
              </p>
              <p className="text-[11px] text-slate-400">ISO-9001 Optical Lab</p>
            </div>

            <div className="space-y-1 pt-4 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-teal-600 dark:text-teal-400">
                45,000+
              </div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Happy Eyes Cared For
              </p>
              <p className="text-[11px] text-slate-400">Across Boutiques & Online</p>
            </div>

            <div className="space-y-1 pt-4 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-amber-500 flex items-center justify-center gap-1">
                4.9 <Star className="w-5 h-5 fill-amber-500" />
              </div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Verified Patient Rating
              </p>
              <p className="text-[11px] text-slate-400">Over 3,200+ Reviews</p>
            </div>

            <div className="space-y-1 pt-4 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-teal-600 dark:text-teal-400">
                1-Year
              </div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Scratch & Frame Warranty
              </p>
              <p className="text-[11px] text-slate-400">Zero-Hassle Replacement</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUE PILLARS (3-Column Grid from Copy Deck) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="teal" size="sm">
            Clinical Precision & Digital Ease
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Engineered for Modern Eye Health
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            We merge boutique eyewear design with hospital-grade optometry for unprecedented visual clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <GlassCard interactive glow glowColor="teal" className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shadow-sm">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Crystal-Clear Custom Vision
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Our state-of-the-art optical labs craft every lens to your exact digital lifestyle. Enjoy free anti-reflective and digital blue-cut coatings on all standard high-index lenses.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400">
              <span>Digital Surfacing Tech</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </GlassCard>

          {/* Pillar 2 */}
          <GlassCard interactive glow glowColor="cyan" className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shadow-sm">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Effortless Prescription Upload
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Snap a photo of your RX, and our smart tech handles the rest. Don't know your PD? Our Instant Auto-PD scanner measures it accurately in seconds using just your webcam.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400">
              <span>Instant Auto-PD Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </GlassCard>

          {/* Pillar 3 */}
          <GlassCard interactive glow glowColor="gold" className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-sm">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Care by Certified Optometrists
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We don’t just sell glasses; we protect your eye health. Book with our in-house licensed doctors for comprehensive care, with transparent, zero-hidden-fee pricing.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
              <span>Find Nearest Clinic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 4. FEATURED CATALOG & QUICK CUSTOMIZER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
              Trending Optical Frames & Lenses
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select any frame to customize high-index lenses or try in our virtual mirror.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex p-1 bg-slate-200/60 dark:bg-slate-800 rounded-xl text-xs font-bold">
            <button
              onClick={() => setSelectedCategoryTab('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedCategoryTab === 'ALL'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              All Styles
            </button>
            <button
              onClick={() => setSelectedCategoryTab('EYEGLASSES')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedCategoryTab === 'EYEGLASSES'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Eyeglasses
            </button>
            <button
              onClick={() => setSelectedCategoryTab('SUNGLASSES')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedCategoryTab === 'SUNGLASSES'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Sunglasses
            </button>
            <button
              onClick={() => setSelectedCategoryTab('CONTACT_LENS')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedCategoryTab === 'CONTACT_LENS'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Contacts
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 flex flex-col justify-between group hover:shadow-xl hover:border-teal-500/40 transition-all duration-300"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
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
                        New Arrival
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                    {product.material}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                        {product.brand}
                      </span>
                      <h3 className="font-display font-bold text-base text-slate-900 dark:text-white line-clamp-1">
                        {product.name}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-base font-bold font-display text-slate-900 dark:text-white">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through block">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Dimensions & Swatches */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-white/5">
                    <span>
                      {product.dimensions.lensWidth}-{product.dimensions.bridgeWidth}-{product.dimensions.templeLength} mm
                    </span>
                    <div className="flex items-center gap-1.5">
                      {product.colors.map((c) => (
                        <span
                          key={c.name}
                          className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-600 shadow-sm"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <Link href={`/shop/${product.id}`} className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    View Specs
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => openBuilder(product)}
                >
                  Custom Lenses
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link href="/shop">
            <Button variant="glass" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore Full Eyewear Catalog
            </Button>
          </Link>
        </div>
      </section>

      {/* 5. CLINICAL EYE EXAM SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 border border-teal-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0B1728] to-[#042F2E] text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <Badge variant="gold" size="sm">
                🩺 In-House Certified Clinical Practice
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                Comprehensive 12-Step Clinical Eye Exams
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
                Book an in-depth optical diagnostic with our board-certified optometrists. High-resolution digital retinal imaging, glaucoma tonometry, and zero wait-time guarantees.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200 pt-2 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Digital Retinal Topography</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Zero-Wait Time Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Pre-visit Digital Intake (No clipboard)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>₹500 Frame Credit Voucher Included</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link href="/book">
                  <Button variant="primary" size="lg" className="font-bold shadow-lg shadow-teal-600/30" rightIcon={<Calendar className="w-4 h-4" />}>
                    Find a Clinic & Book Slot
                  </Button>
                </Link>
              </div>
            </div>

            {/* Doctor Card Preview */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl p-6 border border-white/20 bg-slate-900/90 backdrop-blur-2xl text-white space-y-4 shadow-2xl">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-full overflow-hidden relative border-2 border-teal-400 shrink-0 shadow-md">
                    <Image
                      src={MOCK_OPTOMETRISTS[0].avatar}
                      alt={MOCK_OPTOMETRISTS[0].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white leading-tight">
                      {MOCK_OPTOMETRISTS[0].name}
                    </h4>
                    <p className="text-xs text-teal-300 font-semibold mt-0.5">
                      {MOCK_OPTOMETRISTS[0].title}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>4.9★ (420+ Clinical Patients)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed italic border-t border-white/10 pt-3">
                  "{MOCK_OPTOMETRISTS[0].bio}"
                </p>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-teal-500/30 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-300">Next Slot: Indiranagar Clinic</span>
                  <span className="font-bold text-teal-400 font-mono">Today, 02:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SOCIAL PROOF & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            Loved by 45,000+ Verified Eyes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real patient experiences across our digital store and clinical optometry lounges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6 space-y-3">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
              "I was worried about ordering progressives online, but the vision is sharper than my ₹15,000 designer pair. The virtual try-on was 100% accurate!"
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">Sarah T.</span>
              <span className="text-slate-400">Digital Marketer • Progressive Lenses</span>
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-3">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
              "Uploading my prescription took literally 5 seconds with their OCR. My 1.67 high-index lenses are incredibly thin, and they handled my HSA claim automatically."
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">James R.</span>
              <span className="text-slate-400">Software Engineer • Titanium Round Frame</span>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 7. HIGH-INTENT FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="teal" size="sm">
            Got Questions?
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            Frequently Asked Optical Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left font-display font-bold text-sm sm:text-base flex items-center justify-between text-slate-900 dark:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-teal-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
