"use client";

import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white select-none">
      {/* 
        The ScrollyCanvas component manages the 500vh scroll space.
        The Overlay manages the parallax text within that same space.
      */}
      <div className="relative w-full">
        <ScrollyCanvas totalFrames={28} />
        <Overlay />
      </div>

      {/* 
        After the 500vh Scroll sequence ends, the normal document flow resumes here
      */}
      <Projects />
    </main>
  );
}
