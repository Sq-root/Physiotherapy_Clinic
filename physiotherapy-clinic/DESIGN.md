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

| Role                | Value     | Usage                                       |
| ------------------- | --------- | ------------------------------------------- |
| **Forest (Primary)**| `#002D04` | Headings, icons, primary text, dark cards   |
| **Lime**            | `#C5D86D` | Accent cards, active nav pills, highlights  |
| **Lime Dark**       | `#8DB600` | Script text accent, success indicators      |
| **Lime Light**      | `#d4e38a` | Icon circles on lime backgrounds            |
| **Seafoam**         | `#66A182` | Subtle accents, secondary icons, PATH text  |
| **Sage Background** | `#E8EFE3` | Hero section bg, page backgrounds           |
| **Card Surface**    | `#DCE6D5` | Secondary card backgrounds                  |
| **Dark Section**    | `#2a4a2f` | FAQ section, dark curve backgrounds         |
| **Text Muted**      | `#002D04/50` | Descriptions, helper text (50% opacity)  |
| **Border**          | `#002D04/10` | Card borders (10% opacity)               |

> **Color Mode:** Light  
> **Design Reference:** PHYSEO-inspired wellness palette

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
| **Border Radius**   | `24px` (cards), `full` (pills, icons) |
| **Section Padding** | `80px 0` (desktop)     |
| **Container Width** | `1280px` max-width     |
| **Services Grid**   | 12-column bento grid   |
| **Card Padding**    | `20px – 24px`          |
| **Component Gap**   | `12px – 16px`          |

### 2.4 Card Styles

```css
/* Standard Card (white with border) */
border-radius: 24px;
border: 1px solid rgba(0, 45, 4, 0.1);
background: white;

/* Accent Card (lime) */
border-radius: 24px;
background: #C5D86D;

/* Dark Card (forest with image) */
border-radius: 24px;
background: #2a4a2f;
```

### 2.5 Icon Circles

| Type          | Size    | Background   | Icon Color |
| ------------- | ------- | ------------ | ---------- |
| **Dark**      | 48px    | `#002D04`    | white      |
| **Light Lime**| 56px    | `#d4e38a`    | `#002D04`  |
| **Subtle**    | 40px    | `rgba(0,45,4,0.1)` | `#002D04` |

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
- **Left:** Logo — Leaf icon in sage circle + "VITALITY" with "PATH" below
- **Center:** Navigation links: `Home`, `Services`, `Journey`, `Journal`, `Contact`
- **Active State:** Lime pill background (`#C5D86D`) for current page
- **CTA:** Primary button — **"Book Visit"** (`#002D04` dark green bg, text-white)
- **Behavior:** Transparent at top, floating white card on scroll (rounded-2xl, shadow)
- **Border Radius:** Full rounded pill for active nav item, 2xl for floating container

---

### 4.2 Hero Section — Active Life Design

- **Badge:** "EXPLORE YOUR RECOVERY" — pill with thin border (`#002D04/20`)
- **Headline:** `"Active Life Design"` — "Life" in Great Vibes script (`#8DB600`)
- **Subheadline:** `"Choose a pathway tailored to your body's needs..."`
- **Layout:** Bento grid with 6 cards in asymmetric layout

**Bento Grid Cards:**
| Card | Type | Grid Span | Style |
| ---- | ---- | --------- | ----- |
| Manual Therapy | Image + text | 5 cols, 2 rows | Dark green with image overlay |
| Sports Recovery | Icon + text + image | 3 cols | White with border, image at bottom |
| Pain Mgmt | Icon centered | 4 cols | Lime card (`#C5D86D`) |
| Success Story | Quote | 3 cols | White, testimonial quote |
| Post-Surgical | Image | 4 cols | Lime overlay with image |

---

### 4.3 Therapeutic Deep Dive Section

**Heading:** `"Therapeutic Deep Dive"` — "Deep Dive" in Great Vibes script
**Badge:** "EXPLORE MODALITIES"

**Service Cards:** (3 cards in horizontal layout)
| Service | Category Badge | Description |
| ------- | -------------- | ----------- |
| Active Aging | MOBILITY | Low-impact movement strategies |
| Joint Rejuvenation | MANUAL THERAPY | Advanced mobilization techniques |
| Sports Performance | ATHLETIC RECOVERY | Biomechanics-based training |

**Card Style:**
- Border radius: 24px
- Image at top with rounded corners
- Category badge: Lime pill (`#C5D86D`)
- Title + description below
- "Learn More" link with arrow

**Floating Testimonial Cards:** Between service cards
- Style: White cards with quotes
- Quote marks in lime color
- Patient name and description

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

### 4.9 FAQ / Service Questions Section

**Layout:** Dark curved section with background (`#2a4a2f`)
**Heading:** Left-aligned "Have Questions?" + "Let's answer them."
**CTA:** "View All FAQs" ghost button

**Accordion Style:**
- White background cards
- Rounded corners (16px)
- Active state: Lime left border + subtle lime background tint
- Plus/minus icons for toggle
- Smooth expand animation

**Sample Questions:**
- How long does a typical session last?
- What should I wear to my appointment?
- Will my insurance cover physiotherapy?
- How soon will I see results?
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
