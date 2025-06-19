import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedCounter = ({ 
  end, 
  duration = 2, 
  delay = 0, 
  className = "",
  prefix = "",
  suffix = "",
  decimals = 0 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });

  useEffect(() => {
    if (isInView) {
      const startTime = Date.now();
      const startValue = 0;
      
      const timer = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = (currentTime - startTime) / 1000;
        
        if (elapsed >= duration) {
          setCount(end);
          clearInterval(timer);
        } else {
          const progress = elapsed / duration;
          const currentCount = Math.floor(startValue + (end - startValue) * progress);
          setCount(currentCount);
        }
      }, 16); // ~60fps

      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
};

export default AnimatedCounter; 