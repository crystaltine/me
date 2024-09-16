import '../styles/menubar/menubar.css'
import '../styles/menubar/menubar_compact.css'

import lightThemeIcon from '../assets/menubar_icons/theme-light.svg';
import darkThemeIcon from '../assets/menubar_icons/theme-dark.svg';
import experienceIcon from '../assets/menubar_icons/experience.svg';
import projectsIcon from '../assets/menubar_icons/projects.svg';
import artIcon from '../assets/menubar_icons/art.svg';
import resumeIcon from '../assets/menubar_icons/resume.svg';

import logoImg from '../assets/logo7_128x_nobg.png';
import { useTheme } from '../themeHook';

interface MenubarProps {
  selected?: string;
}

/**
 * { link name : [href, icon filename] }
 */
const MENUBAR_LINKS = {
  "Experience": ["/me/#/", experienceIcon],
  "Projects": ["/me/#/projects", projectsIcon],
  "Art": ["/me/#/art", artIcon],
  "Resume": ["/me/#/resume", resumeIcon],
}

function MenubarLink(props: {text: string, icon: string, href: string, curr?: boolean}) {

  return (
    <div className='menubar-link-container'>
      <a href={props.href} className={`menubar-link ${props.curr? 'selected' : ''}`}>
        <img src={props.icon} alt={props.text} className='menubar-link-icon invert-on-dark-theme' />
        <div className='menubar-hint'>{props.text}</div>
      </a>
    </div>
  );
}

const Menubar = (props: MenubarProps) => {

  // allows theme toggle button to change icons
  const {theme, toggleTheme} = useTheme();

  return (
    <div className='menubar-main'>

      <div className='menubar-title-container'>
        <a className='link-invis menubar-id' href="/">
          <img className='menubar-logo-img' src={logoImg} alt="logo" />
          <div className='menubar-title-text'>
            <span className='menubar-title-firstname'>m</span>
            <span className='menubar-title-lastname'>sh</span>
          </div>
        </a>
        <span className='menubar-page-title'>{props.selected}</span>
      </div>

      <div className='menubar-right-aligned'>
        <div className='menubar-links-container'>
          {Object.entries(MENUBAR_LINKS).map(([key, value]) => (
            <MenubarLink key={key} text={key} href={value[0]} icon={value[1]} curr={key === props.selected} />
          ))}
        </div>
        
        <div className='menubar-theme-container' onClick={toggleTheme}>
          <img src={theme === 'light'? darkThemeIcon : lightThemeIcon} alt="toggle theme" className='menubar-theme-icon' />
        </div>
      </div>

    </div>
  );
};

export default Menubar;