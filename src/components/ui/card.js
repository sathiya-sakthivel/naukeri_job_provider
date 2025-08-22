// src/components/ui/card.js
import React from "react";

// Card wrapper
export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
}

// Card content wrapper
export function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
