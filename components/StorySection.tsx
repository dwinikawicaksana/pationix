"use client";
import { motion } from "framer-motion";
import { StoryData } from "@/types/landing";

;

function StoryCard({ story }: { story: StoryData }) {
  const isRight = story.align === "right";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center py-20 lg:py-28 border-b border-zinc-100 dark:border-zinc-800/70 last:border-0">
      {/* Text */}
      <motion.div
        className={`${isRight ? "lg:order-1" : "lg:order-2"} order-2`}
        initial={{ opacity: 0, x: isRight ? -24 : 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65 }}
      >
        <span className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase text-zinc-400 dark:text-zinc-500 mb-5">
          {story.tag}
        </span>
        <h2
          className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tighter text-zinc-900 dark:text-zinc-50 mb-5 leading-[1.1]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {story.title}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-[17px] leading-relaxed max-w-md">
          {story.description}
        </p>
      </motion.div>

      {/* Image */}
      <motion.div
        className={`${isRight ? "lg:order-2" : "lg:order-1"} order-1`}
        initial={{ opacity: 0, x: isRight ? 24 : -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
      >
        <motion.div
          className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={story.image}
            alt={story.imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function StorySection({ stories }: { stories: StoryData[] }) {
  return (
    <section id="story" className="max-w-7xl mx-auto px-6">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </section>
  );
}
