import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primaryColor: '#8e2de2',
    secondaryColor: '#4a00e0',
    gradientDirection: '45deg',
    textColor: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    cardBackground: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
    highlightColor: '#FF0080',
    secondaryHighlightColor: '#7928CA',
    buttonHoverTransform: 'translateY(-3px)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
  });

  const updateTheme = (newTheme) => {
    setTheme({ ...theme, ...newTheme });
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
