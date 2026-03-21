import React from 'react';
import { motion, useInView } from 'framer-motion';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function BlurText({ text, className = '', delay = 100 }: BlurTextProps) {
  const words = text.split(' ');
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{
            filter: 'blur(10px)',
            opacity: 0,
            y: 50,
          }}
          animate={
            isInView
              ? {
                  filter: 'blur(0px)',
                  opacity: 1,
                  y: 0,
                }
              : undefined
          }
          transition={{
            duration: 0.35,
            delay: index * (delay / 1000),
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
