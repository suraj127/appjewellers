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
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);

    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    // Default center-top position for mobile ambient display
    const rect = parent.getBoundingClientRect();
    setPosition({ x: rect.width / 2, y: rect.height / 3 });

    const handleMouseMove = (e: MouseEvent) => {
      const parentRect = parent.getBoundingClientRect();
      const x = e.clientX - parentRect.left;
      const y = e.clientY - parentRect.top;
      setPosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        const parentRect = parent.getBoundingClientRect();
        const x = e.touches[0].clientX - parentRect.left;
        const y = e.touches[0].clientY - parentRect.top;
        setPosition({ x, y });
        setIsHovered(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        const parentRect = parent.getBoundingClientRect();
        const x = e.touches[0].clientX - parentRect.left;
        const y = e.touches[0].clientY - parentRect.top;
        setPosition({ x, y });
        setIsHovered(true);
      }
    };

    const handleTouchEnd = () => {
      setTimeout(() => setIsHovered(false), 1500);
    };

    // Desktop Mouse Listeners
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    // Mobile Touch Listeners
    parent.addEventListener('touchstart', handleTouchStart, { passive: true });
    parent.addEventListener('touchmove', handleTouchMove, { passive: true });
    parent.addEventListener('touchend', handleTouchEnd, { passive: true });
    parent.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);

      parent.removeEventListener('touchstart', handleTouchStart);
      parent.removeEventListener('touchmove', handleTouchMove);
      parent.removeEventListener('touchend', handleTouchEnd);
      parent.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  const duration = springOptions?.duration ?? 0.1;
  const isVisible = isHovered || isTouchDevice;

  return (
    <div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-500 z-10',
        isVisible ? (isHovered ? 'opacity-100' : 'opacity-65') : 'opacity-0',
        className
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size * 2}px`,
        height: `${size * 2}px`,
        backgroundColor: fill,
        transition: `left ${duration}s ease-out, top ${duration}s ease-out, opacity 0.4s ease`,
        ...style,
      }}
      {...props}
    />
  );
};
