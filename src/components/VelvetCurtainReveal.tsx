import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import logoImg from "@/assets/logo.png";

/* ═══════════════════════════════════════════════════════════════════
   VelvetCurtainReveal — Hyper-realistic Canvas velvet curtain
   that covers children (jewellery gallery) and opens on scroll.
   
   Physics model:
   • 24 vertical fabric folds with multi-frequency sinusoidal waves
   • Per-fold specular highlight + deep shadow (velvet anisotropy)
   • Continuous breeze via 4 layered sine waves at different speeds
   • Scroll-triggered opening with cloth gather deformation
   • Embroidered gold brand logo that splits with the curtain
   ═══════════════════════════════════════════════════════════════════ */

// ── Colour palette ──────────────────────────────────────────────
const VELVET_BASE = [75, 14, 18] as const;      // #4B0E12 deep burgundy
const VELVET_DARK = [38, 6, 9] as const;         // shadow in fold valleys
const VELVET_LIGHT = [120, 28, 35] as const;     // specular highlight on fold crests
const VELVET_SHEEN = [155, 50, 58] as const;     // bright velvet sheen
const GOLD = [212, 175, 55] as const;            // #D4AF37 gold trim
const GOLD_GLOW = [255, 215, 80] as const;       // warm golden light spill

// ── Fabric physics constants ────────────────────────────────────
const FOLD_COUNT = 28;           // number of vertical folds
const BREEZE_LAYERS = 5;        // sine wave layers for breeze
const GATHER_FOLDS = 8;         // extra compressed folds when gathered

interface Props {
  children: ReactNode;
}

export function VelvetCurtainReveal({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(0); // 0 = closed, 1 = fully open
  const openProgressRef = useRef(0);
  const tightenRef = useRef(0); // tightening phase 0→1
  const timeRef = useRef(0);
  const isMobileRef = useRef(false);

  // ── Load brand logo for embroidery ──────────────────────────
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = logoImg;
    img.onload = () => { logoImgRef.current = img; };
  }, []);

  // ── Detect mobile ───────────────────────────────────────────
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
    const handler = () => { isMobileRef.current = window.innerWidth < 768; };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // ── Scroll trigger ──────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [revealed]);

  // ── Easing helpers ──────────────────────────────────────────
  const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // ── Draw a single vertical fabric fold ──────────────────────
  const drawFold = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      width: number,
      height: number,
      phase: number,
      amplitude: number,
      time: number,
      isMobile: boolean,
    ) => {
      const segments = isMobile ? 40 : 80;
      const segH = height / segments;

      for (let s = 0; s < segments; s++) {
        const y = s * segH;
        const t = s / segments;

        // ── Multi-frequency wave displacement ─────────────
        const breezeCount = isMobile ? 3 : BREEZE_LAYERS;
        let waveX = 0;
        for (let b = 0; b < breezeCount; b++) {
          const freq = 1.5 + b * 0.7;
          const speed = 0.3 + b * 0.15;
          const amp = amplitude * (1 / (1 + b * 0.6));
          waveX += Math.sin(t * Math.PI * freq + phase + time * speed + b * 1.7) * amp;
        }

        // ── Gravity drape: more sway at bottom ───────────
        const gravityFactor = 0.4 + t * 0.6;
        waveX *= gravityFactor;

        // ── Fold curvature for 3D appearance ──────────────
        const foldCurve = Math.sin((x / width) * Math.PI * 2 + phase * 0.3) * 0.5 + 0.5;

        // ── Colour: interpolate between shadow and highlight ─
        const lightFactor = (Math.sin(t * Math.PI * 3.5 + phase + time * 0.2) * 0.5 + 0.5) * foldCurve;
        const sheenFactor = Math.pow(lightFactor, 3); // sharp specular

        const r = VELVET_DARK[0] + (VELVET_LIGHT[0] - VELVET_DARK[0]) * lightFactor + (VELVET_SHEEN[0] - VELVET_LIGHT[0]) * sheenFactor;
        const g = VELVET_DARK[1] + (VELVET_LIGHT[1] - VELVET_DARK[1]) * lightFactor + (VELVET_SHEEN[1] - VELVET_LIGHT[1]) * sheenFactor;
        const b2 = VELVET_DARK[2] + (VELVET_LIGHT[2] - VELVET_DARK[2]) * lightFactor + (VELVET_SHEEN[2] - VELVET_LIGHT[2]) * sheenFactor;

        // ── Vertical stripe variation (fold depth) ────────
        const stripeShadow = Math.sin((x + waveX) * 0.08 + phase) * 0.15;

        ctx.fillStyle = `rgb(${Math.max(0, r - r * stripeShadow)}, ${Math.max(0, g - g * stripeShadow)}, ${Math.max(0, b2 - b2 * stripeShadow)})`;
        ctx.fillRect(x + waveX - 1, y, width + 2, segH + 1);
      }
    },
    [],
  );

  // ── Draw gold thread stitch line ────────────────────────────
  const drawGoldStitch = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, height: number, time: number) => {
      ctx.save();
      ctx.strokeStyle = `rgba(${GOLD[0]}, ${GOLD[1]}, ${GOLD[2]}, 0.35)`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      for (let y = 0; y < height; y += 3) {
        const wave = Math.sin(y * 0.02 + time * 0.3) * 1.5;
        ctx.lineTo(x + wave, y);
      }
      ctx.stroke();
      ctx.restore();
    },
    [],
  );

  // ── Draw embroidered logo ───────────────────────────────────
  const drawEmbroideredLogo = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      centerX: number,
      centerY: number,
      size: number,
      openAmount: number,
      time: number,
    ) => {
      const logo = logoImgRef.current;
      if (!logo) return;

      const splitDistance = openAmount * size * 2;
      const breathe = Math.sin(time * 0.5) * 2;

      ctx.save();

      // Left half of logo
      ctx.save();
      ctx.beginPath();
      ctx.rect(centerX - size - splitDistance, centerY - size + breathe, size, size * 2);
      ctx.clip();
      ctx.globalAlpha = 0.7 - openAmount * 0.5;
      // Gold tint filter via composite
      ctx.drawImage(logo, centerX - size - splitDistance, centerY - size + breathe, size * 2, size * 2);
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = `rgba(${GOLD[0]}, ${GOLD[1]}, ${GOLD[2]}, 0.45)`;
      ctx.fillRect(centerX - size - splitDistance, centerY - size + breathe, size, size * 2);
      ctx.restore();

      // Right half of logo
      ctx.save();
      ctx.beginPath();
      ctx.rect(centerX + splitDistance, centerY - size + breathe, size, size * 2);
      ctx.clip();
      ctx.globalAlpha = 0.7 - openAmount * 0.5;
      ctx.drawImage(logo, centerX - size + splitDistance, centerY - size + breathe, size * 2, size * 2);
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = `rgba(${GOLD[0]}, ${GOLD[1]}, ${GOLD[2]}, 0.45)`;
      ctx.fillRect(centerX + splitDistance, centerY - size + breathe, size, size * 2);
      ctx.restore();

      // Gold thread border ring around logo position
      if (openAmount < 0.8) {
        ctx.globalAlpha = (1 - openAmount) * 0.4;
        ctx.strokeStyle = `rgb(${GOLD[0]}, ${GOLD[1]}, ${GOLD[2]})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        // Left arc
        ctx.arc(centerX - splitDistance, centerY + breathe, size * 0.9, Math.PI * 0.5, Math.PI * 1.5);
        ctx.stroke();
        // Right arc
        ctx.beginPath();
        ctx.arc(centerX + splitDistance, centerY + breathe, size * 0.9, -Math.PI * 0.5, Math.PI * 0.5);
        ctx.stroke();
      }

      ctx.restore();
    },
    [],
  );

  // ── Main render loop ────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let running = true;
    let openStartTime: number | null = null;
    const TIGHTEN_DURATION = 400;  // ms
    const OPEN_DURATION = 1800;    // ms — slow, heavy cloth feel

    const render = (timestamp: number) => {
      if (!running) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = rect.width;
      const h = rect.height;

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const isMobile = isMobileRef.current;
      const dt = 1 / 60;
      timeRef.current += dt;
      const time = timeRef.current;

      // ── Opening animation state ─────────────────────────
      let openProgress = openProgressRef.current;
      if (revealed) {
        if (openStartTime === null) openStartTime = timestamp;
        const elapsed = timestamp - openStartTime;

        if (elapsed < TIGHTEN_DURATION) {
          // Tightening phase
          tightenRef.current = elapsed / TIGHTEN_DURATION;
        } else {
          tightenRef.current = 1;
          const openElapsed = elapsed - TIGHTEN_DURATION;
          openProgress = Math.min(openElapsed / OPEN_DURATION, 1);
          openProgressRef.current = openProgress;
        }
      }

      const easedOpen = easeOutExpo(openProgress);
      setCurtainOpen(easedOpen);

      const tighten = tightenRef.current;
      const foldCount = isMobile ? 18 : FOLD_COUNT;
      const foldWidth = w / foldCount;

      // ── Golden light spill from center gap ──────────────
      if (easedOpen > 0.02) {
        const gapW = easedOpen * w * 0.5;
        const gradient = ctx.createRadialGradient(
          w / 2, h / 2, 0,
          w / 2, h / 2, gapW * 1.5,
        );
        gradient.addColorStop(0, `rgba(${GOLD_GLOW[0]}, ${GOLD_GLOW[1]}, ${GOLD_GLOW[2]}, ${0.25 * Math.min(easedOpen * 3, 1)})`);
        gradient.addColorStop(0.5, `rgba(${GOLD_GLOW[0]}, ${GOLD_GLOW[1]}, ${GOLD_GLOW[2]}, ${0.08 * Math.min(easedOpen * 3, 1)})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      // ── Draw left curtain panel ─────────────────────────
      const leftEdge = -easedOpen * w * 0.42;
      const rightEdge = w + easedOpen * w * 0.42;
      const gatherCompression = easedOpen * 0.6; // folds compress as curtain opens

      for (let i = 0; i < foldCount; i++) {
        const rawX = i * foldWidth;
        const centerDist = Math.abs(rawX + foldWidth / 2 - w / 2) / (w / 2);

        // LEFT PANEL: folds that are on the left side of center
        if (rawX + foldWidth / 2 < w / 2) {
          const pushLeft = easedOpen * (1 - centerDist) * w * 0.45;
          const gatherX = rawX - pushLeft + (gatherCompression * foldWidth * (foldCount / 2 - i) * 0.15);
          const actualX = Math.max(leftEdge, gatherX);

          // Tightening: compress amplitude briefly
          const tightenAmp = tighten < 1 ? (1 - tighten * 0.3) : 1;
          // Opening: increase fold amplitude as fabric gathers
          const gatherAmp = 1 + easedOpen * 2.5;
          const amplitude = foldWidth * 0.12 * tightenAmp * gatherAmp;

          const phase = i * 0.8 + Math.sin(i * 0.3) * 0.5;
          drawFold(ctx, actualX, foldWidth * (1 - gatherCompression * 0.3), h, phase, amplitude, time, isMobile);

          // Gold stitch between folds
          if (i % 3 === 0 && easedOpen < 0.7) {
            drawGoldStitch(ctx, actualX + foldWidth * 0.5, h, time);
          }
        }

        // RIGHT PANEL: folds that are on the right side of center
        if (rawX + foldWidth / 2 >= w / 2) {
          const pushRight = easedOpen * (1 - centerDist) * w * 0.45;
          const gatherX = rawX + pushRight - (gatherCompression * foldWidth * (i - foldCount / 2) * 0.15);
          const actualX = Math.min(rightEdge, gatherX);

          const tightenAmp = tighten < 1 ? (1 - tighten * 0.3) : 1;
          const gatherAmp = 1 + easedOpen * 2.5;
          const amplitude = foldWidth * 0.12 * tightenAmp * gatherAmp;

          const phase = i * 0.8 + Math.sin(i * 0.3) * 0.5 + Math.PI;
          drawFold(ctx, actualX, foldWidth * (1 - gatherCompression * 0.3), h, phase, amplitude, time, isMobile);

          if (i % 3 === 0 && easedOpen < 0.7) {
            drawGoldStitch(ctx, actualX + foldWidth * 0.5, h, time);
          }
        }
      }

      // ── Gold trim along top edge ────────────────────────
      const trimGradient = ctx.createLinearGradient(0, 0, 0, 6);
      trimGradient.addColorStop(0, `rgba(${GOLD[0]}, ${GOLD[1]}, ${GOLD[2]}, 0.8)`);
      trimGradient.addColorStop(1, `rgba(${GOLD[0]}, ${GOLD[1]}, ${GOLD[2]}, 0.1)`);
      ctx.fillStyle = trimGradient;
      // Left panel trim
      ctx.fillRect(leftEdge, 0, w / 2 - easedOpen * w * 0.45 - leftEdge, 4);
      // Right panel trim
      ctx.fillRect(w / 2 + easedOpen * w * 0.45, 0, rightEdge - (w / 2 + easedOpen * w * 0.45), 4);

      // ── Gold trim along bottom ──────────────────────────
      const btmGradient = ctx.createLinearGradient(0, h - 8, 0, h);
      btmGradient.addColorStop(0, `rgba(${GOLD[0]}, ${GOLD[1]}, ${GOLD[2]}, 0.15)`);
      btmGradient.addColorStop(1, `rgba(${GOLD[0]}, ${GOLD[1]}, ${GOLD[2]}, 0.7)`);
      ctx.fillStyle = btmGradient;
      ctx.fillRect(leftEdge, h - 5, w / 2 - easedOpen * w * 0.45 - leftEdge, 5);
      ctx.fillRect(w / 2 + easedOpen * w * 0.45, h - 5, rightEdge - (w / 2 + easedOpen * w * 0.45), 5);

      // ── Tassel fringe along bottom ──────────────────────
      if (!isMobile) {
        ctx.save();
        ctx.strokeStyle = `rgba(${GOLD[0]}, ${GOLD[1]}, ${GOLD[2]}, 0.3)`;
        ctx.lineWidth = 1;
        const tasselSpacing = 8;
        // Left panel tassels
        for (let tx = leftEdge; tx < w / 2 - easedOpen * w * 0.45; tx += tasselSpacing) {
          const swing = Math.sin(tx * 0.05 + time * 1.2) * 3;
          ctx.beginPath();
          ctx.moveTo(tx, h - 3);
          ctx.quadraticCurveTo(tx + swing * 0.5, h + 6, tx + swing, h + 12);
          ctx.stroke();
        }
        // Right panel tassels
        for (let tx = w / 2 + easedOpen * w * 0.45; tx < rightEdge; tx += tasselSpacing) {
          const swing = Math.sin(tx * 0.05 + time * 1.2 + Math.PI) * 3;
          ctx.beginPath();
          ctx.moveTo(tx, h - 3);
          ctx.quadraticCurveTo(tx + swing * 0.5, h + 6, tx + swing, h + 12);
          ctx.stroke();
        }
        ctx.restore();
      }

      // ── Embroidered brand logo at center ────────────────
      const logoSize = isMobile ? 28 : 44;
      drawEmbroideredLogo(ctx, w / 2, h * 0.42, logoSize, easedOpen, time);

      // ── Top rod / pelmet bar ────────────────────────────
      const rodGrad = ctx.createLinearGradient(0, 0, 0, 8);
      rodGrad.addColorStop(0, `rgba(${GOLD[0]}, ${GOLD[1]}, ${GOLD[2]}, 0.6)`);
      rodGrad.addColorStop(0.5, `rgba(180, 150, 40, 0.9)`);
      rodGrad.addColorStop(1, `rgba(${GOLD[0]}, ${GOLD[1]}, ${GOLD[2]}, 0.5)`);
      ctx.fillStyle = rodGrad;
      ctx.fillRect(0, 0, w, 3);

      // ── Subtle vignette overlay on curtain panels ───────
      if (easedOpen < 0.95) {
        const vigLeft = ctx.createLinearGradient(0, 0, w * 0.15, 0);
        vigLeft.addColorStop(0, "rgba(0,0,0,0.4)");
        vigLeft.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = vigLeft;
        ctx.fillRect(0, 0, w * 0.15, h);

        const vigRight = ctx.createLinearGradient(w * 0.85, 0, w, 0);
        vigRight.addColorStop(0, "rgba(0,0,0,0)");
        vigRight.addColorStop(1, "rgba(0,0,0,0.4)");
        ctx.fillStyle = vigRight;
        ctx.fillRect(w * 0.85, 0, w * 0.15, h);
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, [revealed, drawFold, drawGoldStitch, drawEmbroideredLogo, easeOutExpo]);

  // ── Card reveal animation class ─────────────────────────────
  const cardRevealStyle = curtainOpen > 0.3
    ? "curtain-cards-revealed"
    : "curtain-cards-hidden";

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Jewellery gallery content behind curtain */}
      <div className={`relative z-0 ${cardRevealStyle}`}>
        {children}
      </div>

      {/* Canvas curtain overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          opacity: curtainOpen >= 0.98 ? 0 : 1,
          transition: "opacity 0.8s ease-out",
        }}
      />

      {/* Inline styles for card reveal animation */}
      <style>{`
        .curtain-cards-hidden > div > div {
          opacity: 0;
          transform: translateY(30px) scale(0.94) rotate(1.5deg);
        }
        .curtain-cards-revealed > div > div {
          opacity: 1;
          transform: translateY(0) scale(1) rotate(0deg);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .curtain-cards-revealed > div > div:nth-child(1) { transition-delay: 0ms; }
        .curtain-cards-revealed > div > div:nth-child(2) { transition-delay: 120ms; }
        .curtain-cards-revealed > div > div:nth-child(3) { transition-delay: 240ms; }
        .curtain-cards-revealed > div > div:nth-child(4) { transition-delay: 360ms; }
        .curtain-cards-revealed > div > div:nth-child(5) { transition-delay: 480ms; }
        .curtain-cards-revealed > div > div:nth-child(6) { transition-delay: 600ms; }
      `}</style>
    </div>
  );
}
