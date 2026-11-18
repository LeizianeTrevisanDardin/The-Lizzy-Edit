
"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type TextRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const wordContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.070,
    },
  },
};

const letter = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
};

export default function TextReveal({
  children,
  delay = 0,
  className = "",
}: TextRevealProps) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.8,
      }}
      variants={container}
      transition={{
        delayChildren: delay,
      }}
    >
      {children}
    </motion.span>
  );
}

export function RevealWord({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.span
      variants={wordContainer}
      className={className}
      style={{
        display: "inline-block",
        marginRight: "0.22em",
      }}
    >
      {Array.from(text).map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letter}
          style={{
            display: "inline-block",
          }}
          aria-hidden="true"
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
