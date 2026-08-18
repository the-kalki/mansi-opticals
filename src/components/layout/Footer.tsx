'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Glasses,
  ShieldCheck,
  Award,
  Lock,
  CreditCard,
  Mail,
  ArrowRight,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/providers/ToastProvider';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { success } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    success('Subscribed!', 'Check your inbox for your 10% welcome coupon.');
    setEmail('');
  };

  return (
    <footer className="mt-20 border-t border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-[#070B14]/80 backdrop-blur-xl transition-colors">
      {/* Pre-footer Lead Magnet Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-10">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-teal-500/30 bg-gradient-to-br from-teal-900/90 via-slate-900/95 to-slate-950 text-white shadow-2xl relative overflow-hidden">
          {/* Ambient luminous glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 mb-3">
                ★ Limited Clinical Voucher
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                Need an updated prescription before buying?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
                Book a comprehensive clinical eye exam today and get{' '}
                <strong className="text-teal-300 font-semibold">₹500 off your first complete pair of glasses</strong>{' '}
                (frames + digital lenses).
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Link href="/book" className="w-full sm:w-auto">
                <Button variant="gold" size="lg" className="w-full">
                  Claim ₹500 Off & Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/30">
                <Glasses className="w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                MANSI<span className="text-teal-600 dark:text-teal-400">.</span>OPTICALS
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Experience lab-tested precision lenses, premium titanium & Italian acetate frames, and certified clinical optometry—seamlessly integrated for your digital lifestyle.
            </p>

            {/* Newsletter form */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
                See What's Next in Optical Innovation
              </h4>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="glass-input rounded-xl px-4 py-2.5 text-xs sm:text-sm flex-1"
                />
                <Button type="submit" variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Join
                </Button>
              </form>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Get 10% off your first frame order. Zero spam, just clear value.
              </p>
            </div>
          </div>

          {/* Quick Links 1: Eyewear */}
          <div>
            <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white mb-4">
              Eyewear & Lenses
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/shop?category=EYEGLASSES" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Prescription Glasses
                </Link>
              </li>
              <li>
                <Link href="/shop?category=SUNGLASSES" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Polarized Sunglasses
                </Link>
              </li>
              <li>
                <Link href="/shop?shape=Round" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Titanium Round Frames
                </Link>
              </li>
              <li>
                <Link href="/shop?shape=Browline" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Italian Acetate Browline
                </Link>
              </li>
              <li>
                <Link href="/contact-lenses" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Contact Lens Subscriptions
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links 2: Clinical Services */}
          <div>
            <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white mb-4">
              Clinical & Care
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/book" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Book Comprehensive Eye Exam
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Contact Lens Fitting Lounge
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Doctor Directory & Clinics
                </Link>
              </li>
              <li>
                <Link href="/orders/ORD-88219/track" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Live Optical Lab Tracker
                </Link>
              </li>
              <li>
                <Link href="/admin/prescriptions" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Optometrist RX Queue
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links 3: Trust & Locations */}
          <div>
            <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white mb-4">
              Flagship Boutique
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>100 Feet Rd, 12th Main, Indiranagar, Bengaluru</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                <span>+91 80 4125 8899</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Mon-Sun: 9:30 AM – 9:00 PM</span>
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-10 pt-8 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
            <Award className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
            <div className="text-xs">
              <p className="font-bold">FDA Registered</p>
              <p className="text-slate-500 text-[11px]">ISO-Certified Lab</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
            <div className="text-xs">
              <p className="font-bold">HIPAA Compliant</p>
              <p className="text-slate-500 text-[11px]">AES-256 RX Encryption</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
            <Lock className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
            <div className="text-xs">
              <p className="font-bold">SSL 256-Bit Checkout</p>
              <p className="text-slate-500 text-[11px]">Bank-Grade Security</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
            <CreditCard className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
            <div className="text-xs">
              <p className="font-bold">HSA / FSA Accepted</p>
              <p className="text-slate-500 text-[11px]">Itemized Medical Receipts</p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimers & Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="max-w-2xl leading-relaxed text-center md:text-left">
            All prescription optical devices are dispensed in strict compliance with health regulations. Clinical eye examinations and vision health services are provided by licensed optometry practitioners.
          </p>
          <p className="shrink-0 font-medium">
            © 2026 Mansi Opticals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
