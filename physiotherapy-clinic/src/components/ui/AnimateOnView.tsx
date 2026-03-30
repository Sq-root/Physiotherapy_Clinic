"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

type AnimateOnViewProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  as?: "div" | "section" | "article" | "aside" | "span";
} & Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition">;

const directionMap = {
  up: { y: 20, x: 0 },
  down: { y: -20, x: 0 },
  left: { x: 20, y: 0 },
  right: { x: -20, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Lightweight client boundary for scroll-reveal animations.
 * Use this to wrap static Server Component content that needs entrance animations,
 * avoiding the need to make the entire parent a Client Component.
 */
export function AnimateOnView({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  once = true,
  as = "div",
  ...rest
}: AnimateOnViewProps) {
  const offset = directionMap[direction];
  const Component = motion[as];

  return (
    <Component
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
