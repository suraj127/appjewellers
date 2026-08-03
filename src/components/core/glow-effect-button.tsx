import React from 'react';
import { Link } from '@tanstack/react-router';
import { GlowEffect } from '@/components/core/glow-effect';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GlowEffectButtonProps {
  to?: string;
  onClick?: () => void;
  colors?: string[];
  mode?: 'colorShift' | 'rotate' | 'pulse' | 'breathe' | 'static' | 'flow';
  blur?: 'soft' | 'medium' | 'strong' | number;
  duration?: number;
  scale?: number;
  children?: React.ReactNode;
  className?: string;
  buttonClassName?: string;
}

export function GlowEffectButton({
  to,
  onClick,
  colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'],
  mode = 'colorShift',
  blur = 'soft',
  duration = 3,
  scale = 0.9,
  children,
  className,
  buttonClassName,
}: GlowEffectButtonProps) {
  const content = children || (
    <>
      Explore <ArrowRight className="h-4 w-4" />
    </>
  );

  const innerButton = (
    <button
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center justify-center gap-1.5 rounded-md bg-zinc-950 px-3.5 py-2 text-sm text-zinc-50 outline outline-1 outline-[#fff2f21f] transition-transform active:scale-95 cursor-pointer font-medium',
        buttonClassName
      )}
    >
      {content}
    </button>
  );

  return (
    <div className={cn('relative inline-block', className)}>
      <GlowEffect
        colors={colors}
        mode={mode}
        blur={blur}
        duration={duration}
        scale={scale}
      />
      {to ? <Link to={to}>{innerButton}</Link> : innerButton}
    </div>
  );
}
