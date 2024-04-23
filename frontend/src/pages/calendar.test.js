import { generateCalendarDays } from './calender';

const CURRENT_YEAR = 2024;
const CURRENT_MONTH = 3; // April (0 indexed)

// Test 1: Check if generateCalendarDays function generates the correct number of days for April
test('generateCalendarDays should generate correct number of days for April', () => {
  const days = generateCalendarDays(CURRENT_YEAR, CURRENT_MONTH); 
  expect(days.filter(day => day instanceof Date).length).toBe(30);
});

// Test 2: Check if days before first day of April are null (assuming Sunday as the first day of the week)
test('generateCalendarDays should have null for days before first day of the month', () => {
  const days = generateCalendarDays(CURRENT_YEAR, CURRENT_MONTH); 
  const firstDayOfMonth = new Date(Date.UTC(CURRENT_YEAR, CURRENT_MONTH, 1)).getDay();
  const nullDays = days.slice(0, firstDayOfMonth);
  expect(nullDays.every(day => day === null)).toBe(true);
});

// Test 3: Check if the days generated for February in a leap year have the correct count
test('generateCalendarDays should generate correct number of days for February in a leap year', () => {
  const leapYear = 2024;
  const february = 1; // February (0 indexed)
  const days = generateCalendarDays(leapYear, february);
  expect(days.filter(day => day instanceof Date).length).toBe(29);
});

// Test 4: Check if the days generated for February in a non-leap year have the correct count
test('generateCalendarDays should generate correct number of days for February in a non-leap year', () => {
  const nonLeapYear = 2023;
  const february = 1; // February (0 indexed)
  const days = generateCalendarDays(nonLeapYear, february);
  expect(days.filter(day => day instanceof Date).length).toBe(28);
});

// Test 5: Check if the last day of the month is correct for April
test('generateCalendarDays should end with the correct last day for April', () => {
  const days = generateCalendarDays(CURRENT_YEAR, CURRENT_MONTH);
  const lastDay = days[days.length - 1];
  expect(lastDay.getUTCDate()).toBe(30);
  expect(lastDay.getUTCMonth()).toBe(CURRENT_MONTH);
});

// Test 6: Check if the function handles the transition from December to January
test('generateCalendarDays should handle transition from December to January correctly', () => {
  const december = 11; // December (0 indexed)
  const january = 0; // January (0 indexed)
  const daysInDecember = generateCalendarDays(CURRENT_YEAR, december);
  const daysInJanuary = generateCalendarDays(CURRENT_YEAR + 1, january);
  
  expect(daysInDecember.filter(day => day instanceof Date).length).toBe(31);
  expect(daysInJanuary.filter(day => day instanceof Date).length).toBe(31);
});