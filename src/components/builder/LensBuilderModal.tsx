'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Glasses,
  Check,
  ChevronRight,
  ChevronLeft,
  UploadCloud,
  Camera,
  FileText,
  Clock,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Zap,
  Info,
} from 'lucide-react';
import { useBuilderStore, BuilderStep } from '@/store/useBuilderStore';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/components/providers/ToastProvider';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Stepper, StepItem } from '@/components/ui/Stepper';
import { formatPrice } from '@/lib/utils';
import { LENS_INDEX_OPTIONS, LENS_COATINGS } from '@/lib/data/mock-catalog';
import { LensUsage, LensIndex } from '@/types';
import confetti from 'canvas-confetti';

export const LensBuilderModal: React.FC = () => {
  const {
    isOpen,
    closeBuilder,
    currentStep,
    setStep,
    nextStep,
    prevStep,
    frame,
    selectedColor,
    usage,
    visionType,
    prescription,
    index,
    selectedCoatings,
    setUsage,
    setPrescriptionMethod,
    updatePrescriptionOD,
    updatePrescriptionOS,
    setSinglePD,
    setDualPD,
    setPDType,
    setOCRData,
    setIndex,
    toggleCoating,
    getUsagePrice,
    getIndexPrice,
    getCoatingsPrice,
    getTotalPrice,
    getFinalConfig,
  } = useBuilderStore();

  const { addItem } = useCartStore();
  const { success } = useToast();

  const [isOCRProcessing, setIsOCRProcessing] = useState(false);
  const [isWebcamScanning, setIsWebcamScanning] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  if (!frame) return null;

  const steps: StepItem[] = [
    { id: 1, title: 'Lens Usage', subtitle: 'Type & Purpose' },
    { id: 2, title: 'Prescription', subtitle: 'Upload / Manual' },
    { id: 3, title: 'PD Alignment', subtitle: 'Pupillary Distance' },
    { id: 4, title: 'Material & Tech', subtitle: 'Index & Coatings' },
  ];

  const handleSimulateOCR = () => {
    setIsOCRProcessing(true);
    setTimeout(() => {
      setOCRData({
        doctorName: 'Dr. R. K. Gupta, M.S. (Ophthal)',
        clinicName: 'Apollo Eye Hospital',
        rxDate: '2026-08-10',
        od: { sphere: -2.25, cylinder: -0.75, axis: 85, add: 1.75 },
        os: { sphere: -2.00, cylinder: -0.50, axis: 95, add: 1.75 },
        singlePd: 64,
      });
      setIsOCRProcessing(false);
      success('Prescription Extracted!', 'AWS Textract OCR extracted your optical parameters with 99.8% precision.');
    }, 1800);
  };

  const handleSimulateAutoPD = () => {
    setIsWebcamScanning(true);
    setTimeout(() => {
      setSinglePD(63.5);
      setIsWebcamScanning(false);
      success('Auto-PD Calculated!', 'Accurately measured at 63.5 mm using facial landmark alignment.');
    }, 2200);
  };

  const handleAddToCart = () => {
    const finalLensConfig = getFinalConfig();

    addItem({
      type: 'FRAME_WITH_LENSES',
      product: frame,
      selectedColor: selectedColor || frame.colors[0],
      lensConfig: finalLensConfig,
      unitPrice: getTotalPrice(),
      quantity: 1,
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if canvas-confetti is not loaded
    }

    success('Custom Lenses Added!', `${frame.name} with custom precision lenses is in your bag.`);
    closeBuilder();
  };

  const framePrice = frame.price;
  const usagePrice = getUsagePrice();
  const indexPrice = getIndexPrice();
  const coatingsPrice = getCoatingsPrice();
  const totalPrice = getTotalPrice();

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeBuilder}
      maxWidth="4xl"
      title={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 flex items-center justify-center">
            <Glasses className="w-4 h-4" />
          </div>
          <span>Custom Lens Builder — {frame.name}</span>
        </div>
      }
      description="Configure precision prescription optics tailored to your exact visual measurements."
    >
      <div className="space-y-6">
        {/* Progress Stepper */}
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={(s) => setStep(s as BuilderStep)}
        />

        {/* Modal Body: Left Interactive Steps / Right Live Price Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Main Step Interaction Column (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* STEP 1: Lens Usage */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
                    Step 1: Select Your Lens Purpose & Usage
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    How will you primarily be using your new glasses?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Single Vision */}
                  <div
                    onClick={() => setUsage('SINGLE_VISION', 'DISTANCE')}
                    className={`glass-card-interactive p-4 rounded-xl border flex flex-col justify-between select-none ${
                      usage === 'SINGLE_VISION'
                        ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/40 dark:bg-teal-950/30'
                        : 'border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                          Single Vision
                        </span>
                        {usage === 'SINGLE_VISION' && (
                          <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Distance / Reading
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Corrects for one focal distance. Perfect for everyday driving or desk reading.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-4 block">
                      Included (+₹0)
                    </span>
                  </div>

                  {/* Digital Progressive */}
                  <div
                    onClick={() => setUsage('PROGRESSIVE')}
                    className={`glass-card-interactive p-4 rounded-xl border flex flex-col justify-between select-none ${
                      usage === 'PROGRESSIVE'
                        ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/40 dark:bg-teal-950/30'
                        : 'border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                          Progressive
                        </span>
                        {usage === 'PROGRESSIVE' && (
                          <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Digital Multifocal
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Seamless line-free transition from distance to computer to close-up reading.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-4 block">
                      +{formatPrice(2500)}
                    </span>
                  </div>

                  {/* Non-Prescription */}
                  <div
                    onClick={() => setUsage('NON_PRESCRIPTION')}
                    className={`glass-card-interactive p-4 rounded-xl border flex flex-col justify-between select-none ${
                      usage === 'NON_PRESCRIPTION'
                        ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/40 dark:bg-teal-950/30'
                        : 'border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                          Zero Power
                        </span>
                        {usage === 'NON_PRESCRIPTION' && (
                          <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Blue-Light / Style
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Plano lenses with advanced anti-glare for screen protection and fashion.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-4 block">
                      Included (+₹0)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Prescription Entry */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
                    Step 2: Prescription Acquisition
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Choose how you would like to provide your doctor's prescription.
                  </p>
                </div>

                {/* Method selector tabs */}
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <button
                    onClick={() => setPrescriptionMethod('OCR_UPLOAD')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      prescription.method === 'OCR_UPLOAD'
                        ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    Instant OCR
                  </button>
                  <button
                    onClick={() => setPrescriptionMethod('MANUAL')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      prescription.method === 'MANUAL'
                        ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Manual Grid
                  </button>
                  <button
                    onClick={() => setPrescriptionMethod('SEND_LATER')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      prescription.method === 'SEND_LATER'
                        ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    Send Later
                  </button>
                </div>

                {/* Method A: Instant OCR Upload Simulation */}
                {prescription.method === 'OCR_UPLOAD' && (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-teal-500/40 rounded-2xl p-6 text-center space-y-3 bg-teal-50/20 dark:bg-teal-950/20">
                      <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center mx-auto">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Drag & drop your prescription photo or PDF
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          Our automated AI OCR reads SPH, CYL, AXIS, and ADD in seconds.
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        isLoading={isOCRProcessing}
                        onClick={handleSimulateOCR}
                      >
                        {isOCRProcessing ? 'Scanning Document...' : 'Upload & Auto-Populate RX'}
                      </Button>
                    </div>

                    {prescription.doctorName && (
                      <div className="glass-card p-4 rounded-xl border border-teal-500/30 bg-teal-50/30 dark:bg-teal-950/30 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-teal-800 dark:text-teal-300">
                            Verified Document Extraction
                          </span>
                          <Badge variant="teal" size="sm">
                            99.8% Match
                          </Badge>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300">
                          Doctor: <strong>{prescription.doctorName}</strong> ({prescription.clinicName})
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Method B: Manual Grid */}
                {(prescription.method === 'MANUAL' || prescription.doctorName) && (
                  <div className="glass-card p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Optical Power Parameters
                      </h4>
                      <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
                        Standard 0.25 Diopter Steps
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
                            <th className="pb-2">Eye</th>
                            <th className="pb-2">Sphere (SPH)</th>
                            <th className="pb-2">Cylinder (CYL)</th>
                            <th className="pb-2">Axis (deg)</th>
                            {usage === 'PROGRESSIVE' && <th className="pb-2">Add Power</th>}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                          {/* Right Eye OD */}
                          <tr>
                            <td className="py-2.5 font-bold font-sans text-slate-800 dark:text-slate-200">
                              OD (Right)
                            </td>
                            <td className="py-2.5 pr-2">
                              <input
                                type="number"
                                step="0.25"
                                value={prescription.od.sphere}
                                onChange={(e) =>
                                  updatePrescriptionOD('sphere', parseFloat(e.target.value) || 0)
                                }
                                className="glass-input rounded-lg px-2.5 py-1 w-20 text-xs text-center"
                              />
                            </td>
                            <td className="py-2.5 pr-2">
                              <input
                                type="number"
                                step="0.25"
                                value={prescription.od.cylinder}
                                onChange={(e) =>
                                  updatePrescriptionOD('cylinder', parseFloat(e.target.value) || 0)
                                }
                                className="glass-input rounded-lg px-2.5 py-1 w-20 text-xs text-center"
                              />
                            </td>
                            <td className="py-2.5 pr-2">
                              <input
                                type="number"
                                min="1"
                                max="180"
                                value={prescription.od.axis}
                                onChange={(e) =>
                                  updatePrescriptionOD('axis', parseInt(e.target.value) || 0)
                                }
                                className="glass-input rounded-lg px-2.5 py-1 w-16 text-xs text-center"
                              />
                            </td>
                            {usage === 'PROGRESSIVE' && (
                              <td className="py-2.5">
                                <input
                                  type="number"
                                  step="0.25"
                                  value={prescription.od.add || 1.5}
                                  onChange={(e) =>
                                    updatePrescriptionOD('add', parseFloat(e.target.value) || 0)
                                  }
                                  className="glass-input rounded-lg px-2.5 py-1 w-16 text-xs text-center"
                                />
                              </td>
                            )}
                          </tr>

                          {/* Left Eye OS */}
                          <tr>
                            <td className="py-2.5 font-bold font-sans text-slate-800 dark:text-slate-200">
                              OS (Left)
                            </td>
                            <td className="py-2.5 pr-2">
                              <input
                                type="number"
                                step="0.25"
                                value={prescription.os.sphere}
                                onChange={(e) =>
                                  updatePrescriptionOS('sphere', parseFloat(e.target.value) || 0)
                                }
                                className="glass-input rounded-lg px-2.5 py-1 w-20 text-xs text-center"
                              />
                            </td>
                            <td className="py-2.5 pr-2">
                              <input
                                type="number"
                                step="0.25"
                                value={prescription.os.cylinder}
                                onChange={(e) =>
                                  updatePrescriptionOS('cylinder', parseFloat(e.target.value) || 0)
                                }
                                className="glass-input rounded-lg px-2.5 py-1 w-20 text-xs text-center"
                              />
                            </td>
                            <td className="py-2.5 pr-2">
                              <input
                                type="number"
                                min="1"
                                max="180"
                                value={prescription.os.axis}
                                onChange={(e) =>
                                  updatePrescriptionOS('axis', parseInt(e.target.value) || 0)
                                }
                                className="glass-input rounded-lg px-2.5 py-1 w-16 text-xs text-center"
                              />
                            </td>
                            {usage === 'PROGRESSIVE' && (
                              <td className="py-2.5">
                                <input
                                  type="number"
                                  step="0.25"
                                  value={prescription.os.add || 1.5}
                                  onChange={(e) =>
                                    updatePrescriptionOS('add', parseFloat(e.target.value) || 0)
                                  }
                                  className="glass-input rounded-lg px-2.5 py-1 w-16 text-xs text-center"
                                />
                              </td>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Method C: Send Later */}
                {prescription.method === 'SEND_LATER' && (
                  <div className="glass-card p-5 rounded-xl border border-amber-500/30 bg-amber-50/20 dark:bg-amber-950/20 text-xs space-y-2">
                    <h4 className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-500" />
                      Proceed with checkout now, upload later
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      We will hold your frame order and send you a secure SMS & email upload link. Our licensed optometrists will verify your prescription as soon as you submit it.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Pupillary Distance (PD) */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
                    Step 3: Pupillary Distance (PD) Measurement
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ensures your lens optical center aligns with your pupils to prevent eye fatigue.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Webcam Auto-PD Scanner Card */}
                  <div className="glass-card p-5 rounded-xl border border-teal-500/30 bg-teal-50/30 dark:bg-teal-950/30 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md">
                        <Camera className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Instant Webcam Auto-PD
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Uses facial landmark detection with magnetic card scale calibration to measure your PD in under 10 seconds.
                      </p>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      className="mt-4"
                      isLoading={isWebcamScanning}
                      onClick={handleSimulateAutoPD}
                    >
                      {isWebcamScanning ? 'Scanning Landmarks...' : 'Launch Auto-PD Scanner'}
                    </Button>
                  </div>

                  {/* Manual PD Input Card */}
                  <div className="glass-card p-5 rounded-xl border border-slate-200 dark:border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        Manual PD Entry
                      </h4>
                      <div className="flex gap-1 text-[11px]">
                        <button
                          onClick={() => setPDType('SINGLE')}
                          className={`px-2 py-0.5 rounded cursor-pointer ${
                            prescription.pdType === 'SINGLE'
                              ? 'bg-teal-600 text-white font-bold'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          Single
                        </button>
                        <button
                          onClick={() => setPDType('DUAL')}
                          className={`px-2 py-0.5 rounded cursor-pointer ${
                            prescription.pdType === 'DUAL'
                              ? 'bg-teal-600 text-white font-bold'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          Dual
                        </button>
                      </div>
                    </div>

                    {prescription.pdType === 'SINGLE' ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span>Single PD (54mm - 74mm):</span>
                          <span className="text-teal-600 dark:text-teal-400 font-mono text-sm font-bold">
                            {prescription.singlePd || 63} mm
                          </span>
                        </div>
                        <input
                          type="range"
                          min="54"
                          max="74"
                          step="0.5"
                          value={prescription.singlePd || 63}
                          onChange={(e) => setSinglePD(parseFloat(e.target.value))}
                          className="w-full accent-teal-600 cursor-pointer"
                        />
                        <p className="text-[11px] text-slate-500">
                          Average adult PD is 62–64 mm.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                            Right PD (mm)
                          </label>
                          <input
                            type="number"
                            min="26"
                            max="37"
                            step="0.5"
                            value={prescription.dualPdRight || 31.5}
                            onChange={(e) =>
                              setDualPD(parseFloat(e.target.value) || 31.5, prescription.dualPdLeft || 31.5)
                            }
                            className="glass-input rounded-lg px-2.5 py-1.5 text-xs text-center"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                            Left PD (mm)
                          </label>
                          <input
                            type="number"
                            min="26"
                            max="37"
                            step="0.5"
                            value={prescription.dualPdLeft || 31.5}
                            onChange={(e) =>
                              setDualPD(prescription.dualPdRight || 31.5, parseFloat(e.target.value) || 31.5)
                            }
                            className="glass-input rounded-lg px-2.5 py-1.5 text-xs text-center"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Material Index & Coatings */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
                    Step 4: Lens Thickness & Protective Coatings
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select your refractive index and enhance your lenses with digital blue light and anti-reflective shields.
                  </p>
                </div>

                {/* Index Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Lens Material & Refractive Index
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {LENS_INDEX_OPTIONS.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setIndex(opt.id as LensIndex)}
                        className={`p-3 rounded-xl border glass-card-interactive flex flex-col justify-between ${
                          index === opt.id
                            ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/40 dark:bg-teal-950/30'
                            : 'border-slate-200 dark:border-white/10'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-slate-900 dark:text-white">
                              {opt.name}
                            </span>
                            <Badge variant="teal" size="sm">
                              {opt.thicknessBadge}
                            </Badge>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                            {opt.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/50 dark:border-white/5 text-xs font-semibold">
                          <span className="text-slate-500">{opt.recommendedFor}</span>
                          <span className="text-teal-700 dark:text-teal-300">
                            {opt.surcharge > 0 ? `+${formatPrice(opt.surcharge)}` : 'Included'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coatings Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Protective Coatings & Treatments
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {LENS_COATINGS.map((coating) => {
                      const isSelected = selectedCoatings.includes(coating.id);
                      return (
                        <div
                          key={coating.id}
                          onClick={() => toggleCoating(coating.id)}
                          className={`p-3 rounded-xl border glass-card-interactive flex flex-col justify-between ${
                            isSelected
                              ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/40 dark:bg-teal-950/30'
                              : 'border-slate-200 dark:border-white/10'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-slate-900 dark:text-white">
                                {coating.name}
                              </span>
                              {coating.badge && (
                                <Badge variant="gold" size="sm">
                                  {coating.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                              {coating.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/50 dark:border-white/5 text-xs font-semibold">
                            <span className="text-slate-400 text-[11px]">
                              {coating.features.join(' • ')}
                            </span>
                            <span className="text-teal-700 dark:text-teal-300 shrink-0 ml-2">
                              +{formatPrice(coating.price)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-white/10">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 1}
                leftIcon={<ChevronLeft className="w-4 h-4" />}
              >
                Back
              </Button>

              {currentStep < 4 ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={nextStep}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  Continue to Step {currentStep + 1}
                </Button>
              ) : (
                <Button
                  variant="gold"
                  size="md"
                  onClick={handleAddToCart}
                  rightIcon={<Sparkles className="w-4 h-4" />}
                  className="shadow-lg shadow-amber-500/20"
                >
                  Add Custom Eyewear to Bag ({formatPrice(totalPrice)})
                </Button>
              )}
            </div>
          </div>

          {/* Right Live Price Matrix Sidebar (1 col) */}
          <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 space-y-4 h-fit bg-slate-50/80 dark:bg-slate-900/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 pb-2 border-b border-slate-200/80 dark:border-white/10">
              Real-Time Optical Formula
            </h4>

            {/* Selected Frame Thumbnail */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 relative overflow-hidden shrink-0 border border-slate-200 dark:border-white/5">
                {selectedColor?.image && (
                  <Image
                    src={selectedColor.image}
                    alt={frame.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="min-w-0">
                <h5 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                  {frame.name}
                </h5>
                <p className="text-[11px] text-slate-500 font-medium">
                  {selectedColor?.name || 'Standard'} • {frame.material}
                </p>
                <span className="text-xs font-bold text-teal-700 dark:text-teal-300">
                  {formatPrice(framePrice)}
                </span>
              </div>
            </div>

            {/* Breakdown lines */}
            <div className="space-y-2 text-xs pt-2 border-t border-slate-200/60 dark:border-white/5 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Frame Chassis</span>
                <span className="font-mono font-medium text-slate-900 dark:text-white">
                  {formatPrice(framePrice)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>
                  Lens Usage (
                  {usage === 'PROGRESSIVE'
                    ? 'Progressive'
                    : usage === 'SINGLE_VISION'
                    ? 'Single Vision'
                    : 'Non-RX'}
                  )
                </span>
                <span className="font-mono font-medium text-slate-900 dark:text-white">
                  {usagePrice > 0 ? `+${formatPrice(usagePrice)}` : '+$0'}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Lens Index ({index.split('_')[0]})</span>
                <span className="font-mono font-medium text-slate-900 dark:text-white">
                  {indexPrice > 0 ? `+${formatPrice(indexPrice)}` : '+$0'}
                </span>
              </div>

              {coatingsPrice > 0 && (
                <div className="flex justify-between">
                  <span>Coatings ({selectedCoatings.length})</span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">
                    +{formatPrice(coatingsPrice)}
                  </span>
                </div>
              )}
            </div>

            {/* Total formula summary */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Total Configured
                </span>
                <span className="text-lg font-bold font-display text-teal-600 dark:text-teal-400">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* Trust Assurance */}
            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-[11px] text-teal-800 dark:text-teal-300 space-y-1">
              <div className="flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>100% Optical Accuracy Guarantee</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Verified by licensed optometrist before digital lab surfacing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
