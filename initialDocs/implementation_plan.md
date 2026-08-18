# Mansi Opticals — Omnichannel Eyewear Platform Implementation Blueprint

Provides an exhaustive, strictly decoupled, phased roadmap for executing the full-stack web application inside Antigravity IDE. This blueprint ensures zero-ambiguity in file structures, state management, and exit criteria.

## User Review Required
> [!IMPORTANT]
> Please review the proposed phase breakdown, technology stack (Next.js App Router, Tailwind, Prisma, Zustand, Zod), and module boundaries.
> **Action:** Once approved, we will begin execution with Phase 0.

## Open Questions
> [!WARNING]
> - Do you have a preferred database provider (e.g., Supabase, Vercel Postgres, local PostgreSQL) for Phase 1? -> use supabase for now.
> - For Phase 5, should we integrate a specific mock payment gateway (like Stripe test mode) or build a purely custom simulation? -> use mock razorpay for now.

## Proposed Changes (Phased Roadmap)

---

### Phase 0: Environment Setup & Design System Foundations

**Objective**: Establish the core repository, strict typing environment, and atomic design system.

#### Folder Structure & Key Files:
```text
/
├── .env.example
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── src/
    ├── app/
    │   ├── layout.tsx
    │   └── globals.css
    ├── components/
    │   └── ui/ (Button.tsx, Input.tsx, Modal.tsx, Stepper.tsx, Badge.tsx, FileUploadZone.tsx, CalendarPicker.tsx)
    ├── lib/
    │   └── utils.ts
    └── providers/
        ├── ThemeProvider.tsx
        ├── ToastProvider.tsx
        └── StoreProvider.tsx
```

#### State Management Boundaries:
- `Zustand` slices initialized for: `useCartStore`, `usePrescriptionStore`, `useBookingStore`.

#### Phase 0 Exit Gate (Acceptance Criteria):
- [ ] Clean build test (`npm run build`).
- [ ] Zero TypeScript (`tsc --noEmit`) and ESLint errors.
- [ ] Atomic UI components render correctly in an isolation page or Storybook.

---

### Phase 1: Database Architecture, Backend Schemas & Data Layer

**Objective**: Define persistent storage, data types, and server-side validation.

#### Folder Structure & Key Files:
```text
/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── src/
    ├── lib/
    │   └── schemas/
    │       ├── product.schema.ts
    │       ├── prescription.schema.ts
    │       ├── booking.schema.ts
    │       └── order.schema.ts
    └── server/
        ├── db.ts
        └── actions/
            ├── product.actions.ts
            └── booking.actions.ts
```

#### API Contracts (Zod):
- `PrescriptionInputSchema`: Requires SPH (-20.00 to +20.00), CYL, AXIS (0-180), ADD, and PD.
- `BookingSlotSchema`: Clinic ID, start time, end time, patient ID.

#### Phase 1 Exit Gate:
- [ ] Prisma schema migrations successfully applied to the database.
- [ ] Seed script populates frames, lenses, and 30 days of clinic slots.
- [ ] Server actions return strongly-typed Zod-validated payloads.

---

### Phase 2: Core E-Commerce Catalog & Navigation

**Objective**: Build the shopping front-end with instant faceted filtering.

#### Folder Structure & Key Files:
```text
/src/
└── app/
    ├── (shop)/
    │   ├── page.tsx (Home)
    │   ├── products/
    │   │   ├── page.tsx (PLP)
    │   │   └── [slug]/
    │   │       └── page.tsx (PDP)
    └── components/
        ├── shop/
        │   ├── MegaMenu.tsx
        │   ├── FilterSidebar.tsx
        │   ├── ProductGrid.tsx
        │   ├── ProductCard.tsx
        │   └── ProductGallery.tsx (3D viewer stub)
```

#### State Management Boundaries:
- URL Search Parameters (`?shape=round&color=black`) act as the single source of truth for PLP filters to ensure SSR compatibility.

#### Phase 2 Exit Gate:
- [ ] Functional catalog browsing with SSR routing.
- [ ] Instant client-side filtering updating the URL without full page reloads.
- [ ] Dynamic PDP rendering correct dimensions and inventory status.

---

### Phase 3: Interactive Prescription Engine & Custom Lens Builder

**Objective**: The core feature. A foolproof, multi-step lens and prescription customizer.

#### Folder Structure & Key Files:
```text
/src/
└── app/
    └── (shop)/products/[slug]/build/
        ├── page.tsx
        └── components/
            ├── LensBuilderLayout.tsx
            ├── Step1_Usage.tsx
            ├── Step2_Prescription.tsx
            ├── Step3_PDMeasurement.tsx
            ├── Step4_Coatings.tsx
            └── PriceMatrixSummary.tsx
```

#### State Management Boundaries:
- `useBuilderStore` manages the ephemeral state of the 4 steps. Computes `finalPrice` dynamically by reacting to `framePrice + lensTypePrice + coatingPrice`.

#### Phase 3 Exit Gate:
- [ ] Complete payload validation on step transitions (cannot skip steps).
- [ ] Dynamic price calculation reflects accurately on every click.
- [ ] "Add to Cart" pushes the complex object (Frame + Lens + RX) to `useCartStore`.

---

### Phase 4: Clinical Eye Exam Appointment System

**Objective**: A location-aware, real-time booking engine.

#### Folder Structure & Key Files:
```text
/src/
└── app/
    └── book/
        ├── page.tsx
        └── components/
            ├── ClinicLocatorMap.tsx
            ├── SlotCalendarGrid.tsx
            └── PatientIntakeForm.tsx
```

#### State Management Boundaries:
- `useBookingStore` tracks `selectedClinic`, `selectedDate`, `selectedSlot`, and `intakeData`.

#### Phase 4 Exit Gate:
- [ ] Geo-distance logic successfully filters nearest clinics.
- [ ] End-to-end booking flow prevents double-booking (optimistic locking).
- [ ] Mock SMS/Email dispatch triggers upon successful database insert.

---

### Phase 5: Checkout, Order Lifecycle & Prescription Verification

**Objective**: Unified transaction processing and post-purchase patient tracking.

#### Folder Structure & Key Files:
```text
/src/
└── app/
    ├── checkout/
    │   ├── page.tsx
    │   └── components/ (CheckoutForm.tsx, CartSummary.tsx)
    └── account/
        └── orders/
            ├── [orderId]/page.tsx
            └── components/ (LabStatusTracker.tsx)
```

#### State Management Boundaries:
- Cart clears upon successful transaction. Order ID routes to the tracking dashboard displaying states: *Verification -> Lab Cutting -> Assembly -> Dispatched*.

#### Phase 5 Exit Gate:
- [ ] Unified checkout handles physical frames and digital appointments simultaneously.
- [ ] Successful transaction stores relational data across `Order`, `OrderItem`, and `Prescription`.
- [ ] Lab Status Dashboard correctly visualizes the order's current phase.

---

### Phase 6: Edge-Case Handling, Performance & Production Hardening

**Objective**: Final polish, error boundaries, and Web Vitals optimization.

#### Focus Areas:
- **Error Boundaries**: Wrap `LensBuilder` and `Checkout` to catch runtime crashes gracefully.
- **Image Optimization**: Enforce Next.js `<Image>` for WebP conversion of all frame assets.
- **SEO**: Inject dynamic `generateMetadata` for PDP and PLP pages with Schema.org JSON-LD.

#### Antigravity Execution Sequence Guide (For AI):
To execute this blueprint cleanly, the AI should be prompted sequentially:
1. "Execute Phase 0: Scaffold Next.js and UI components." (Wait for success)
2. "Execute Phase 1: Setup Prisma and schemas." (Wait for success)
3. "Execute Phase 2..." etc.

## Verification Plan

### Automated Checks
- **Type Safety**: `tsc --noEmit` must pass cleanly between every phase.
- **Linting**: ESLint strict rules must be satisfied.
- **Build**: `next build` must succeed before closing a phase.

### Manual / Integration Testing
- **Builder Flow**: Test the Lens Builder with an extreme prescription (e.g., CYL -4.00) to ensure validation catches incompatible high-index rules.
- **Booking Flow**: Attempt to book the same slot simultaneously in two browser tabs to test concurrency locks.
