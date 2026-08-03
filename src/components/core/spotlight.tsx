import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: number;
  springOptions?: {
    bounce?: number;
    duration?: number;
  };
  fill?: string;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  className = 'bg-zinc-700 blur-2xl',
  size = 64,
  springOptions,
  fill,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const duration = springOptions?.duration ?? 0.1;

  return (
    <div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 z-10',
        isHovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size * 2}px`,
        height: `${size * 2}px`,
        backgroundColor: fill,
        transition: `left ${duration}s ease-out, top ${duration}s ease-out, opacity 0.3s ease`,
        ...style,
      }}
      {...props}
    />
  );
};
