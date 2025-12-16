import React from "react";

export type SiteTheme = 'light' | 'dark';

export interface ThemeContextProps {
	theme: SiteTheme;
	toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};