# 🌿 Vitality Path | Physiotherapy Clinic Website

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-blue?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-purple?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> **Vitality Path** is a premium, nature-inspired digital platform for Dr. Isha Shah's physiotherapy practice. Designed with a holistic wellness-first approach, the site provides a seamless journey from clinical discovery to appointment booking.

---

## 🏗️ Architecture & Tech Stack

As the technical lead, I've architected this project using modern industry standards to ensure scalability, robust performance, and an exceptional Developer Experience (DX).

### Core Technologies
- **Framework**: [Next.js 15](https://nextjs.org) utilizing the **App Router** for intuitive file-system based routing, advanced server-side rendering (SSR), and React Server Components (RSC).
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) configured for a utility-first, highly maintainable design system that maps directly to our brand guidelines.
- **Backend-as-a-Service**: [Supabase](https://supabase.com) handling real-time data persistence, secure appointment management, and environment variable integration.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) powering complex orchestrations, layout transitions, and scroll-triggered reveals for a premium feel.
- **Language**: **TypeScript** ensuring end-to-end type safety, from database schemas to UI component props.
- **Icons & Typography**: [Lucide React](https://lucide.dev) for scalable SVG iconography and `next/font` for optimized loading of the Lexend and Great Vibes fonts.

---

## ✨ Key Features & Technical Highlights

- **🚀 Performance Optimized Next.js**: Utilizing Next.js 15's advanced caching mechanisms and built-in image optimization (`next/image`) for lightning-fast payload delivery.
- **🍱 Intelligent Bento-Grid Hero**: A modern, asymmetric hero section built with CSS Grid and orchestrated entrance animations that tells a visual story of recovery.
- **📅 Smart Booking System**: A comprehensive appointment flow featuring client-side validation, integrated error handling, and secure POST requests to our Supabase backend via Next.js Route Handlers (`/api/appointments`).
- **🎨 Centralized Premium Design System**: Detailed in `DESIGN.md`, the UI relies on a refined, organic color palette (Forest Green, Lime, Seafoam) enforced globally via Tailwind's theme configuration.
- **📱 Fluid Responsiveness**: Meticulously crafted layouts ensuring parity across Mobile, Tablet, and Desktop breakpoints without relying on excessive media queries.
- **🗺️ Single Source of Truth Configuration**: Global site data (contact info, multi-page navigation, social links) is managed exclusively via the constant in `src/config/site.ts`.

---

## 📁 Project Structure

Our repository follows a highly organized, domain-driven structure:

```text
physiotherapy-clinic/
├── public/              # Static assets (logos, custom svgs, manifest)
├── src/
│   ├── app/             # Next.js App Router: pages, layouts, API routes
│   │   ├── api/         # Next.js Route Handlers (e.g., Supabase endpoints)
│   │   ├── (routes)/    # Page components (about, contact, faq, services)
│   │   └── layout.tsx   # Global HTML shell and font definitions
│   ├── components/      # Reusable React Components
│   │   ├── layout/      # Global layout shells (Navbar, Footer)
│   │   ├── sections/    # Large scale page blocks (Hero, Services, Appointment)
│   │   └── ui/          # Low-level primitives (Buttons, Accordions, Inputs)
│   ├── config/          # Centralized site settings (siteConfig.ts)
│   └── lib/             # Core business logic and utilities
│       ├── data/        # Static mock data arrays (FAQs, Testimonials)
│       └── supabase/    # Supabase client initialization & generated types
├── supabase/            # Database schema exports (`schema.sql`)
├── DESIGN.md            # Extensive brand rules & component specifications
└── README.md            # Project documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: Version 20.x or higher
- **Package Manager**: npm, yarn, or pnpm

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd physiotherapy-clinic
npm install
```

### 3. Environment Variables
Create a local `.env` file in the project directory root. You will need your Supabase project credentials:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Initialization
Navigate to your Supabase project dashboard's SQL Editor and execute the schema provided in `/supabase/schema.sql` to generate the required tables (e.g., `appointments`).

### 5. Running the Development Server
Fire up the local environment:
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) in your browser. The application supports Hot Module Replacement (HMR) for instant feedback during development.

---

## 🛠️ Global Configuration Management

To streamline updates, all core business data is centralized. If you need to update the clinic's phone number, changing it in `src/config/site.ts` will instantly update the Navbar CTA, Footer links, and Contact Page information globally.

```typescript
// Location: src/config/site.ts
export const siteConfig = {
    name: 'Dr. Isha Shah',
    tagline: 'Begin Your Inner Recovery Journey',
    nav: [
        { label: 'Home', href: '/' },
        // Add new top-level pages here
    ],
    contact: {
        phone: '+971 50 412 0369',
        email: 'drishashah95@gmail.com',
        // Update physical location here
    }
}
```

---

## 👩‍💻 Development Guidelines & Contributing

As a team, we maintain high standards for code quality. Before submitting a Pull Request, please ensure the following:

1. **Type Checking**: Ensure there are no TypeScript errors.
   ```bash
   npx tsc --noEmit
   ```
2. **Linting**: We enforce strict ESLint rules (configured in `eslint.config.mjs`).
   ```bash
   npm run lint
   ```
3. **Component Architecture**: Keep components small and focused. Place single-use section logic in `components/sections/` and reusable generic elements in `components/ui/`.
4. **Tailwind Usage**: Avoid generic hex codes in classes (e.g., `bg-[#66A182]`); use defined theme variables like `bg-seafoam`.

---

## 📜 License & Copyright

Created with ❤️ by the Vitality Path Development Team. All rights reserved. 
Internal distribution and modification only.
