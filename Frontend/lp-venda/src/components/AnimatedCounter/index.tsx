'use client'

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { formatMetricValue } from "../../util/formatMetricValue";
import styles from "./styles.module.scss";

interface AnimatedCounterProps {
  finalValue: number;
  duration?: number;
  type: "number" | "percentage";
  label: string;
  prefix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  finalValue,
  duration = 2,
  type,
  label,
  prefix,
}) => {
  const countRef = useRef<HTMLSpanElement>(null);
  const metricItemRef = useRef<HTMLDivElement>(null);
  const value = useRef({ val: 0 });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const gsapTarget = value.current;

    const currentMetricItem = metricItemRef.current;

    if (!("IntersectionObserver" in window)) {
      if (countRef.current) {
        countRef.current.textContent = formatMetricValue(
          finalValue,
          type,
          prefix
        );
      }
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            gsap.to(gsapTarget, {
              val: finalValue,
              duration: duration,
              onUpdate: () => {
                if (countRef.current) {
                  countRef.current.textContent = formatMetricValue(
                    gsapTarget.val,
                    type,
                    prefix
                  );
                }
              },
              ease: "power1.out",
              onComplete: () => {
                if (countRef.current) {
                  countRef.current.textContent = formatMetricValue(
                    finalValue,
                    type,
                    prefix
                  );
                }
                setHasAnimated(true);
              },
            });
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (currentMetricItem) {
      observer.observe(currentMetricItem);
    }

    return () => {
      if (currentMetricItem) {
        observer.unobserve(currentMetricItem);
      }
      gsap.killTweensOf(gsapTarget);
    };
  }, [finalValue, duration, type, label, prefix, hasAnimated]);

  return (
    <div className={styles.metric__item} ref={metricItemRef}>
      <span className={styles.metric__value} ref={countRef}>
        {hasAnimated
          ? formatMetricValue(finalValue, type, prefix)
          : formatMetricValue(0, type, prefix)}
      </span>
      <p className={styles.metric__label}>{label}</p>
    </div>
  );
};

export default AnimatedCounter;
