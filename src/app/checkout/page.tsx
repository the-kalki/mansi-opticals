'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  CreditCard,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Award,
  Truck,
  Building,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/components/providers/ToastProvider';
import { formatPrice } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getEstimatedTax, getTotal, clearCart } = useCartStore();
  const { success } = useToast();

  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'UPI' | 'HSA_FSA'>('CARD');
  const [isProcessing, setIsProcessing] = useState(false);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');

  // Shipping Form Data
  const [formData, setFormData] = useState({
    fullName: 'Aditi Roy',
    email: 'aditi.roy@example.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Prestige Palms, 100 Feet Rd',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
  });

  const subtotal = getSubtotal();
  const discount = voucherApplied ? 500 : 0;
  const estimatedTax = getEstimatedTax();
  const total = Math.max(0, getTotal() - discount);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (voucherCode.toUpperCase() === 'EYECARE500' || voucherCode.toUpperCase() === 'WELCOME10') {
      setVoucherApplied(true);
      success('Voucher Applied!', '₹500 Frame Credit successfully deducted.');
    } else {
      alert('Invalid voucher code. Try EYECARE500.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('Your cart is empty. Add a frame or contact lenses first.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
      clearCart();
      setIsProcessing(false);

      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      } catch {}

      success('Order Placed Successfully!', `Order ${orderId} has been sent to our optical lab verification queue.`);
      router.push(`/orders/${orderId}/track`);
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
          Secure Optical Checkout
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-teal-600" />
          <span>256-Bit SSL Encrypted • Zero Card Data Stored • HIPAA & FDA Compliant</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT FORM (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Shipping Address */}
          <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-teal-600" />
                1. Delivery & Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name *"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
                <Input
                  label="Email Address *"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Phone Number (for Courier & Lab Alerts) *"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <Input
                  label="Pincode / Postal Code *"
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                />
              </div>

              <Input
                label="Street Address *"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="City *"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                <Input
                  label="State *"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-teal-600" />
                2. Select Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    paymentMethod === 'CARD'
                      ? 'border-teal-500 bg-teal-50/40 dark:bg-teal-950/30 ring-2 ring-teal-500/20'
                      : 'border-slate-200 dark:border-white/10'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-teal-600 mb-1" />
                  <span className="text-xs font-bold block text-slate-900 dark:text-white">
                    Credit / Debit Card
                  </span>
                  <span className="text-[10px] text-slate-400">Visa, Mastercard, Amex</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    paymentMethod === 'UPI'
                      ? 'border-teal-500 bg-teal-50/40 dark:bg-teal-950/30 ring-2 ring-teal-500/20'
                      : 'border-slate-200 dark:border-white/10'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-teal-600 mb-1" />
                  <span className="text-xs font-bold block text-slate-900 dark:text-white">
                    Instant UPI / QR
                  </span>
                  <span className="text-[10px] text-slate-400">GPay, PhonePe, Paytm</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('HSA_FSA')}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    paymentMethod === 'HSA_FSA'
                      ? 'border-teal-500 bg-teal-50/40 dark:bg-teal-950/30 ring-2 ring-teal-500/20'
                      : 'border-slate-200 dark:border-white/10'
                  }`}
                >
                  <Award className="w-5 h-5 text-amber-500 mb-1" />
                  <span className="text-xs font-bold block text-slate-900 dark:text-white">
                    HSA / FSA Card
                  </span>
                  <span className="text-[10px] text-slate-400">Tax-Free Medical Card</span>
                </button>
              </div>

              {/* Card Inputs Mock */}
              {paymentMethod === 'CARD' && (
                <div className="space-y-3 pt-2">
                  <Input label="Card Number" placeholder="4242 •••• •••• 4242" defaultValue="4242 8821 9904 1234" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Expiry Date" placeholder="MM/YY" defaultValue="12/28" />
                    <Input label="CVV / CVC" type="password" placeholder="•••" defaultValue="882" />
                  </div>
                </div>
              )}

              {paymentMethod === 'HSA_FSA' && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-300">
                  <p className="font-bold">HSA/FSA Eligible Transaction</p>
                  <p className="text-[11px] mt-0.5">
                    An itemized medical optical receipt with diagnostic codes will be generated immediately after payment.
                  </p>
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              isLoading={isProcessing}
              className="w-full font-bold shadow-xl shadow-amber-500/20"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {isProcessing ? 'Validating with Lab...' : `Pay & Dispatch to Optical Lab (${formatPrice(total)})`}
            </Button>
          </form>
        </div>

        {/* RIGHT ORDER SUMMARY & MEDICAL INVOICE (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-white/10 space-y-5 bg-white/90 dark:bg-slate-900/85">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white pb-3 border-b border-slate-200/80 dark:border-white/10">
              Itemized Optical Order Summary ({items.length})
            </h2>

            {/* Line items list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <div className="w-14 h-14 rounded-lg bg-slate-100 dark:bg-slate-800 relative overflow-hidden shrink-0 border border-slate-200 dark:border-white/5">
                    {item.selectedColor?.image && (
                      <Image src={item.selectedColor.image} alt={item.product.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 dark:text-white truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Qty: {item.quantity} • {item.lensConfig ? 'Custom RX Lenses' : 'Standard'}
                    </p>
                    {item.lensConfig && (
                      <p className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold truncate">
                        {item.lensConfig.usage} • {item.lensConfig.index}
                      </p>
                    )}
                  </div>
                  <span className="font-bold font-display text-slate-900 dark:text-white shrink-0">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Voucher promo input */}
            <form onSubmit={handleApplyVoucher} className="flex gap-2 pt-2 border-t border-slate-200/80 dark:border-white/10">
              <input
                type="text"
                placeholder="Promo / Voucher (e.g. EYECARE500)"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="glass-input rounded-xl px-3 py-2 text-xs flex-1 uppercase"
              />
              <Button type="submit" variant="outline" size="sm">
                Apply
              </Button>
            </form>

            {/* Breakdown table */}
            <div className="space-y-2 text-xs pt-2 border-t border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Optical Items Subtotal</span>
                <span className="font-mono text-slate-900 dark:text-white">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Clinical Frame Voucher</span>
                  <span className="font-mono">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Medical GST (12%)</span>
                <span className="font-mono text-slate-900 dark:text-white">{formatPrice(estimatedTax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Express Lab Delivery</span>
                <span className="text-teal-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Final Total</span>
                <span className="text-xl font-display text-teal-600 dark:text-teal-400 font-extrabold">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-[11px] text-teal-800 dark:text-teal-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>100% Prescription Lab Guarantee with 30-Day Zero-Risk Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
