# DESIGN.md — Vitality Path | Physiotherapy Clinic Website

> **Source:** Analyzed from Stitch Project — _"Physiotherapy Clinic Homepage Wireframe"_  
> **Project ID:** `11571950611256660182`  
> **Last Updated:** March 2026

---

## 1. Brand Overview

**Brand Name:** Vitality Path  
**Tagline:** _Begin Your Inner Recovery Journey_  
**Mission:** Embark on a journey of self-discovery and physical healing with expert therapists in a serene, nature-inspired environment.

The brand language is warm, empowering, and organic — blending clinical credibility with a holistic, wellness-first identity.

---

## 2. Design System

### 2.1 Color Palette

| Role              | Value     | Usage                                    |
| ----------------- | --------- | ---------------------------------------- |
| **Primary**       | `#19e65e` | CTAs, highlights, active states, accents |
| **Background**    | `#ffffff` | Page background (light mode)             |
| **Canvas / Sage** | `#e8efe6` | Section backgrounds, bento grid borders  |
| **Text Primary**  | `#0e221c` | Headings, body copy (Forest)             |
| **Text Muted**    | `#6b7280` | Captions, labels, helper text            |
| **Border**        | `#e5e7eb` | Dividers, card borders                   |

> **Color Mode:** Light  
> **Saturation:** `2` (vibrant but not garish)

### 2.2 Typography

| Role           | Font        | Weight   | Size (Desktop) |
| -------------- | ----------- | -------- | -------------- |
| **Display H1** | Lexend      | 700 Bold | `56px – 72px`  |
| **Heading H2** | Lexend      | 600      | `36px – 44px`  |
| **Script**     | Great Vibes | 400      | `72px – 96px`  |
| **Body**       | Lexend      | 400      | `16px`         |
| **Button**     | Lexend      | 700 Bold | `14px – 16px`  |

> **Font Source:** [Google Fonts — Lexend](https://fonts.google.com/specimen/Lexend), [Great Vibes](https://fonts.google.com/specimen/Great+Vibes)  
> **Import:** `next/font/google` configuration in `layout.tsx`

### 2.3 Spacing & Layout

| Property            | Value                  |
| ------------------- | ---------------------- |
| **Border Radius**   | `8px` (global default) |
| **Section Padding** | `80px 0` (desktop)     |
| **Container Width** | `1280px` max-width     |
| **Grid Columns**    | 12-column grid         |
| **Card Padding**    | `24px – 32px`          |
| **Component Gap**   | `16px – 24px`          |

### 2.4 Shadows & Elevation

```css
/* Card Shadow */
box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

/* Hover Elevation */
box-shadow: 0 8px 30px rgba(25, 230, 94, 0.15);

/* Modal/Overlay */
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
```

---

## 3. Page Architecture

The homepage is a single long-scroll page composed of **9 distinct sections**.

```
┌─────────────────────────────────┐
│         Navigation Bar          │
├─────────────────────────────────┤
│           Hero Section          │
├─────────────────────────────────┤
│         Services Section        │
├─────────────────────────────────┤
│      Service Detail (Modal)     │
├─────────────────────────────────┤
│        Journey / Process        │
├─────────────────────────────────┤
│         Stats / Social Proof    │
├─────────────────────────────────┤
│       Blog / Journal Cards      │
├─────────────────────────────────┤
│      Testimonials (Reviews)     │
├─────────────────────────────────┤
│       FAQ / Knowledge Base      │
├─────────────────────────────────┤
│           CTA Banner            │
├─────────────────────────────────┤
│            Footer               │
└─────────────────────────────────┘
```

---

## 4. Section Breakdown

### 4.1 Navigation Bar

- **Layout:** Fixed/sticky top bar, full width
- **Left:** Logo — "Vitality Path" wordmark
- **Center/Right:** Navigation links: `Home`, `Services`, `About`, `Blog`, `Contact`
- **CTA:** Primary button — **"Make An Appointment"** (`#19e65e` background)
- **Behavior:** Transparent on hero, solid white on scroll

---

### 4.2 Hero Section

- **Headline:** `"Begin Your Inner Recovery Journey"`
- **Subheadline:** `"Embark on a journey of self-discovery and physical healing with our expert therapists in a serene, nature-inspired environment."`
- **CTAs:**
  - Primary: **"Make An Appointment"** — filled green button
  - Secondary: **"Explore Services"** — outlined/ghost button
- **Social Proof Chip:** `1,200+ Lives Restored`
- **Did You Know Panel:** Floating factoid card — _"Movement is medicine. Gentle, guided activity can reduce recovery time by up to 30% compared to complete rest."_
- **Visual:** Full-width hero image (nature / serene clinic / therapist)
- **Layout:** Split layout (text left, visual right) or full-bleed with overlay text

---

### 4.3 Services Section

**Heading:** `"Bloom With Our Services"`  
**Subheading:** `"Comprehensive care tailored to your specific stage of life and recovery."`

| Service Tab     | Anchor          |
| --------------- | --------------- |
| Orthopedic Care | `#orthopedic`   |
| Sports Rehab    | `#sports`       |
| Neurological    | `#neurological` |
| Pediatric       | `#pediatric`    |

- **Layout:** Horizontal tab navigation with content panel below
- **Each Service Card Contains:**
  - Icon/Illustration
  - Service Name (H3)
  - Short description
  - "Learn More →" link
- **Hover State:** Card lifts with green glow shadow

---

### 4.4 Service Detail View (Inner Page / Modal)

**Example:** _"Manual Therapy"_

- **Sections within detail:**
  - Everything You Need to Know About [Service]
  - Targeted Relief Areas (body diagram)
  - Service in Action (process steps: Assessment → Mobilization → Tissue Work → Integration)
  - Common Questions (FAQ accordion)
    - _Does the treatment hurt?_
    - _How long does a session last?_
    - _Is this the same as Chiropractic?_
    - _What should I wear?_

---

### 4.5 Patient Journey / Process

**Heading:** `"Your Journey from Pain-to-Peace"`

| Step | Title             | Description                                                                       |
| ---- | ----------------- | --------------------------------------------------------------------------------- |
| 1    | Assessment        | Detailed breakdown of injury history, biomechanics, and personal goals            |
| 2    | Hands-On Therapy  | Targeted manual techniques to reduce pain, improve mobility, and restore function |
| 3    | Progress Tracking | Data-driven milestones to ensure healing on schedule                              |
| 4    | Recovery & Bloom  | Return to full activity with a resilient body and knowledge to stay healthy       |

- **Layout:** Horizontal stepper (desktop) / vertical timeline (mobile)
- **Colors:** Steps use the primary green (`#19e65e`) as indicator/connector

---

### 4.6 Social Proof / Stats Bar

- **Stat:** `1,200+ Lives Restored`
- **Additional Stats:** (Recoveries, Team Therapists, Years Experience — to be defined)
- **Layout:** Horizontal stats strip with large numbers and small labels

---

### 4.9 FAQ / Patient Knowledge Base

**Heading:** `"Patient Knowledge Base"`  
**Subheading:** `"Answers to common questions about your journey to recovery."`

| Question               | State  |
| ---------------------- | ------ |
| Do I need a referral?  | Closed |
| What should I wear?    | Open   |
| How long are sessions? | Closed |

- **Layout:** Accordion component
- **Expanded State:** Answer visible with smooth height animation
- **Icon:** `+` / `−` toggle on right

---

### 4.10 CTA Banner

**Heading:** `"Ready to Bloom?"`  
**CTA:** Primary button — `"Make An Appointment"`

- **Background:** Light green gradient or primary green solid
- **Layout:** Centered text + CTA button

---

## 5. Component Specifications

### 5.1 Buttons

```css
/* Primary Button (Pill) */
.btn-primary {
  background-color: #6da588; /* Seafoam */
  color: #ffffff;
  font-family: var(--font-sans);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 9999px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

/* Secondary Button (Dark Glass) */
.btn-secondary {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  border-radius: 9999px;
}
```

### 5.2 Cards

```css
.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.card:hover {
  box-shadow: 0 8px 30px rgba(25, 230, 94, 0.15);
  transform: translateY(-4px);
}
```

### 5.3 Accordion

```css
.accordion-item {
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 0;
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion-content.open {
  max-height: 300px;
}
```

---

## 6. Responsive Design

| Breakpoint  | Width            | Layout Changes                                  |
| ----------- | ---------------- | ----------------------------------------------- |
| **Mobile**  | `< 768px`        | Single column, stacked sections, hamburger nav  |
| **Tablet**  | `768px – 1024px` | 2 columns for cards, condensed nav              |
| **Desktop** | `> 1024px`       | Full multi-column layout, sticky nav, wide hero |
| **Wide**    | `> 1280px`       | Capped at `1280px` container width              |

---

## 7. Animation Guidelines

| Interaction    | Animation                       | Duration |
| -------------- | ------------------------------- | -------- |
| Page load      | Fade-in sections (staggered)    | `0.4s`   |
| Button hover   | Background darken + subtle lift | `0.2s`   |
| Card hover     | Lift + green shadow             | `0.2s`   |
| Accordion open | Height expand                   | `0.3s`   |
| Image hover    | Scale `1.03`                    | `0.3s`   |
| Scroll reveal  | Fade-up (translate Y + opacity) | `0.5s`   |

---

## 8. Stitch Project Reference

| Detail            | Value                                    |
| ----------------- | ---------------------------------------- |
| **Project Name**  | Physiotherapy Clinic Homepage Wireframe  |
| **Project ID**    | `11571950611256660182`                   |
| **Visibility**    | Public                                   |
| **Device Type**   | Desktop                                  |
| **Font**          | Lexend                                   |
| **Color Mode**    | Light                                    |
| **Primary Color** | `#19e65e`                                |
| **Corner Radius** | `8px`                                    |
| **Total Screens** | 6 main screens (homepage + detail views) |

---

> **Note:** This `DESIGN.md` was auto-generated by analyzing the Stitch wireframe project. It should be treated as the living design source of truth and updated as the project evolves.
