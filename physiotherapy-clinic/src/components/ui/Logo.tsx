import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface LogoProps {
  /**
   * Whether to use dark styling (better for light backgrounds)
   */
  useDarkStyle?: boolean;
  /**
   * Additional classes for the container
   */
  className?: string;
  /**
   * Whether to show the site name
   */
  showName?: boolean;
  /**
   * Optional URL to link to. Defaults to home page.
   * Pass null or empty string to disable link.
   */
  href?: string | null;
  /**
   * Size of the logo icon container
   */
  size?: "sm" | "md" | "lg";
  /**
   * Whether to split the name into two lines (as seen in Footer)
   */
  splitName?: boolean;
}

export function Logo({
  useDarkStyle = false,
  className,
  showName = true,
  href = "/",
  size = "md",
  splitName = false,
}: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textClasses = {
    sm: "text-lg",
    md: "text-[22px]",
    lg: "text-2xl",
  };

  const nameParts = siteConfig.name.split(" ");
  const firstName = nameParts[0];
  const otherNames = nameParts.slice(1).join(" ");

  const content = (
    <div className={cn("flex items-center gap-2.5 group", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full transition-all duration-300 overflow-hidden shrink-0",
          sizeClasses[size],
          useDarkStyle
            ? "bg-white border border-[#002D04]/10 shadow-sm"
            : "bg-white/95 border-2 border-white/80 shadow-md",
        )}
      >
        <Image
          src="/logo/Dr_isha_Logo.png"
          alt="Company Logo"
          width={size === "sm" ? 64 : size === "md" ? 80 : 96}
          height={size === "sm" ? 64 : size === "md" ? 80 : 96}
          className="object-contain w-[75%] h-[75%]"
        />
      </div>
      {showName && (
        <div className="flex flex-col justify-center">
          {splitName ? (
            <>
              <span
                className={cn(
                  "font-bold tracking-tight uppercase leading-none transition-colors duration-300",
                  size === "sm" ? "text-base" : "text-lg",
                  useDarkStyle ? "text-forest" : "text-white",
                )}
              >
                {firstName}
              </span>
              <span
                className={cn(
                  "font-bold tracking-[0.2em] uppercase leading-none mt-1 transition-colors duration-300",
                  size === "sm" ? "text-[8px]" : "text-[10px]",
                  useDarkStyle ? "text-forest/80" : "text-seafoam",
                )}
              >
                {otherNames}
              </span>
            </>
          ) : (
            <span
              className={cn(
                "font-medium tracking-tight leading-none whitespace-nowrap transition-colors duration-300",
                textClasses[size],
                useDarkStyle ? "text-forest" : "text-white",
              )}
            >
              {siteConfig.name}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block relative z-10">
        {content}
      </Link>
    );
  }

  return content;
}
