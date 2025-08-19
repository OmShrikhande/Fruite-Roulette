import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  // Spread inputs so clsx receives variadic arguments instead of an array
  return twMerge(clsx(...inputs))
}

