import { create } from 'zustand';
import {
  Product,
  ColorOption,
  LensUsage,
  LensVisionType,
  LensIndex,
  PrescriptionData,
  CustomLensConfig,
} from '@/types';
import { LENS_INDEX_OPTIONS, LENS_COATINGS } from '@/lib/data/mock-catalog';

export type BuilderStep = 1 | 2 | 3 | 4;

interface BuilderState {
  isOpen: boolean;
  currentStep: BuilderStep;
  frame: Product | null;
  selectedColor: ColorOption | null;

  // Step 1
  usage: LensUsage;
  visionType: LensVisionType;

  // Step 2 & 3
  prescription: PrescriptionData;

  // Step 4
  index: LensIndex;
  selectedCoatings: string[];

  // Actions
  openBuilder: (frame: Product, color?: ColorOption) => void;
  closeBuilder: () => void;
  setStep: (step: BuilderStep) => void;
  nextStep: () => void;
  prevStep: () => void;

  setUsage: (usage: LensUsage, visionType?: LensVisionType) => void;
  setPrescriptionMethod: (method: 'MANUAL' | 'OCR_UPLOAD' | 'SEND_LATER') => void;
  updatePrescriptionOD: (field: keyof PrescriptionData['od'], value: number) => void;
  updatePrescriptionOS: (field: keyof PrescriptionData['os'], value: number) => void;
  setSinglePD: (pd: number) => void;
  setDualPD: (right: number, left: number) => void;
  setPDType: (type: 'SINGLE' | 'DUAL') => void;
  setOCRData: (data: Partial<PrescriptionData>) => void;

  setIndex: (index: LensIndex) => void;
  toggleCoating: (coatingId: string) => void;

  // Computations
  getUsagePrice: () => number;
  getIndexPrice: () => number;
  getCoatingsPrice: () => number;
  getTotalPrice: () => number;
  getFinalConfig: () => CustomLensConfig;
}

const DEFAULT_PRESCRIPTION: PrescriptionData = {
  method: 'MANUAL',
  od: { sphere: -1.25, cylinder: -0.5, axis: 90, add: 1.5 },
  os: { sphere: -1.5, cylinder: 0.0, axis: 0, add: 1.5 },
  pdType: 'SINGLE',
  singlePd: 63,
  dualPdRight: 31.5,
  dualPdLeft: 31.5,
};

export const useBuilderStore = create<BuilderState>((set, get) => ({
  isOpen: false,
  currentStep: 1,
  frame: null,
  selectedColor: null,

  usage: 'SINGLE_VISION',
  visionType: 'DISTANCE',
  prescription: DEFAULT_PRESCRIPTION,
  index: '1.50_STANDARD',
  selectedCoatings: ['BLUE_SHIELD'],

  openBuilder: (frame, color) =>
    set({
      isOpen: true,
      currentStep: 1,
      frame,
      selectedColor: color || frame.colors[0],
      usage: 'SINGLE_VISION',
      visionType: 'DISTANCE',
      prescription: { ...DEFAULT_PRESCRIPTION },
      index: '1.50_STANDARD',
      selectedCoatings: ['BLUE_SHIELD'],
    }),

  closeBuilder: () => set({ isOpen: false }),

  setStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 4) {
      set({ currentStep: (currentStep + 1) as BuilderStep });
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: (currentStep - 1) as BuilderStep });
    }
  },

  setUsage: (usage, visionType = 'DISTANCE') =>
    set({ usage, visionType }),

  setPrescriptionMethod: (method) =>
    set((state) => ({
      prescription: { ...state.prescription, method },
    })),

  updatePrescriptionOD: (field, value) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        od: { ...state.prescription.od, [field]: value },
      },
    })),

  updatePrescriptionOS: (field, value) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        os: { ...state.prescription.os, [field]: value },
      },
    })),

  setSinglePD: (singlePd) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        singlePd,
        pdType: 'SINGLE',
      },
    })),

  setDualPD: (dualPdRight, dualPdLeft) =>
    set((state) => ({
      prescription: {
        ...state.prescription,
        dualPdRight,
        dualPdLeft,
        pdType: 'DUAL',
      },
    })),

  setPDType: (pdType) =>
    set((state) => ({
      prescription: { ...state.prescription, pdType },
    })),

  setOCRData: (data) =>
    set((state) => ({
      prescription: { ...state.prescription, ...data, method: 'OCR_UPLOAD' },
    })),

  setIndex: (index) => set({ index }),

  toggleCoating: (coatingId) =>
    set((state) => {
      const exists = state.selectedCoatings.includes(coatingId);
      return {
        selectedCoatings: exists
          ? state.selectedCoatings.filter((id) => id !== coatingId)
          : [...state.selectedCoatings, coatingId],
      };
    }),

  getUsagePrice: () => {
    const { usage } = get();
    if (usage === 'PROGRESSIVE') return 2500;
    if (usage === 'SINGLE_VISION') return 0;
    return 0; // Non-prescription
  },

  getIndexPrice: () => {
    const { index } = get();
    const found = LENS_INDEX_OPTIONS.find((item) => item.id === index);
    return found ? found.surcharge : 0;
  },

  getCoatingsPrice: () => {
    const { selectedCoatings } = get();
    return selectedCoatings.reduce((sum, coatingId) => {
      const found = LENS_COATINGS.find((c) => c.id === coatingId);
      return sum + (found ? found.price : 0);
    }, 0);
  },

  getTotalPrice: () => {
    const { frame } = get();
    const framePrice = frame ? frame.price : 0;
    return (
      framePrice +
      get().getUsagePrice() +
      get().getIndexPrice() +
      get().getCoatingsPrice()
    );
  },

  getFinalConfig: () => {
    const { usage, visionType, index, selectedCoatings, prescription } = get();
    return {
      usage,
      visionType,
      index,
      coatings: selectedCoatings,
      prescription,
      calculatedPrice: get().getTotalPrice(),
    };
  },
}));
