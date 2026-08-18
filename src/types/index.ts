export type ProductCategory = 'EYEGLASSES' | 'SUNGLASSES' | 'CONTACT_LENS' | 'ACCESSORY';
export type FrameShape = 'Round' | 'Rectangle' | 'Aviator' | 'Cat-Eye' | 'Square' | 'Geometric' | 'Browline';
export type FrameMaterial = 'Titanium' | 'Italian Acetate' | 'TR90 Ultra-Light' | 'Stainless Steel' | 'Mixed Material';
export type FrameFit = 'Narrow' | 'Medium' | 'Wide';
export type Gender = 'Men' | 'Women' | 'Unisex' | 'Kids';

export interface FrameDimensions {
  lensWidth: number; // in mm, e.g. 52
  bridgeWidth: number; // in mm, e.g. 18
  templeLength: number; // in mm, e.g. 145
  frameWidth: number; // in mm, e.g. 138
  lensHeight: number; // in mm, e.g. 42
}

export interface ColorOption {
  name: string;
  hex: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isARAvailable?: boolean;
  gender: Gender;
  shape: FrameShape;
  material: FrameMaterial;
  fit: FrameFit;
  colors: ColorOption[];
  images: string[];
  description: string;
  features: string[];
  dimensions: FrameDimensions;
  inventory: number;
}

export type LensUsage = 'SINGLE_VISION' | 'PROGRESSIVE' | 'NON_PRESCRIPTION';
export type LensVisionType = 'DISTANCE' | 'READING' | 'INTERMEDIATE';

export type LensIndex = '1.50_STANDARD' | '1.60_THIN' | '1.67_ULTRA_THIN' | '1.74_EXTREME_SLIM';

export interface LensCoating {
  id: string;
  name: string;
  description: string;
  price: number;
  badge?: string;
  features: string[];
}

export interface EyePrescription {
  sphere: number; // SPH (-20.00 to +20.00)
  cylinder: number; // CYL (-6.00 to +6.00)
  axis: number; // AXIS (1 to 180)
  add?: number; // ADD (+0.75 to +3.50)
}

export interface PrescriptionData {
  method: 'MANUAL' | 'OCR_UPLOAD' | 'SEND_LATER';
  od: EyePrescription; // Right Eye
  os: EyePrescription; // Left Eye
  pdType: 'SINGLE' | 'DUAL';
  singlePd?: number; // 54 to 74 mm
  dualPdRight?: number; // 26 to 37 mm
  dualPdLeft?: number; // 26 to 37 mm
  uploadedFileUrl?: string;
  doctorName?: string;
  clinicName?: string;
  rxDate?: string;
}

export interface CustomLensConfig {
  usage: LensUsage;
  visionType?: LensVisionType;
  index: LensIndex;
  coatings: string[]; // coating IDs
  prescription: PrescriptionData;
  calculatedPrice: number;
}

export interface ContactLensPower {
  sphere: number;
  baseCurve: number;
  diameter: number;
  cylinder?: number;
  axis?: number;
}

export interface ContactLensConfig {
  brand: string;
  wearingSchedule: 'Daily' | 'Bi-Weekly' | 'Monthly';
  packSize: number; // e.g. 30 lenses, 90 lenses
  boxesOD: number;
  boxesOS: number;
  powerOD: ContactLensPower;
  powerOS: ContactLensPower;
  subscriptionCadence?: 1 | 3 | 6 | 12; // months
  subscriptionDiscount: number; // e.g. 0.15 for 15%
}

export interface CartItem {
  id: string;
  type: 'FRAME_WITH_LENSES' | 'FRAME_ONLY' | 'CONTACT_LENS' | 'EXAM_BOOKING';
  product: Product;
  selectedColor: ColorOption;
  lensConfig?: CustomLensConfig;
  contactConfig?: ContactLensConfig;
  bookingDetails?: BookingAppointment;
  unitPrice: number;
  quantity: number;
}

export interface ClinicLocation {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  coordinates: { lat: number; lng: number };
  amenities: string[];
  hours: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
}

export interface Optometrist {
  id: string;
  name: string;
  title: string;
  licenseNumber: string;
  specialty: string;
  bio: string;
  avatar: string;
  rating: number;
  clinicId: string;
  experienceYears: number;
}

export interface AvailableSlot {
  id: string;
  time: string; // e.g. "09:30 AM"
  period: 'Morning' | 'Afternoon' | 'Evening';
  isAvailable: boolean;
  optometristId: string;
}

export interface PatientIntakeData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  isFirstVisit: boolean;
  chiefComplaints: string[];
  currentCorrection: 'Glasses' | 'Contacts' | 'Both' | 'None';
  medicalHistory: string[];
  insuranceProvider?: string;
  insuranceMemberId?: string;
}

export interface BookingAppointment {
  id: string;
  clinic: ClinicLocation;
  optometrist: Optometrist;
  serviceName: string;
  servicePrice: number;
  date: string;
  slot: string;
  intake: PatientIntakeData;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  voucherCode?: string;
  voucherDiscount?: number;
}

export type OrderStage = 
  | 'PRESCRIPTION_RECEIVED' 
  | 'OPTOMETRIST_VERIFIED' 
  | 'LAB_SURFACING' 
  | 'ASSEMBLY_QC' 
  | 'DISPATCHED' 
  | 'DELIVERED';

export interface OrderLabStatus {
  orderId: string;
  customerName: string;
  createdAt: string;
  estimatedDelivery: string;
  currentStage: OrderStage;
  stageHistory: {
    stage: OrderStage;
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
  }[];
  trackingNumber?: string;
  courierName?: string;
}
