
import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HolographicCardProps extends React.HTMLAttributes<HTMLDivElement>, MotionProps {
  children: React.ReactNode;
  glowColor?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'none';
  glowIntensity?: 'low' | 'medium' | 'high';
  variant?: 'default' | 'elevated' | 'inset';
  interactive?: boolean;
  bordered?: boolean;
  className?: string;
}

const HolographicCard = React.forwardRef<HTMLDivElement, HolographicCardProps>(
  ({ 
    children, 
    glowColor = 'blue', 
    glowIntensity = 'medium',
    variant = 'default',
    interactive = true,
    bordered = true,
    className,
    ...props 
  }, ref) => {
    // Map glow colors to tailwind classes
    const glowColorMap = {
      blue: 'from-theme-blue-500/20 to-transparent shadow-theme-blue-500/10',
      purple: 'from-theme-purple-500/20 to-transparent shadow-theme-purple-500/10',
      green: 'from-success/20 to-transparent shadow-success/10',
      orange: 'from-warning/20 to-transparent shadow-warning/10',
      red: 'from-danger/20 to-transparent shadow-danger/10',
      none: 'from-transparent to-transparent shadow-none'
    };

    // Map glow intensity to tailwind classes
    const glowIntensityMap = {
      low: 'opacity-30',
      medium: 'opacity-50',
      high: 'opacity-70'
    };

    // Map variant to tailwind classes
    const variantMap = {
      default: '',
      elevated: 'translate-y-0 hover:-translate-y-1',
      inset: 'bg-theme-dark-800/80'
    };
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          // Base styles
          "relative rounded-2xl backdrop-blur-md overflow-hidden transition-all duration-300",
          // Glassmorphism effect
          "bg-theme-dark-700/40 border",
          // Border styling
          bordered ? "border-theme-dark-600/50" : "border-transparent",
          // Interactive effects
          interactive && "hover:border-theme-dark-500/70",
          interactive && "hover:shadow-lg hover:shadow-black/20",
          // Animation settings
          "transition-all duration-300 ease-out",
          // Variant styling
          variantMap[variant],
          className
        )}
        whileHover={interactive ? { scale: 1.01 } : {}}
        whileTap={interactive ? { scale: 0.99 } : {}}
        layout
        {...props}
      >
        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Glow effect */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-b",
            glowColorMap[glowColor],
            glowIntensityMap[glowIntensity],
            "pointer-events-none"
          )}
        />
        
        {/* Top highlight */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            backgroundPosition: ['0% 0%', '100% 0%'],
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 h-full">
          {children}
        </div>
      </motion.div>
    );
  }
);

HolographicCard.displayName = "HolographicCard";

export { HolographicCard };
