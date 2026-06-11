"use client";

import { 
  Layers, 
  Network, 
  Code2, 
  Globe, 
  BookOpen, 
  Zap, 
  Award, 
  Trophy, 
  Compass,
  LucideProps 
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Layers,
  Network,
  Code2,
  Globe,
  BookOpen,
  Zap,
  Award,
  Trophy,
  Compass,
};

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return <BookOpen {...props} />;
  }

  return <IconComponent {...props} />;
}
