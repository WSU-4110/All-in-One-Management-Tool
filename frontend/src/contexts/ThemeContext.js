import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Start with 'light-mode' by default, or whatever is stored in localStorage
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light-mode');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light-mode' ? 'dark-mode' : 'light-mode';
    setTheme(newTheme); // This updates the theme state and triggers the useEffect
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
