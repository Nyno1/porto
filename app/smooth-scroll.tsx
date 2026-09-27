"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const LERP = 0.15;
    const THRESHOLD = 0.3;

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let rafId: number;
    let isRunning = false;
    let lastTime = 0;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 40;
      if (e.deltaMode === 2) delta *= 800;
      targetY = Math.max(
        0,
        Math.min(targetY + delta, document.body.scrollHeight - window.innerHeight)
      );
      if (!isRunning) startLoop();
    };

    const startLoop = () => {
      isRunning = true;
      const loop = (timestamp: number) => {
        // Delta time cap at 32ms to avoid big jumps on tab switch
        const dt = Math.min(timestamp - lastTime, 32);
        lastTime = timestamp;

        // Scale lerp by delta time for consistent speed regardless of fps
        const lerpFactor = 1 - Math.pow(1 - LERP, dt / 16.67);
        const diff = targetY - currentY;

        if (Math.abs(diff) < THRESHOLD) {
          currentY = targetY;
          window.scrollTo(0, currentY);
          isRunning = false;
          return;
        }

        currentY += diff * lerpFactor;
        window.scrollTo(0, currentY);
        rafId = requestAnimationFrame(loop);
      };
      lastTime = performance.now();
      rafId = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      if (!isRunning) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}