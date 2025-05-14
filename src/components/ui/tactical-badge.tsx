
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const tacticalBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-md",
  {
    variants: {
      variant: {
        default: "border-theme-blue-500/30 bg-theme-blue-500/10 text-theme-blue-400",
        high: "border-danger/30 bg-danger/10 text-danger",
        medium: "border-warning/30 bg-warning/10 text-warning",
        low: "border-success/30 bg-success/10 text-success",
        info: "border-info/30 bg-info/10 text-info",
        dark: "border-theme-dark-600 bg-theme-dark-700/80 text-white/70",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[0.625rem]",
        lg: "px-3 py-1 text-sm",
      },
      glow: {
        none: "",
        subtle: "shadow-[0_0_8px_var(--glow-color,rgba(0,116,245,0.2))]",
        strong: "shadow-[0_0_12px_var(--glow-color,rgba(0,116,245,0.4))]",
      },
      animation: {
        none: "",
        pulse: "",
        ping: "",
      },
      pill: {
        true: "rounded-full",
      },
      interactive: {
        true: "cursor-pointer hover:brightness-110",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      glow: "none",
      animation: "none",
      pill: false,
      interactive: false,
    },
  }
);

interface TacticalBadgeProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'>,
    VariantProps<typeof tacticalBadgeVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

function getGlowColor(variant: string = 'default') {
  switch (variant) {
    case 'high': return 'rgba(234,56,76,0.3)';
    case 'medium': return 'rgba(249,115,22,0.3)';
    case 'low': return 'rgba(16,185,129,0.3)';
    case 'info': return 'rgba(14,165,233,0.3)';
    default: return 'rgba(0,116,245,0.3)';
  }
}

const TacticalBadge = React.forwardRef<HTMLDivElement, TacticalBadgeProps>(
  ({ className, variant, size, glow, animation, pill, interactive, leftIcon, rightIcon, style, children, ...props }, ref) => {
    const glowColor = getGlowColor(variant);
    const styleWithGlow = { 
      ...style, 
      '--glow-color': glowColor,
    } as React.CSSProperties;

    // Custom animation props for the motion div
    const getAnimationProps = (): Partial<MotionProps> => {
      if (animation === 'pulse') {
        return {
          animate: { 
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.03, 1],
          },
          transition: { 
            repeat: Infinity,
            duration: 2,
          }
        };
      }
      return {};
    };

    const animationProps = getAnimationProps();

    // Extract any non-compatible props to avoid passing them to motion.div
    const { 
      onAnimationStart, onDrag, onDragEnd, onDragStart, 
      ...safeHtmlProps 
    } = props;

    return (
      <motion.div
        ref={ref}
        className={cn(tacticalBadgeVariants({ 
          variant, 
          size, 
          glow, 
          animation, 
          pill, 
          interactive 
        }), className)}
        style={styleWithGlow}
        {...animationProps}
        {...safeHtmlProps}
      >
        {leftIcon && <span className="mr-1">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-1">{rightIcon}</span>}

        {animation === 'ping' && (
          <span 
            className={cn(
              "absolute inset-0 rounded-full opacity-75",
              "animate-ping-slow"
            )}
            style={{ backgroundColor: glowColor }}
          />
        )}
      </motion.div>
    );
  }
);

TacticalBadge.displayName = "TacticalBadge";

export { TacticalBadge, tacticalBadgeVariants };
