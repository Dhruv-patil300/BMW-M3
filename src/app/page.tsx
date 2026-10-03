"use client";

import React, { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { CinematicCanvas } from "@/components/CinematicCanvas";
import { StoryOverlays } from "@/components/StoryOverlays";
import { LaunchControlSimulator } from "@/components/LaunchControlSimulator";
import { DriveModeSimulator } from "@/components/DriveModeSimulator";
import { AcousticChamber } from "@/components/AcousticChamber";
import { SpecificationsDeck } from "@/components/SpecificationsDeck";
import { InteractiveConfigurator } from "@/components/InteractiveConfigurator";
import { HeritageTimeline } from "@/components/HeritageTimeline";
import { OwnershipSection } from "@/components/OwnershipSection";
import { TestDriveModal } from "@/components/TestDriveModal";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState<boolean>(false);
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const track = scrollTrackRef.current;
      if (!track) return;

      const trackTop = track.offsetTop;
      const trackHeight = track.offsetHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = trackHeight - windowHeight;

      if (maxScroll <= 0) return;

      const currentScroll = window.scrollY - trackTop;
      const progress = Math.max(0, Math.min(1, currentScroll / maxScroll));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === "overview") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (sectionId === "design") {
      const track = scrollTrackRef.current;
      if (track) {
        // Jump to exterior form beat (~20% of track)
        const target = track.offsetTop + (track.offsetHeight - window.innerHeight) * 0.2;
        window.scrollTo({ top: target, behavior: "smooth" });
        return;
      }
    }

    if (sectionId === "interior") {
      const track = scrollTrackRef.current;
      if (track) {
        // Jump to interior beat (~56% of track)
        const target = track.offsetTop + (track.offsetHeight - window.innerHeight) * 0.56;
        window.scrollTo({ top: target, behavior: "smooth" });
        return;
      }
    }

    if (sectionId === "technology") {
      const track = scrollTrackRef.current;
      if (track) {
        // Jump to technology beat (~70% of track)
        const target = track.offsetTop + (track.offsetHeight - window.innerHeight) * 0.70;
        window.scrollTo({ top: target, behavior: "smooth" });
        return;
      }
    }

    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExploreSpecs = () => {
    const elem = document.getElementById("specifications");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#050608] text-[#f5f5f7] selection:bg-[#0066b1] selection:text-white">
      {/* Top Fixed Minimal Navigation */}
      <Navigation
        onOpenTestDrive={() => setIsTestDriveOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Pinned Cinematic Scrollytelling Sequence */}
      {/* Height 750vh allows ample frame control across the 300 frames */}
      <div
        id="overview"
        ref={scrollTrackRef}
        className="relative h-[750vh] w-full"
      >
        {/* Pinned 100vh Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Canvas Frame Sequence Player */}
          <CinematicCanvas
            scrollProgress={scrollProgress}
            totalFrames={360}
          />

          {/* Synchronized 9 Cinematic Beats Story Overlays */}
          <StoryOverlays
            progress={scrollProgress}
            onExploreSpecs={handleExploreSpecs}
          />
        </div>
      </div>

      {/* Post-Scroll Deep Dive Deck */}
      <div className="relative z-30 bg-[#050608]">
        {/* Feature 3: 0–100 km/h Launch Control Simulator */}
        <LaunchControlSimulator />

        {/* M Dynamic Setup & M xDrive Drivetrain Simulator */}
        <DriveModeSimulator />

        {/* Feature 1: S58 Acoustic Chamber (Interactive Rev & Soundboard) */}
        <AcousticChamber />

        {/* Comprehensive Verified Specifications Matrix */}
        <SpecificationsDeck />

        {/* Interactive Configurator (Factory Colors, Forged Wheels, Carbon Upgrades) */}
        <InteractiveConfigurator />

        {/* Feature 4: Heritage Evolution Timeline (6 Generations of M3: E30 to G80) */}
        <HeritageTimeline />

        {/* Official BMW Purchase & Ownership Suite */}
        <OwnershipSection onOpenTestDrive={() => setIsTestDriveOpen(true)} />
      </div>

      {/* Interactive VIP Concierge Test Drive Booking Modal */}
      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
      />
    </main>
  );
}
