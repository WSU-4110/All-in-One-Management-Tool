//handleClick: logs the events variable to the console.
//handleCalendarClick: navigates to the '/calendar' route.
//handleToDoClick: navigates to the '/todolist' route.
//useNavigate: returns a navigation function from React Router DOM.
//JSON.parse: parses a JSON string and returns a JavaScript object.
//sessionStorage.getItem: retrieves a data item from session storage.

import { fireEvent } from '@testing-library/react';
import { render } from '@testing-library/react';
import Notifications from './notifications.js';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Notifications component', () => {
  test('handleCalendarClick navigates to calendar route', () => {
    const { getByText } = render(
      <Router>
        <Notifications />
      </Router>
    );
    fireEvent.click(getByText('Calendar'));
    expect(window.location.pathname).toBe('/calendar');
  });

  test('handleToDoClick navigates to todo list route', () => {
    const { getByText } = render(
      <Router>
        <Notifications />
      </Router>
    );
    fireEvent.click(getByText('To Do'));
    expect(window.location.pathname).toBe('/todolist');
  });
  });
  test('useNavigate returns a function', () => {
    const { result } = renderHook(() => useNavigate());
    expect(typeof result.current).toBe('function');
  });

  test('JSON.parse correctly parses JSON string', () => {
    const jsonString = '{"key": "value"}';
    expect(JSON.parse(jsonString)).toEqual({ key: 'value' });
  });

  test('sessionStorage.getItem retrieves data from session storage', () => {
    const key = 'Tasks';
    const data = '{"key": "value"}';
    sessionStorage.setItem(key, data);
    expect(sessionStorage.getItem(key)).toEqual(data);
  });
});
