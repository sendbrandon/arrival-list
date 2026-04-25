"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const ensurePlay = () => {
      if (video.paused) {
        video.play().catch(() => {
          /* ignore — autoplay may be blocked */
        });
      }
    };

    ensurePlay();

    const onVisibility = () => {
      if (!document.hidden) ensurePlay();
    };

    video.addEventListener("pause", ensurePlay);
    video.addEventListener("ended", ensurePlay);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      video.removeEventListener("pause", ensurePlay);
      video.removeEventListener("ended", ensurePlay);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero__video"
      src="/hero.mp4"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
    />
  );
}
