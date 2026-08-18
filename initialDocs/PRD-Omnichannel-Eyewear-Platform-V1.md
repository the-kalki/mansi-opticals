# Product Requirements Document (PRD)

# Mansi Opticals — Omnichannel Eyewear, Custom Lens Builder & Clinical Booking Platform

| FIELD | DETAIL |
| :--- | :--- |
| **Client / Project** | Mansi Opticals |
| **Website / Domain** | mansiopticals.com |
| **Proposed Stack** | Next.js 14+ (App Router), TypeScript, Tailwind CSS, Prisma, PostgreSQL, Zustand, Stripe / Razorpay, AWS Textract (OCR) |
| **Version** | 1.0 (Production Blueprint) |
| **Date** | August 2026 |
| **Timeline** | 8 Weeks (End-to-End Delivery) |

---

## 1. Problem Statement

Mansi Opticals operates retail optical boutiques and clinical eye exam centers, alongside an expanding digital direct-to-consumer presence. Currently:

* **Fragmented Customer Journeys**: E-commerce retail is disconnected from physical clinic calendars and optometrist schedules.
* **Prescription Jargon & Friction**: Complex optical parameters (SPH, CYL, AXIS, ADD, PD) intimidate buyers, resulting in high shopping cart abandonment (~68% on lens selection).
* **Manual Lab Bottlenecks**: Prescription verifications and lab manufacturing dispatches are handled manually via spreadsheets and emails, causing delivery delays and high return rates.
* **Contact Lens Retention Leakage**: Customers must manually re-enter prescription specs for every contact lens order, losing recurring subscriptions to big-box retailers.
* **Compliance & Security Gaps**: Handling of optical prescriptions (Protected Health Information / PHI) lacks standardized encryption, audit trails, and HIPAA-compliant data storage.

**Goal**: Build a unified, high-performance omnichannel web application that pairs an intuitive 4-step Lens Customizer with a real-time Clinical Eye Exam Booking engine, automated Prescription OCR validation, recurring Contact Lens Subscriptions, and transparent post-purchase Lab Tracking.

---

## 2. Target Users

| PERSONA | ROLE | PRIMARY NEED |
| :--- | :--- | :--- |
| **Prescription Eyewear Buyer** | End Customer | Browse stylish frames, configure high-index/blue-cut lenses with zero jargon, upload prescription easily, and receive guaranteed optical precision. |
| **Contact Lens Subscriber** | Repeat Customer | Quickly reorder daily/monthly lenses on automated 1, 3, or 6-month cycles with 1-click checkout and automated doctor verification. |
| **Clinical Patient** | Local Clinic Visitor | Find nearest optical store, check optometrist availability, book comprehensive eye exams, and fill out intake forms digitally prior to arrival. |
| **Licensed Optometrist / Lab Tech** | Staff / Clinical Specialist | Verify uploaded prescriptions, flag irregularities (e.g., incompatible high-cylinder with rimless frames), and update lens cutting/assembly stages. |
| **Store & Platform Admin** | Operations & Management | Manage catalog pricing, track booking slots across locations, monitor revenue conversions, and analyze order fulfillment pipelines. |

---

## 3. Solution Summary

A unified, modular web application built on **Next.js 14 App Router** combining a headless e-commerce catalog, an interactive Lens & Prescription Builder, an event-driven appointment scheduling system, and an automated prescription verification queue.

```text
[ Omnichannel Web Application (Next.js 14 + Tailwind CSS) ]
  │
  ├─── [ Catalog & PDP ] ───→ [ 4-Step Custom Lens Builder ] ───→ [ Multi-Item Cart ]
  │                                    │                                  │
  │                           (OCR Upload / Auto-PD)                      │
  │                                    ▼                                  ▼
  │                           [ Encrypted Storage ]              [ Checkout & Gateway ]
  │                                                                       │
  ├─── [ Store Locator ] ───→ [ Real-Time Slot Engine ] ──────────────────┤
  │                                    │                                  │
  │                             (Intake Form)                             ▼
  │                                    ▼                             [ Webhook ]
  │                           [ Booking System ]                          │
  │                                                                       ▼
  └─── [ Post-Purchase ] ◄─── [ Lab Status Engine ] ◄────────── [ Backend (Node/Prisma) ]
                                       │                                  │
                                       ▼                                  ▼
                             [ WhatsApp / SMS / Email ]          [ PostgreSQL Database ]
```

---

## 4. Functional Requirements

### 4.1 Product Catalog & Faceted Search
* **Catalog Coverage**: Eyeglasses (Optical Frames), Sunglasses, Prescription Sunglasses, and Contact Lenses.
* **Faceted Optical Filters**: Frame Shape (Round, Rectangle, Aviator, Cat-Eye), Frame Material (Titanium, Acetate, Metal, TR90), Fit/Size (Narrow, Medium, Wide), Bridge Width, Gender, and Price Range.
* **Live Product Detail Page (PDP)**: High-resolution image gallery, 3D model-viewer / AR webcam try-on trigger, dimension schematics (Lens Width - Bridge - Temple Length), and real-time inventory checks.

### 4.2 Interactive Prescription Engine & Custom Lens Builder (Core Feature)
A 4-step progressive modal/flow invoked from any frame's PDP:

```text
[Step 1: Usage] ──→ [Step 2: Prescription] ──→ [Step 3: PD Value] ──→ [Step 4: Lens & Coating] ──→ [Add to Cart]
```

* **Step 1: Lens Usage Selection**: Single Vision (Distance / Reading), Digital Progressive (Bifocal/Multifocal), Non-Prescription (Blue-Light / Fashion Only).
* **Step 2: Prescription Input**:
  * *Method A (Instant Upload)*: Drag-and-drop JPEG/PNG/PDF of doctor's RX $\rightarrow$ Asynchronous AWS Textract OCR auto-populates SPH/CYL/AXIS values for user review.
  * *Method B (Manual Entry)*: Structured grid for Right Eye (OD) and Left Eye (OS) with validation constraints:
    * Sphere (SPH): $-20.00$ to $+20.00$ in $0.25$ steps.
    * Cylinder (CYL): $-6.00$ to $+6.00$ in $0.25$ steps.
    * Axis: $1^\circ$ to $180^\circ$ (mandatory if CYL $\neq 0$).
    * Add Power (ADD): $+0.75$ to $+3.50$ (for Progressives).
  * *Method C (Send Later)*: Proceed with frame checkout; triggers automated email/SMS reminder with secure upload link.
* **Step 3: Pupillary Distance (PD)**:
  * Single PD ($54\text{mm} - 74\text{mm}$) or Dual Monocular PD (Right $26-37\text{mm}$, Left $26-37\text{mm}$).
  * Integrated **Webcam Auto-PD Scanner** utilizing facial landmark detection with standard card scale calibration.
* **Step 4: Lens Material & Coating Package**:
  * Standard Index (1.50 / 1.56) — Included.
  * Thin High-Index (1.60 / 1.61) — Optimized for moderate prescriptions ($\pm 2.00$ to $\pm 4.00$).
  * Ultra-Thin High-Index (1.67 / 1.74) — Optimized for high prescriptions ($>\pm 4.00$).
  * Coatings: Blue-Shield Digital Protection, Hydrophobic Anti-Reflective, Polarized, Transitions/Photochromic.
* **Dynamic Price Matrix**: Real-time formula computation:
  $$\text{Total Price} = \text{Frame Price} + \text{Lens Usage Price} + \text{Index Surcharge} + \text{Coating Surcharge}$$

### 4.3 Contact Lens Subscription & Reorder Engine
* **Power Matrix Selection**: Separate OD and OS parameters (Power/Sphere, Base Curve, Diameter, Cylinder/Axis for Toric lenses).
* **Recurring Subscription Cadence**: 1 Month, 3 Months, 6 Months, or 12 Months with 15% discount incentive.
* **Express 1-Click Reorder**: Logged-in customers can duplicate previous verified prescriptions with a single click.

### 4.4 Clinical Eye Exam Appointment Booking System
* **Store / Clinic Locator**: Geo-IP lookup and zip-code radius search displaying physical store amenities, address, and live optometrist profiles.
* **Real-time Slot Booking**: Calendar selector showing morning, afternoon, and evening availability per clinic room.
* **Conflict Prevention**: Optimistic database locking to eliminate simultaneous double-booking of doctors/chairs.
* **Digital Patient Intake Form**: Pre-visit questionnaire covering chief visual symptoms, current contact lens brand, medical history (diabetes, hypertension, glaucoma), and vision insurance carrier.

### 4.5 Payment Gateway & Unified Multi-Item Checkout
* **Multi-Item Cart**: Supports mixed payloads in a single transaction (e.g., 1x Prescription Frame + 2x Contact Lens Boxes + 1x In-store Clinic Exam Deposit).
* **Payment Integrations**: Credit/Debit Cards, Apple Pay, Google Pay, Razorpay / Stripe, and direct HSA/FSA card acceptance.
* **Itemized Medical Invoicing**: Automatic generation of compliant optical receipts suitable for out-of-network insurance reimbursement.

### 4.6 Multi-Channel Notification Matrix

| EVENT | ADMIN / OPTOMETRIST GETS | CUSTOMER GETS |
| :--- | :--- | :--- |
| **New Prescription Order** | Prescription document + structured OD/OS data for verification queue | Order confirmation + "Prescription under review by our optical lab" email/SMS |
| **Prescription Approved** | System passes order to Lab Cutting Queue | "Prescription verified! Lenses are now being digitally surfaced" alert |
| **Prescription Rejected / Invalid** | Log reason (e.g., blurry image, expired date) | Urgent notification with 1-click re-upload portal link |
| **Clinic Appointment Booked** | Google Calendar / Store POS sync + patient intake PDF | Instant confirmation + `.ics` calendar invite + WhatsApp reminder 24h prior |
| **Order Dispatched** | Shipping tracking number sync | Tracking link with live lab timeline progression |

### 4.7 Admin & Optical Lab Management Portal
* **Prescription Verification Queue**: Side-by-side view comparing uploaded doctor prescription image against digitized values with "Approve" / "Reject with Reason" triggers.
* **Order Lifecycle State Machine**:
  $$\text{Prescription Received} \longrightarrow \text{Verified by Optometrist} \longrightarrow \text{Lab Surfacing} \longrightarrow \text{Assembly \& QC} \longrightarrow \text{Dispatched}$$
* **Clinic Schedule Manager**: Block doctor vacation days, adjust exam slot durations (e.g., 20 min vs 45 min for complex exams), and view patient intake summaries.

---

## 5. Non-Functional Requirements

| REQUIREMENT | TARGET | IMPLEMENTATION STRATEGY |
| :--- | :--- | :--- |
| **Largest Contentful Paint (LCP)** | $< 1.5\text{s}$ | Next.js Server Components, WebP/AVIF asset optimization, Edge CDN caching. |
| **Interaction to Next Paint (INP)** | $< 150\text{ms}$ | Debounced filter state, offloaded lens calculation via `useMemo`, lightweight hydration. |
| **Cumulative Layout Shift (CLS)** | $< 0.05$ | Explicit image dimensions, skeleton grid placeholders for catalog and booking slots. |
| **System Uptime** | $\ge 99.9\%$ | Multi-region edge deployment via Vercel / AWS. |
| **Data Privacy & Security** | HIPAA / GDPR / PCI-DSS | Encrypted at rest (AES-256 for RX files), HttpOnly secure session cookies, zero card data stored locally. |
| **Mobile Responsiveness** | Flawless on $\ge 320\text{px}$ | Mobile-first touch targets ($\ge 44\text{px}$), sticky bottom CTA for Lens Builder and Booking. |

---

## 6. Success Metrics (KPIs)

| METRIC | TARGET | MEASUREMENT METHOD |
| :--- | :--- | :--- |
| **Lens Customizer Completion Rate** | $\ge 42\%$ | Step 1 initiated $\rightarrow$ Step 4 completed / Cart push ratio |
| **Prescription Verification Turnaround** | $< 4\text{ Hours}$ | Timestamp diff: Order Placed $\rightarrow$ Optometrist Verified |
| **Appointment Booking Completion** | $\ge 65\%$ | Clinic Selected $\rightarrow$ Confirmed Appointment conversion |
| **Cart Abandonment Rate** | $\le 45\%$ | Total checkouts completed vs. carts created |
| **Customer Optical Return Rate** | $< 1.8\%$ | Returns due to lens power / fitting inaccuracies |
| **Recurring Subscription Retention** | $\ge 70\%$ | 6-month active contact lens renewal rate |

---

## 7. Acceptance Criteria (Given-When-Then)

### 7.1 Prescription Customizer & Dynamic Pricing
```gherkin
Scenario: Calculating high-index lens package price
  Given a customer selects a frame priced at $120
  When they select "Digital Progressive" (+$90) and "1.67 Ultra-Thin" (+$60) with "Blue-Shield" (+$30)
  Then the real-time price summary displays "$300" immediately without page reload
  And the "Add to Cart" payload contains the complete nested configuration object.
```

### 7.2 Prescription OCR Upload & Verification
```gherkin
Scenario: Automatic population of prescription parameters via OCR
  Given a customer uploads a clear JPG photo of their doctor's prescription
  When the file upload completes
  Then the system runs OCR analysis, pre-fills the SPH/CYL/AXIS fields within 3 seconds,
  And highlights the extracted values for explicit customer confirmation.
```

### 7.3 Clinical Slot Booking & Double-Booking Prevention
```gherkin
Scenario: Real-time appointment reservation
  Given two customers attempt to select the same 2:00 PM optometrist slot simultaneously
  When Customer A completes the intake form and clicks "Confirm Booking" first
  Then Customer A's slot is locked in PostgreSQL with a confirmed booking reference,
  And Customer B receives an immediate toast alert: "Slot just taken, please select another time."
```

### 7.4 Contact Lens Recurring Subscription
```gherkin
Scenario: Setting up an automated contact lens subscription
  Given a customer configures their left and right eye box parameters
  When they select "Deliver Every 3 Months" and complete checkout
  Then a recurring billing profile is established in the payment gateway,
  And the initial order is scheduled with a follow-up order trigger for 90 days later.
```

---

## 8. Risks & Mitigation

| RISK | IMPACT | MITIGATION STRATEGY |
| :--- | :--- | :--- |
| **Blurry / Invalid RX Uploads** | High (Lab delays, wrong lenses) | Client-side file quality validation + fallback manual entry + instant WhatsApp re-upload prompt. |
| **Doctor Double-Booking During Peak Hours** | High (Patient frustration) | Database-level row locking with a 10-minute temporary reservation hold upon entering intake form. |
| **Complex Prescription Incompatibilities** | Medium (Lenses too thick for frame) | Rule-based engine: If SPH $> -4.00$, automatically disable 1.50 index and recommend 1.67+ with explanatory tooltip. |
| **Third-Party Payment / Webhook Failure** | High (Unrecorded orders) | Idempotent webhook handler with dead-letter retry queue (3 retries with exponential backoff). |
| **PHI / Medical Data Exposure** | Critical (Legal & Compliance) | Prescriptions stored in private S3 buckets accessible only via short-lived signed URLs (15 min expiry). |

---

## 9. Phased Implementation Roadmap

```text
Phase 1: Foundations & Catalog (W1-W2)
  ├── Base Design System & Atomic UI Primitives
  ├── PostgreSQL Schema (Products, Prescriptions, Bookings, Orders)
  └── E-Commerce Catalog (PLP with Faceted Optical Filters, PDP)

Phase 2: Custom Lens Builder & Prescription Engine (W3-W4)
  ├── 4-Step Lens Customizer Modal
  ├── SPH/CYL/AXIS Manual Grid + Client Validation
  ├── AWS Textract OCR Prescription Ingestion
  ├── Auto-PD Scanner & Calculator
  └── Dynamic Price Computation Engine

Phase 3: Clinical Booking & Contact Subscriptions (W5-W6)
  ├── Clinic Locator with Geo-Radius Filtering
  ├── Real-time Optometrist Calendar & Slot Locking
  ├── Digital Patient Intake Questionnaire
  └── Contact Lens Recurring Subscription Engine (Stripe/Razorpay)

Phase 4: Checkout, Lab Tracker & Production Polish (W7-W8)
  ├── Unified Multi-Item Checkout & HSA/FSA Invoicing
  ├── Admin Prescription Verification Queue & Lab State Tracker
  ├── Multi-Channel Notification Triggers (Email, WhatsApp, SMS)
  └── Performance Optimization (Core Web Vitals) & HIPAA Hardening
```

---

## 10. Technical Integration Architecture

| LAYER | TECHNOLOGY | ROLE & RATIONALE |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 14+ (App Router) | Server-Side Rendering (SSR) for search engine indexing of frames and clinical locations; React Server Components for minimal bundle size. |
| **Design System** | Tailwind CSS + Radix UI | Accessible, unstyled primitives (Dialog, Accordion, Popover) styled with customized optical design tokens. |
| **State Management** | Zustand | Lightweight client stores for ephemeral multi-step builder state, shopping cart, and booking sessions without React Context re-render penalties. |
| **Database & ORM** | PostgreSQL + Prisma ORM | Relational integrity for orders, line-item prescription configurations, and slot reservation transactions. |
| **File Storage & OCR** | AWS S3 + AWS Textract | Secure, private medical prescription storage with automated document text recognition for optical parameters. |
| **Payments** | Stripe / Razorpay | PCI-compliant credit card checkout, recurring subscription schedules, and Apple Pay/Google Pay integration. |
| **Notifications** | SendGrid + WhatsApp Business API | Automated transaction receipts, prescription verification status updates, and calendar booking reminders. |

---

## 11. Timeline & Milestone Schedule

```text
┌──────────────┬─────────────────────────────────────────────────────────────┐
│ WEEK         │ DELIVERABLES & CORE MILESTONES                              │
├──────────────┼─────────────────────────────────────────────────────────────┤
│ Week 1       │ Project scaffold, Tailwind tokens, Atomic UI library, DB    │
│              │ schema migrations & seed scripts.                           │
│ Week 2       │ E-Commerce Mega-Menu, PLP with faceted optical filters,     │
│              │ PDP gallery with dimension schematics.                      │
│ Week 3       │ 4-Step Lens Builder UX, SPH/CYL matrix validation, dynamic  │
│              │ pricing computation engine.                                 │
│ Week 4       │ AWS Textract OCR integration, file upload security, and     │
│              │ Webcam Auto-PD detection module.                            │
│ Week 5       │ Store locator map, real-time slot booking engine, and       │
│              │ digital patient intake questionnaire.                       │
│ Week 6       │ Contact lens subscription flow, power selector, and         │
│              │ recurring billing integration.                              │
│ Week 7       │ Unified checkout, payment webhooks, and Admin Prescription  │
│              │ verification / Lab tracking dashboard.                      │
│ Week 8       │ Multi-channel notifications, Core Web Vitals optimization,  │
│              │ end-to-end testing, and production deployment.              │
└──────────────┴─────────────────────────────────────────────────────────────┘
```

---

## 12. Cost & Resource Estimate

| ITEM | SPECIFICATION / TIER | ESTIMATED COST (USD) |
| :--- | :--- | :--- |
| **Full-Stack Engineering** | Architecture, Frontend, Backend & Integrations (8 Weeks) | Internal / Project Scope |
| **Cloud Hosting (Frontend)** | Vercel Pro Tier | $20 / month |
| **Database & Backend** | Supabase Pro / AWS RDS PostgreSQL | $25 – $50 / month |
| **Prescription Storage & OCR** | AWS S3 (Encrypted) + AWS Textract API | ~$15 – $40 / month |
| **Payment Processing** | Stripe / Razorpay Gateway | 2.9% + $0.30 per transaction |
| **Email & SMS Notifications** | SendGrid / Twilio / WhatsApp Business API | ~$30 – $80 / month |
| **Domain & SSL Certificate** | Custom Domain + Wildcard SSL | ~$15 / year |
| **Total Year 1 Infrastructure** | Baseline cloud & communication services | **~$1,200 – $2,500 / year** |

---

## 13. Dependencies & Governance

| DEPENDENCY | REQUIREMENT DEADLINE | OWNER | STATUS |
| :--- | :--- | :--- | :--- |
| **Product & Lens Catalog Assets** | Frame specs, high-res images, pricing matrix | Client Merchandising Team | Required before Week 2 |
| **AWS Account Credentials** | S3 bucket + Textract API access | DevOps / Cloud Admin | Required before Week 4 |
| **Payment Gateway Merchant Account** | Live Stripe / Razorpay API keys & Webhook secret | Client Finance Team | Required before Week 6 |
| **WhatsApp Business API Account** | Verified Meta business phone number & template approval | Client Marketing Team | Required before Week 7 |
| **Clinic Schedule & Doctor Directory** | Store addresses, operating hours, optometrist rosters | Clinical Operations Team | Required before Week 5 |

---

## 14. Out of Scope (Version 1.0)

* In-house custom lab robotic machinery direct hardware telemetry (Phase 2).
* Native iOS / Android mobile applications (PWA provided in v1.0).
* Full electronic health record (EHR) medical billing integration beyond standard itemized invoices.
* Complex multi-currency international customs calculation (Single-region primary launch in v1.0).

---

## 15. Document Status & Approval

* **Document Status**: **Final Draft — Ready for Implementation**
* **Next Steps**:
  1. Stakeholder review & sign-off.
  2. Initiate **Phase 0** scaffold and design token setup in Antigravity IDE.
