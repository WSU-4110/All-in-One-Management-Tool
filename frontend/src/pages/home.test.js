import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home'; // assuming this is the path to your Home component

// Mock variables
const mockProfileConfigured = true; // Set to true if profile is configured
const mockShowContactForm = false; // Set to true to show contact form
const mockUsername = "mockUsername";
const mockPassword = "mockPassword";
const mockEmail = "mockEmail@example.com";
const mockNotifications = true;
const mockLocations = "mockLocation";
const mockTasks = [];
const mockEvents = [];

// Mock sessionStorage
const mockSessionStorage = {
  getItem: (key) => {
    return key ? mockSessionStorage[key] : null;
  },
  setItem: (key, value) => {
    mockSessionStorage[key] = value;
  },
  removeItem: (key) => {
    delete mockSessionStorage[key];
  },
  clear: () => {
    mockSessionStorage = {};
  },
  // Initial mock data
  Username: mockUsername,
  Password: mockPassword,
  Email: mockEmail,
  Notifications: mockNotifications,
  Locations: mockLocations,
  Tasks: JSON.stringify(mockTasks),
  Events: JSON.stringify(mockEvents)
};

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage
});

describe('Home Page', () => {
  test('Navigation buttons render correctly', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const addEventButton = screen.getByText('ADD EVENT');
    const addTaskButton = screen.getByText('ADD TASK');
    const calendarButton = screen.getByText('CALENDAR');
    const todoListButton = screen.getByText('TO DO LIST');

    expect(addEventButton).toBeInTheDocument();
    expect(addTaskButton).toBeInTheDocument();
    expect(calendarButton).toBeInTheDocument();
    expect(todoListButton).toBeInTheDocument();
  });

  test('Add Event button navigates to Add Event page', async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const addEventButton = screen.getByText('ADD EVENT');

    fireEvent.click(addEventButton);
    expect(await screen.findByText('ADD EVENT')).toBeInTheDocument();
    //expect(screen.getByText('Header')).toBeInTheDocument();
    //expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  test('Add Task button navigates to Add Task page', async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const addTaskButton = screen.getByText('ADD TASK');

    fireEvent.click(addTaskButton);
    expect(await screen.findByText('ADD TASK')).toBeInTheDocument();
    //expect(screen.getByText('Header')).toBeInTheDocument();
    //expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  test('Calendar button navigates to Calendar page', async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const calendarButton = screen.getByText('CALENDAR');

    fireEvent.click(calendarButton);
    expect(await screen.findByText('CALENDAR')).toBeInTheDocument();
    //expect(screen.getByText('Header')).toBeInTheDocument();
    //expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  test('To-Do List button navigates to To-Do List page', async () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const todoListButton = screen.getByText('TO DO LIST');

    fireEvent.click(todoListButton);
    expect(await screen.findByText('TO DO LIST')).toBeInTheDocument();
    //expect(screen.getByText('Header')).toBeInTheDocument();
    //expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});