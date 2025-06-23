"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
  size: "lg" | "sm";
  variant: "primary" | "outlined" | "secondary";
}

export const Button = ({ children, className }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => alert(`Hello from your app!`)}
    >
      {children}
    </button>
  );
};
