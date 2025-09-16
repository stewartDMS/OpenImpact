/**
 * Utility functions for date formatting and manipulation
 */

export type DateFormatOptions = 'short' | 'long' | 'numeric' | 'iso' | 'relative';

/**
 * Formats a date string or Date object into a human-readable format
 * @param date - The date to format (string, Date, or number)
 * @param format - The format type to use
 * @param locale - The locale to use for formatting (defaults to 'en-US')
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date | number,
  format: DateFormatOptions = 'short',
  locale: string = 'en-US'
): string {
  const dateObj = new Date(date);
  
  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    
    case 'long':
      return dateObj.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      });
    
    case 'numeric':
      return dateObj.toLocaleDateString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    
    case 'iso':
      return dateObj.toISOString().split('T')[0];
    
    case 'relative':
      return getRelativeTimeString(dateObj);
    
    default:
      return dateObj.toLocaleDateString(locale);
  }
}

/**
 * Gets a relative time string (e.g., "2 days ago", "in 3 hours")
 * @param date - The date to compare against now
 * @returns Relative time string
 */
function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const diffInMs = date.getTime() - now.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (Math.abs(diffInMinutes) < 1) {
    return 'just now';
  } else if (Math.abs(diffInMinutes) < 60) {
    return diffInMinutes > 0 
      ? `in ${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'}`
      : `${Math.abs(diffInMinutes)} minute${Math.abs(diffInMinutes) === 1 ? '' : 's'} ago`;
  } else if (Math.abs(diffInHours) < 24) {
    return diffInHours > 0
      ? `in ${diffInHours} hour${diffInHours === 1 ? '' : 's'}`
      : `${Math.abs(diffInHours)} hour${Math.abs(diffInHours) === 1 ? '' : 's'} ago`;
  } else {
    return diffInDays > 0
      ? `in ${diffInDays} day${diffInDays === 1 ? '' : 's'}`
      : `${Math.abs(diffInDays)} day${Math.abs(diffInDays) === 1 ? '' : 's'} ago`;
  }
}

/**
 * Checks if a given year is a leap year
 * @param year - The year to check
 * @returns True if the year is a leap year
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Gets the number of days in a given month and year
 * @param month - The month (0-11)
 * @param year - The year
 * @returns Number of days in the month
 */
export function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}