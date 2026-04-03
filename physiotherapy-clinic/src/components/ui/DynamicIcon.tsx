/**
 * DynamicIcon
 *
 * A static, tree-shakeable icon renderer that maps icon name strings
 * (stored in services.ts) to exact lucide-react components.
 * Only icons actually used are included to keep the bundle lean.
 */

import React from "react";
import type { LucideProps } from "lucide-react";
import {
  Bone,
  Zap,
  PersonStanding,
  Target,
  MoveVertical,
  Footprints,
  RefreshCw,
  CircleDot,
  Stethoscope,
  Syringe,
  Bandage,
  Brain,
  ShieldCheck,
  Trophy,
  HeartPulse,
  Baby,
  Users,
  Sparkles,
  Monitor,
  ScanLine,
  Dumbbell,
  Wrench,
  Microscope,
  Star,
} from "lucide-react";

const iconMap: Record<string, React.FC<LucideProps>> = {
  Bone,
  Zap,
  PersonStanding,
  Target,
  MoveVertical,
  Footprints,
  RefreshCw,
  CircleDot,
  Stethoscope,
  Syringe,
  BandageIcon: Bandage,
  Bandage,
  Brain,
  ShieldCheck,
  Trophy,
  HeartPulse,
  Baby,
  Users,
  Sparkles,
  Monitor,
  ScanLine,
  Dumbbell,
  Wrench,
  Microscope,
  Star,
};

type DynamicIconProps = LucideProps & {
  name: string;
};

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}
