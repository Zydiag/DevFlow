import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// function to format time numbers
export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference: number = +now - +createdAt; // Explicitly cast to number

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  } else if (months > 0) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else if (days > 0) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
  }
};

// function to format numbers
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    const formatted = (num / 1000000).toFixed(2);
    return formatted.endsWith('.00')
      ? (num / 1000000).toFixed(0) + 'M'
      : formatted + 'M';
  } else if (num >= 1000) {
    const formatted = (num / 1000).toFixed(2);
    return formatted.endsWith('.00')
      ? (num / 1000).toFixed(0) + 'K'
      : formatted + 'K';
  } else {
    return num.toString();
  }
}

// function to format dates
export function getJoinedDate(inputDate: Date): string {
  const monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = monthNames[inputDate.getMonth()];
  const year = inputDate.getFullYear();

  return `${month} ${year}`;
}
