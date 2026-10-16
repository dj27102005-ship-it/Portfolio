"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
    const projects = [
        {
            title: "TimeLens",
            description: "Personal Time Intelligence Platform with AI-driven insights.",
            stack: ["React", "Node.js", "Python", "MongoDB"],
            link: "#",
        },
        {
            title: "Cafe Black Heart",
            description: "Modern web presence and ordering system for a local cafe.",
            stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
            link: "#",
        },
        {
            title: "Sequence UI",
            description: "Experimental high-performance scroll sequence engine.",
            stack: ["TypeScript", "HTML5 Canvas", "WebGL"],
            link: "#",
        },
    ];

    return (
        <section className="relative w-full min-h-screen bg-black py-32 px-8 md:px-24">
            {/* Background ambient light */}
            <div className="absolute top-0 left-1/2 -top-40 -translate-x-1/2 w-full max-w-4xl h-96 bg-neutral-800/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
                        Selected Works
                    </h2>
                    <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mb-16">
                        A showcase of recent engineering projects and creative development experiments.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group relative h-96 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.04] transition-colors duration-500 overflow-hidden flex flex-col justify-end p-8"
                        >
                            <div className="absolute top-8 right-8 text-neutral-500 group-hover:text-white transition-colors duration-300">
                                <ArrowUpRight className="w-8 h-8" />
                            </div>

                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
                                <p className="text-neutral-400 mb-6">{project.description}</p>

                                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {project.stack.map(tech => (
                                        <span key={tech} className="px-3 py-1 text-xs text-neutral-300 bg-white/10 rounded-full border border-white/5">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
