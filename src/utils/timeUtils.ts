import { format, parseISO } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

// AEST timezone
const AEST_TIMEZONE = 'Australia/Sydney';

// Function to get current time in AEST
export const getCurrentTimeInAEST = (): Date => {
  const utcDate = new Date();
  return utcToZonedTime(utcDate, AEST_TIMEZONE);
};

// Function to format a date to display in AEST
export const formatAESTDate = (date: Date, formatString: string = 'PPpp'): string => {
  const aestDate = utcToZonedTime(date, AEST_TIMEZONE);
  return format(aestDate, formatString) + ' AEST';
};

// Function to format a ISO string to display in AEST
export const formatISOToAEST = (isoString: string, formatString: string = 'PPpp'): string => {
  const date = parseISO(isoString);
  return formatAESTDate(date, formatString);
};

// Function to check if breakfast is available (before 12:30 PM AEST)
export const isBreakfastAvailable = (): boolean => {
  const now = getCurrentTimeInAEST();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  
  // Breakfast is available until 12:30 PM
  return hours < 12 || (hours === 12 && minutes < 30);
};

// Function to get breakfast cut-off time
export const getBreakfastCutoffTime = (): string => {
  return '12:30 PM AEST';
};

// Function to convert a Date to ISO string in AEST timezone
export const aestToISOString = (date: Date): string => {
  const utcDate = zonedTimeToUtc(date, AEST_TIMEZONE);
  return utcDate.toISOString();
};