'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Glasses,
  Sun,
  Moon,
  ShoppingBag,
  Calendar,
  Layers,
  MapPin,
  Menu,
  X,
  Search,
  Sparkles,
  ShieldCheck,
  Phone,
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useThemeStore } from '@/store/useThemeStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalCount, openDrawer } = useCartStore();
  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = mounted ? getTotalCount() : 0;

  const navLinks = [
    { name: 'Eyeglasses', href: '/shop?category=EYEGLASSES', icon: <Glasses className="w-3.5 h-3.5 shrink-0" /> },
    { name: 'Sunglasses', href: '/shop?category=SUNGLASSES', icon: <Sun className="w-3.5 h-3.5 shrink-0" /> },
    { name: 'Contact Lenses', href: '/contact-lenses', icon: <Layers className="w-3.5 h-3.5 shrink-0" /> },
    {
      name: 'Book Eye Exam',
      href: '/book',
      icon: <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />,
      badge: '₹500 Off',
    },
    { name: 'Track Order', href: '/orders/ORD-88219/track', icon: <ShieldCheck className="w-3.5 h-3.5 shrink-0" /> },
  ];

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-white text-[12px] py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1 text-teal-400">
          <Sparkles className="w-3.5 h-3.5" />
          Zero-Risk Guarantee:
        </span>
        <span>Free Anti-Reflective & Blue-Cut standard on custom lenses</span>
        <span className="hidden sm:inline text-slate-500">•</span>
        <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
          <Phone className="w-3 h-3 text-amber-400" />
          Optical Care: +91 98000 72162 (Nayan Niketan Centre, Moyna)
        </span>
      </div>

      {/* Floating Glass Navigation Header */}
      <header
        className={cn(
          'sticky top-3 z-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300',
          isScrolled ? 'top-2' : 'top-3'
        )}
      >
        <div
          className={cn(
            'glass-panel rounded-2xl px-4 sm:px-5 py-2.5 flex items-center justify-between border transition-all duration-300 gap-4',
            isScrolled
              ? 'shadow-xl bg-white/95 dark:bg-[#0F172A]/90 border-slate-200/90 dark:border-white/15'
              : 'shadow-md bg-white/85 dark:bg-[#0F172A]/80 border-slate-200/80 dark:border-white/10'
          )}
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-white flex items-center justify-center shadow-md shadow-teal-600/30 group-hover:scale-105 transition-transform duration-200">
              <Glasses className="w-4.5 h-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white leading-none">
                MANSI<span className="text-teal-600 dark:text-teal-400">.</span>OPTICALS
              </span>
              <span className="text-[9px] tracking-widest uppercase font-semibold text-slate-500 dark:text-slate-400">
                Precision Eye Care
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links - Perfectly Aligned Single Row */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-nowrap">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href.includes('?') && pathname.startsWith(link.href.split('?')[0]));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'px-2.5 xl:px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0',
                    isActive
                      ? 'bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100/80 dark:hover:bg-white/5'
                  )}
                >
                  {link.icon}
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-extrabold leading-none bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 whitespace-nowrap shrink-0">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle, Search, Cart, CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400" />
                )}
              </button>
            )}

            {/* Quick Search Link */}
            <Link
              href="/shop"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors hidden sm:flex items-center"
              aria-label="Search frames"
            >
              <Search className="w-4 h-4" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openDrawer}
              className="relative p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1"
              aria-label="Open shopping cart"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-teal-600 text-white font-bold text-[10px] flex items-center justify-center shadow-md animate-scale-in">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 glass-panel rounded-2xl p-4 border border-slate-200 dark:border-white/10 shadow-2xl animate-fade-in flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  {link.icon}
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
              <Link href="/book" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">
                  Book Clinical Exam (₹500 Off)
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
