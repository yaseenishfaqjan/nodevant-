"use client";
import { useEffect, useRef } from "react";

/**
 * Lightweight animated dot-grid for the hero background.
 * Pure canvas, no deps, respects prefers-reduced-motion.
 */
export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let width = 0;
    let height = 0;

    const dots: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    const init = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      dots.length = 0;
      const count = Math.min(70, Math.floor((width * height) / 18000));
      for (let i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.6 + 0.4,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > width) d.vx *= -1;
        if (d.y < 0 || d.y > height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,212,255,0.5)";
        ctx.fill();
        // connect nearby
        for (let j = i + 1; j < dots.length; j++) {
          const o = dots[j];
          const dx = d.x - o.x;
          const dy = d.y - o.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(0,212,255,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    init();
    if (reduce) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
    }

    const onResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      init();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
    />
  );
}
