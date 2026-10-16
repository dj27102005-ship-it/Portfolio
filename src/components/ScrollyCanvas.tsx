"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface ScrollyCanvasProps {
    totalFrames: number;
}

export default function ScrollyCanvas({ totalFrames }: ScrollyCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Framer Motion scroll hook
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll progress (0 - 1) to frame index (0 - totalFrames - 1)
    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

    useEffect(() => {
        // Preload all images
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 0; i < totalFrames; i++) {
            const img = new Image();
            // Adjust standard naming based on what is actually in public/sequence
            const paddedIndex = String(i).padStart(2, '0');
            img.src = `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    setImagesLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [totalFrames]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !imagesLoaded || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Handle resizing logic for full screen cover
        const renderFrame = (index: number) => {
            const img = images[Math.round(index)];
            if (!img) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);

            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                centerShift_x,
                centerShift_y,
                img.width * ratio,
                img.height * ratio
            );
        };

        // Render initial frame
        renderFrame(0);

        // Handle window resize
        const handleResize = () => renderFrame(currentIndex.get());
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [imagesLoaded, images, currentIndex]);

    // Update canvas on scroll
    useMotionValueEvent(currentIndex, "change", (latest) => {
        const canvas = canvasRef.current;
        if (!canvas || !imagesLoaded || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[Math.round(latest)];
        if (!img) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    });

    return (
        <div ref={containerRef} className="relative w-full h-[500vh]">
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full object-cover pointer-events-none" />
                {/* Loading State Overlay */}
                {!imagesLoaded && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 text-white">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-8 h-8 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
                            <p className="tracking-widest text-sm font-medium uppercase text-neutral-400">Loading Sequence...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
