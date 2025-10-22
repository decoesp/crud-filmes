import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  const millions = value / 1_000_000;
  
  if (millions >= 1) {
    return `$${millions.toFixed(2).replace(/\.?0+$/, '')}M`;
  }
  
  const thousands = value / 1_000;
  if (thousands >= 1) {
    return `$${thousands.toFixed(2).replace(/\.?0+$/, '')}K`;
  }
  
  return `$${value}`;
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}min`;
}
