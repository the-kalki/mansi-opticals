'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Truck,
  FileText,
  Eye,
  Glasses,
  Phone,
  ArrowRight,
  Package,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import { OrderStage } from '@/types';
import { formatPrice } from '@/lib/utils';

export default function OrderTrackPage() {
  const params = useParams();
  const orderId = (params?.id as string) || 'ORD-88219';

  const [currentStage, setCurrentStage] = useState<OrderStage>('LAB_SURFACING');

  const stages: { stage: OrderStage; title: string; desc: string; date: string }[] = [
    {
      stage: 'PRESCRIPTION_RECEIVED',
      title: '1. Prescription Received & Ingested',
      desc: 'Prescription document successfully parsed via automated OCR and stored in HIPAA-compliant vault.',
      date: 'Aug 18, 04:30 PM',
    },
    {
      stage: 'OPTOMETRIST_VERIFIED',
      title: '2. Clinical Verification by Dr. Ananya Sharma',
      desc: 'SPH -2.25 / CYL -0.75 parameters and PD 63.5mm verified against titanium frame chassis.',
      date: 'Aug 18, 05:15 PM',
    },
    {
      stage: 'LAB_SURFACING',
      title: '3. Digital Lab Surfacing & Diamond Edging',
      desc: '1.67 Ultra-Thin lenses currently being digitally surfaced with Blue-Shield & Hydrophobic AR coating.',
      date: 'Aug 19, 10:00 AM (In Progress)',
    },
    {
      stage: 'ASSEMBLY_QC',
      title: '4. Frame Mounting & 12-Point QC Testing',
      desc: 'Precision lens mounting, hinge tension calibration, and optical focal alignment verification.',
      date: 'Est. Aug 20, 02:00 PM',
    },
    {
      stage: 'DISPATCHED',
      title: '5. Dispatched via Express Insured Courier',
      desc: 'Tracking Number: BLUEDART-OPT-99281. Signature delivery required.',
      date: 'Est. Delivery: Aug 21',
    },
  ];

  const stageOrder: OrderStage[] = [
    'PRESCRIPTION_RECEIVED',
    'OPTOMETRIST_VERIFIED',
    'LAB_SURFACING',
    'ASSEMBLY_QC',
    'DISPATCHED',
  ];

  const currentIndex = stageOrder.indexOf(currentStage);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Live Optical Lab Telemetry
            </span>
            <Badge variant="teal" size="sm">Active Order</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white mt-1">
            Order #{orderId}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Placed on Aug 18, 2026 • Mansi Aero Titanium Round + 1.67 Ultra-Thin Blue-Shield
          </p>
        </div>

        {/* Stage Simulation Switcher (for demonstration & testing) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
          <span className="px-2 text-[10px] text-slate-500 uppercase">Simulate Stage:</span>
          {stageOrder.map((st, i) => (
            <button
              key={st}
              onClick={() => setCurrentStage(st)}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                currentStage === st
                  ? 'bg-teal-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tracker Pipeline */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 space-y-8 bg-white/90 dark:bg-slate-900/85">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <Package className="w-4 h-4 text-teal-600" />
            Manufacturing & Verification Timeline
          </h2>
          <span className="text-xs font-semibold text-teal-700 dark:text-teal-300">
            Estimated Delivery: Aug 21, 2026
          </span>
        </div>

        {/* Vertical Pipeline Steps */}
        <div className="space-y-6 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {stages.map((st, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <div key={st.stage} className="relative flex items-start gap-4 pl-1">
                {/* Status Dot */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 z-10 transition-all ${
                    isCompleted
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 ring-4 ring-teal-50 dark:ring-teal-950'
                      : isCurrent
                      ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20 animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>

                {/* Stage Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4
                      className={`text-sm font-bold ${
                        isCurrent
                          ? 'text-amber-600 dark:text-amber-400 font-extrabold'
                          : isCompleted
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-400'
                      }`}
                    >
                      {st.title}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      {st.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prescription Specs Recap Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-teal-600" />
            Verified Lens Parameters
          </h3>
          <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
              <span>Right Eye (OD):</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">SPH -2.25 | CYL -0.75 | AXIS 85°</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
              <span>Left Eye (OS):</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">SPH -2.00 | CYL -0.50 | AXIS 95°</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
              <span>Pupillary Distance:</span>
              <span className="font-mono font-bold text-teal-600">63.5 mm</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Index & Coating:</span>
              <span className="font-bold text-slate-900 dark:text-white">1.67 Ultra-Thin • Blue-Shield</span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-teal-600" />
            Optical Care & Support
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Need adjustments or have questions regarding your prescription surfacing? Our master opticians are on call.
          </p>
          <div className="pt-2 text-xs space-y-1 font-semibold text-slate-800 dark:text-slate-200">
            <p>Direct Lab Line: +91 80 4125 8899</p>
            <p>Optometrist Desk: dr.ananya@mansiopticals.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
