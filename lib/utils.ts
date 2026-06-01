import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function toWhatsappLink(phone: string, message: string) {
  const formatted = phone.replace(/[^\d+]/g, "");
  return `https://wa.me/${formatted.replace(/^\+/, "")}?text=${encodeURIComponent(message)}`;
}
