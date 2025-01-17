import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './theme';

import './styles/general/fonts.css';
import './styles/general/common.css';

import Homepage from './pages/home';
import ProjectsPage from './pages/projects';
import ArtPage from './pages/art';
import ResumePage from './pages/resume';

const Main = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/art" element={<ArtPage />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default Main;