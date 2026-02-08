"use client";
import React from "react";
import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

const Counter = ({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;

      const totalFrames = 60;
      const increment = Math.ceil(end / totalFrames);

      const timer = setInterval(
        () => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        },
        (duration * 1000) / totalFrames,
      );

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

const stats = [
  { label: "Happy Customers", value: 10000, suffix: "+" },
  { label: "Products Delivered", value: 2500, suffix: "+" },
  { label: "Average Rating", value: 4.9, suffix: "+" },
  { label: "Warranty", value: 5, suffix: "" },
];

export default function AboutStats() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center space-y-2"
            >
              <div className="text-4xl md:text-6xl font-black text-slate-700 flex justify-center items-baseline">
                <Counter value={stat.value} />
                <span className="text-amber-300">{stat.suffix}</span>
              </div>
              <p className="text-slate-500 font-medium uppercase tracking-widest text-xs md:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
