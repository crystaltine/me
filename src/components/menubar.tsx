import React from 'react';
import '../styles/menubar/menubar.css'
import lightThemeIcon from '../assets/theme-light.svg';
import darkThemeIcon from '../assets/theme-dark.svg';
import { SiteThemeManager } from '../theme';

interface MenubarProps {
  selected?: string;
}

const Menubar = (props: MenubarProps) => {

  // allows theme toggle button to change icons
  const [_currTheme, setCurrTheme] = React.useState(SiteThemeManager.currTheme);
  const _toggleTheme = React.useCallback(() => {
    SiteThemeManager.toggleTheme();
    setCurrTheme(SiteThemeManager.currTheme);
  }, []);

  return (
    <div className='menubar-main'>
      Menubar | selected: {props.selected}
      <div className='menubar-theme-container' onClick={_toggleTheme}>
        <img src={_currTheme === 'light'? darkThemeIcon : lightThemeIcon} alt="toggle theme" className='menubar-theme-icon' />
      </div>
    </div>
  );
};

export default Menubar;