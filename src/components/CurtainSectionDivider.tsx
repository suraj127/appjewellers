import { useEffect, useRef, useState } from "react";
import logoImg from "@/assets/logo.png";
import { CrownIcon } from "./LuxuryIcons";

interface CurtainSectionDividerProps {
  label?: string;
  sublabel?: string;
}

export function CurtainSectionDivider({ label, sublabel }: CurtainSectionDividerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [splitProgress, setSplitProgress] = useState<number>(0);
  const progressRef = useRef<number>(0);
  const targetRef = useRef<number>(0);

  // IntersectionObserver to trigger curtain split when scrolling into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // As user scrolls into section boundary, open the curtain divider
          if (entry.isIntersecting) {
            targetRef.current = 1;
          } else {
            targetRef.current = 0;
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Canvas RAF animation for fluid 3D velvet folds & splitting curtain physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const logoObj = new Image();
    logoObj.src = logoImg;

    const render = () => {
      time += 0.03;

      // Smooth lerp transition for scroll interaction
      progressRef.current += (targetRef.current - progressRef.current) * 0.06;
      const prog = progressRef.current;
      setSplitProgress(prog);

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      // Half width of each curtain panel
      // When prog=0 (closed): halfWidth = width/2
      // When prog=1 (open): halfWidth = width * 0.08 (gathered at screen edges)
      const maxHalf = width / 2;
      const minHalf = width * 0.06;
      const currentHalf = maxHalf - (maxHalf - minHalf) * prog;

      // 1. CENTER GOLD GLOW BEAM (Spills out as curtain opens)
      if (prog > 0.01 && prog < 0.99) {
        const gap = width - currentHalf * 2;
        const alpha = Math.sin(prog * Math.PI) * 0.4;
        const beamGrad = ctx.createLinearGradient(width / 2 - gap / 2, 0, width / 2 + gap / 2, 0);
        beamGrad.addColorStop(0, "rgba(212, 175, 55, 0)");
        beamGrad.addColorStop(0.5, `rgba(255, 215, 0, ${alpha})`);
        beamGrad.addColorStop(1, "rgba(212, 175, 55, 0)");
        ctx.fillStyle = beamGrad;
        ctx.fillRect(width / 2 - gap / 2, 0, gap, height);
      }

      // 2. LEFT VELVET CURTAIN DRAPE
      if (currentHalf > 2) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, currentHalf, height);
        ctx.clip();

        // Base Burgundy Gradient
        const leftGrad = ctx.createLinearGradient(0, 0, currentHalf, 0);
        leftGrad.addColorStop(0, "#1f0305");
        leftGrad.addColorStop(0.5, "#4B0E12");
        leftGrad.addColorStop(1, "#36080b");
        ctx.fillStyle = leftGrad;
        ctx.fillRect(0, 0, currentHalf, height);

        // Sinusoidal Velvet Folds
        const folds = Math.max(5, Math.floor(currentHalf / 20));
        const foldW = currentHalf / folds;
        for (let i = 0; i < folds; i++) {
          const fx = i * foldW;
          const wave = Math.sin(time + i * 0.9) * 3 * (1 - prog * 0.5);

          const fGrad = ctx.createLinearGradient(fx, 0, fx + foldW, 0);
          fGrad.addColorStop(0, "rgba(0,0,0,0.5)");
          fGrad.addColorStop(0.3, "rgba(128,29,36,0.4)");
          fGrad.addColorStop(0.6, "rgba(255,200,200,0.12)"); // Specular shine
          fGrad.addColorStop(1, "rgba(0,0,0,0.5)");

          ctx.fillStyle = fGrad;
          ctx.beginPath();
          ctx.moveTo(fx + wave, 0);
          ctx.lineTo(fx + foldW + wave, 0);
          ctx.lineTo(fx + foldW + wave * 0.8, height);
          ctx.lineTo(fx + wave * 0.8, height);
          ctx.closePath();
          ctx.fill();
        }

        // Gold Trim Border at Inner Edge
        const goldGrad = ctx.createLinearGradient(currentHalf - 6, 0, currentHalf, 0);
        goldGrad.addColorStop(0, "rgba(212, 175, 55, 0)");
        goldGrad.addColorStop(1, "#D4AF37");
        ctx.fillStyle = goldGrad;
        ctx.fillRect(currentHalf - 5, 0, 5, height);

        ctx.restore();
      }

      // 3. RIGHT VELVET CURTAIN DRAPE
      if (currentHalf > 2) {
        const rightX = width - currentHalf;
        ctx.save();
        ctx.beginPath();
        ctx.rect(rightX, 0, currentHalf, height);
        ctx.clip();

        // Base Burgundy Gradient
        const rightGrad = ctx.createLinearGradient(rightX, 0, width, 0);
        rightGrad.addColorStop(0, "#36080b");
        rightGrad.addColorStop(0.5, "#4B0E12");
        rightGrad.addColorStop(1, "#1f0305");
        ctx.fillStyle = rightGrad;
        ctx.fillRect(rightX, 0, currentHalf, height);

        // Sinusoidal Velvet Folds
        const folds = Math.max(5, Math.floor(currentHalf / 20));
        const foldW = currentHalf / folds;
        for (let i = 0; i < folds; i++) {
          const fx = rightX + i * foldW;
          const wave = Math.sin(time + i * 0.9 + 2) * 3 * (1 - prog * 0.5);

          const fGrad = ctx.createLinearGradient(fx, 0, fx + foldW, 0);
          fGrad.addColorStop(0, "rgba(0,0,0,0.5)");
          fGrad.addColorStop(0.4, "rgba(255,200,200,0.12)");
          fGrad.addColorStop(0.7, "rgba(128,29,36,0.4)");
          fGrad.addColorStop(1, "rgba(0,0,0,0.5)");

          ctx.fillStyle = fGrad;
          ctx.beginPath();
          ctx.moveTo(fx + wave, 0);
          ctx.lineTo(fx + foldW + wave, 0);
          ctx.lineTo(fx + foldW + wave * 0.8, height);
          ctx.lineTo(fx + wave * 0.8, height);
          ctx.closePath();
          ctx.fill();
        }

        // Gold Trim Border at Inner Edge
        const goldGrad = ctx.createLinearGradient(rightX, 0, rightX + 6, 0);
        goldGrad.addColorStop(0, "#D4AF37");
        goldGrad.addColorStop(1, "rgba(212, 175, 55, 0)");
        ctx.fillStyle = goldGrad;
        ctx.fillRect(rightX, 0, 5, height);

        ctx.restore();
      }

      // 4. SPLITTING EMBROIDERED BRAND EMBLEM
      if (prog < 0.92 && logoObj.complete && logoObj.naturalWidth > 0) {
        const logoS = Math.min(height * 0.65, 60);
        const logoY = height / 2 - logoS / 2;
        const alpha = Math.max(0, 1 - prog * 1.6);

        ctx.save();
        ctx.globalAlpha = alpha;

        // Left half of logo
        const leftX = currentHalf - logoS / 2;
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, currentHalf, height);
        ctx.clip();
        ctx.drawImage(logoObj, leftX, logoY, logoS, logoS);
        ctx.restore();

        // Right half of logo
        const rightX = (width - currentHalf) - logoS / 2;
        ctx.save();
        ctx.beginPath();
        ctx.rect(width - currentHalf, 0, currentHalf, height);
        ctx.clip();
        ctx.drawImage(logoObj, rightX, logoY, logoS, logoS);
        ctx.restore();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-16 sm:h-24 bg-[#0a0203] border-y border-gold/30 overflow-hidden select-none flex items-center justify-center my-0"
    >
      {/* Dynamic Canvas Velvet Curtain Layer */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 size-full z-10 pointer-events-none"
      />

      {/* Center Section Label & Gold Emblem Badge (Revealed as curtain opens) */}
      <div
        className="relative z-20 flex items-center gap-3 px-4 sm:px-8 py-1.5 rounded-full bg-onyx/90 border border-gold/60 shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-700 backdrop-blur-md"
        style={{
          opacity: Math.min(1, splitProgress * 1.5),
          transform: `scale(${0.85 + splitProgress * 0.15})`,
        }}
      >
        <CrownIcon className="size-3.5 sm:size-4 text-gold shrink-0 animate-pulse" />
        <div className="text-center">
          {label && (
            <span className="font-display text-[0.62rem] sm:text-xs uppercase tracking-[0.3em] text-amber-200 font-bold block leading-tight">
              {label}
            </span>
          )}
          {sublabel && (
            <span className="text-[0.52rem] uppercase tracking-widest text-gold/80 block mt-0.5 font-light">
              {sublabel}
            </span>
          )}
        </div>
        <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-gold to-transparent hidden sm:block" />
      </div>
    </div>
  );
}
