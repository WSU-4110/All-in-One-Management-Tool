import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calendar, { generateCalendarDays } from './calender';

const CURRENT_YEAR = 2024;
const CURRENT_MONTH = 3; // April (0 indexed)
const TODAY_DATE = 11;

// Test 1: Check if generateCalendarDays function generates the correct number of days for April
test('generateCalendarDays should generate correct number of days for April', () => {
  const days = generateCalendarDays(CURRENT_YEAR, CURRENT_MONTH); 
  expect(days.filter(day => day instanceof Date).length).toBe(30);
});

// Test 2: Check if Calendar component renders
test('Calendar component renders without crashing', () => {
  const { getByText } = render(<Calendar />);
  expect(getByText('CALENDAR')).toBeInTheDocument();
});

// Test 3: Check if clicking next month button updates the month to May
test('Next month button should update the month to May', () => {
  const { getByText, queryByText } = render(<Calendar />);
  fireEvent.click(getByText('→'));
  expect(queryByText('May')).toBeInTheDocument(); // May comes after April
});

// Test 4: Check if clicking previous month button updates the month to March
test('Previous month button should update the month to March', () => {
  const { getByText, queryByText } = render(<Calendar />);
  fireEvent.click(getByText('←'));
  expect(queryByText('March')).toBeInTheDocument(); // March comes before April
});

// Test 5: Check if today's date is highlighted
test('Today’s date should be highlighted', () => {
  const { getAllByText } = render(<Calendar />);
  const todayElements = getAllByText(TODAY_DATE).filter(element => {
    return element.style.background.includes('linear-gradient');
  });
  expect(todayElements).not.toHaveLength(0); // There should be at least one element with the gradient background
});

// Test 6: Check if an event can be added and is visible
test('Adding an event should make it visible', () => {
  // Mock sessionStorage for events
  const mockEvent = {
    DueDate: new Date(CURRENT_YEAR, CURRENT_MONTH, TODAY_DATE).toISOString(), 
    name: 'Test Event', 
    Location: 'Test Location', 
    Description: 'Test Description'
  };
  window.sessionStorage.setItem('Events', JSON.stringify([mockEvent]));

  const { getByText } = render(<Calendar />);
  fireEvent.click(getByText(TODAY_DATE)); // Click on today's date
  expect(getByText('Event Name:')).toBeInTheDocument();
  expect(getByText('Test Event')).toBeInTheDocument(); // Event details should be visible
});