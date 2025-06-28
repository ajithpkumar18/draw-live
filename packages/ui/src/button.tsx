"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
  size: "lg" | "sm";
  variant: "primary" | "outlined" | "secondary";
}

export const Button = ({ size, variant, children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={`${className} ${variant === "primary" ? "bg-primary" : ""} ${size === "lg" ? "px-4 py-2" : "px-2 py-1"}`}
      onClick={() => alert(`Hello from your app!`)}
    >
      {children}
    </button>
  );
};
