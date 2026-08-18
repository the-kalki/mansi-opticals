'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  Award,
  CheckCircle2,
  Phone,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  Star,
  FileText,
  Stethoscope,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { Stepper, StepItem } from '@/components/ui/Stepper';
import { useBookingStore } from '@/store/useBookingStore';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/components/providers/ToastProvider';
import { MOCK_CLINICS, MOCK_OPTOMETRISTS, MOCK_SERVICES, MOCK_SLOTS } from '@/lib/data/mock-clinics';
import { formatPrice } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function BookExamPage() {
  const {
    step,
    setStep,
    selectedClinic,
    setClinic,
    selectedService,
    setService,
    selectedOptometrist,
    setOptometrist,
    selectedDate,
    setDate,
    selectedSlot,
    setSlot,
    intakeData,
    updateIntake,
    confirmBooking,
    confirmedBooking,
    resetBooking,
  } = useBookingStore();

  const { addItem } = useCartStore();
  const { success } = useToast();
  const [zipSearch, setZipSearch] = useState('');

  const steps: StepItem[] = [
    { id: 1, title: 'Boutique Clinic', subtitle: 'Location' },
    { id: 2, title: 'Service & Doctor', subtitle: 'Optometrist' },
    { id: 3, title: 'Date & Slot', subtitle: 'Real-time' },
    { id: 4, title: 'Patient Intake', subtitle: 'Symptoms & History' },
    { id: 5, title: 'Confirmation', subtitle: 'Voucher' },
  ];

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intakeData.fullName || !intakeData.email || !intakeData.phone) {
      alert('Please fill in your name, email, and phone number to reserve your doctor slot.');
      return;
    }

    const booking = confirmBooking();

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }

    success('Appointment Confirmed!', `Your eye exam at ${booking.clinic.name.split('—')[1]} is locked in.`);
  };

  const dates = [
    { day: 'Today', date: new Date().toISOString().split('T')[0], label: 'Aug 18' },
    { day: 'Tomorrow', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], label: 'Aug 19' },
    { day: 'Thursday', date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], label: 'Aug 20' },
    { day: 'Friday', date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], label: 'Aug 21' },
    { day: 'Saturday', date: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0], label: 'Aug 22' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="teal" size="sm">
          🩺 Certified Optometry Practice
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
          Book Your Clinical Eye Exam
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          State-of-the-art diagnostic screening with zero wait-times. Every booking includes a{' '}
          <strong className="text-teal-600 dark:text-teal-400 font-bold">₹500 Frame Credit Voucher</strong>.
        </p>
      </div>

      {/* Progress Stepper */}
      <Stepper
        steps={steps}
        currentStep={step}
        onStepClick={(s) => step !== 5 && setStep(s as any)}
      />

      {/* STEP 1: CLINIC LOCATION FINDER */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Select Your Nearest Optical Boutique & Diagnostic Lounge
              </h3>
              <p className="text-xs text-slate-500">
                All centers feature digital retinal imaging and private contact lens fitting suites.
              </p>
            </div>
            <div className="w-full sm:w-64">
              <Input
                placeholder="Enter Zipcode or Area"
                value={zipSearch}
                onChange={(e) => setZipSearch(e.target.value)}
                leftIcon={<MapPin className="w-4 h-4" />}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_CLINICS.map((clinic) => {
              const isSelected = selectedClinic.id === clinic.id;
              return (
                <div
                  key={clinic.id}
                  onClick={() => setClinic(clinic)}
                  className={`glass-card-interactive rounded-2xl overflow-hidden border flex flex-col justify-between select-none ${
                    isSelected
                      ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/40 dark:bg-teal-950/30'
                      : 'border-slate-200 dark:border-white/10'
                  }`}
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={clinic.imageUrl}
                        alt={clinic.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{clinic.rating} ({clinic.reviewCount})</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2.5">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                        {clinic.name}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{clinic.address}, {clinic.city}</span>
                      </p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{clinic.hours}</span>
                      </p>

                      <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-1">
                        {clinic.amenities.slice(0, 2).map((amenity, i) => (
                          <div key={i} className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0" />
                            <span className="truncate">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Button
                      variant={isSelected ? 'primary' : 'outline'}
                      size="sm"
                      className="w-full"
                    >
                      {isSelected ? 'Selected Location' : 'Select Location'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200/80 dark:border-white/10">
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(2)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to Service & Optometrist
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: SERVICE & OPTOMETRIST */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
              Select Optical Examination Type & Specialist Doctor
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Current Location: <strong className="text-teal-700 dark:text-teal-300">{selectedClinic.name}</strong>
            </p>
          </div>

          {/* Service Cards */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Diagnostic Service
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {MOCK_SERVICES.map((srv) => {
                const isSelected = selectedService.id === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setService(srv)}
                    className={`glass-card-interactive p-4 rounded-xl border flex flex-col justify-between select-none ${
                      isSelected
                        ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/40 dark:bg-teal-950/30'
                        : 'border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-teal-700 dark:text-teal-300 font-mono">
                          {srv.duration}
                        </span>
                        <span className="text-sm font-bold font-display text-slate-900 dark:text-white">
                          {formatPrice(srv.price)}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {srv.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-white/5">
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block">
                        ★ {srv.highlight}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Doctor Roster */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Select Attending Clinical Optometrist
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {MOCK_OPTOMETRISTS.map((doc) => {
                const isSelected = selectedOptometrist.id === doc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setOptometrist(doc)}
                    className={`glass-card-interactive p-4 rounded-xl border flex items-start gap-3 select-none ${
                      isSelected
                        ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/40 dark:bg-teal-950/30'
                        : 'border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-teal-500 shrink-0">
                      <Image src={doc.avatar} alt={doc.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                        {doc.name}
                      </h4>
                      <p className="text-[11px] text-teal-600 dark:text-teal-400 font-medium truncate">
                        {doc.specialty}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {doc.experienceYears} yrs experience • License: {doc.licenseNumber}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-white/10">
            <Button variant="outline" size="sm" onClick={() => setStep(1)} leftIcon={<ChevronLeft className="w-4 h-4" />}>
              Back
            </Button>
            <Button variant="primary" size="md" onClick={() => setStep(3)} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Continue to Date & Slot
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: DATE & TIME SLOT */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
              Choose Date & Available Time Slot
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Doctor: <strong>{selectedOptometrist.name}</strong> • Service: <strong>{selectedService.name}</strong>
            </p>
          </div>

          {/* Date Selector Carousel */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {dates.map((d) => {
              const isSelected = selectedDate === d.date;
              return (
                <div
                  key={d.date}
                  onClick={() => setDate(d.date)}
                  className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-teal-600 text-white font-bold shadow-md shadow-teal-600/30 border-teal-600 scale-105'
                      : 'glass-card border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500'
                  }`}
                >
                  <span className="text-[11px] block opacity-80">{d.day}</span>
                  <span className="text-sm font-display font-extrabold block">{d.label}</span>
                </div>
              );
            })}
          </div>

          {/* Slot Grid */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Available Slots for {selectedDate}
              </label>
              <span className="text-[11px] text-slate-400">Optimistic Real-Time Lock</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {MOCK_SLOTS.map((slot) => {
                const isSelected = selectedSlot?.id === slot.id;
                return (
                  <button
                    key={slot.id}
                    disabled={!slot.isAvailable}
                    onClick={() => setSlot(slot)}
                    className={`py-3 px-3 rounded-xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                      !slot.isAvailable
                        ? 'opacity-40 bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-800 cursor-not-allowed'
                        : isSelected
                        ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20'
                        : 'glass-card border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-teal-500'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {slot.time}
                    </span>
                    <span className="text-[10px] opacity-80">
                      {slot.isAvailable ? slot.period : 'Booked'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-white/10">
            <Button variant="outline" size="sm" onClick={() => setStep(2)} leftIcon={<ChevronLeft className="w-4 h-4" />}>
              Back
            </Button>
            <Button variant="primary" size="md" onClick={() => setStep(4)} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Continue to Patient Intake
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: DIGITAL PATIENT INTAKE FORM */}
      {step === 4 && (
        <form onSubmit={handleCompleteBooking} className="space-y-6 animate-fade-in">
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
              Pre-Visit Digital Patient Questionnaire
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Skip the waiting room clipboard. Your data is encrypted at rest (AES-256 HIPAA Compliant).
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Patient Name *"
                placeholder="e.g. Aditi Roy"
                required
                value={intakeData.fullName}
                onChange={(e) => updateIntake('fullName', e.target.value)}
              />
              <Input
                label="Email Address *"
                type="email"
                placeholder="e.g. aditi@example.com"
                required
                value={intakeData.email}
                onChange={(e) => updateIntake('email', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Phone Number (for SMS & Calendar Invite) *"
                type="tel"
                placeholder="+91 98765 43210"
                required
                value={intakeData.phone}
                onChange={(e) => updateIntake('phone', e.target.value)}
              />
              <Input
                label="Date of Birth"
                type="date"
                value={intakeData.dateOfBirth}
                onChange={(e) => updateIntake('dateOfBirth', e.target.value)}
              />
            </div>

            {/* Symptoms Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-white/10">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Primary Visual Symptoms / Reason for Visit
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  'Computer / Screen Eye Strain & Headaches',
                  'Blurry Distance / Night Driving Difficulties',
                  'Reading / Close-up Focusing Fatigue',
                  'Specialty Contact Lens Prescription Update',
                  'Routine Annual Vision Checkup',
                ].map((symptom) => (
                  <label
                    key={symptom}
                    className="flex items-center gap-2 p-2.5 rounded-xl glass-card border border-slate-200 dark:border-white/5 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={symptom.includes('Routine')}
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-slate-700 dark:text-slate-300">{symptom}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Insurance Carrier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200/80 dark:border-white/10">
              <Input
                label="Vision Insurance Provider (Optional)"
                placeholder="e.g. Star Health / ICICI Lombard / VSP"
                value={intakeData.insuranceProvider}
                onChange={(e) => updateIntake('insuranceProvider', e.target.value)}
              />
              <Input
                label="Insurance Member ID (Optional)"
                placeholder="e.g. MEM-993821"
                value={intakeData.insuranceMemberId}
                onChange={(e) => updateIntake('insuranceMemberId', e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-white/10">
            <Button type="button" variant="outline" size="sm" onClick={() => setStep(3)} leftIcon={<ChevronLeft className="w-4 h-4" />}>
              Back
            </Button>
            <Button type="submit" variant="gold" size="lg" className="shadow-lg shadow-amber-500/20" rightIcon={<Sparkles className="w-4 h-4" />}>
              Confirm Clinical Appointment & Lock Slot
            </Button>
          </div>
        </form>
      )}

      {/* STEP 5: CONFIRMATION & VOUCHER */}
      {step === 5 && confirmedBooking && (
        <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
          <div className="glass-panel rounded-3xl p-8 border border-teal-500/40 text-center space-y-5 bg-gradient-to-b from-teal-500/10 to-transparent">
            <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-teal-600/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
                Booking ID: {confirmedBooking.id}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
                Your Eye Exam is Confirmed!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                A calendar invite (.ics) and WhatsApp confirmation have been dispatched to {confirmedBooking.intake.phone}.
              </p>
            </div>

            {/* Appointment Summary Box */}
            <div className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-white/10 text-left space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500">Location:</span>
                <span className="font-bold text-slate-900 dark:text-white">{confirmedBooking.clinic.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-bold text-teal-600 dark:text-teal-400">{confirmedBooking.date} at {confirmedBooking.slot}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500">Attending Specialist:</span>
                <span className="font-bold text-slate-900 dark:text-white">{confirmedBooking.optometrist.name}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-slate-900 dark:text-white">{confirmedBooking.serviceName} ({formatPrice(confirmedBooking.servicePrice)})</span>
              </div>
            </div>

            {/* ₹500 Frame Credit Voucher Banner */}
            <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs text-left flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block text-sm">Your ₹500 Eyewear Voucher Code: {confirmedBooking.voucherCode}</strong>
                <span>Apply this code at checkout or present it at the clinic counter to redeem ₹500 off your complete frame & lens pair.</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/shop" className="w-full">
                <Button variant="primary" size="lg" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Shop Frames with ₹500 Credit
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full" onClick={resetBooking}>
                Book Another Appointment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
