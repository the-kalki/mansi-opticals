import { create } from 'zustand';
import {
  ClinicLocation,
  Optometrist,
  AvailableSlot,
  PatientIntakeData,
  BookingAppointment,
} from '@/types';
import { MOCK_CLINICS, MOCK_OPTOMETRISTS, MOCK_SERVICES, MOCK_SLOTS } from '@/lib/data/mock-clinics';

interface BookingState {
  step: 1 | 2 | 3 | 4 | 5; // 1: Clinic, 2: Service & Doc, 3: Date & Slot, 4: Intake, 5: Confirmation
  selectedClinic: ClinicLocation;
  selectedService: typeof MOCK_SERVICES[0];
  selectedOptometrist: Optometrist;
  selectedDate: string; // ISO date e.g. "2026-08-20"
  selectedSlot: AvailableSlot | null;
  intakeData: PatientIntakeData;
  confirmedBooking: BookingAppointment | null;

  setStep: (step: 1 | 2 | 3 | 4 | 5) => void;
  setClinic: (clinic: ClinicLocation) => void;
  setService: (service: typeof MOCK_SERVICES[0]) => void;
  setOptometrist: (doctor: Optometrist) => void;
  setDate: (date: string) => void;
  setSlot: (slot: AvailableSlot) => void;
  updateIntake: (field: keyof PatientIntakeData, value: any) => void;
  confirmBooking: () => BookingAppointment;
  resetBooking: () => void;
}

const DEFAULT_INTAKE: PatientIntakeData = {
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  isFirstVisit: true,
  chiefComplaints: ['Routine Checkup & Power Update'],
  currentCorrection: 'Glasses',
  medicalHistory: ['No prior optical surgeries'],
  insuranceProvider: '',
  insuranceMemberId: '',
};

export const useBookingStore = create<BookingState>((set, get) => ({
  step: 1,
  selectedClinic: MOCK_CLINICS[0],
  selectedService: MOCK_SERVICES[0],
  selectedOptometrist: MOCK_OPTOMETRISTS[0],
  selectedDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
  selectedSlot: MOCK_SLOTS[0],
  intakeData: DEFAULT_INTAKE,
  confirmedBooking: null,

  setStep: (step) => set({ step }),
  setClinic: (clinic) => set({ selectedClinic: clinic }),
  setService: (service) => set({ selectedService: service }),
  setOptometrist: (optometrist) => set({ selectedOptometrist: optometrist }),
  setDate: (date) => set({ selectedDate: date }),
  setSlot: (slot) => set({ selectedSlot: slot }),

  updateIntake: (field, value) =>
    set((state) => ({
      intakeData: { ...state.intakeData, [field]: value },
    })),

  confirmBooking: () => {
    const {
      selectedClinic,
      selectedOptometrist,
      selectedService,
      selectedDate,
      selectedSlot,
      intakeData,
    } = get();

    const newBooking: BookingAppointment = {
      id: `APT-${Math.floor(100000 + Math.random() * 900000)}`,
      clinic: selectedClinic,
      optometrist: selectedOptometrist,
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      date: selectedDate,
      slot: selectedSlot ? selectedSlot.time : '10:00 AM',
      intake: intakeData,
      status: 'CONFIRMED',
      voucherCode: 'EYECARE500',
      voucherDiscount: 500,
    };

    set({ confirmedBooking: newBooking, step: 5 });
    return newBooking;
  },

  resetBooking: () =>
    set({
      step: 1,
      selectedClinic: MOCK_CLINICS[0],
      selectedService: MOCK_SERVICES[0],
      selectedOptometrist: MOCK_OPTOMETRISTS[0],
      selectedSlot: MOCK_SLOTS[0],
      intakeData: DEFAULT_INTAKE,
      confirmedBooking: null,
    }),
}));
