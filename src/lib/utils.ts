import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Function to combine CSS classes in a smart way (Tailwind)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}