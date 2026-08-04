"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedNumberProps {
  value: string;
  className?: string;
  style?: React.CSSProperties;
}

function parseValue(val: string): { prefix: string; num: number; suffix: string } {
  const match = val.match(/^([^0-9]*)([0-9,.]+)([^0-9]*)$/);
  if (!match) return { prefix: "", num: 0, suffix: val };
  return {
    prefix: match[1],
    num: parseFloat(match[2].replace(/,/g, "")),
    suffix: match[3],
  };
}

function formatNumber(num: number, original: string): string {
  if (original.includes(",")) {
    return num.toLocaleString("en-US", { maximumFractionDigits: 0 });
  }
  if (original.includes(".")) {
    return num.toFixed(1);
  }
  return Math.round(num).toString();
}

export default function AnimatedNumber({ value, className, style }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");
  const { prefix, num, suffix } = parseValue(value);

  useEffect(() => {
    if (!isInView) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(formatNumber(num, value));
      return;
    }

    let startTime: number | null = null;
    const duration = 1800;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = eased * num;
      setDisplay(formatNumber(current, value));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, num, value]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{display}{suffix}
    </span>
  );
}
