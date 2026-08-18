# 👓 Mansi Opticals — Omnichannel Eyewear & Clinical Optometry Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Design System](https://img.shields.io/badge/Design-Liquid%20Glass%20%26%20Daylight-0D9488)](DESIGN.md)

**Mansi Opticals** is a next-generation omnichannel optical platform engineered for precision prescription eyeglasses, luxury titanium & Italian acetate frames, recurring contact lens subscriptions, and clinical eye exam bookings with certified optometrists.

---

## ✨ Key Platform Features

- 💎 **Liquid Glass & Daylight Frosted Design System**:
  - Light mode frosted glass panels (`backdrop-blur-xl bg-white/85`) with medical clarity teal (`#0D9488`), laser optical cyan (`#06B6D4`), and champagne gold accents (`#F59E0B`).
  - Dark liquid glass toggleable theme.
- 🔬 **Interactive 4-Step Custom Lens Builder**:
  - **Step 1 (Usage)**: Single Vision, Digital Progressive Multifocal, Non-Prescription Blue-Shield.
  - **Step 2 (Prescription)**: Instant AI OCR extraction simulation & manual SPH/CYL/AXIS/ADD parameter grid.
  - **Step 3 (Pupillary Distance)**: Single/Dual PD calculation with webcam facial landmark scanner.
  - **Step 4 (Refractive Index & Coatings)**: 1.50 to 1.74 ultra-thin high-index materials with live mathematical surcharge formulas.
- 🩺 **Clinical Eye Exam Booking Engine**:
  - Multi-clinic store locator across Bengaluru (Indiranagar, Koramangala, Whitefield).
  - Licensed optometrist selection, real-time slot calendar, digital patient intake questionnaire, and **₹500 Frame Credit Voucher (`EYECARE500`)**.
- 📦 **Contact Lens Subscription & Reorder Engine**:
  - OD/OS power matrix selector with automated **15% recurring discount** on 1/3/6/12-month cadences.
- 💳 **Multi-Item Cart & Unified Checkout**:
  - Mixed cart checkout for frames, lenses, contact lens boxes, and clinic deposits.
  - Simulated UPI / QR (GPay, PhonePe, Paytm), Cards, NetBanking, and HSA/FSA tax-free payments with 12% Indian Medical GST itemized invoices.
- 📊 **5-Stage Live Optical Lab Telemetry Tracker**:
  - Step-by-step lifecycle tracking: *Prescription Ingested → Optometrist Verified → Digital Lab Surfacing → Assembly & QC → Dispatched*.
- 👨‍⚕️ **Optometrist & Lab Prescription Verification Queue**:
  - Staff portal with side-by-side doctor prescription document comparison vs digitized OCR data with Approve/Reject actions.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router)
- **UI & Styling**: React 18, Tailwind CSS, Lucide Icons, Framer Motion, Canvas Confetti
- **State Management**: Zustand (Cart, Lens Customizer Builder, Booking, Theme)
- **Currency & Localization**: Indian Rupees (`INR / ₹`) with `en-IN` locale formatting
- **Design Tokens**: [DESIGN.md](DESIGN.md)

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone git@github.com:the-kalki/mansi-opticals.git
cd mansi-opticals
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```
├── initialDocs/              # Architectural specs, PRD, and functional logic
├── DESIGN.md                 # Single source of truth design tokens & rationale
├── src/
│   ├── app/
│   │   ├── page.tsx          # Flagship Homepage & Trust Pillars
│   │   ├── shop/             # Faceted Optical Catalog & PDPs
│   │   ├── book/             # Clinical Eye Exam Booking System
│   │   ├── contact-lenses/   # Contact Lens Recurring Subscriptions
│   │   ├── checkout/         # Unified Checkout & Medical Invoice
│   │   ├── orders/[id]/track # 5-Stage Optical Lab Telemetry Tracker
│   │   └── admin/prescriptions # Optometrist Staff Verification Queue
│   ├── components/
│   │   ├── builder/          # 4-Step Custom Lens Customizer Modal
│   │   ├── cart/             # Slide-Out Cart Drawer
│   │   ├── layout/           # Header Navbar & Conversion Footer
│   │   ├── providers/        # Theme & Toast Feedback Providers
│   │   └── ui/               # GlassCard, Button, Badge, Input, Modal, Stepper
│   ├── lib/
│   │   ├── data/             # Mock Luxury Eyewear Catalog & Clinics
│   │   └── utils.ts          # Styling and INR currency formatters
│   ├── store/                # Zustand Cart, Lens Builder, Booking Stores
│   └── types/                # Core TypeScript Domain Models
```

---

## 📄 License
MIT © 2026 Mansi Opticals. All Rights Reserved.
