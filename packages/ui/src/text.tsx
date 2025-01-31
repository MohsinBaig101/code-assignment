import React, { ElementType, ReactNode } from "react";

import { cn } from "@inf/ui"; // Utility to merge class names

interface TextProps {
  as?: ElementType; // Allows specifying the HTML tag or custom component
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl"; // Font size variants
  weight?: "light" | "normal" | "bold"; // Font weight variants
  className?: string; // Custom class names
  variant?: "primary" | "secondary" | "muted"; // Custom variants
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Text: React.FC<TextProps> = ({
  as: Component = "p", // Default to <p> if `as` is not provided
  children,
  size = "md",
  weight = "normal",
  variant = "primary",
  className,
  ...props
}) => {
  return (
    <Component
      className={cn(
        "text-base", // Default text style
        {
          sm: "text-sm",
          md: "text-base",
          lg: "text-lg",
          xl: "text-xl",
        }[size],
        {
          light: "font-light",
          normal: "font-normal",
          bold: "font-bold",
        }[weight],
        {
          primary: "text-gray-900",
          secondary: "text-gray-700",
          muted: "text-gray-500",
        }[variant],
        className, // Merge additional custom classes
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
