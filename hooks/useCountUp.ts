import { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  start?: number;
  delay?: number;
}

export const useCountUp = ({ end, duration = 2000, suffix = '', start = 0, delay = 0 }: CountUpProps) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const animationRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Reset count when start changes
    setCount(start);
    countRef.current = start;
    
    // Delay animasi
    const timer = setTimeout(() => {
      hasStartedRef.current = true;
      startTimeRef.current = undefined;
      
      const animateCount = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const progress = timestamp - startTimeRef.current;
        
        // Easing function: easeOutCubic - semakin lambat di akhir
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        
        let percentage = Math.min(progress / duration, 1);
        percentage = easeOutCubic(percentage);
        
        const newCount = Math.floor(start + (end - start) * percentage);
        
        if (newCount !== countRef.current) {
          countRef.current = newCount;
          setCount(newCount);
        }
        
        if (progress < duration) {
          animationRef.current = requestAnimationFrame(animateCount);
        } else {
          setCount(end);
        }
      };
      
      animationRef.current = requestAnimationFrame(animateCount);
    }, delay);
    
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      startTimeRef.current = undefined;
      hasStartedRef.current = false;
    };
  }, [end, duration, start, delay]);
  
  return { count: suffix ? `${count}${suffix}` : count };
};