import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function firstLetterToUppercase(item: string) {
  return `${(item as string)?.charAt(0).toUpperCase()}${(item as string)?.slice(1)}`;
}
