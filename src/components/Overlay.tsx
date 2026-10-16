"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Section 1: 0% to 20%
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [1, 1, 0, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    // Section 2: 30% to 50%
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.5], [50, -50]);

    // Section 3: 60% to 80%
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.8], [50, -50]);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-[500vh] pointer-events-none z-10">
            <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center px-8 md:px-24">

                {/* Section 1 - Center */}
                <motion.div
                    style={{ opacity: opacity1, y: y1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center drop-shadow-2xl"
                >
                    <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-white mb-4">
                        Darshan Jagtap.
                    </h1>
                    <p className="text-xl md:text-3xl font-light text-neutral-300 mb-8">
                        Creative Developer.
                    </p>

                    {/* Skills pills */}
                    <div className="flex gap-3 flex-wrap justify-center max-w-lg">
                        {["JAVA", "CPP", "JS", "FULLSTACK"].map((skill) => (
                            <span key={skill} className="px-4 py-1.5 text-sm md:text-base font-medium text-white/80 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Section 2 - Left */}
                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className="absolute inset-y-0 left-8 md:left-24 flex flex-col justify-center drop-shadow-2xl max-w-lg"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                        I build digital experiences.
                    </h2>
                    <div className="h-1 w-24 bg-white/50 mb-6 rounded-full" />
                    <p className="text-neutral-400 text-lg md:text-xl">
                        Focusing on high-performance web applications, motion design, and seamless user journeys.
                    </p>
                </motion.div>

                {/* Section 3 - Right */}
                <motion.div
                    style={{ opacity: opacity3, y: y3 }}
                    className="absolute inset-y-0 right-8 md:right-24 flex flex-col justify-center text-right drop-shadow-2xl max-w-lg"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                        Bridging design <br /> and engineering.
                    </h2>
                    <div className="h-1 w-24 bg-white/50 mb-6 rounded-full ml-auto" />
                    <p className="text-neutral-400 text-lg md:text-xl">
                        Turning creative visions into robust, scalable, and interactive realities.
                    </p>
                </motion.div>

            </div>
        </div>
    );
}
