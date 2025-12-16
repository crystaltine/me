import React from "react";
import { SiteTheme, ThemeContext } from "./themeHook";

const DEFAULT_THEME = "dark";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<SiteTheme>(DEFAULT_THEME);
  React.useEffect(() => {
    const localTheme = localStorage.getItem('crystaltine-site-theme') as SiteTheme;
    if (localTheme) {
      setTheme(localTheme);
      document.body.classList.add(`theme-${localTheme}`);
    } else {
      setTheme(DEFAULT_THEME);
      localStorage.setItem('crystaltine-site-theme', DEFAULT_THEME);
      document.body.classList.add(`theme-${DEFAULT_THEME}`);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev: SiteTheme) => (prev === 'light'? 'dark' : 'light'));
    const newTheme = theme === 'light'? 'dark' : 'light';
    document.body.classList.remove(`theme-${theme}`);
    document.body.classList.add(`theme-${newTheme}`);
    localStorage.setItem('crystaltine-site-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
