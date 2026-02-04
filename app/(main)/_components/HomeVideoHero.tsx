"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface HomeVideoHeroProps {
  videoSrc?: string;
  posterSrc?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  overlayOpacity?: number;
}

export default function HomeVideoHero({
  videoSrc = "/video/furniture-video.mp4",
  posterSrc,
  title = "Elevate Your Living Space",
  subtitle = "Discover handcrafted furniture that combines timeless elegance with modern comfort",
  ctaText = "Explore Collection",
  ctaHref = "/categories",
  overlayOpacity = 0,
}: HomeVideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches && videoRef.current) {
        videoRef.current.pause();
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Autoplay prevented:", error);
      }
    };

    if (video.readyState >= 3) {
      playVideo();
    }
  }, [isVideoLoaded, prefersReducedMotion]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="relative w-full aspect-video max-h-[80vh] overflow-hidden bg-gray-900"
      aria-label="Hero section with video background"
    >
      {/* Video Background */}
      {!hasError && !prefersReducedMotion && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
            isVideoLoaded ? "opacity-100" : "opacity-0",
          )}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          onLoadedData={() => setIsVideoLoaded(true)}
          onError={() => setHasError(true)}
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Fallback Background */}
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-br from-gray-800 to-gray-900 transition-opacity duration-1000",
          isVideoLoaded && !hasError && !prefersReducedMotion
            ? "opacity-0"
            : "opacity-100",
        )}
        aria-hidden="true"
      />

      {/* Overlay */}
      {overlayOpacity > 0 && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity / 100 }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <div className="max-w-4xl space-y-6">
          {/* Title */}
          <h1
            className={cn(
              "text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl",
              "animate-fade-in-up opacity-0 [animation-delay:200ms] fill-mode-[forwards]",
            )}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p
              className={cn(
                "mx-auto max-w-2xl text-base text-gray-200 sm:text-lg md:text-xl",
                "animate-fade-in-up opacity-0 [animation-delay:400ms] fill-mode-[forwards]",
              )}
            >
              {subtitle}
            </p>
          )}

          {/* CTA Button */}
          {ctaText && ctaHref && (
            <div
              className={cn(
                "pt-4",
                "animate-fade-in-up opacity-0 [animation-delay:600ms] fill-mode-[forwards]",
              )}
            >
              <Link
                href={ctaHref}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-6 py-3 sm:px-8 sm:py-4",
                  "bg-amber-300 text-gray-900 font-semibold text-base sm:text-lg",
                  "transition-all duration-300 hover:bg-amber-400 hover:scale-105",
                  "focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-transparent",
                )}
              >
                {ctaText}
              </Link>
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToContent}
          className={cn(
            "absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2",
            "flex flex-col items-center gap-2 text-white/80 hover:text-white",
            "transition-all duration-300 hover:translate-y-1",
            "animate-fade-in opacity-0 [animation-delay:1000ms] fill-mode-[forwards]",
            "focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-2",
          )}
          aria-label="Scroll to content"
        >
          <span className="text-xs sm:text-sm font-medium tracking-wider uppercase">
            Discover
          </span>
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
