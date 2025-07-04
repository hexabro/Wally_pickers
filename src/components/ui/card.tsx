import React, { forwardRef } from "react";

// Utility to concatenate class names safely
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// Root container
export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-transparent bg-white text-blue-900 shadow-sm transition-shadow",
        "hover:shadow-md",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

// Content wrapper (padding only)
export const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

// Optional extras if you ever need them ↓
export const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 border-b border-blue-100 font-semibold text-xl", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 border-t border-blue-100", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";


