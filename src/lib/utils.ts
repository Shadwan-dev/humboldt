import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Función segura para convertir fechas de Firestore o strings a Date
export function safeToDate(value: any): Date | null {
  if (!value) return null;
  
  // Si ya es un objeto Date
  if (value instanceof Date) return value;
  
  // Si es un Timestamp de Firestore
  if (typeof value === 'object' && value !== null && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate();
  }
  
  // Si es un string o número
  const date = new Date(value);
  if (!isNaN(date.getTime())) return date;
  
  return null;
}