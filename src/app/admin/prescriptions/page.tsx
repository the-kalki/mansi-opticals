'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Eye,
  Glasses,
  Search,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import { useToast } from '@/components/providers/ToastProvider';
import { formatPrice } from '@/lib/utils';

interface PendingPrescription {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  orderDate: string;
  frameName: string;
  status: 'PENDING_REVIEW' | 'VERIFIED' | 'REJECTED';
  documentUrl: string;
  extractedData: {
    doctorName: string;
    clinicName: string;
    od: { sphere: number; cylinder: number; axis: number; add?: number };
    os: { sphere: number; cylinder: number; axis: number; add?: number };
    pd: number;
    notes: string;
  };
}

const INITIAL_QUEUE: PendingPrescription[] = [
  {
    id: 'RX-9921',
    orderId: 'ORD-88219',
    customerName: 'Aditi Roy',
    customerPhone: '+91 98765 43210',
    orderDate: 'Aug 18, 2026, 04:30 PM',
    frameName: 'Mansi Aero Titanium Round',
    status: 'PENDING_REVIEW',
    documentUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    extractedData: {
      doctorName: 'Dr. S. K. Bhowmik, M.S. (Ophthal)',
      clinicName: 'Nayan Niketan Polyclinic & Nursing Home, Moyna',
      od: { sphere: -2.25, cylinder: -0.75, axis: 85, add: 1.75 },
      os: { sphere: -2.00, cylinder: -0.50, axis: 95, add: 1.75 },
      pd: 63.5,
      notes: 'High digital screen time, recommend 1.67 index with Blue-Shield.',
    },
  },
  {
    id: 'RX-9922',
    orderId: 'ORD-88220',
    customerName: 'Karthik Nair',
    customerPhone: '+91 98111 22334',
    orderDate: 'Aug 18, 2026, 05:00 PM',
    frameName: 'Lumina Acetate Browline',
    status: 'PENDING_REVIEW',
    documentUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    extractedData: {
      doctorName: 'Dr. Priya V. Menon, OD',
      clinicName: 'Mansi Opticals Koramangala',
      od: { sphere: -3.50, cylinder: -1.25, axis: 180 },
      os: { sphere: -3.25, cylinder: -1.00, axis: 175 },
      pd: 64.0,
      notes: 'Astigmatism correction required.',
    },
  },
];

export default function AdminPrescriptionQueuePage() {
  const { success, error } = useToast();
  const [queue, setQueue] = useState<PendingPrescription[]>(INITIAL_QUEUE);
  const [selectedRx, setSelectedRx] = useState<PendingPrescription>(INITIAL_QUEUE[0]);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  const handleApprove = (id: string) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'VERIFIED' } : item))
    );
    if (selectedRx.id === id) {
      setSelectedRx((prev) => ({ ...prev, status: 'VERIFIED' }));
    }
    success('Prescription Approved!', `Order ${selectedRx.orderId} moved to Digital Lab Surfacing.`);
  };

  const handleReject = (id: string) => {
    if (!rejectionReason) {
      alert('Please state a reason for rejecting the prescription.');
      return;
    }
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'REJECTED' } : item))
    );
    if (selectedRx.id === id) {
      setSelectedRx((prev) => ({ ...prev, status: 'REJECTED' }));
    }
    error('Prescription Rejected', `SMS notification with re-upload link sent to ${selectedRx.customerPhone}.`);
    setShowRejectInput(false);
    setRejectionReason('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Staff Clinical Portal
            </span>
            <Badge variant="gold" size="sm">Licensed Optometrist Desk</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white mt-1">
            Prescription Verification Queue
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit OCR extracted parameters against physical doctor prescriptions before lab diamond edging.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="teal" size="md">
            {queue.filter((q) => q.status === 'PENDING_REVIEW').length} Pending Audits
          </Badge>
        </div>
      </div>

      {/* Main 2-Column Interface: Left Queue List (4 cols) + Right Side-by-Side Reviewer (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT QUEUE (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Incoming Orders
          </h2>

          <div className="space-y-2.5">
            {queue.map((item) => {
              const isSelected = selectedRx.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedRx(item);
                    setShowRejectInput(false);
                  }}
                  className={`glass-card-interactive p-4 rounded-xl border select-none transition-all ${
                    isSelected
                      ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/40 dark:bg-teal-950/30'
                      : 'border-slate-200 dark:border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">
                        {item.id} • {item.orderId}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {item.customerName}
                      </h4>
                    </div>
                    <Badge
                      variant={
                        item.status === 'VERIFIED'
                          ? 'teal'
                          : item.status === 'REJECTED'
                          ? 'slate'
                          : 'gold'
                      }
                      size="sm"
                    >
                      {item.status === 'VERIFIED'
                        ? 'Approved'
                        : item.status === 'REJECTED'
                        ? 'Rejected'
                        : 'Review'}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-500 mt-1 truncate">
                    {item.frameName}
                  </p>
                  <span className="text-[10px] text-slate-400 block mt-2">
                    {item.orderDate}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE-BY-SIDE AUDIT WORKSPACE (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 space-y-6 bg-white/90 dark:bg-slate-900/85">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200/80 dark:border-white/10">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                  Auditing: {selectedRx.customerName} ({selectedRx.id})
                </h3>
                <p className="text-xs text-slate-500">
                  Target Chassis: <strong className="text-teal-600">{selectedRx.frameName}</strong>
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="danger"
                  size="sm"
                  leftIcon={<XCircle className="w-4 h-4" />}
                  onClick={() => setShowRejectInput(!showRejectInput)}
                >
                  Flag / Reject
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                  onClick={() => handleApprove(selectedRx.id)}
                >
                  Approve for Lab
                </Button>
              </div>
            </div>

            {/* Rejection input box if opened */}
            {showRejectInput && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-3 animate-fade-in">
                <label className="text-xs font-bold text-rose-800 dark:text-rose-300 block">
                  State Reason for Prescription Rejection:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Expired RX date / Blurry image / Incompatible CYL"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="glass-input rounded-xl px-3 py-2 text-xs flex-1 border-rose-400"
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleReject(selectedRx.id)}
                  >
                    Confirm Rejection
                  </Button>
                </div>
              </div>
            )}

            {/* Side-by-Side: Document Image vs Digitized Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Doctor RX Document */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-teal-600" />
                  Doctor's Original Prescription
                </span>
                <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10">
                  <Image
                    src={selectedRx.documentUrl}
                    alt="Doctor Prescription"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-[11px] text-slate-400 text-center">
                  Click to zoom high-resolution medical document
                </p>
              </div>

              {/* Digitized Parameters Grid */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-teal-600" />
                  Digitized Optical Parameters
                </span>

                <div className="glass-card p-4 rounded-xl border border-slate-200/80 dark:border-white/5 space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px]">Issuing Practitioner:</span>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {selectedRx.extractedData.doctorName}
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      {selectedRx.extractedData.clinicName}
                    </p>
                  </div>

                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">
                        <th>Eye</th>
                        <th>SPH</th>
                        <th>CYL</th>
                        <th>AXIS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr>
                        <td className="py-1.5 font-bold font-sans">OD</td>
                        <td>{selectedRx.extractedData.od.sphere.toFixed(2)}</td>
                        <td>{selectedRx.extractedData.od.cylinder.toFixed(2)}</td>
                        <td>{selectedRx.extractedData.od.axis}°</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold font-sans">OS</td>
                        <td>{selectedRx.extractedData.os.sphere.toFixed(2)}</td>
                        <td>{selectedRx.extractedData.os.cylinder.toFixed(2)}</td>
                        <td>{selectedRx.extractedData.os.axis}°</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex justify-between pt-2 border-t border-slate-100 dark:border-white/5">
                    <span className="text-slate-500">Pupillary Distance:</span>
                    <span className="font-bold font-mono text-teal-600">
                      {selectedRx.extractedData.pd} mm
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-800 dark:text-teal-300">
                  <strong>Optometrist Notes:</strong> {selectedRx.extractedData.notes}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
