import React from 'react';
import { cn } from '@/lib/utils';

export interface GlowEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[];
  mode?: 'colorShift' | 'rotate' | 'pulse' | 'breathe' | 'static' | 'flow';
  blur?: 'soft' | 'medium' | 'strong' | number;
  duration?: number;
  scale?: number;
}

export const GlowEffect: React.FC<GlowEffectProps> = ({
  colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'],
  mode = 'colorShift',
  blur = 'soft',
  duration = 3,
  scale = 0.9,
  className,
  style,
  ...props
}) => {
  const getBlurValue = () => {
    if (typeof blur === 'number') return `${blur}px`;
    switch (blur) {
      case 'soft':
        return '16px';
      case 'medium':
        return '32px';
      case 'strong':
        return '48px';
      default:
        return '16px';
    }
  };

  const blurStyle = getBlurValue();
  const colorList = colors.length > 0 ? colors : ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'];
  const gradientColors = [...colorList, colorList[0]].join(', ');

  const getBackgroundStyle = (): React.CSSProperties => {
    if (mode === 'rotate') {
      return {
        backgroundImage: `conic-gradient(from 0deg at 50% 50%, ${colorList.join(', ')}, ${colorList[0]})`,
        animation: `glow-effect-rotate ${duration}s linear infinite`,
      };
    }

    if (mode === 'pulse' || mode === 'breathe') {
      return {
        backgroundImage: `radial-gradient(circle, ${gradientColors})`,
        animation: `glow-effect-pulse ${duration}s ease-in-out infinite`,
      };
    }

    if (mode === 'static') {
      return {
        backgroundImage: `linear-gradient(90deg, ${gradientColors})`,
      };
    }

    // Default 'colorShift' or 'flow'
    return {
      backgroundImage: `linear-gradient(90deg, ${gradientColors})`,
      backgroundSize: '300% 300%',
      animation: `glow-effect-shift ${duration}s ease infinite`,
    };
  };

  return (
    <div
      className={cn(
        'pointer-events-none absolute -inset-1 rounded-[inherit] -z-10 transition-all opacity-85',
        className
      )}
      style={{
        filter: `blur(${blurStyle})`,
        transform: `scale(${scale})`,
        ...getBackgroundStyle(),
        ...style,
      }}
      {...props}
    />
  );
};
