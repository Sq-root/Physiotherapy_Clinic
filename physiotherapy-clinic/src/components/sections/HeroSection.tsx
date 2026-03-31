import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { HeroSlideshow } from "./HeroSlideshow";

// Slide keys that map to translation keys
type SlideKey = "sportsRecovery" | "seniorCare" | "painRelief" | "postSurgery";

interface HeroSlide {
  id: number;
  key: SlideKey;
  image: string;
  imagePosition: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    key: "sportsRecovery",
    image: "/services/IMG_0114.webp",
    imagePosition: "object-center",
  },
  {
    id: 2,
    key: "seniorCare",
    image: "/services/senior_care.webp",
    imagePosition: "object-[75%_center] sm:object-center",
  },
  {
    id: 3,
    key: "painRelief",
    image: "/services/Neck_pain.webp",
    imagePosition: "object-right sm:object-center",
  },
  {
    id: 4,
    key: "postSurgery",
    image: "/services/IMG_0124.webp",
    imagePosition: "object-center",
  },
];

export async function HeroSection() {
  const t = await getTranslations("hero");
  const tSupport = await getTranslations("support");
  const locale = await getLocale();
  const isRTL = locale === "ar";

  // Pre-resolve all slide translations for the client island
  const slideData = slides.map((slide) => ({
    id: slide.id,
    key: slide.key,
    image: slide.image,
    imagePosition: slide.imagePosition,
    badge: t(`slides.${slide.key}.badge`),
    title: t(`slides.${slide.key}.title`),
    highlight: t(`slides.${slide.key}.highlight`),
    description: t(`slides.${slide.key}.description`),
  }));

  // First slide for static SSR fallback
  const firstSlide = slideData[0];

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Static First Slide - SSR fallback for instant LCP */}
      <div className="absolute inset-0 z-0">
        <Image
          src={firstSlide.image}
          alt={firstSlide.title}
          fill
          priority
          fetchPriority="high"
          className={`object-cover ${slides[0].imagePosition}`}
        />
        {/* Gradient Overlays */}
        <div
          className={`absolute inset-0 ${isRTL ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-forest/90 via-forest/60 to-transparent`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-forest/30" />
      </div>

      {/* Client Island - handles slide transitions */}
      <HeroSlideshow slides={slideData} isRTL={isRTL} />

      {/* Decorative Elements - Static */}
      <div
        className={`absolute top-20 ${isRTL ? "right-10" : "left-10"} w-32 h-32 border border-white/10 rounded-full pointer-events-none hidden lg:block`}
      />
      <div
        className={`absolute bottom-40 ${isRTL ? "right-20" : "left-20"} w-20 h-20 border border-seafoam/20 rounded-full pointer-events-none hidden lg:block`}
      />

      {/* Stats Row - Static HTML */}
      <div className="absolute bottom-32 md:bottom-40 left-0 right-0 z-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-8 pt-8 border-t border-white/10">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">
                  {siteConfig.social.livesRestored}
                </p>
                <p className="text-white/60 text-xs uppercase tracking-wider">
                  {tSupport("stats.patients")}
                </p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">
                  {siteConfig.social.yearsExperience}
                </p>
                <p className="text-white/60 text-xs uppercase tracking-wider">
                  {tSupport("stats.yearsExperience")}
                </p>
              </div>
              <div className="w-px h-12 bg-white/20 hidden sm:block" />
              <div className="hidden sm:block">
                <p className="text-3xl md:text-4xl font-bold text-white">
                  {siteConfig.social.recoveryRate}
                </p>
                <p className="text-white/60 text-xs uppercase tracking-wider">
                  {tSupport("stats.success")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curved Bottom Edge - Static */}
      <div className="absolute -bottom-1 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-24"
        >
          <path
            d="M0,120 L0,60 Q360,120 720,60 T1440,60 L1440,120 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
