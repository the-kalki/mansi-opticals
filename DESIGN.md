---
name: Mansi Opticals - Daylight Clean Glass & Liquid Luxe
version: 1.0.0
colors:
  primary: "#0D9488"
  primary-hover: "#0F766E"
  secondary: "#0F172A"
  tertiary: "#F59E0B"
  accent-cyan: "#06B6D4"
  neutral-bg: "#F8FAFC"
  neutral-surface: "#FFFFFF"
  glass-surface: "rgba(255, 255, 255, 0.85)"
  glass-border: "rgba(226, 232, 240, 0.8)"
  glass-border-hover: "rgba(20, 184, 166, 0.4)"
  text-primary: "#0F172A"
  text-secondary: "#475569"
  text-muted: "#94A3B8"
  dark-bg: "#070B14"
  dark-surface: "#0F172A"
  dark-glass-surface: "rgba(15, 23, 42, 0.75)"
  dark-glass-border: "rgba(255, 255, 255, 0.12)"
  error: "#E11D48"
  success: "#10B981"
typography:
  headline-display:
    fontFamily: Outfit
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
  tabular-data:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: 6px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-glass:
    backgroundColor: "{colors.glass-surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  card-glass:
    backgroundColor: "{colors.glass-surface}"
    rounded: "{rounded.xl}"
    padding: "24px"
---

# Mansi Opticals Design Specification

## Overview
Mansi Opticals is a premium omnichannel optical boutique and clinical eye care platform. The design balances surgical precision (clinical optics, prescription accuracy, doctor scheduling) with high-end luxury retail aesthetics.

## Colors
- **Medical Clarity Teal (`#0D9488`)**: Primary brand driver representing optical precision and health.
- **Midnight Sapphire (`#0F172A`)**: Base secondary for sharp typographic contrast.
- **Champagne Gold (`#F59E0B`)**: High-intent conversion and warranty highlights.
- **Photonic Cyan (`#06B6D4`)**: Digital lens technology and blue-shield indicator.
- **Daylight Frosted Surface (`rgba(255, 255, 255, 0.85)`)**: Glassmorphic layer with `backdrop-blur-xl`.

## Typography
- **Display & Headings**: `Outfit` — modern geometric elegance for luxury frame branding.
- **Body & Controls**: `Plus Jakarta Sans` — warm, accessible, legible UX copy.
- **Prescriptions & Optical Tables**: `Inter` / Monospace numbers — zero-confusion tabular data for SPH, CYL, AXIS, and PD parameters.

## Layout & Spacing
- Container maximum width: `max-w-7xl` with `px-4 sm:px-6 lg:px-8`.
- Floating glass navigation bar with top margin `top-3 inset-x-4 max-w-7xl mx-auto`.
- Generous breathing room between hero, category showcases, and interactive tools.

## Elevation & Depth
- **Glassmorphism**: Frosted glass panels with `backdrop-blur-xl` and 1px translucent borders (`border-slate-200/80` in light mode, `border-white/10` in dark mode).
- **Ambient Lighting**: Subtle radial gradient mesh in background (`bg-mesh-light` and `bg-mesh-dark`).
- **Elevation**: Multi-layer shadows (`shadow-[0_8px_30px_rgb(0,0,0,0.04)]` in light mode; `shadow-[0_8px_32px_0_rgba(0,0,0,0.45)]` in dark mode).

## Shapes
- Rounded cards (`rounded-2xl` to `rounded-3xl`), pill tags (`rounded-full`), smooth 12px buttons (`rounded-xl`).

## Components
- **Floating Glass Nav**: Sticky pill navbar with mega-menu dropdowns, real-time cart badge, and theme switcher.
- **4-Step Lens Builder**: Focused full-screen glass modal with sticky dynamic price computation bar.
- **Prescription Matrix Grid**: Tabular OD/OS inputs with step validation and tooltip explanations.
- **Clinic Slot Calendar**: Date carousel with morning/afternoon/evening availability chips.

## Do's and Don'ts
- **DO** use Lucide SVG icons exclusively (no emoji icons in UI).
- **DO** ensure all clickable elements have `cursor-pointer` and smooth 200ms transitions.
- **DO** maintain strict 4.5:1 text contrast on frosted glass panels.
- **DON'T** use purple or generic bootstrap colors.
- **DON'T** allow horizontal scroll on mobile viewports.
