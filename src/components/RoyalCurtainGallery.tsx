import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { PRODUCTS, Product } from "@/data/products";
import logoImg from "@/assets/logo.png";
import { SparklesIcon } from "./LuxuryIcons";

interface RoyalCurtainGalleryProps {
  items?: Product[];
}

export function RoyalCurtainGallery({ items }: RoyalCurtainGalleryProps) {
  const exclusiveItems = items || PRODUCTS.filter((p) => p.isExclusive).slice(0, 4);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 0 = Fully Closed, 1 = Fully Opened (Gathered at sides)
  const [openProgress, setOpenProgress] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const openProgressRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);

  // Track scroll position to auto-trigger curtain reveal at 70% viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            targetProgressRef.current = 1;
            setIsRevealed(true);
          }
        });
      },
      { threshold: 0.35 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth RAF Animation loop for Curtain Physics & Fabric Wave motion
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Load embroidered logo image for center curtain emblem
    const logoObj = new Image();
    logoObj.src = logoImg;

    const render = () => {
      time += 0.035;

      // Smooth lerp for curtain movement with inertia
      openProgressRef.current += (targetProgressRef.current - openProgressRef.current) * 0.05;
      const prog = openProgressRef.current;
      setOpenProgress(prog);

      // Handle Canvas DPI / Resize
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      // Width of curtain drape on each side
      // Closed: width / 2. Open: gathered into 12% on left and 12% on right.
      const maxHalfWidth = width / 2;
      const minHalfWidth = width * 0.12;
      const currentHalfWidth = maxHalfWidth - (maxHalfWidth - minHalfWidth) * prog;

      // =========================================================
      // 1. CENTER GOLDEN LIGHT BEAM (Spills out as curtain opens)
      // =========================================================
      if (prog > 0.02 && prog < 0.98) {
        const gapWidth = (width - currentHalfWidth * 2);
        const beamAlpha = Math.sin(prog * Math.PI) * 0.45;
        const beamGrad = ctx.createLinearGradient(width / 2 - gapWidth / 2, 0, width / 2 + gapWidth / 2, 0);
        beamGrad.addColorStop(0, "rgba(212, 175, 55, 0)");
        beamGrad.addColorStop(0.5, `rgba(255, 223, 100, ${beamAlpha})`);
        beamGrad.addColorStop(1, "rgba(212, 175, 55, 0)");

        ctx.fillStyle = beamGrad;
        ctx.fillRect(width / 2 - gapWidth / 2, 0, gapWidth, height);
      }

      // =========================================================
      // 2. DRAW LEFT VELVET CURTAIN DRAPE
      // =========================================================
      if (currentHalfWidth > 2) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, currentHalfWidth, height);
        ctx.clip();

        // Base Burgundy Background
        const leftBaseGrad = ctx.createLinearGradient(0, 0, currentHalfWidth, 0);
        leftBaseGrad.addColorStop(0, "#260407");
        leftBaseGrad.addColorStop(0.5, "#4B0E12");
        leftBaseGrad.addColorStop(1, "#36080b");
        ctx.fillStyle = leftBaseGrad;
        ctx.fillRect(0, 0, currentHalfWidth, height);

        // Vertical Velvet Folds (Sinusoidal 3D Drape Shading & Wave Motion)
        const foldCount = Math.max(6, Math.floor(currentHalfWidth / 22));
        const foldWidth = currentHalfWidth / foldCount;

        for (let i = 0; i < foldCount; i++) {
          const fx = i * foldWidth;
          const wave = Math.sin(time + i * 0.8) * 4 * (1 - prog * 0.5);

          // Alternating Highlight & Shadow Folds
          const foldGrad = ctx.createLinearGradient(fx, 0, fx + foldWidth, 0);
          foldGrad.addColorStop(0, "rgba(0,0,0,0.5)");
          foldGrad.addColorStop(0.3, "rgba(128,29,36,0.5)");
          foldGrad.addColorStop(0.6, "rgba(255,180,180,0.15)"); // Specular velvet sheen
          foldGrad.addColorStop(1, "rgba(0,0,0,0.6)");

          ctx.fillStyle = foldGrad;
          ctx.beginPath();
          ctx.moveTo(fx + wave, 0);
          ctx.lineTo(fx + foldWidth + wave, 0);
          ctx.lineTo(fx + foldWidth + wave * 0.8, height);
          ctx.lineTo(fx + wave * 0.8, height);
          ctx.closePath();
          ctx.fill();
        }

        // Gold Trim / Fringe on Inner Edge
        const innerX = currentHalfWidth;
        const goldTrimGrad = ctx.createLinearGradient(innerX - 8, 0, innerX, 0);
        goldTrimGrad.addColorStop(0, "rgba(212, 175, 55, 0)");
        goldTrimGrad.addColorStop(1, "#D4AF37");
        ctx.fillStyle = goldTrimGrad;
        ctx.fillRect(innerX - 6, 0, 6, height);

        // Decorative Gold Tassel Accents along curtain edge
        ctx.strokeStyle = "#FCD34D";
        ctx.lineWidth = 1.5;
        for (let y = 30; y < height; y += 45) {
          ctx.beginPath();
          ctx.arc(innerX - 3, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = "#D4AF37";
          ctx.fill();
          ctx.stroke();
        }

        ctx.restore();
      }

      // =========================================================
      // 3. DRAW RIGHT VELVET CURTAIN DRAPE
      // =========================================================
      if (currentHalfWidth > 2) {
        const rightX = width - currentHalfWidth;
        ctx.save();
        ctx.beginPath();
        ctx.rect(rightX, 0, currentHalfWidth, height);
        ctx.clip();

        // Base Burgundy Background
        const rightBaseGrad = ctx.createLinearGradient(rightX, 0, width, 0);
        rightBaseGrad.addColorStop(0, "#36080b");
        rightBaseGrad.addColorStop(0.5, "#4B0E12");
        rightBaseGrad.addColorStop(1, "#260407");
        ctx.fillStyle = rightBaseGrad;
        ctx.fillRect(rightX, 0, currentHalfWidth, height);

        // Vertical Velvet Folds
        const foldCount = Math.max(6, Math.floor(currentHalfWidth / 22));
        const foldWidth = currentHalfWidth / foldCount;

        for (let i = 0; i < foldCount; i++) {
          const fx = rightX + i * foldWidth;
          const wave = Math.sin(time + i * 0.8 + 2) * 4 * (1 - prog * 0.5);

          const foldGrad = ctx.createLinearGradient(fx, 0, fx + foldWidth, 0);
          foldGrad.addColorStop(0, "rgba(0,0,0,0.6)");
          foldGrad.addColorStop(0.4, "rgba(255,180,180,0.15)");
          foldGrad.addColorStop(0.7, "rgba(128,29,36,0.5)");
          foldGrad.addColorStop(1, "rgba(0,0,0,0.5)");

          ctx.fillStyle = foldGrad;
          ctx.beginPath();
          ctx.moveTo(fx + wave, 0);
          ctx.lineTo(fx + foldWidth + wave, 0);
          ctx.lineTo(fx + foldWidth + wave * 0.8, height);
          ctx.lineTo(fx + wave * 0.8, height);
          ctx.closePath();
          ctx.fill();
        }

        // Gold Trim / Fringe on Inner Edge
        const innerX = rightX;
        const goldTrimGrad = ctx.createLinearGradient(innerX, 0, innerX + 8, 0);
        goldTrimGrad.addColorStop(0, "#D4AF37");
        goldTrimGrad.addColorStop(1, "rgba(212, 175, 55, 0)");
        ctx.fillStyle = goldTrimGrad;
        ctx.fillRect(innerX, 0, 6, height);

        // Decorative Gold Tassel Accents along curtain edge
        ctx.strokeStyle = "#FCD34D";
        ctx.lineWidth = 1.5;
        for (let y = 30; y < height; y += 45) {
          ctx.beginPath();
          ctx.arc(innerX + 3, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = "#D4AF37";
          ctx.fill();
          ctx.stroke();
        }

        ctx.restore();
      }

      // =========================================================
      // 4. EMBROIDERED GOLD LOGO (Splits symmetrically with curtains)
      // =========================================================
      if (prog < 0.95 && logoObj.complete && logoObj.naturalWidth > 0) {
        const logoSize = Math.min(width * 0.22, 140);
        const logoY = height / 2 - logoSize / 2;
        const logoAlpha = Math.max(0, 1 - prog * 1.5);

        ctx.save();
        ctx.globalAlpha = logoAlpha;

        // Draw Gold Glow behind Embroidered Emblem
        const logoGlow = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, logoSize);
        logoGlow.addColorStop(0, "rgba(255, 215, 0, 0.4)");
        logoGlow.addColorStop(1, "rgba(255, 215, 0, 0)");
        ctx.fillStyle = logoGlow;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, logoSize, 0, Math.PI * 2);
        ctx.fill();

        // Left Half of Embroidered Logo (moves left with left curtain)
        const leftLogoX = (currentHalfWidth) - logoSize / 2;
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, currentHalfWidth, height);
        ctx.clip();
        ctx.drawImage(logoObj, leftLogoX, logoY, logoSize, logoSize);
        ctx.restore();

        // Right Half of Embroidered Logo (moves right with right curtain)
        const rightLogoX = (width - currentHalfWidth) - logoSize / 2;
        ctx.save();
        ctx.beginPath();
        ctx.rect(width - currentHalfWidth, 0, currentHalfWidth, height);
        ctx.clip();
        ctx.drawImage(logoObj, rightLogoX, logoY, logoSize, logoSize);
        ctx.restore();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleToggleCurtain = () => {
    if (targetProgressRef.current > 0.5) {
      targetProgressRef.current = 0;
      setIsRevealed(false);
    } else {
      targetProgressRef.current = 1;
      setIsRevealed(true);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full my-8 sm:my-16 select-none">
      {/* THEATRE GALLERY CONTAINER */}
      <div className="relative w-full rounded-2xl border-2 border-gold/40 bg-[#0d0204] shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* TOP DECORATIVE GOLD VALANCE ARCH */}
        <div className="relative z-30 w-full h-8 sm:h-12 bg-gradient-to-r from-[#210406] via-[#4a0810] to-[#210406] border-b-2 border-gold/70 flex items-center justify-between px-4 sm:px-8 shadow-md">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[0.55rem] sm:text-xs uppercase tracking-[0.25em] text-gold font-bold">
              Atelier Unveiling Stage
            </span>
          </div>
          <button
            type="button"
            onClick={handleToggleCurtain}
            className="shine-sweep flex items-center gap-1.5 rounded-full bg-gold/15 border border-gold/60 px-3 py-1 text-[0.58rem] sm:text-xs uppercase tracking-widest text-gold font-bold hover:bg-gold hover:text-primary-foreground transition-all cursor-pointer"
          >
            <SparklesIcon className="size-3" />
            {openProgress > 0.5 ? "Close Velvet Curtain" : "Unveil Collection"}
          </button>
        </div>

        {/* GALLERY STAGE CONTENT (REVEALED BEHIND CURTAIN) */}
        <div className="relative z-10 p-4 sm:p-10 min-h-[460px] sm:min-h-[580px] flex items-center justify-center">
          
          {/* Ambient Spotlight Glow on Stage Floor */}
          <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 via-gold/10 to-onyx pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] sm:size-[750px] bg-gradient-to-r from-amber-500/15 via-gold/20 to-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* 4 JEWELLERY CARDS GRID */}
          <div className="grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-4 w-full max-w-7xl relative z-20">
            {exclusiveItems.map((item, idx) => {
              // Calculate Staggered Card Reveal Animation
              // Order: 1. Left necklace, 2. Diamond necklace, 3. Temple necklace, 4. Bangles
              const revealDelay = idx * 140; // 140ms delay per card
              const cardVisible = openProgress > 0.25;

              return (
                <div
                  key={item.slug}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="transition-all duration-700 ease-out"
                  style={{
                    opacity: cardVisible ? 1 : 0,
                    transform: cardVisible
                      ? hoveredCard === idx
                        ? "translateY(-10px) scale(1.04) rotate(0deg)"
                        : "translateY(0px) scale(1) rotate(0deg)"
                      : `translateY(35px) scale(0.92) rotate(${idx % 2 === 0 ? -2 : 2}deg)`,
                    transitionDelay: cardVisible ? `${revealDelay}ms` : "0ms",
                  }}
                >
                  <Link
                    to="/piece/$slug"
                    params={{ slug: item.slug }}
                    className="shine-sweep group relative block h-[19rem] sm:h-[29rem] overflow-hidden rounded-xl border border-gold/40 bg-onyx/95 shadow-xl transition-all duration-500 hover:border-gold hover:shadow-[0_15px_40px_rgba(212,175,55,0.45)]"
                  >
                    {/* Item Image with Smooth Hover Scale */}
                    <div className="relative size-full overflow-hidden select-none">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0203] via-[#0a0203]/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
                    </div>

                    {/* Top Exclusive Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="rounded bg-gold/20 border border-gold/60 px-2 py-0.5 text-[0.52rem] uppercase tracking-widest text-gold font-bold backdrop-blur-md">
                        Royal Atelier
                      </span>
                    </div>

                    {/* Bottom Info Card */}
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6 text-center z-10">
                      <p className="text-[0.52rem] sm:text-[0.6rem] uppercase tracking-[0.25em] text-gold font-semibold truncate">
                        {item.category}
                      </p>
                      <h3 className="mt-1 font-display text-xs sm:text-xl font-bold text-amber-100 leading-tight line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-gold/15 border border-gold/40 px-3 py-1 text-[0.6rem] uppercase tracking-wider text-gold font-bold group-hover:bg-gold group-hover:text-primary-foreground transition-all shadow">
                        Price On Request →
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* VELVET CURTAIN CANVAS OVERLAY */}
        <canvas
          ref={canvasRef}
          onClick={handleToggleCurtain}
          aria-label="Interactive Velvet Curtain Unveiling"
          className="absolute inset-0 z-20 size-full cursor-pointer pointer-events-auto"
          style={{
            pointerEvents: openProgress > 0.92 ? "none" : "auto",
          }}
        />

        {/* BOTTOM INSTRUCTION HELPER BADGE */}
        {!isRevealed && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-bounce">
            <div className="rounded-full bg-black/90 border border-gold/80 px-5 py-2 text-[0.62rem] uppercase tracking-[0.25em] text-gold font-bold shadow-2xl backdrop-blur-md flex items-center gap-2">
              <SparklesIcon className="size-3.5 text-gold" />
              Scroll down or tap to open velvet curtain
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
